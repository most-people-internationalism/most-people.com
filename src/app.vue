<template>
  <div class="mp-header">
    <div class="left">
      <router-link to="/">调查</router-link>
      <router-link to="/notes">记录</router-link>
    </div>

    <div class="right">
      <router-link to="/people">为人民服务</router-link>
      <router-link to="/me">我</router-link>
    </div>
  </div>

  <router-view />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style lang="scss">
.mp-header {
  display: flex;
  justify-content: space-between;
  > .left {
    text-align: left;
  }
  > .center {
    text-align: center;
  }
  > .right {
    text-align: right;
  }
  > div {
    a + a {
      margin-left: 10px;
    }
  }
}
</style>
