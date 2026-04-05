import defineElement from '../defineElement.js'
import { watcher } from "../observe-data.js"
import createElement from "../createElement.js"

export default defineElement({
    template: [],
    props: {
        is: {
            required: true
        }
    },
    created() {
        watcher(this._props, "is", this._props.is, () => {
            this.doit()
        })
        this.doit()
    },
    methods: {
        doit() {

            // 懒加载组件
            if (typeof this._props.is === "function") {
                this._props.is().then((res) => {

                    let component = typeof res.default === "object" ? res.default : res

                    createElement(this, this.__el, component)
                })
            }

            // 组件
            else if (typeof this._props.is === "object") {
                createElement(this, this.__el, this._props.is)
            }

            // 非法值
            else {
                this.__el.innerHTML = ""
            }
        }
    }
})