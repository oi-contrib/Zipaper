import ZipaperType from "./Zipaper"
import { ComponentType } from "./component"
import { DirectiveType } from "./directive"

/**
 * 定义插件
 */
export interface PluginType {

    /**
     * 安装插件方法
     */
    install: (Zipaper: ZipaperType) => void
}

/**
 * App应用
 */
export interface AppType {

    /**
     * 挂载到页面
     * @param el 挂载点
     */
    mount(el: HTMLElement): this

    /**
     * 按照插件
     * @param plugin 
     * @param config 
     */
    use(plugin: PluginType, config?: any): this

    /**
     * 注册组件
     * @param name 组件名称
     * @param option 组件内容
     */
    component(name: string, option: ComponentType): this

    /**
     * 注册指令
     * @param name 指令名称
     * @param option 指令内容
     */
    directive(name: string, option: DirectiveType): this
}