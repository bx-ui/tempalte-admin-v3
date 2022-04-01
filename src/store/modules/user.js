import { login, userInfo, loadMenus } from '@/api/sys'
// import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN, TOKEN_VALUE } from '@/constant/index'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken: (state, token) => {
      state.token = token
      // 保存到localStorage
      setItem(TOKEN, token)
    },
    setUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    login(context, userInfo) {
      const { username, password, captchaCode } = userInfo
      return new Promise((resolve, reject) => {
        // 使用md5 md5(password)
        login({
          username,
          password,
          captchaCode
        })
          .then(_ => {
            // 金山的实际逻辑是httponly, 并且登录不会返回token
            // 所以在这里我们模拟token
            this.commit('user/setToken', TOKEN_VALUE)
            // 缓存时间戳
            setTimeStamp()
            // 跳转页面
            router.push({ path: '/' })
            resolve(TOKEN_VALUE)
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    /**
     * 获取用户信息
     */
    async getUserInfo(context) {
      const res = await userInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    /**
     * 获取菜单列表
     */
    async loadMenus(context) {
      const { result } = await loadMenus()
      // return result
      // 对result数组进行一次便利, 拿到它的componentName组成的数组
      const menus = result.map(item => {
        return item.componentName ? item.componentName : null
      })
      console.log(menus)
      return menus
    },
    /**
     * 退出登录
     */
    logout(context) {
      // 重置路由表
      resetRouter()
      // 清除用户 / 权限的一切东西
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      // 清空tagViews数组
      this.commit('app/removeTagsView', { type: 'all' })
      removeAllItem()
      router.push({ path: '/login' })
    }
  }
}
