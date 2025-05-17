import { setValue } from "eval-express"
import defineDirective from "../defineDirective.js"
import { updateValue } from "../xhtml.js"

export default defineDirective({
    created(el, binding) {
        updateValue(el, binding.value)
        el.addEventListener('input', function () {
            setValue(binding.target, "." + binding.exp, el.value)
        }, false);
    },
    update: function (el, binding) {
        updateValue(el, binding.value)
    }
})