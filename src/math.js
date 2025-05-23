
// 随机生成一个唯一标识
export let uniqueId = () => new Date().valueOf() + "" + (Math.random() * 1000).toFixed(0)