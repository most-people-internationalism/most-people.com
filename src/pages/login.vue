<template>
  <div id="page-login">
    <el-form @submit.prevent ref="formElement" :model="form" label-width="auto">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-button @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  username: 'sea',
  password: '嘟嘟嘟',
})

const userStore = useUserStore()

const login = async () => {
  const key = await mp.passwordKey(form.username, form.password)
  mp.encrypt('sea', key)
  // const ok = await mp.indexdb.setUser(form.username, key)
  // if (ok) {
  //   window.localStorage.setItem('username', form.username)
  // }

  // const user = await userStore.indexdb.getUser('张三')
  // const ok = await userStore.indexdb.delUser('张三')
  // const ok = await userStore.indexdb.setUser(form.username, key)
}
</script>
