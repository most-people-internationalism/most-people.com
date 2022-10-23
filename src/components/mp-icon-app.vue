<!-- https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=2137730 -->
<template>
  <svg class="mp-icon-app" :class="props.name" aria-hidden="true">
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
.mp-icon-app {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
  // app
  pointer-events: none;
  width: 3.21875em;
}
</style>
