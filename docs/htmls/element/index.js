export default {
    template: "index.html",
    data() {
        return {
            menuList: [{
                label: "指令",
                children: [{
                    label: "z-bind",
                    page: "z-bind"
                }, {
                    label: "z-on",
                    page: "z-on"
                }, {
                    label: "z-model",
                    page: "z-model"
                }, {
                    label: "z-show",
                    page: "z-show"
                }]
            }, {
                label: "组件",
                children: [{
                    label: "component",
                    page: "component"
                }]
            }]
        }
    },
    style: {
        content: "index.scss",
    }
}