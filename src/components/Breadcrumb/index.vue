<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <!-- 面包屑的最后一项 -->
    <transition-group  name="breadcrumb">
      <el-breadcrumb-item
      v-for="(item, index) in breadcrumbData"
      :key="index">
        <span
        class="no-redirect"
        v-if="index === breadcrumbData.length - 1">
        {{ generateTitle(item.meta.title) }}</span>
        <a
        v-else class="redirect"
        @click.prevent="onLinkClick(item)"
        >{{ generateTitle(item.meta.title) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
const router = useRouter()
const store = useStore()

// 生成数组数据
const breadcrumbData = ref([])

const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(item => item.meta && item.meta.title)
}

// 处理点击事件
const onLinkClick = (item) => {
  console.log(item)
  router.push({ path: item.path })
}

// 监听路由变化时触发
watch(route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)

const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  line-height: 50px;
  display: inline-block;
  font-size: 14px;
  padding-left: 8px;

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  ::v-deep .redirect {
    color: v-bind(linkHoverColor);
    cursor: pointer;

    &:hover {
      color: #999;
    }
  }
}
</style>
