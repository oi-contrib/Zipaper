import { defineDirective } from "../../src/index.js"

export default defineDirective({
    created(el) {
        el.setAttribute("readonly", "")
        el.value = "使用了 v-readonly 指令";
    }
})