import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'

export default {
  namespaced: 'app',
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh'
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      // 保存到localStorage中
      setItem(LANG, lang)
      // 更新store
      state.language = lang
    }
  }
}
