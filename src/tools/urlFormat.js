// 浏览器地址格式化
export default function () {

    let splitTemp = window.location.href.split('?')
    let routerTemp = (splitTemp[0] + "#").split("#")[1]
    let paramTemp = splitTemp[1] || ""

    let paramResult, paramArray
    if (paramTemp == "") {
        paramResult = {}
    } else {
        paramArray = paramTemp.split("&"), paramResult = {}
        paramArray.forEach(function (item) {
            let temp = item.split("=")
            paramResult[temp[0]] = temp[1]
        })
    }

    let resultData = {
        router: routerTemp ? routerTemp : "/",
        params: paramResult
    }

    return resultData
}