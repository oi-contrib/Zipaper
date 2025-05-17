/**
 * 指令勾子的第二个参数
 */
interface BindingType {

    /**
     * 静态值
     * 比如z-on:click.stop，此时type就是 click.stop
     */
    type: string

    /**
     * 指令所在的组件或页面对象
     */
    target: any

    /**
     * 值解析后的结果
     */
    value: any

    /**
     * 值解析前的原始字符串
     */
    exp: string
}

/**
 * 指令定义配置
 */
export interface DirectiveOptionType {
    /**
     * 创建完成触发
     */
    created?: (el: HTMLElement, binding: BindingType) => void

    /**
     * 每次数据更新后触发
     */
    update?: (el: HTMLElement, binding: BindingType) => void
}

/**
 * 指令对象配置
 */
export interface DirectiveType {

    /**
     * 生命周期
     */
    lifecycle: {

        /**
         * 创建完成触发
         */
        created?: (el: HTMLElement, binding: BindingType) => void

        /**
         * 每次数据更新后触发
         */
        update?: (el: HTMLElement, binding: BindingType) => void
    }

}