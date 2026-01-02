import { defineDirective } from "../../src/index.js"

export default defineDirective({
    created(el, binding) {
        // console.log("created", el, binding)
        el.addEventListener("input", function () {
            let maxlen = parseInt(binding.type)
            if (el.value.length > maxlen) {
                el.style.outline = "2px solid red"
            } else {
                el.style.outline = "none"
            }
        })
    }
})