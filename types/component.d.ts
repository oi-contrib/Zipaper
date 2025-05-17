/**
 * 组件定义配置
 */
export interface ComponentOptionType {

    /**
     * 组件实例创建好后执行
     */
    created?: Function

    /**
     * 模版对象
     */
    template?: any

    /**
    * 定义的方法
    */
    methods?: {
        [key: string]: Function
    }

    /**
    * 数据生成函数
    */
    data?: () => {
        [key: string]: any
    }

    /**
     * 样式
     */
    style?: {

        /**
         * 样式值
         */
        content?: string
    }

    /**
    * 定义的事件
    */
    emits?: Array<string>

    /**
     * 定义的属性
     */
    props?: {

        /**
         * 类型，比如Boolean、String等
         */
        type?: any

        /**
         * 是否必输
         */
        required?: boolean

        /**
         * 默认值
         */
        default?: any
    }

}

/**
 * 组件对象配置
 */
export interface ComponentType {

    /**
    * 生命周期
    */
    lifecycle: {

        /**
         * 创建完成触发
         */
        created?: () => void
    }

    /**
     * 记录属性
     */
    attr: {

        /**
         * 记录是否已经挂载了
         */
        hadMounted: boolean
    }

    /**
     * 定义的方法
     */
    methods: {
        [key: string]: Function
    }

    /**
     * 定义的事件
     */
    emits: Array<string>

    /**
     * 定义的属性
     */
    props: {

        /**
         * 是否合法
         */
        isValid: (value: any) => boolean

        /**
         * 默认值
         */
        default: any

        /**
         * 是否必输
         */
        required: boolean

    }

    /**
     * 数据生成函数
     */
    data: () => {
        [key: string]: any
    }

    /**
     * Render函数
     */
    render: Function

    /**
     * 样式
     */
    style: string
}