<template>
  <div id="page-mp">用户名：{{ route.params.username }}</div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
