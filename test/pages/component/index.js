import { defineElement, ref } from "../../../src/index.js"
import template from "./index.html"
import style from "./index.css"

import is1Value from "./is1/index.js"

export default defineElement({
    template,
    data() {
        return {
            compMap: {
                is1: is1Value,
                // is1: () => import("./is1/index.js"),
                is2: () => import("./is2/index.js")
            },
            compIndex: ref("is1")
        }
    },
    methods: {
        setIndex(index) {
            this.compIndex = index
        }
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