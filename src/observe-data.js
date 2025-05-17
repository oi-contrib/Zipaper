import { isObject } from "./type.js"

// 定义this的一个数据为ref
export function ref(data) {
    return {
        value: data,
        type: 'ref'
    }
}

// 定义this的一个数据为reactive
export function reactive(data) {

    // 如果是对象
    if (isObject(data)) {
        return {
            value: data,
            type: 'reactive'
        }
    }

    // 否则，还是用ref
    else {
        return ref(data)
    }
}

export function proxy(instance, key, value, doback) {
    instance[key] = new Proxy(value, {
        get(_target, _key) {
            return _target[_key]
        },
        set(_target, _key, _value) {
            let flag = Reflect.set(_target, _key, _value)
            doback()
            return flag
        }
    })
}

export function watcher(instance, key, value, doback) {
    var _value = value
    var handler = {
        get() {
            return _value
        }, set(newValue) {
            _value = newValue
            doback()
        }
    }

    instance[key] = _value
    Object.defineProperty(instance, key, handler)
}