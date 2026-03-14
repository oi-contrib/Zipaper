import { defineElement, ref } from "../../../src/index.js"
import template from "./index.html"
import style from "./index.css"

export default defineElement({
    template,
    data() {
        return {
            inputValue: ref(""),
            isShow: ref(false),
            checkboxValue1: ref(true),
            checkboxValue2: ref([]),
            radioValue: ref("")
        }
    },
    methods: {
        toggleShow() {
            this.isShow = !this.isShow
        },
        enterPress(event, target) {
            // console.log("Key Pressed:", event.key);
            // console.log("Target Element:", target);
            alert(target.value);
        },
        print(target, event, ...params) {
            console.log(target, event, params);
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