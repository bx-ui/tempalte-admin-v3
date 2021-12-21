import request from '@/utils/request'

/**
 * 功能列表
 */
export const feature = () => {
  return request({
    url: '/user/feature'
  })
}
