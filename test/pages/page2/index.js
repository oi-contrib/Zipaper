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
    }
})