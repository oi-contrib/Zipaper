import { createApp } from "../src/index.js"

import App from "./pages/App/index.js"
import router from "./router.config.js"
import uiInput from "./components/ui-input/index.js"
import uiSelectFile from "./components/ui-select-file/index.js"
import zReadonly from "./directives/z-readonly.js"

let app = createApp(App)
    .use(router) // 路由
    .component("ui-input", uiInput) // 注册组件
    .component("ui-select-file", uiSelectFile)
    .directive("readonly", zReadonly) // 注册指令
    .mount(document.getElementById("root")) // 挂载到页面

// console.log(app)