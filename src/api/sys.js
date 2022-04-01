import request from '@/utils/request'
/**
 * 登录
 */
export const login = data => {
  return request({
    url: '/auth-server/api/userLogin',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息 data-platform
*/
export const userInfo = () => {
  return request({
    url: '/auth-server/api/authenticate',
    method: 'GET' // 可以不写，默认是get请求
  })
}

/**
 * 获取验证码
 */
export const getCode = () => {
  return request({
    url: '/auth-server/api/loginCaptcha',
    responseType: 'arraybuffer'
  })
}

/**
 * 获取菜单权限
 */
export const loadMenus = () => {
  return request({
    url: '/user-server/api/menus/data-home?serverCode=data-platform'
  })
}
