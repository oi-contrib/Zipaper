const pluginNodeResolve = require("@rollup/plugin-node-resolve")
const pluginBabel = require("@rollup/plugin-babel")

const pkg = require("./package.json")

module.exports = {
    input: "./src/index.js",
    output: {
        name: 'Zipaper',
        file: "./dist/Zipaper.js",
        format: "umd",
        banner: `/*!
 * Zipaper v${pkg.version}
 * git+https://github.com/oi-contrib/Zipaper.git
 */`
    },
    plugins: [
        pluginNodeResolve(),
        pluginBabel({
            exclude: 'node_modules/**', // 排除 node_modules 目录
            babelHelpers: 'bundled' // 使用 Rollup 的 tree-shaking 功能
        })
    ]
}
