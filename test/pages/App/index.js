import { defineElement, ref, reactive } from "../../../src/index.js"
import template from "./index.html"
import style from "./index.css"

export default defineElement({
    template,
    data() {
        return {
            
        }
    },
    created() {
        console.log("App created")
        console.log(this)
    },
    methods: {
        goto(event, el) {
            this.$goto(el.getAttribute("tag"))
        }
    },
    style: {
        content: style
    }
})