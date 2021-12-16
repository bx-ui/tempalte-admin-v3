<template>
  <!-- element 图标 -->
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <!-- svg图标 -->
  <svg-icon v-else :icon="icon"></svg-icon>
  <!-- 标题 -->
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
import { generateTitle } from '@/utils/i18n'
defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>

</style>
