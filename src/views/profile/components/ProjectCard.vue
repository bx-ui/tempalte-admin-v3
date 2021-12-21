<template>
  <div>
    <div class="header-avatar-container">
      <pan-thumb :image="$store.getters.userInfo.avatar" width="80px" height="80px">
        <div>Hello</div>
        {{ $store.getters.userInfo.title }}
      </pan-thumb>
      <div class="header-avatar-content">
        <span class="content-name">{{ $store.getters.userInfo.username }}</span>
        <span class="content-role">{{ $store.getters.userInfo.title }}</span>
      </div>
    </div>
    <div class="project-desc-container">
      <div class="project-desc-header">
        <span>{{ $t('msg.profile.projectIntroduction') }}</span>
      </div>
      <div class="project-desc-content">
        {{ $t('msg.profile.muted') }}
      </div>
    </div>
    <div class="project-major-container">
      <div class="project-major-header">
        <span>{{ $t('msg.profile.projectFunction') }}</span>
      </div>
      <div class="project-major-content">
        <div class="project-major-item" v-for="item in feature" :key="item.id">
          <div class="title">{{ item.title }}</div>
          <el-progress :percentage="item.percentage" status="success"></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import PanThumb from '@/components/PanThumb/index.vue'

defineProps({
  feature: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.header-avatar-container {
  text-align: center;
  .header-avatar-content {
    text-align: center;
    margin-top: 6px;
    .content-name {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
    }
    span {
      display: block;
    }
  }
}
.project-desc-container {
  margin-top: 20px;
  .project-desc-header {
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
    font-size: 16px;
    line-height: 40px;
    font-weight: 600;
  }
  .project-desc-content {
    margin-top: 8px;
    line-height: 22px;
    font-size: 14px;
  }
}
.project-major-container {
  margin-top: 20px;
  .project-major-header {
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
    font-size: 16px;
    line-height: 40px;
    font-weight: 600;
  }
  .project-major-content {
    .project-major-item {
      margin-top: 12px;
      .title {
        margin-bottom: 6px;
      }
    }
  }
}
</style>
