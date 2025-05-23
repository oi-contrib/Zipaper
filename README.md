<img src='https://oi-contrib.github.io/Zipaper/images/logo.png' height='300px'/>

# [Zipaper](https://github.com/oi-contrib/Zipaper)
一个简单易用的小巧前端框架

<p>
    <a href="https://zxl20070701.github.io/toolbox/#/npm-download?packages=zipaper&interval=7">
        <img src="https://img.shields.io/npm/dm/zipaper.svg" alt="downloads">
    </a>
    <a href="https://www.npmjs.com/zipaper/zipaper">
        <img src="https://img.shields.io/npm/v/zipaper.svg" alt="npm">
    </a>
     <a href="https://www.jsdelivr.com/package/npm/zipaper">
        <img src="https://data.jsdelivr.com/v1/package/npm/zipaper/badge" alt="cdn">
    </a>
    <a href="https://github.com/oi-contrib/Zipaper" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/oi-contrib/Zipaper?style=social">
    </a>
    <a href="https://github.com/oi-contrib/Zipaper">
        <img src="https://img.shields.io/github/forks/oi-contrib/Zipaper" alt="forks">
    </a>
</p>

<img src="https://nodei.co/npm/zipaper.png?downloads=true&amp;downloadRank=true&amp;stars=true" alt="NPM">

## 如何使用？

首先，你需要安装必要的依赖：

```
npm install --save zipaper
```

然后，基本的项目结构如下：

```
- components 可选，自定义组件
- directives 可选，自定义指令
- pages 页面（和自定义组件一样）
- main.js 入口
- router.config.js 定义路由
- index.html 
- package.json
```

在入口文件挂载好必要的内容后，启动即可，比如：

```js
import { createApp } from "zipaper"

import App from "./pages/App/index.js"
import router from "./router.config.js"
import uiSelectFile from "./components/ui-select-file/index.js"

createApp(App)
    .use(router) // 路由
    .component("ui-select-file", uiSelectFile) // 注册组件
    .mount(document.getElementById("root")) // 挂载到页面
```

具体页面、组件、指令和路由的定义，你可以访问[ 在线文档 ](https://oi-contrib.github.io/Zipaper)进行了解。

此外，在实际开发中，为了简化开发者的麻烦，一般template部分不会直接手写，可以借助库```xhtml-to-json```来辅助：

```
npm install --save-dev xhtml-to-json
```

然后，使用其把html字符串变成需要的template格式：

```js
const { parseTemplate } = require("xhtml-to-json");

let template = parseTemplate("html字符串").toJson();
```

这里正常是在nodejs环境，比如开发一个webpack的loader。

一个完整的项目搭建用例，你可以访问： [https://github.com/rapid-start/Zipaper-project](https://github.com/rapid-start/Zipaper-project)

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步