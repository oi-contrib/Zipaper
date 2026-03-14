import { evalExpress } from "eval-express"

export default function (target, express, scope = {}) {
    try {

        if (/^\[/.test(express)) {

            let expressArray = [], cValue = ""
            let inSingleQuote = false, inDoubleQuote = false
            
            for (let i = 1; i < express.length - 1; i++) {
                const char = express[i]
                
                // 处理字符串引号状态
                if (char === "'" && !inDoubleQuote) {
                    inSingleQuote = !inSingleQuote
                } else if (char === '"' && !inSingleQuote) {
                    inDoubleQuote = !inDoubleQuote
                }
                
                // 只有在非字符串状态下才处理逗号分隔符
                if (char === "," && !inSingleQuote && !inDoubleQuote) {
                    expressArray.push(cValue.trim())
                    cValue = ""
                } else {
                    cValue += char
                }

            }
            if (cValue.trim()) expressArray.push(cValue.trim())

            let values = []
            for (let expressItem of expressArray) {
                values.push(evalExpress(target, expressItem, scope))
            }
            return values

        } else {
            return evalExpress(target, express, scope)
        }
    } catch (e) {
        return void 0
    }
}