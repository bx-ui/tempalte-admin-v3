import path from 'path'
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由: 某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 */
export const filterRouters = routes => {
  // 获取所有子集路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根据子集路由进行查重操作
  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数值是否为空值
 */
const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 根据routes(已经过滤好的数组),返回对应的menu规则数组
 */
export const generateMenus = (routes, basePath = '') => {
  const result = []
  // 遍历路由表
  routes.forEach(item => {
    // 如果不存在children 也不存在 meta, 直接return
    if (isNull(item.children) && isNull(item.meta)) return
    // 如果存在children 不存在meta， 进入迭代
    if (!isNull(item.children) && isNull(item.meta)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 如果不存在children，存在meta ｜｜ 存在children，存在meta
    // 合并path作为跳转路径
    // 注意这块的一个理解点，不理解去断点调试一下，或者看下地下的例子输出看一下
    const routePath = path.resolve(basePath, item.path)
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 和 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta存在生成route对象，放入数组
        result.push(route)
      }
    }

    // 存在children 进入迭代
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}

export const test = () => {
  return path.resolve('/user', '/manage')
}
