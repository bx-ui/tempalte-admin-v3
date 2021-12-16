import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'
const getters = {
  token: state => state.user.token,
  /**
   * 返回true, 代表有用户信息, false 代表没有用户信息
   */
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: state => state.user.userInfo,
  cssVar: state => ({
    ...state.theme.variables,
    ...generateColors(getItem(MAIN_COLOR))
  }),
  sidebarOpened: state => state.app.sidebarOpened,
  // 国际化
  language: state => state.app.language,
  // 主题色
  mainColor: state => state.theme.mainColor
}

export default getters
