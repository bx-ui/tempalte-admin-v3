// 导入所有svg图标
// 完成SvgIcon全局注册
import SvgIcon from '@/components/SvgIcon/index.vue'
// https://webpack.docschina.org/guides/dependency-management/#requirecontext
// require.context() 接收三个对应的参数
// 一个要搜索的目录，一个标记是否还要搜索其子目录，以及一个匹配文件的正则表达式
const svgRequire = require.context('./svg', false, /\.svg$/)
// 此时返回了一个Require函数，这个函数可以接受一个request的参数，用于require的导入
// 该函数提供三个属性，可以通过svgRequire.keys() 获得所有的svg图标
// 遍历图标，把图标作为require参数传入到 svgReqire 函数中，完成本地svg图标的导入
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

// SvgIcon的全局注册
// Vue.component(xxx) -- vue2，但是在vue3中没有了vue这个实例方法，想要完成注册就要换一种方式
export default app => {
  app.component('svg-icon', SvgIcon)
}
