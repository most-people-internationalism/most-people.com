<template>
  <div id="page-index">
    <div class="logo">
      <div
        class="btn left"
        @click="bindPrev"
        :style="{ visibility: engine.index <= 0 ? 'hidden' : 'visible' }"
      >
        <!-- <icon name="back" /> -->
      </div>
      <div @click="bindLogo" class="center" :class="{ outWall: engine.outWall && !user.outWall }">
        <!-- <icon-app :name="engine.icon || 'shalou'" /> -->
        <span>{{ engine.name }}</span>
      </div>
      <div
        class="btn right"
        @click="bindNext"
        :style="{ visibility: engine.index >= engine.list.length - 1 ? 'hidden' : 'visible' }"
      >
        <!-- <icon name="next" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import engines from '@/assets/engines.json'
console.log('🌊', engines)

const user = useUserStore()
const engine = useEngineStore()
console.log('🌊', user, engine)

const bindPrev = () => {}
const bindNext = () => {}
const bindLogo = () => {}
</script>
