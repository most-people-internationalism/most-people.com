<!-- https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=2137730 -->
<template>
  <svg class="icon-app" :class="props.name" aria-hidden="true">
    <use :xlink:href="`#app-${props.name}`"></use>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
})
</script>

<style lang="scss">
.icon-app {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
