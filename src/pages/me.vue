<template>
  <div id="page-me">
    <el-select v-model="locale" @change="change" class="m-2" placeholder="Select" size="large">
      <el-option v-for="item in locales" :key="item" :label="getLabel(item)" :value="item" />
    </el-select>
    <div v-if="userStore.user">
      <br />
      {{ userStore.user.name }}
      <br />
      {{ userStore.user.password_hash }}
      <br />
      {{ userStore.user.sign_time }}
      <br />
      <el-button type="danger" @click="exit">退出登录</el-button>
    </div>
    <div v-else class="not-login">
      <br />
      <div>您尚未登录，请选择</div>
      <br />
      <router-link to="/login">
        <el-button type="primary">登录</el-button>
      </router-link>
      <br />
      <br />
      <router-link to="/register">
        <el-button>注册</el-button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getLabel, change, locale, locales, userStore } = useMe()

const exit = () => {
  if (!userStore.user) return
  mp.indexdb.delUser(userStore.user.name)
  userStore.$reset()
}
</script>

<style lang="scss"></style>
