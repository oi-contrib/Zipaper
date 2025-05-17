const { parseTemplate } = require("xhtml-to-json");

module.exports = {
    devServer: {
        port: 20000
    },
    module: {
        rules: [{
            test: /\.html$/,
            use(source) {
                let context = this;

                if (context.entry || /^docs/.test(context.path)) return source;
                else {
                    context.setFileType("application/javascript");
                    return `export default ${JSON.stringify(parseTemplate(source).toJson())}`;
                }
            }
        }, {
            test: /\.css$/,
            use(source) {
                let context = this;

                if (context.entry || /^docs/.test(context.path)) return source;
                else {
                    context.setFileType("application/javascript");
                    return `export default ${JSON.stringify(source)}`;
                }
            }
        }]
    }
};