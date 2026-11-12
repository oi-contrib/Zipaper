import defineDirective from "../defineDirective.js"

let doit = function (el, binding) {
    // 设置元素的HTML内容
    if (el.innerHTML !== binding.value) {
        el.innerHTML = binding.value
    }
}

export default defineDirective({
    created: doit,
    update: doit
})