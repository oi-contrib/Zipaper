/**
 * 公共资源路径加载配置
 */
(function () {
    let cssFiles = [
        'styles/normalize.css', // 兼容样式
        'styles/common.css', // 公共样式
    ];
    let jsFiles = [

        /* 配置文件 */
        'libs/config.js', // 项目配置文件
    ];

    if (window.needCache) { // 在线的使用CDN加速
        jsFiles.unshift("https://cdn.jsdelivr.net/npm/xhtml-to-json@" + window.installVersion['xhtml-to-json'])
        jsFiles.unshift("https://cdn.jsdelivr.net/npm/zipaper@" + window.installVersion.zipaper)
    }

    else { // 本地的使用node_modules方便调试
        jsFiles.unshift("../node_modules/xhtml-to-json/dist/xhtmlToJson.js")
        jsFiles.unshift("../dist/Zipaper.js")
    }

    if (typeof (exports) != "undefined") {
        exports.jsFiles = jsFiles;
        exports.cssFiles = cssFiles;
    } else {
        for (let i = 0; i < cssFiles.length; i++) {
            loadCss(cssFiles[i]);
        }
        for (let i = 0; i < jsFiles.length; i++) {
            loadJs(jsFiles[i]);
        }
    }

    function loadJs(path) {
        let scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.src = path + "?_=" + new Date().valueOf();
        document.write(outerHTML(scriptTag));
    }

    function outerHTML(node) {
        return (
            node.outerHTML ||
            (function (n) {
                let div = document.createElement('div'),
                    h;
                div.appendChild(n);
                h = div.innerHTML;
                div = null;
                return h;
            })(node)
        );
    }

    function loadCss(path) {
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = path + "?_=" + new Date().valueOf();
        document.getElementsByTagName('head')[0].appendChild(cssLink);
    }
})();