<template>
  <div id="page-me">
    <el-select v-model="locale" @change="change" class="m-2" placeholder="Select" size="large">
      <el-option v-for="item in locales" :key="item" :label="getLabel(item)" :value="item" />
    </el-select>

    <br />
    <div>您尚未登录，请选择</div>
    <br />
    <router-link to="/login">
      <el-button type="primary">登录</el-button>
    </router-link>
    <br />
    <router-link to="/register">
      <el-button>注册</el-button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
const { availableLocales: locales, locale, getLocaleMessage } = useI18n()

const getLabel = (item: string) => {
  return getLocaleMessage(item)['MyLanguage'] as string
}

const change = () => {
  localStorage.setItem('lang', locale.value)
}

// const router = useRouter()

// if (localStorage.getItem('kdf') === null) {
//   router.replace('/login')
// }
</script>

<style lang="scss"></style>
