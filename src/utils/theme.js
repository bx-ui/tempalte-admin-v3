
/**
 * elementui主题色替换
 * 在之前我们分析主题变更的实现原理时，我们说过，核心的原理是：**通过修改 `scss` 变量 ** 的形式修改主题色完成主题变更

    但是对于 `element-plus` 而言，我们怎么去修改这样的主题色呢？

    其实整体的原理非常简单，分为三步：

    1. 获取当前 `element-plus` 的所有样式
    2. 找到我们想要替换的样式部分，通过正则完成替换
    3. 把替换后的样式写入到 `style` 标签中，利用样式优先级的特性，替代固有样式
 */

import formula from '@/constant/formula.json'
import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import axios from 'axios'

/**
 * 写入新样式到 style
 * @param {*} elNewStyle  element-plus 的新样式
 * @param {*} isNewStyleTag 是否生成新的 style 标签
 */
export const writeNewStyle = elNewStyle => {
  const style = document.createElement('style')
  style.innerText = elNewStyle
  document.head.appendChild(style)
}

/**
 * 根据主色值，生成最新的样式表
 */
export const generateNewStyle = async primaryColor => {
  // 根据主色值生成色值表
  const colors = generateColors(primaryColor)
  // 获取当前 element-plus 的默认样式表, 并且把需要替换的打上标记
  let cssText = await getOriginalStyle()
  // 遍历生成的样式表，在 CSS 的原样式中进行全局替换
  Object.keys(colors).forEach(key => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })

  return cssText
}

export const generateColors = (primary) => {
  if (!primary) return
  const colors = {
    primary
  }

  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = '#' + rgbHex(color.convert(value))
  })

  return colors
}

const getOriginalStyle = async () => {
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  // 把需要替换的颜色值打一个标签
  return getStyleTemplate(data)
}

const getStyleTemplate = data => {
  // element-plus 默认色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
