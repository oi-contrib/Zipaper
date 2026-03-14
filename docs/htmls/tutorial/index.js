export default {
    template: "index.html",
    data() {
        return {
            menuList: [{
                label: "项目初始化",
                page: "initProject"
            }, {
                label: "如何配置路由？",
                page: "router"
            }, {
                label: "页面（或组件）相关",
                children: [{
                    label: "如何快速获取页面结点",
                    page: "el_ref"
                }, {
                    label: "插槽的定义和使用",
                    page: "slot"
                }]
            }, {
                label: "组件相关",
                children: [{
                    label: "父子之间数据传递",
                    page: "prop_emit"
                }]
            }]
        }
    },
    style: {
        content: "index.scss",
    }
}