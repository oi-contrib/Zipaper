import urlFormat from "../../services/urlFormat.js"

export default {
    template: "index.html",
    props: {
        name: {
            type: String,
            required: true
        },
        value: {
            required: true
        }
    },
    data() {
        return {

            // 当前激活的页面
            currentPage: urlFormat().router.replace(new RegExp("^/" + this._props.name + "/"), "")
        }
    },
    methods: {
        createMenu(el, menus) {
            let ulEl = document.createElement("ul"), _this = this
            for (let menu of menus) {
                let liEl = document.createElement("li")

                liEl.setAttribute("is-open", "no")

                let spanEl = document.createElement("span")
                spanEl.innerText = menu.label
                liEl.appendChild(spanEl)

                if (menu.children && menu.children.length > 0) {
                    this.createMenu(liEl, menu.children)

                    // 折叠/关闭菜单
                    spanEl.addEventListener("click", function () {

                        if (liEl.getAttribute("is-open") === "no") {
                            liEl.setAttribute("is-open", "yes")
                        } else {
                            liEl.setAttribute("is-open", "no")
                        }

                    })

                } else {

                    // 自动打开折叠
                    if (_this.currentPage === menu.page) {

                        setTimeout(() => {
                            let isOpenEl = spanEl
                            while (isOpenEl) {
                                if (isOpenEl.getAttribute('is-open')) {
                                    isOpenEl.setAttribute('is-open', 'yes')
                                }
                                isOpenEl = isOpenEl.parentElement
                            }
                        }, 200)

                    }

                    // 打开页面
                    spanEl.addEventListener("click", function () {
                        _this.$goto("/" + _this._props.name + "/" + menu.page)
                        _this.currentPage = menu.page
                    })
                }

                ulEl.appendChild(liEl)
            }
            el.appendChild(ulEl)
        }
    },
    created() {
        this.createMenu(this._ref.content, this._props.value)
    },
    style: {
        content: "index.scss",
    }
}