<template>
  <!-- 展示外部图标 -->
  <div
  v-if="isExternal"
  :style="styleExternalIcon"
  class="svg-external-icon svg-icon"
  :class="className"
  ></div>
 <svg v-else :class="className" aria-hidden="true" class="svg-icon">
   <use :xlink:href="iconName"></use>
 </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { isExternal as external } from '@/utils/validates'
// 接收props
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})

// 定义计算属性

// 判断是否为外部资源
const isExternal = computed(() => external(props.icon))

// 外部图标样式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

// 处理内部图标
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.svg-external-icon {
    background: currentColor;
    mask-size: cover !important;
    display: inlink-block;
}
</style>
