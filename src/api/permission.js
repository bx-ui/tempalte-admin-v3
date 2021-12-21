import request from '@/utils/request'

export const permissionList = () => {
  return request({
    url: '/permission/list'
  })
}
