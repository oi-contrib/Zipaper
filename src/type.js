// 判断一个值是不是Object
export function isObject(value) {
    let type = typeof value
    return value != null && (type === 'object' || type === 'function')
}