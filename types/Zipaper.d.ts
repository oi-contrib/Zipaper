export default interface ZipaperType {

    /**
     * 父对象
     */
    __parent?: ZipaperType

    /**
     * 子对象
     */
    __children: Array<ZipaperType>

    /**
     * 
     */
    __router?: {

        /**
         * 挂载位置
         */
        el: HTMLElement

        /**
         * 路由值 
         */
        router: string

        /**
         * 实例对象
         */
        instance: ZipaperType
    }

    /**
     * 路由跳转
     * @param router 需要跳转的路由
     */
    $goto: (router: string) => void

    /**
     * 自定义的数据和方法等
     */
    [key: string]: any

}