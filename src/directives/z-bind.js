import defineDirective from "../defineDirective.js"
import { updateValue } from "../tools/xhtml.js"

let doit = function (el, binding) {

    // 如果有type表示给属性赋值
    if (typeof binding.type === "string" && binding.type.length > 0) {

        // 安全防护：禁止通过 z-bind 设置 on* 开头的事件属性
        // 原因：setAttribute('onclick', code) 会注册事件处理函数，导致 XSS
        // 事件绑定请使用 z-on 指令
        if (/^on/i.test(binding.type)) {
            throw new Error("z-bind does not support event handler attributes (on*), please use z-on instead: z-bind:" + binding.type)
        }

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