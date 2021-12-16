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
        await store.dispatch('user/getUserInfo')
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
