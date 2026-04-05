import mergeOption from "vislite/lib/mergeOption/index.es.js"
import createElement from "./createElement.js"
import urlFormat from "./tools/urlFormat.js"

export default function Zipaper(option = {}) {

    // 缺省值
    mergeOption(this, {
        __parent: null, // 父对象
        __children: [], // 子对象
        __router: null // 记录当前页面路由信息
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
    __router_old: [],

    // 外部方法
    $goto(url) {
        if (!this.$$router) return

        let isInit = false
        if (!url) {
            isInit = true
            url = urlFormat().router
        }

        // 解析后的路由值
        let routerArray = this.$$router(url.match(/\/[^/]*/g))

        let __router_new = []
        for (let item of routerArray) __router_new.push(item.router)

        // 如果路由地址没有改变，就什么也不干
        // 否则记录下新的路由地址
        if (Zipaper.prototype.__router_old.join("") === __router_new.join("")) return
        else Zipaper.prototype.__router_old = __router_new

        let routerUse = function (index, instance) {
            let routerInstance = (function getRouterInstance(instance) {
                if (instance.__router) return instance
                else {
                    for (let tempInstance of instance.__children) {
                        let result = getRouterInstance(tempInstance)
                        if (result) return result
                    }
                }

            })(instance)

            if (routerArray[index]) {

                // 如果找到了<router></router>
                if (routerInstance) {

                    let doit = function (component) {
                        if (routerArray[index].router != routerInstance.__router.router) {
                            routerInstance.__router.instance = createElement(routerInstance, routerInstance.__router.el, component, {}, {}, routerArray[index].meta)
                            routerInstance.__router.router = routerArray[index].router
                        }

                        routerUse(index + 1, routerInstance.__router.instance)
                    }

                    // 懒加载页面
                    if (typeof routerArray[index].page === "function") {
                        routerArray[index].page().then(function (element) {
                            let component = typeof element.default === "object" ? element.default : element
                            doit(component)
                        })
                    }

                    // 页面
                    else if (typeof routerArray[index].page === "object") {
                        doit(routerArray[index].page)
                    }

                    // 非法值
                    else {
                        routerInstance.__router.el.innerHTML = ""
                    }

                }
            } else {
                if (routerInstance) {
                    routerInstance.__router.router = ""
                    routerInstance.__router.el.innerHTML = ""
                }
            }
        }
        routerUse(0, this.__rootInstance)

        if (!isInit) window.location.href = "#" + __router_new.join("")
    }
})
