<template>
  <div>{{ $t('Notes') }}</div>
</template>

<script setup lang="ts">
useHead({ title: computed(() => $t('Notes')) })

onMounted(async () => {})
</script>
