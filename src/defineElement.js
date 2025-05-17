export default function defineElement(option) {
    let render = option.template ? h => {
        return (function defineElementFactory(elems) {
            let temp = []
            for (let i = 0; i < elems.length; i++) {
                let elem = elems[i]

                // 文本节点
                if (typeof elems[i] === "string") {
                    temp.push(elem.trim())
                }

                // 元素节点
                else {

                    let attr = {}
                    let direcitve = {}

                    for (let attrKey in elem.attr) {
                        if (/^z-/.test(attrKey)) {
                            direcitve[attrKey] = elem.attr[attrKey]
                        } else {
                            attr[attrKey] = elem.attr[attrKey]
                        }
                    }

                    temp.push(h(elem.name, {
                        attr: attr, // 原生属性
                        direcitve, // 指令
                    }, defineElementFactory(elem.children)))
                }
            }
            return temp
        })(option.template)
    } : null

    let props = {}
    if (option.props) {
        for (let key in option.props) {
            if (option.props.hasOwnProperty(key)) {
                props[key] = {

                    // 用于判断类型是否合法的方法
                    isValid(value) {
                        if (option.props[key].type) {

                            // 先不考虑联合类型
                            return value.constructor === option.props[key].type
                        }
                        return true
                    },

                    // 默认值
                    default: option.props[key].default ?? undefined,

                    // 是否必输
                    required: option.props[key].required || false
                }
            }
        }
    }

    return {
        attr: {
            hadMounted: false, // 记录是否已经挂载了（部分资源，比如style，挂载一次就可以了）
        },
        methods: option.methods || {},
        emits: option.emits || [],
        props,
        data: option.data || function () { return {} },
        render,
        style: option.style?.content || "",
        lifecycle: {
            created: option.created
        }
    }
}