<template>
  <div id="page-login">
    <el-form @submit.prevent ref="formElement" :model="form" label-width="auto">
      <el-form-item
        label="用户名"
        prop="username"
        :rules="[{ validator: checkUsername, trigger: 'blur' }]"
      >
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[{ validator: checkPassword, trigger: 'blur' }]"
      >
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-button @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'

const form = reactive({
  username: '婆婆',
  password: '',
})

// const userStore = useUserStore()
const formElement = ref<FormInstance>()

const login = async () => {
  if (!formElement.value) return
  formElement.value.validate(async (ok) => {
    if (ok) {
      const user = await api.getUser(form.username)
      if (user) {
        const key = await mp.passwordKey(form.username, form.password)
        const username = await mp.decrypt(user.password_hash, key)
        console.log('🌊', username === form.username)
      } else {
        mp.error('user not found')
      }
    }
  })

  // const key = await mp.passwordKey(form.username, form.password)
  // const encode = await mp.encrypt(form.username, key)
  // console.log('🌊', encode)
  // const decode = await mp.decrypt(encode, key)
  // console.log('🌊', decode)
  // const ok = await mp.indexdb.setUser(form.username, key)
  // console.log('🌊', ok)
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
  callback()
}
</script>
