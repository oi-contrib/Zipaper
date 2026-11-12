import defineDirective from "../defineDirective.js"

let doit = function (el, binding) {
    // 设置元素的文本内容
    if (el.textContent !== binding.value) {
        el.textContent = binding.value
    }
}

export default defineDirective({
    created: doit,
    update: doit
})