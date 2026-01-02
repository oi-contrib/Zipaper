import { createApp } from "../src/index.js"

import App from "./pages/App/index.js"
import router from "./router.config.js"
import uiInput from "./components/ui-input/index.js"
import zMaxlen from "./directives/z-maxlen.js"

let app = createApp(App)
    .use(router) // 路由
    .component("ui-input", uiInput) // 注册组件
    .directive("maxlen", zMaxlen) // 注册指令
    .mount(document.getElementById("root")) // 挂载到页面

console.log(app)