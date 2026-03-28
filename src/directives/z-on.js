import defineDirective from "../defineDirective.js"
import evalExpress from "../tools/evalExpress.js"

export default defineDirective({
    created(el, binding) {
        let types = binding.type.split(".")

        let modifier = {

            // 阻止默认事件
            "prevent": false,

            // 阻止冒泡
            "stop": false,

            // 只执行一次
            "once": false,

            // 回车
            "enter": false
        }
        for (let i = 1; i < types.length; i++) {
            modifier[types[i]] = true
        }

        let callback = function (event) {
            if (modifier.enter) {
                let keycode = event.keyCode || event.which
                if (keycode != 13) return
            }

            if (modifier.stop) event.stopPropagation()
            if (modifier.prevent) event.preventDefault()

            if (binding.value) {
                binding.value.apply(binding.target, [event, el])
            } else {
                let exp = binding.exp.trim()

                let fun = exp.match(/^[^(]+/)[0]
                let args = exp.replace(new RegExp("^" + fun.replace(/\$/g, "\\$") + "\\("), "[").replace(/\)$/, "]")

                let funValue = evalExpress(binding.target, fun)
                let argsValue = evalExpress(binding.target, args, {
                    $event: event,
                    $target: el
                })

                funValue.apply(binding.target, argsValue)
            }

            if (modifier.once) {
                el.removeEventListener(types[0], callback, false)
            }
        }

        el.addEventListener(types[0], callback, false)
    }
})