<template>
  <div id="page-register" class="page-login">
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
        <el-input
          v-model.trim="form.username"
          clearable
          :disabled="form.usernameLoading"
        ></el-input>
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
      <el-button @click="register" :loading="form.loading">注册</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
const { form, formElement, register, checkUsername, checkPassword, checkConfirmPassword } =
  useRegister()
</script>

<style lang="scss">
.page-login {
  .el-form {
    width: 360px;
  }
}
</style>
