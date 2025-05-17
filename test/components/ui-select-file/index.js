import { defineElement } from "../../../src/index.js"
import template from "./index.html"
import style from "./index.css"

export default defineElement({
    template,
    emits: ["change"],
    props: {
        title: {
            type: String,
            required: true,
        },
        tips: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: false,
            default: "pdf"
        },
    },
    data() {

        // 已经提前准备好了_props等
        // console.log(this)

        return {
            accept: {
                pdf: "application/pdf",
                image: "image/*"
            }[this._props.type]
        }
    },
    methods: {
        doChange(event, el) {
            this.$emit("change", event.target.files)
        }
    },
    style: {
        content: style
    }
})