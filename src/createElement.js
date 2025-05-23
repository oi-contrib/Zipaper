import { throttle } from "oipage/web/throttle/index.js"
import Zipaper from "./Zipaper.js"
import isValidKey from "./isValidKey.js"
import { evalExpress } from "eval-express"
import { isObject } from "./type.js"
import { proxy, watcher } from "./observe-data.js"
import { uniqueId } from "./math.js"

export default function createElement(parentInstance, targetEl, element, attr = {}, events = {}, meta = {}, slots = {}) {
    let __uniqueId = uniqueId()

    // 监听被新组件挂载
    watcher(targetEl, "__uniqueId__", __uniqueId, function () {
        if (element.lifecycle.beforeDestroy) element.lifecycle.beforeDestroy.call(instance)

        // 销毁前，从父记录队列中删除自己
        for (let index = 0; index < parentInstance.__children.length; index++) {
            if (parentInstance.__children[index].__uniqueId === __uniqueId) {
                parentInstance.__children.splice(index, 1)
                break
            }
        }
    })
    targetEl.innerHTML = ""

    let props = {}
    for (let propName in element.props) {

        // 如果传递了
        if (propName in attr) {
            if (element.props[propName].isValid(attr[propName])) {
                props[propName] = attr[propName]
            } else {
                throw new Error("Prop check failed:" + propName + " = " + attr[propName])
            }
        }

        // 看看有没有默认值
        else {
            if (element.props[propName].default !== undefined) {
                props[propName] = element.props[propName].default
            } else if (element.props[propName].required) {
                throw new Error("Prop is Required:" + propName)
            }
        }
    }

    let instance = new Zipaper({
        __parent: parentInstance,
        __uniqueId,
        __el: targetEl,
        _props: props,
        _router: {
            meta
        },
        $emit(eventType, eventData) {
            if (element.emits.indexOf(eventType) > -1) {
                if (events[eventType]) events[eventType](eventData)
            } else {
                throw new Error("Illegal event type, as it is not pre-defined in advance:" + eventType)
            }
        }
    })

    // 在实例上挂载方法
    for (let key in element.methods) {

        // 对于&和_开头的，我们预留内部使用
        isValidKey(key)

        instance[key] = element.methods[key]
    }

    // 如果js中有数据改变需要更新试图，会触发这个方法
    let directiveRecord = [], componentRecord = []
    let upateView = throttle(function () {

        // 指令
        for (let item of directiveRecord) {
            let directive = item.directive
            if (directive.lifecycle.update) directive.lifecycle.update.call(instance, item.el, {
                type: item.type,
                target: instance,
                value: (typeof item.exp === "string" && item.exp) ? evalExpress(instance.__rootInstance, item.exp, instance) : item.exp,
                exp: item.exp
            })
        }

        // 组件
        for (let item of componentRecord) {
            let componentInstance = item.instance
            let props = item.props
            for (let propKey in props) {
                let propValue = evalExpress(instance.__rootInstance, props[propKey], instance)
                if (componentInstance._props[propKey] !== propValue) componentInstance._props[propKey] = propValue
            }
        }
    }, {
        keep: true,
        time: 50
    })

    let data = element.data.call(instance)

    // 实例上挂载数据并启动监听
    for (let key in data) {
        isValidKey(key)

        // 如果是标记需要双向绑定的
        if (isObject(data[key]) && "value" in data[key] && "type" in data[key]) {
            if (data[key].type === "ref") {
                watcher(instance, key, data[key].value, upateView)
            } else if (data[key].type === "reactive") {
                proxy(instance, key, data[key].value, upateView)
            }
        }

        // 否则就静态数据
        else {
            instance[key] = data[key]
        }
    }

    parentInstance.__children.push(instance)

    // 元素初始化
    if (!element.attr.hadMounted) {
        element.attr.hadMounted = true

        // style
        if (element.style) {
            let styleEl = document.createElement("style")
            styleEl.textContent = element.style
            document.getElementsByTagName("head")[0].appendChild(styleEl)
        }
    }

    // 元素挂载
    if (element.render) {
        let elArray = element.render(function h(name, config, children) {

            let el = document.createElement(name)
            let subProps = {}, subEvents = {}, bindProps = {}

            // 属性
            for (let attrKey in config.attr) {
                el.setAttribute(attrKey, config.attr[attrKey])

                // attr不会改变，直接copy即可
                subProps[attrKey] = config.attr[attrKey]
            }

            let component = instance.__components[name]

            // 组件
            if (component) {
                setTimeout(function () {
                    let componentInstance = createElement(instance, el, component, subProps, subEvents, {}, {

                        // 目前只支持默认插槽，后续再考虑是否需要扩展
                        default: children
                    })
                    componentRecord.push({
                        instance: componentInstance,
                        props: bindProps
                    })
                })
            }

            // 路由
            else if (name === "router") {
                instance.__router = {
                    el, // 挂载位置
                    router: null, // 路由值 
                    instance: null // 实例对象
                }
            }

            // 普通元素
            else {

                // 孩子节点
                for (let itemEl of children) {

                    // 插槽
                    if (itemEl.nodeName === "SLOT") {
                        if (slots.default) {
                            for (let slotEl of slots.default) {
                                itemEl.appendChild(slotEl)
                            }
                        }
                    }

                    el.appendChild(itemEl)
                }

            }

            // 指令
            for (let direcitveItem of config.direcitve) {
                let direcitveKey = direcitveItem.key
                let [direcitveName, direcitveType = ""] = direcitveKey.replace(/^z-/, "").split(":")

                // 组件上的v-model需要拆解
                // z-model="modelkey"
                // 变成：
                // z-bind:value="modelkey" z-on:input="setModelkey"
                // 2025年5月12日 于南宁
                if (component && direcitveName === "model") {

                    // z-bind:value
                    config.direcitve.push({
                        key: "z-bind:value",
                        value: direcitveItem.value
                    })

                    // z-on:input
                    config.direcitve.push({
                        key: "z-on:input",
                        value: function (event, el) {
                            this[direcitveItem.value] = event.data
                        }
                    })
                }

                // 否则直接生效即可
                else {

                    let directive = instance.__directives[direcitveName]
                    if (!directive) throw new Error("The direcitve does not exist: " + direcitveName)

                    let exp = direcitveItem.value

                    // created
                    let value = (typeof exp === "string" && exp) ? evalExpress(instance.__rootInstance, exp, instance) : exp
                    if (directive.lifecycle.created) directive.lifecycle.created.call(instance, el, {
                        type: direcitveType,
                        target: instance,
                        value,
                        exp
                    })

                    // 只有当前元素是组件才有收集的意义
                    if (component) {
                        if (direcitveName === "bind") {
                            subProps[direcitveType] = value

                            // 更新的时候，更新组件_props用
                            if (direcitveType && exp) bindProps[direcitveType] = exp
                        } else if (direcitveName === "on") {
                            let eventName = direcitveType.split(".")[0]
                            subEvents[eventName] = function (eventData) {

                                // 直接调用evnet方法，不是很合理
                                // value.call(instance, eventData, el)

                                let event = new Event(eventName)
                                event.data = eventData
                                el.dispatchEvent(event)
                            }
                        }
                    }

                    directiveRecord.push({
                        el,
                        directive,
                        type: direcitveType,
                        exp
                    })
                }
            }

            return el
        })
        for (let elItem of elArray) {
            targetEl.appendChild(elItem)
        }
    }

    // 创建完成
    if (element.lifecycle.created) element.lifecycle.created.call(instance)
    return instance
}