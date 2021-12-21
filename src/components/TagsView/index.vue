<template>
  <div class="tags-view-container">
    <router-link
    v-for="(tag, index) in $store.getters.tagsViewList"
    :key="index"
    :class="isActive(tag) ? 'active' : ''"
    class="tags-view-item"
    :style="{
      backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
      borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
    }"
    :to="{ path: tag.fullPath }"
    @contextmenu.prevent="openMenu($event, index)">
      {{ tag.title }}
      <i
        v-show="!isActive(tag)"
        class="el-icon-close"
        @click.prevent.stop="onCloseClick(index)"
      />
    </router-link>
  </div>
  <context-menu v-show="visible" :style="menuStyle" :index="idx" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ContextMenu from './ContextMenu.vue'

const route = useRoute()
const store = useStore()

const isActive = tag => {
  return tag.path === route.path
}
const onCloseClick = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index
  })
}

const visible = ref(false)

const menuStyle = ref({
  left: 0,
  top: 0
})

const idx = ref(0)

const openMenu = ($event, index) => {
  console.log($event)
  const { x, y } = $event
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  visible.value = true
  idx.value = index
}

const closed = () => {
  visible.value = false
}

onMounted(() => {
  document.body.addEventListener('click', closed)
})

onUnmounted(() => {
  document.body.removeEventListener('click', closed)
})

</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        color: #fff;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 4px;
        }
      }
      // close 按钮
      .el-icon-close {
        width: 16px;
        height: 16px;
        line-height: 10px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }

  }
}
</style>
