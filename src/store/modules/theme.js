import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
import variables from '@/styles/variables.scss'

export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables
  }),
  mutations: {
    // 设置主题色
    setMainColor(state, newColor) {
      // 保存到storage中
      setItem(MAIN_COLOR, newColor)
      // 改变一下variables值，触发getters更新
      state.variables.menuBg = newColor
      // 保存到store
      state.mainColor = newColor
    }
  },
  actions: {}
}
