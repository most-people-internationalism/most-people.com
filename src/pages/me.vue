<template>
  <div id="page-me">
    <el-select v-model="locale" @change="change" class="m-2" placeholder="Select" size="large">
      <el-option v-for="item in locales" :key="item" :label="getLabel(item)" :value="item" />
    </el-select>
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

const init = () => {
  // const passwordKdf = mp.passwordKdf('sea', '嘟嘟嘟')
  // const passwordHash = mp.passwordHash(passwordKdf)
  // const mi = mp.encrypt(passwordKdf, '我喜欢你')
  // const text = mp.decrypt(passwordKdf, mi)
  // console.log('🌊', mi)
  // console.log('🌊', text)
}
init()
</script>

<style lang="scss"></style>
