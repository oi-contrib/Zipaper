import { defineElement, ref } from "../../../src/index.js"
import template from "./index.html"
import style from "./index.css"

export default defineElement({
    template,
    data() {
        return {
            inputValue: ref("")
        }
    },
    methods:{
       
    },
    style: {
        content: style
    },
    created() {
        document.title = this._router.meta.title
    },
    beforeDestroy() {

    }
})