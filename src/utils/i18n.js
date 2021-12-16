import i18n from '@/i18n'
import store from '@/store'
import { watch } from 'vue'

export const generateTitle = (key) => {
  return i18n.global.t('msg.route.' + key)
}

/**
 * 监听i8n语言的变化重新渲染cb
*/
export const watchSwitchLang = (...cbs) => {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach(cb => cb())
    }
  )
}
