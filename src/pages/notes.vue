<template>
  <div>{{ $t('Notes') }}</div>
</template>

<script setup lang="ts">
// import { utils } from 'ethers'

useHead({ title: computed(() => $t('Notes')) })

onMounted(async () => {
  const passwordKdf = mp.passwordKdf('天下为公', 'sea')
  const passwordHash = await mp.passwordHash(passwordKdf)
  const [privateKey] = passwordHash.split('.')
  const ok = mp.passwordVerify(passwordKdf, passwordHash)
  console.log('🌊 passwordVerify:', ok)
  console.log('🌊 passwordKdf:', passwordKdf)
  const encrypted = await mp.encrypt(passwordKdf, privateKey, '我喜欢你')
  console.log('🌊 encrypted:', encrypted)
  const decrypted = await mp.decrypt(passwordKdf, privateKey, encrypted)
  console.log('🌊 decrypted:', decrypted)
})
</script>
