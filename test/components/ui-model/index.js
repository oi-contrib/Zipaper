import { defineElement, watcher, ref } from "../../../src/index.js"
import template from "./index.html"
import style from "./index.css"

export default defineElement({
    template,
    emits: ["input"],
    props: {
        value: {
            default: ""
        }
    },
    data() {
        return {
            modelValue: ref("")
        }
    },
    style: {
        content: style
    },
    methods: {
        doInput() {
            this.$emit("input", "new model")
        }
    },
    created() {
        watcher(this._props, "value", () => {
            this.modelValue = this._props.value
            // console.log(this._props.value)
        })
    }
})