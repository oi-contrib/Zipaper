import defineDirective from "../defineDirective.js"

export default defineDirective({
    created(el, binding) {
        el.style.display = binding.value ? "" : "none"
    },
    update: function (el, binding) {
        el.style.display = binding.value ? "" : "none"
    }
})