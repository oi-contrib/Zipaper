import { AppType, PluginType } from "./app"
import { RouterOptionType } from "./router.option"
import { ComponentOptionType, ComponentType } from "./component"
import { DirectiveOptionType, DirectiveType } from "./directive"

/**
 * 创建应用
 */
export let createApp: (App: ComponentType) => AppType

/**
 * 定义元素
 */
export let defineElement: (option: ComponentOptionType) => ComponentType

/**
 * 定义指令
 */
export let defineDirective: (option: DirectiveOptionType) => DirectiveType

/**
 * 定义路由
 */
export let defineRouter: (option: RouterOptionType) => PluginType

/**
 * 定义浅层监听
 */
export let ref: (value: any) => { value: any, type: "ref" }

/**
 * 定义深层监听
 */
export let reactive: (value: any) => { value: any, type: "reactive" | "ref" }

/**
 * 浅层监听器
 */
export let watcher: (target: Object, key: string, callback: Function) => void