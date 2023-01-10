<template>
  <div class="page-note">
    <h1>{{ form.note.title }}</h1>
    <div class="one" v-for="(e, i) in form.note.list" :key="i" v-html="markdown.render(e)" />
  </div>
</template>

<script setup lang="ts">
import type { Note } from '@/plugins/api'

const route = useRoute()

const markdown = mp.markdown

const form = reactive({
  note: { title: '', list: [], id: 0, user_id: 0, is_public: true } as Note,
})

onBeforeMount(async () => {
  const note = await api.getNote(route.params.id as string)
  if (note) {
    form.note = note
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
