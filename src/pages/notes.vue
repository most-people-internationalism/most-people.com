<template>
  <div>{{ $t('Notes') }}</div>
</template>

<script setup lang="ts">
useHead({ title: computed(() => $t('Notes')) })

// const p = mp.passwordHash('嘟嘟嘟')
// console.log('🌊', p)

const ok = mp.passwordVerify(
  '嘟嘟嘟',
  '8f08cfd8ed04e3dee5162d6a5021077151cf6ae4d286ca39961dd21ca2d1c078.0x1af203a5533b07afde8c20e59db7e97c145b9e7fa0e7284f8cb25276515df21e',
)
console.log('🌊', ok)
</script>
