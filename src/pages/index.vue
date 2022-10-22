<template>
  <div id="page-index">
    <div class="logo">
      <!-- <div
        class="btn left"
        @click="bindPrev"
        :style="{ visibility: engine.index <= 0 ? 'hidden' : 'visible' }"
      >
        <icon name="back" />
      </div> -->
      <div @click="bindLogo" class="center" :class="{ outWall: engine.out_wall && !user.out_wall }">
        <icon-app :name="engine.icon" />
        <span>{{ engine.name }}</span>
      </div>
      <!-- <div
        class="btn right"
        @click="bindNext"
        :style="{ visibility: engine.index >= engine.list.length - 1 ? 'hidden' : 'visible' }"
      >
        <icon name="next" />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useUserStore()
const { engine } = useEngineStore()

const bindPrev = () => {}
const bindNext = () => {}
const bindLogo = () => {}

useHead({
  title: '动员群众，解决难题',
})
</script>
