import createApp from "./createApp.js"
import defineElement from "./defineElement.js"
import defineDirective from "./defineDirective.js"
import defineRouter from "./defineRouter.js"
import { ref, reactive, watcher } from "./observe-data.js"

let watcherFun = function (target, key, callback) {
    watcher(target, key, target[key], callback)
}

export {
    createApp, // 创建应用
    defineElement, // 定义元素
    defineDirective, // 定义指令
    defineRouter, // 定义路由
    ref, // 定义浅层监听
    reactive, // 定义深层监听
    watcherFun as watcher  // 浅层监听器
}