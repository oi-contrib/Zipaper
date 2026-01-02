import { defineElement } from "../../../src/index.js"
import template from "./index.html"
import style from "./index.css"

export default defineElement({
    template,
    style: {
        content: style
    },
    created() {
        document.title = this._router.meta.title
        console.log("basic page created")
    },
    beforeDestroy() {
        console.log("basic page beforeDestroy")
    },
    methods: {
    }
})