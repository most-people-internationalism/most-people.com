<template>
  <div id="page-me">
    <el-select v-model="locale" @change="change" class="m-2" placeholder="Select" size="large">
      <el-option v-for="item in locales" :key="item" :label="getLabel(item)" :value="item" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import api from '@/plugins/api'

const { availableLocales: locales, locale, getLocaleMessage } = useI18n()

const getLabel = (item: string) => {
  return getLocaleMessage(item)['MyLanguage'] as string
}

const change = () => {
  localStorage.setItem('lang', locale.value)
}

api.get('/note/2f').then((res) => {
  console.log('🌊', res)
})
</script>

<style lang="scss"></style>
