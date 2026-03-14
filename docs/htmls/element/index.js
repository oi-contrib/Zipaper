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
            }]
        }
    },
    style: {
        content: "index.scss",
    }
}