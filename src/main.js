import { createApp } from 'vue'

// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from '@/i18n'

import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import installFilter from '@/filters'
import installDirectives from '@/directives'

// 初始化样式表
import '@/styles/index.scss'

// 路由鉴权
import './permission'

// SvgIcon
import installIcons from '@/icons'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirectives(app)
app
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
