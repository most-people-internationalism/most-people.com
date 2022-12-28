<template>
  <div id="page-register" class="page-login">
    <el-form @submit.prevent ref="formElement" :model="form" label-width="auto">
      <el-form-item
        label="用户名"
        prop="username"
        :rules="[{ validator: checkUsername, trigger: 'blur' }]"
      >
        <el-input v-model="form.username" clearable></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[{ validator: checkPassword, trigger: 'blur' }]"
      >
        <el-input v-model.trim="form.password" show-password clearable></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="confirmPassword"
        :rules="[{ validator: checkConfirmPassword, trigger: 'blur' }]"
      >
        <el-input v-model.trim="form.confirmPassword" show-password clearable></el-input>
      </el-form-item>
      <el-button @click="register">注册</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox, type FormInstance } from 'element-plus'

const form = reactive({
  username: '',
  password: '德玛西亚',
  confirmPassword: '德玛西亚',
})

const formElement = ref<FormInstance>()

const register = () => {
  if (!formElement.value) return
  formElement.value.validate(async (ok) => {
    if (ok) {
      ElMessageBox.prompt('请牢记您的密码，本站数据库全网公开加密，忘记密码将失去账号。', {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showCancelButton: true,
        showClose: false,
        cancelButtonText: '取消',
        confirmButtonText: '确认牢记',

        showInput: true,
        inputPlaceholder: '再次输入密码',

        inputValidator(v: string) {
          if (v !== form.password) {
            return '密码不一致'
          }
          return true
        },
        inputErrorMessage: '不支持特殊字符',
      })
        .then(() => {
          const passwordKdf = mp.passwordKdf(form.username, form.password)
          console.log('🌊', passwordKdf)
        })
        .catch(() => {
          //
        })
    }
  })
}

const checkUsername = (_rule: any, v: string, callback: (err?: Error) => void) => {
  const username = v
  if (!username) {
    return callback(new Error($t('UsernameEmpty')))
  }
  callback()
}
const checkPassword = (_rule: any, v: string, callback: (err?: Error) => void) => {
  const password = v
  if (!password) {
    return callback(new Error($t('PasswordEmpty')))
  }
  if (/^\S{4,32}$/.test(password) === false) {
    return callback(new Error($t('PasswordRule1')))
  }
  // if (/(?=.*[A-Z])(?=.*\S)[^]/.test(password) === false) {
  //   return callback(new Error($t('PasswordRule2')))
  // }
  // if (/(?=[a-z])[^]/.test(password) === false) {
  //   return callback(new Error($t('PasswordRule3')))
  // }
  // if (/(?=[\d]+)/.test(password) === false) {
  //   return callback(new Error($t('PasswordRule4')))
  // }
  callback()
}

const checkConfirmPassword = (_rule: any, v: string, callback: (err?: Error) => void) => {
  const password = v
  if (!password) {
    return callback()
  }
  if (form.password !== password) {
    return callback(new Error($t('PasswordsNotMatch')))
  }
  callback()
}
</script>

<style lang="scss">
.page-login {
  .el-form {
    width: 360px;
  }
}
</style>
