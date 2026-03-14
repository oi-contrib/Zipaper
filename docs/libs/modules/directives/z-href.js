let doit = function (el, binding) {

    if (binding.value == binding.target[binding.type]) {
        el.classList.add('active')
    } else {
        el.classList.remove('active')
    }

}

export default {
    created(el, binding) {
        el.addEventListener("click", () => {
            this.$goto(binding.value)
            binding.target[binding.type] = binding.value

        })
        doit(el, binding)
    },
    update: doit
}