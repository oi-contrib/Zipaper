import urlFormat from "./urlFormat.js"

export default function defineRouter(option) {
    return {
        install(Zipaper) {

            // 提前注册好的路由
            let routerRegistry = (function analyseRouters(routers) {
                let list = {}
                for (let item of routers) {
                    if (item.component) {
                        list[item.path] = {
                            path: item.path,
                            valueOf: item.component,
                            children: item.children ? analyseRouters(item.children) : {}
                        }
                    } else {
                        list[item.path] = () => list[item.redirect]
                    }
                }
                return list
            })(option.routers)

            // 根据路由获取具体的页面内容
            Zipaper.prototype.$$router = function (routers) {
                let pages = [], list = routerRegistry

                let pushItem = function (currentItem) {
                    while (typeof currentItem === "function") currentItem = currentItem()

                    if (currentItem) {
                        pages.push({
                            router: currentItem.path,
                            page: currentItem.valueOf
                        })
                        list = currentItem.children
                    }
                }

                for (let router of routers) {
                    if (list) pushItem(list[router])
                    else break
                }

                while (list && list["/"]) pushItem(list["/"])

                return pages
            }

            // 启动监听路由改变
            window.addEventListener('popstate', function () {
                Zipaper.prototype.$goto(urlFormat(window.location.href).router)
            });
        }
    }
}