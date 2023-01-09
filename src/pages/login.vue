<template>
  <div id="page-login">
    <el-form
      @submit.prevent
      ref="formElement"
      :model="form"
      label-width="auto"
      :disabled="form.loading"
    >
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
      <el-button @click="login" :loading="form.loading">登录</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
const { form, formElement, login, checkUsername, checkPassword } = useLogin()
</script>
