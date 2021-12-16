import request from '@/utils/request'
/**
 * 登录
 */
export const login = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
*/
export const userInfo = () => {
  return request({
    url: '/sys/profile',
    method: 'GET' // 可以不写，默认是get请求
  })
}
