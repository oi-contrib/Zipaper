import { defineElement, ref, reactive } from "../../../src/index.js"
import template from "./index.html"
import style from "./index.css"

export default defineElement({
    template,
    data() {
        return {
            title: "PDF转图片",
            val1: ref("默认值"),
            val3: ref(""),
            uimodelkey: ref("")
        }
    },
    created() {
        console.log(this)
        console.log("App created")
    },
    methods: {
        setUiModelkey(event, el) {
            // console.log(">>> set ui-model",event, el)
            this.uimodelkey = event.data;
        },
        goto(event, el) {
            // this.$goto("/")
            this.$goto(el.getAttribute("tag"))
        },
        doChange(event, el) {
            // console.log("ui-select-file", event, el)
            console.log(event.data)
        },
        setVal1() {
            // console.log(this.val1)
            // this.val1="新值1"
            // this.val1="新值2"
            this.val1 = new Date().valueOf()
        }
    },
    style: {
        content: style
    }
})