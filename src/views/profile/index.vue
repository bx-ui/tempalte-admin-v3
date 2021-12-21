<template>
  <div class="my-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <template #header>
            <h3>{{ $t('msg.profile.introduce') }}</h3>
          </template>
          <project-card class="user-card" :feature="featureSource" />
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <template #header>
            <el-tabs v-model="activeName">
              <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
                <feature />
              </el-tab-pane>
              <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
                <chapter />
              </el-tab-pane>
              <el-tab-pane :label="$t('msg.profile.author')" name="author">
                <author />
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
import feature from './components/feature.vue'
import chapter from './components/chapter.vue'
import author from './components/author.vue'
import { feature as featureList } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'

const activeName = ref('feature')
const featureSource = ref([])

const loadFeature = async () => {
  featureSource.value = await featureList()
}

watchSwitchLang(loadFeature)

loadFeature()
</script>

<style lang="scss" scoped>
</style>
