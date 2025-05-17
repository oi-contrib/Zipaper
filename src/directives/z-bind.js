import defineDirective from "../defineDirective.js"
import { updateValue } from "../xhtml.js"

let doit = function (el, binding) {

    // 如果有type表示给属性赋值
    if (typeof binding.type === "string" && binding.type.length > 0) {
        if (el.getAttribute(binding.type) != binding.value) {
            el.setAttribute(binding.type, binding.value)
        }
    }

    // 否则是设置内容或值
    else {
        updateValue(el, binding.value)
    }

}

export default defineDirective({
    created: doit,
    update: doit
})