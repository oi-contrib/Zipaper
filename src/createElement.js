import { throttle } from "oipage/web/throttle/index.js"
import Zipaper from "./Zipaper.js"
import isValidKey from "./isValidKey.js"
import { evalExpress } from "eval-express"
import { isObject } from "./type.js"
import { proxy, watcher } from "./observe-data.js"

export default function createElement(parentInstance, targetEl, element, attr, events, isRouter) {

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
        __isRouter: isRouter,
        _props: props,
        $emit(eventType, eventData) {
            if (element.emits.indexOf(eventType) > -1) {
                events[eventType](eventData)
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
    let directiveRecord = []
    let upateView = throttle(function () {

        // 指令
        for (let item of directiveRecord) {
            let directive = item.directive
            if (directive.lifecycle.update) directive.lifecycle.update.call(instance, item.el, {
                type: item.type,
                target: instance,
                value: item.exp ? evalExpress(instance.__rootInstance, item.exp, instance) : undefined,
                exp: item.exp
            })
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

    // 如果当前时路由，需要先去掉旧的，销毁
    if (isRouter) {
        for (let index = 0; index < parentInstance.__children.length; index++) {
            if (parentInstance.__children[index].__isRouter) {
                parentInstance.__children.splice(index, 1)
            }
        }
    }
    parentInstance.__children.push(instance)

    // 元素初始化
    if (!element.attr.hadMounted) {
        element.attr.hadMounted = true

        // style
        if (element.style) {
            let styleEl = document.createElement("style")
            styleEl.innerText = element.style
            document.getElementsByTagName("head")[0].appendChild(styleEl)
        }
    }

    // 元素挂载
    if (element.render) {
        let elArray = element.render(function h(name, config, children) {
            let el = document.createElement(name)
            let subProps = {}, subEvents = {}

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

                    // props这个，先不考虑watch的情况，推迟设计
                    createElement(instance, el, component, subProps, subEvents)
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
                    if (typeof itemEl === "string") {
                        let textEl = document.createTextNode("")
                        textEl.textContent = itemEl
                        el.appendChild(textEl)
                    } else {
                        el.appendChild(itemEl)
                    }
                }

            }

            // 指令
            for (let direcitveKey in config.direcitve) {
                let [direcitveName, direcitveType = ""] = direcitveKey.replace(/^z-/, "").split(":")

                let directive = instance.__directives[direcitveName]
                if (!directive) throw new Error("The direcitve does not exist: " + direcitveName)

                let exp = config.direcitve[direcitveKey]

                // created
                let value = exp ? evalExpress(instance.__rootInstance, exp, instance) : undefined
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

            return el
        })
        for (let elItem of elArray) {
            targetEl.appendChild(elItem)
        }
    }

    if (element.lifecycle.created) element.lifecycle.created.call(instance)

    return instance
}