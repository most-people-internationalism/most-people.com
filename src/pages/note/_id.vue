<template>
  <div id="page-note">{{ route.params.id }}</div>
</template>

<script setup lang="ts">
const route = useRoute()

onBeforeMount(async () => {
  const note = await api.getNote(route.params.id as string)
  console.log('🌊', note)
})
</script>
