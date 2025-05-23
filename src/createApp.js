import Zipaper from "./Zipaper.js"
import createElement from "./createElement.js"

import zOn from "./directives/z-on.js"
import zBind from "./directives/z-bind.js"
import zModel from "./directives/z-model.js"
import zShow from "./directives/z-show.js"

export default function createApp(AppElement) {
    if (!Zipaper.prototype.__rootInstance) Zipaper.prototype.__rootInstance = new Zipaper()

    let app = {
        mount(targetEl) { // 挂载到页面
            createElement(Zipaper.prototype.__rootInstance, targetEl, AppElement)

            Zipaper.prototype.__rootInstance.$goto()
            return app
        },
        use(plugin, config) { // 安装插件
            if (plugin.install) plugin.install(Zipaper, config)
            return app
        },
        component(name, option) { // 定义组件
            Zipaper.prototype.__components[name] = option
            return app
        },
        directive(name, option) { // 定义指令
            Zipaper.prototype.__directives[name] = option
            return app
        }
    }

    app

        // 组册指令
        .directive("on", zOn)
        .directive("bind", zBind)
        .directive("model", zModel)
        .directive("show", zShow)

    return app
} 