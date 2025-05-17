import { defineRouter } from "../src/index.js"

export default defineRouter({
    routers: [{
        path: "/",
        redirect: "/page1"
    }, {
        path: "/page1",
        component: () => import("./pages/page1/index.js"),
    }, {
        path: "/page2",
        component: () => import("./pages/page2/index.js"),
    }]
})