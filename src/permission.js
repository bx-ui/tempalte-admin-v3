import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 用户已登录，不允许进入login
  // 用户未登录，不允许进入其他页面
  if (store.getters.token) {
    // 用户已登录
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action，并获取用户当前权限
        await store.dispatch('user/getUserInfo')
        // 获取用户路由权限
        const menus = await store.dispatch('user/loadMenus')
        // 处理用户权限，筛选出需要添加的权限
        const filterRouter = await store.dispatch('permission/filterRoutes', menus)
        // 利用 addRoute 循环添加
        filterRouter.forEach(item => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    // 用户未登录
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
