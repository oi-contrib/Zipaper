let getComponent = (path) => {

    return new Promise((resolve) => {
        import("../" + path + "?_=" + new Date().valueOf()).then((res) => {
            let component = res.default

            let basePath = path.split("/").slice(0, -1).join("/") + "/"

            fetch(basePath + component.template + "?_=" + new Date().valueOf()).then((res) => {
                res.text().then((template) => {
                    component.template = xhtmlToJson.parseTemplate(template).toJson()

                    if (component.style && component.style.content) {
                        fetch(basePath + component.style.content + "?_=" + new Date().valueOf()).then((res) => {
                            res.text().then((style) => {

                                import("./modules/services/SCSS-to-CSS.js").then((res) => {

                                    component.style.content = res.default(style)

                                    resolve({
                                        default: Zipaper.defineElement(component)
                                    })
                                })
                            })
                        })
                    } else {
                        resolve({
                            default: Zipaper.defineElement(component)
                        })
                    }
                })
            })

        })
    })
}

let getDirective = (path) => {
    return new Promise((resolve) => {
        import("../" + path + "?_=" + new Date().valueOf()).then((res) => {
            resolve(Zipaper.defineDirective(res.default))
        })
    })
}

Promise.all([
    getComponent("htmls/App/index.js"),

    // 组件
    getComponent("libs/modules/components/ui-menu/index.js"),
    getComponent("libs/modules/components/ui-code/index.js"),

    // 指令
    getDirective("libs/modules/directives/z-href.js")

]).then(([
    App,
    uiMenu, uiCode,
    zHref
]) => {

    Zipaper.createApp(App.default)
        .use(Zipaper.defineRouter({ // 路由
            routers: [{
                path: "/",
                redirect: "/welcome"
            }, {

                // 介绍
                path: "/welcome",
                component: () => getComponent("htmls/welcome/index.js"),

                children: [
                    {
                        path: "/",
                        redirect: "/what"
                    }, {
                        path: "/what",
                        component: () => getComponent("htmls/welcome/what/index.js"),
                    }
                ]

            }, {

                // 教程
                path: "/tutorial",
                component: () => getComponent("htmls/tutorial/index.js"),

                children: [
                    {
                        path: "/",
                        redirect: "/initProject"
                    }, {
                        path: "/initProject",
                        component: () => getComponent("htmls/tutorial/initProject/index.js"),
                    }, {
                        path: "/router",
                        component: () => getComponent("htmls/tutorial/router/index.js"),
                    }, {
                        path: "/el_ref",
                        component: () => getComponent("htmls/tutorial/el_ref/index.js"),
                    }, {
                        path: "/slot",
                        component: () => getComponent("htmls/tutorial/slot/index.js"),
                    }, {
                        path: "/prop_emit",
                        component: () => getComponent("htmls/tutorial/prop_emit/index.js"),
                    }
                ]

            }, {

                // 全局API
                path: "/api",
                component: () => getComponent("htmls/api/index.js"),

                children: [
                    {
                        path: "/",
                        redirect: "/createApp"
                    }, {
                        path: "/createApp",
                        component: () => getComponent("htmls/api/createApp/index.js"),
                    }, {
                        path: "/app.mount",
                        component: () => getComponent("htmls/api/app.mount/index.js"),
                    }, {
                        path: "/app.use",
                        component: () => getComponent("htmls/api/app.use/index.js"),
                    }, {
                        path: "/app.component",
                        component: () => getComponent("htmls/api/app.component/index.js"),
                    }, {
                        path: "/app.directive",
                        component: () => getComponent("htmls/api/app.directive/index.js"),
                    }, {
                        path: "/defineElement",
                        component: () => getComponent("htmls/api/defineElement/index.js"),
                    }, {
                        path: "/defineDirective",
                        component: () => getComponent("htmls/api/defineDirective/index.js"),
                    }, {
                        path: "/defineRouter",
                        component: () => getComponent("htmls/api/defineRouter/index.js"),
                    }, {
                        path: "/watcher",
                        component: () => getComponent("htmls/api/watcher/index.js"),
                    }
                ]

            }, {

                // 内置要素
                path: "/element",
                component: () => getComponent("htmls/element/index.js"),

                children: [
                    {
                        path: "/",
                        redirect: "/z-bind"
                    }, {
                        path: "/z-bind",
                        component: () => getComponent("htmls/element/directive/z-bind/index.js"),
                    }, {
                        path: "/z-on",
                        component: () => getComponent("htmls/element/directive/z-on/index.js"),
                    }, {
                        path: "/z-model",
                        component: () => getComponent("htmls/element/directive/z-model/index.js"),
                    }, {
                        path: "/z-show",
                        component: () => getComponent("htmls/element/directive/z-show/index.js"),
                    }, {
                        path: "/component",
                        component: () => getComponent("htmls/element/component/component/index.js"),
                    }
                ]

            }, {

                // 插件
                path: "/plugin",
                component: () => getComponent("htmls/plugin/index.js"),

                children: [
                    {
                        path: "/",
                        redirect: "/what"
                    }, {
                        path: "/what",
                        component: () => getComponent("htmls/plugin/what/index.js"),
                    }
                ]

            }]
        }))
        .component("ui-menu", uiMenu.default) // 注册组件
        .component("ui-code", uiCode.default)
        .directive("href", zHref) // 注册指令
        .mount(document.getElementById("root")) // 挂载到页面

})