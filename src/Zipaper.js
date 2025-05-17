import mergeOption from "vislite/lib/mergeOption/index.es.js"
import createElement from "./createElement.js"
import urlFormat from "./urlFormat.js"

export default function Zipaper(option = {}) {

    // 缺省值
    mergeOption(this, {
        __parent: null,
        __children: [],
        __router: null
    })

    // 对象初始化
    for (let key in option) {
        if (option.hasOwnProperty(key)) {
            this[key] = option[key]
        }
    }
}

// 全局对象
mergeOption(Zipaper.prototype, {

    // 内部方法
    $$router: null,

    // 内部属性
    __components: {},
    __directives: {},
    __rootInstance: null,

    // 记录旧的路由
    // 后续考虑是否对路由的管理进一步设计，看情况再说
    __router_old: "",

    // 外部方法
    $goto(url) {
        let isInit = false
        if (!url) {
            isInit = true
            url = urlFormat().router
        }

        // 如果路由地址没有改变，就什么也不干
        // 否则记录下新的路由地址
        if (Zipaper.prototype.__router_old === url) return
        else Zipaper.prototype.__router_old = url

        // 解析后的路由值
        let routerArray = this.$$router(url.match(/\/[^/]*/g))

        let routerUse = function (index, instance) {
            if (routerArray[index]) {

                let routerInstance = (function getRouterInstance(instance) {
                    if (instance.__router) return instance
                    else {
                        for (let tempInstance of instance.__children) {
                            let result = getRouterInstance(tempInstance)
                            if (result) return result
                        }
                    }

                })(instance)

                // 如果找到了<router></router>
                if (routerInstance) {
                    routerArray[index].page().then(function (element) {

                        if (routerArray[index].router != routerInstance.__router.router) {

                            // 销毁旧的
                            if (routerInstance.__router.instance) {

                                // 销毁的生命周期推迟支持
                                routerInstance.__router.el.innerHTML = ""
                            }

                            console.log(routerInstance)
                            routerInstance.__router.instance = createElement(routerInstance, routerInstance.__router.el, element.default, {}, {}, true)
                            routerInstance.__router.router = routerArray[index].router
                        }

                        routerUse(index + 1, routerInstance.__router.instance)
                    })
                }
            }
        }
        routerUse(0, this.__rootInstance)

        if (!isInit) window.location.href = "#" + url
    }
})
