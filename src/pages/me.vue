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
</script>

<style lang="scss"></style>
