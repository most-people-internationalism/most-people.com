<template>
  <div>{{ $t('Notes') }}</div>
</template>

<script setup lang="ts">
import { utils } from 'ethers'

useHead({ title: computed(() => $t('Notes')) })

// const p = mp.passwordHash('嘟嘟嘟')
// console.log('🌊', p)

// const ok = mp.passwordVerify(
//   '嘟嘟嘟',
//   '8f08cfd8ed04e3dee5162d6a5021077151cf6ae4d286ca39961dd21ca2d1c078.0x1af203a5533b07afde8c20e59db7e97c145b9e7fa0e7284f8cb25276515df21e',
// )
// console.log('🌊', ok)
// console.log('🌊', AES)

// https://gist.github.com/pedrouid/b4056fd1f754918ddae86b32cf7d803e#aes-gcm
window.crypto.subtle
  .generateKey(
    {
      name: 'AES-GCM',
      length: 256, //can be  128, 192, or 256
    },
    true, //whether the key is extractable (i.e. can be used in exportKey)
    ['encrypt', 'decrypt'], //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
  )
  .then((key) => {
    //returns a key object
    window.crypto.subtle
      .exportKey(
        'jwk', //can be "jwk" or "raw"
        key, //extractable must be true
      )
      .then(function (keyData) {
        //returns the exported key data
        init(keyData)
      })
      .catch(function (err) {
        console.error(err)
      })
  })
  .catch(function (err) {
    console.error(err)
  })

const init = async (data: any) => {
  console.log('🌊', data)
  const key = await window.crypto.subtle.importKey(
    'jwk', //can be "jwk" or "raw"
    {
      kty: data.kty,
      k: data.k,
      alg: data.alg,
      ext: data.ext,
    },
    {
      //this is the algorithm options
      name: 'AES-GCM',
    },
    true, //whether the key is extractable (i.e. can be used in exportKey)
    data.key_ops, //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
  )
  //returns the symmetric key
  // window.crypto.subtle
  //   .exportKey(
  //     'jwk', //can be "jwk" or "raw"
  //     key, //extractable must be true
  //   )
  //   .then(function (keyData) {
  //     //returns the exported key data
  //     console.log(keyData)
  //   })
  //   .catch(function (err) {
  //     console.error(err)
  //   })
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
      tagLength: 128,
    },
    key, //from generateKey or importKey above
    utils.toUtf8Bytes('go'), //ArrayBuffer of data you want to encrypt
  )
  const mi = utils.hexlify(new Uint8Array(encrypted))
  console.log('🌊', mi)

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
      tagLength: 128,
    },
    key,
    encrypted,
  )

  const v = utils.toUtf8String(new Uint8Array(decrypted))
  console.log(v)
}
</script>
