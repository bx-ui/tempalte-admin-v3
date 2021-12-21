const whiteList = ['/login', '/import', '/404', '/401']

/**
 * path 是否需要被缓存
 * @params {*} path
 * @returns
 */

export const isTags = path => {
  return !whiteList.includes(path)
}
