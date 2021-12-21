<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import {} from 'vue'
import UploadExcel from '@/components/UploadExcel/index.vue'
import { USER_RELATIONS } from './utils'
import { userBatchImport } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()

const onSuccess = async excelData => {
  const updateData = generateData(excelData.results)
  await userBatchImport(updateData)
  ElMessage.success({
    type: 'success',
    message: `${updateData.length}${i18n.t('msg.excel.importSuccess')}`
  })
  router.push('/user/manage')
}

/**
 * 筛选数据
 */
const generateData = results => {
  const arr = []

  results.forEach(item => {
    const userInfo = {}

    Object.keys(item).forEach(key => {
      userInfo[USER_RELATIONS.key] = item[key]
    })

    arr.push(userInfo)
  })

  return arr
}
</script>

<style lang="scss" scoped></style>
