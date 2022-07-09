// 简化本地存储 获取 设置 全部删除

/**
 * 获取
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}
/**
 *设置
 * @param {*} key
 * @param {*} value
 */
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
/**
 *根据key单独删除
 * @param {*} key
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

/**
 *删除所有的本地存储
 */
export function clearItem () {
  window.localStorage.clearItem()
}
