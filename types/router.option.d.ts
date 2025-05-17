import { ComponentType } from "./component"

/**
 * 重定位配置
 */
interface RoutersItem1Type {

    /**
     * 路由
     */
    path: string

    /**
     * 重定位路由
     */
    redirect: string
}

/**
 * 页面路由
 */
interface RoutersItem2Type {

    /**
     * 路由
     */
    path: string

    /**
     * 页面组件生成函数，返回一个Promise
     */
    component: () => Promise<ComponentType>

    /**
     * 子路由
     */
    children: Array<RoutersItem1Type | RoutersItem2Type>
}

/**
 * 路由定义配置
 */
export interface RouterOptionType {

    /**
     * 路由跳转配置
     */
    routers: Array<RoutersItem1Type | RoutersItem2Type>
}