const { join } = require("path");

if (join(process.cwd(), "./scripts") == __dirname) {
    try {
        let version = {
            zipaper: "",
            "xhtml-to-json": ""
        };

        for (let pkgName in version) {
            let packageTxt = require("fs").readFileSync(pkgName === "zipaper" ? "./package.json" : "./node_modules/" + pkgName + "/package.json", {
                encoding: "utf8"
            });
            version[pkgName] = JSON.parse(packageTxt).version;
        }

        require("fs").writeFileSync("./docs/libs/version.js", "window.installVersion=" + JSON.stringify(version, null, 2));
    } catch (e) { }
}