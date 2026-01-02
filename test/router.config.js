import { defineRouter } from "../src/index.js"

export default defineRouter({
    routers: [{
        path: "/",
        redirect: "/basic"
    }, {
        path: "/basic",
        component: () => import("./pages/basic/index.js"),
        meta: {
            title: "测试用例 - Zipaper 基本功能"
        }
    }, {
        path: "/directive",
        component: () => import("./pages/directive/index.js"),
        meta: {
            title: "测试用例 - Zipaper 内置指令"
        }
    }, {
        path: "/defineDirective",
        component: () => import("./pages/defineDirective/index.js"),
        meta: {
            title: "测试用例 - Zipaper 自定义指令"
        }
    }, {
        path: "/defineElement",
        component: () => import("./pages/defineElement/index.js"),
        meta: {
            title: "测试用例 - Zipaper 自定义组件"
        }
    }]
})