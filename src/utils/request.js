import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: '/', // process.env.VUE_APP_BASE_API
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
  // 在这个地方需要统一的去注入token
    if (store.getters.token) {
      // 如果存在token就注入token
      if (isCheckTimeout()) {
        // 登出操作
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 过期'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 配置接口国际化
    config.headers['Accept-Language'] = store.getters.language
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
    // const { success, data, message } = response.data
    // if (success) {
    //   return data
    // } else {
    //   ElMessage.error(message)
    //   return Promise.reject(new Error(message))
    // }
  },
  error => {
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
