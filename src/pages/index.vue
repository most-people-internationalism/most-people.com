<template>
  <div id="page-index">
    <div class="logo">
      <div
        class="btn left"
        @click="logo.prev"
        :style="{ visibility: engine.index <= 0 ? 'hidden' : 'visible' }"
      >
        <mp-icon name="back" />
      </div>
      <div
        @click="logo.click"
        class="center"
        :style="`--color: ${engine.now.color}`"
        :class="{ outWall: engine.now.out_wall && !user.out_wall }"
      >
        <mp-icon-app :name="engine.now.icon" />
        <span>{{ engine.now.name }}</span>
      </div>
      <div
        class="btn right"
        @click="logo.next"
        :style="{ visibility: engine.index >= engine.ids.length - 1 ? 'hidden' : 'visible' }"
      >
        <mp-icon name="next" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: computed(() => $t('MostPeople')) })
const user = useUserStore()
const engine = useEngineStore()

const logo = {
  prev() {
    if (engine.index > 0) engine.index -= 1
  },
  click() {},
  next() {
    if (engine.index < engine.ids.length - 1) engine.index += 1
  },
}
</script>

<style lang="scss">
#page-index {
  .logo {
    margin-top: 54px;
    display: flex;
    align-items: center;

    .btn {
      cursor: pointer;
      padding: 16px;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 16px;

      &:hover {
        color: var(--red);
      }
    }

    .center {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 211px;
      border-radius: 2px;
      overflow: hidden;
      font-weight: lighter;

      .mp-icon-app {
        font-size: 54px;
      }

      span {
        user-select: none;
        margin-top: 6px;
        line-height: 22px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666;
      }

      img {
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
        width: 100%;
        max-height: 100%;
      }

      &.out-wall {
        opacity: 0.6;
      }
      &:hover {
        opacity: 1;
        span {
          color: #333;
        }
      }
    }
  }
}
</style>
