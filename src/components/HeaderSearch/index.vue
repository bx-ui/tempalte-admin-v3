<template>
  <div :class="{show: isShow}" class="header-search">
    <svg-icon
    class-name="search-icon"
    icon="search"
    @click.stop="onShowClick"></svg-icon>
    <el-select
    ref="headerSearchSelectRef"
    class="header-search-select"
    v-model="search"
    filterable
    default-first-option
    remote
    placeholder="Search"
    :remote-method="querySearch"
    @change="onSelectChange">
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters } from '@/utils/route'
import Fuse from 'fuse.js'
import { generateRoutes } from './FuseData'
import { watchSwitchLang } from '@/utils/i18n'

const router = useRouter()

const search = ref('')
const isShow = ref(false)
const headerSearchSelectRef = ref(null)

// 监听isShow变化，作出响应
watch(isShow, val => {
  if (val) {
    // 打开
    document.body.addEventListener('click', onClose)
  } else {
    // 收起
    document.body.removeEventListener('click', onClose)
  }
})

const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

let searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})

/**
 * 搜索库相关
 */
let fuse

const initFuse = searchPool => {
  fuse = new Fuse(searchPool, {
  // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

initFuse(searchPool.value)

const onShowClick = () => {
  isShow.value = !isShow.value
}

const searchOptions = ref([])
// 搜索的方法
const querySearch = query => {
  console.log(fuse.search(query))
  searchOptions.value = fuse.search(query)
}
// select改变的方法
const onSelectChange = val => {
  router.push(val.path)
}

// i18n 改变时候执行
watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateRoutes(filterRoutes)
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
