<template>
  <div class="">
    {{ $t('msg.test') }}
     <el-pagination
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    />
    <el-row>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
  </div>
</template>

<script setup>
import {} from 'vue'
import { generateNewStyle } from '@/utils/theme'

generateNewStyle('#f0f0f0')
</script>

<style lang="scss" scoped></style>
