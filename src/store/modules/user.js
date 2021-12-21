import { login, userInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant/index'
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
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(res => {
            this.commit('user/setToken', res.token)
            // 缓存时间戳
            setTimeStamp()
            // 跳转页面
            router.push({ path: '/' })
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    async getUserInfo(context) {
      const res = await userInfo()
      this.commit('user/setUserInfo', res)
      return res
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
