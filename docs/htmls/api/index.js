export default {
    template: "index.html",
    data() {
        return {
            menuList: [{
                label: "应用",
                children: [{
                    label: "createApp",
                    page: "createApp"
                }, {
                    label: "app.mount",
                    page: "app.mount"
                }, {
                    label: "app.use",
                    page: "app.use"
                }, {
                    label: "app.component",
                    page: "app.component"
                }, {
                    label: "app.directive",
                    page: "app.directive"
                }]
            }, {
                label: "核心",
                children: [{
                    label: "defineElement",
                    page: "defineElement"
                }, {
                    label: "defineDirective",
                    page: "defineDirective"
                }, {
                    label: "defineRouter",
                    page: "defineRouter"
                }]
            }, {
                label: "通用",
                children: [{
                    label: "watcher",
                    page: "watcher"
                }]
            }]
        }
    },
    style: {
        content: "index.scss",
    }
}