<template>
  <div id="page-login">
    <el-form @submit.prevent ref="formElement" :model="form" label-width="auto">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-button>登录</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  username: 'sea',
  password: '嘟嘟嘟',
})
</script>
