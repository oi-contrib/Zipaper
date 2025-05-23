import { defineElement, watcher } from "../../../src/index.js"
import template from "./index.html"
import style from "./index.css"

export default defineElement({
    template,
    props: {
        tip: {
            default: "tip默认值"
        }
    },
    style: {
        content: style
    },
    methods: {
        logTip() {
            console.log(this._props.tip)
        }
    },
    created() {
        console.log("ui-input created")

        watcher(this._props, "tip", () => {
            console.log(this._props.tip)
        })
    }
})