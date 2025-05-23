import { defineElement } from "../../../src/index.js"
import template from "./index.html"
import style from "./index.css"

export default defineElement({
    template,
    style: {
        content: style
    },
    created() {
        console.log("page2 created")

        document.title = this._router.meta.title
    },
    beforeDestroy() {
        console.log("page2 beforeDestroy")
    }
})