<!-- https://bytedance.feishu.cn/wiki/wikcnJZV45hM71QgI60iwkzvXob#bIprMt -->
<template>
  <iconpark-icon :icon-id="props.name" class="iconpark" :class="`icon-${props.name}`">
  </iconpark-icon>
</template>

<script setup lang="ts">
interface Props {
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
})
</script>
