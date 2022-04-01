<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="langselect-container" />
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
         <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
        v-model="loginForm.username"
        placeholder="username"
        name="username"
        type="text" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
        v-model="loginForm.password"
        placeholder="password"
        name="password"
        :type="passwordType" />
        <span class="show-pwd">
          <span class="svg-container">
            <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" @click="onChangePwdType"></svg-icon>
          </span>
          <!-- <svg-icon icon="https://res.lgdsunday.club/user.svg" /> -->
        </span>
      </el-form-item>
      <el-form-item prop="username">
        <span class="svg-container">
         <svg-icon icon="table"></svg-icon>
        </span>
        <el-input
        v-model="loginForm.captchaCode"
        placeholder="captchaCode"
        name="username"
        type="text" />
        <span class="show-code">
          <img :src="verificationImg" alt="" @click="getLoginCaptcha">
        </span>
      </el-form-item>
      <el-button
      type="primary"
      style="width: 100%; margin-bottom: 30px"
      @click="handlerLogin"
      :loading="loading">
      {{ $t('msg.login.loginBtn') }}</el-button>
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import LangSelect from '@/components/LangSelect/index.vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { validatePassword } from './rules'
import { useStore } from 'vuex'
import { getCode } from '@/api/sys'

const i18n = useI18n()
const loginForm = ref({
  username: 'super-admin',
  password: '123456',
  captchaCode: '6666'
})

const loginRules = ref({
  username: [{ required: true, trigger: 'blur', message: i18n.t('msg.login.usernameRule') }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword() }]
})

const passwordType = ref('password')

const onChangePwdType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

const loading = ref(false)

const loginFormRef = ref()

const store = useStore()

// 处理登录逻辑
const handlerLogin = () => {
  loginFormRef.value.validate(valid => {
    if (!valid) return
    loading.value = true
    store.dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
      })
      .catch(err => {
        console.log(err)
        loading.value = false
      })
  })
}

const verificationImg = ref('')

// 获取验证码
const getLoginCaptcha = async () => {
  const res = await getCode()
  const base64 = 'data:image/png;base64,' + window.btoa(String.fromCharCode(...new Uint8Array(res)))
  verificationImg.value = base64
  console.log(base64)
}

getLoginCaptcha()

</script>

<style lang="scss" scoped>
// 定义基本样式变量
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
// 实现css样式
.login-container {
  min-height: 100%;
  width: 100%;
  background: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-height: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .tips {
      color: white;
      line-height: 24px;
    }
    ::v-deep .el-form-item {
      border: 1px solid rgba($color: #fff, $alpha: 0.1);
      background: rgba($color: #000000, $alpha: 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        caret-color: $cursor;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    // height: 100%;
    // padding-left: 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      text-align: center;
      margin: 0 auto 40px auto;
      font-weight: bold;
    }

    ::v-deep .langselect-container {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 22px;
      padding: 10px 10px 0 0;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
  }

  .show-code {
    position: absolute;
    right: 10px;
    top: 7px;
    cursor: pointer;
    img {
      width: 120px;
      height: 40px;
    }
  }
}
</style>
