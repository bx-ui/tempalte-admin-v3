<template>
  <div>
    <svg-icon icon="guide" @click="onClick" id="guide-start" />
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from './step'
import { watchSwitchLang } from '@/utils/i18n'

const i18n = useI18n()

// eslint-disable-next-line no-unused-vars
let driver = null

const createDriver = () => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
}

onMounted(() => {
  createDriver()
})

watchSwitchLang(() => {
  createDriver()
})

const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>

<style lang="scss" scoped>

</style>
