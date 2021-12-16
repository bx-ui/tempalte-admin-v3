<template>
  <div class="navbar">
    <hamburger class="hamburger-container" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <!-- 全局搜索 -->
      <header-search class="right-menu-item hover-effect" />
      <!-- 全屏 -->
      <screen-full class="right-menu-item hover-effect" />
      <!-- 动态换肤 -->
      <theme-picker class="right-menu-item hover-effect" />
      <!-- 国际化 -->
      <lang-select class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown class="avator-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
          shape="square"
          :size="40"
          :src="$store.getters.userInfo.avatar">
          </el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <a href="#" target="_blank">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import hamburger from '@/components/hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ThemePicker from '@/components/ThemeSelect/index.vue'
import ScreenFull from '@/components/Screenfull/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'
const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  position: relative;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    float: left;
    line-height: 46px;
    height: 100%;
    cursor: pointer;
    // hover 动画效果
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    display: flex;
    align-items: center;
    padding-right: 16px;
    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
    ::v-deep .avator-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
      }
      .el-avatar {
        --el-avatar-background-color: none;
        margin-right: 12px;
      }
    }
  }
}
</style>
