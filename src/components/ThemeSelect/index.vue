<template>
  <el-dropdown
  v-bind="$attrs"
  trigger="click"
  class="theme"
  @command="handleSetTheme"
  >
    <div>
       <svg-icon icon="change-theme" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>{{ $t('msg.theme.themeColorChange') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div>
    <select-color v-model="selectColorVisible" />
  </div>
</template>

<script setup>
import SelectColor from './components/SelectColor.vue'
import { ref } from 'vue'

const selectColorVisible = ref(false)
const handleSetTheme = theme => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped>

</style>
