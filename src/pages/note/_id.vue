<template>
  <div class="page-note">
    <h1>{{ note.title }}</h1>
    <div class="one" v-for="(e, i) in note.list" :key="i" v-html="markdown.render(e)" />
  </div>
</template>

<script setup lang="ts">
import type { Note } from '@/plugins/api'

const route = useRoute()

const markdown = mp.markdown

const note = ref<Note>({
  title: '',
  list: [],
  note_id: 0,
  user_id: 0,
  is_public: true,
})

onBeforeMount(async () => {
  const res = await api.getNote(route.params.id as string)
  if (res) {
    const mi = mp.encrypt(JSON.stringify(res.list))
    if (mi) {
      res.list = []
      note.value = res
      note.value.list = JSON.parse(mp.decrypt(mi))
    } else {
      note.value = res
    }
  }
})
</script>

<style lang="scss">
.page-note {
  .one {
    width: 90%;
    background: #eee;
    margin-top: 40px;
  }
}
</style>
