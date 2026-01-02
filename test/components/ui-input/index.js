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
            modelValue: ref(this._props.value)
        }
    },
    style: {
        content: style
    },
    methods: {
        doInput(event, target) {
            this.$emit("input", target.value)
        }
    },
    created() {
        watcher(this._props, "value", () => {
            this.modelValue = this._props.value
        })
    }
})