<template>
  <div id="page-me">
    <div>当前： {{ form.count }}</div>
    <el-button @click="add">Add</el-button>
    <el-button type="info">Info</el-button>

    <!-- <button @click="form.awesome = !form.awesome">Toggle</button> -->

    <!-- <h1 v-if="form.awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1>

    <li v-for="(item, index) in form.items" :key="index">
      {{ form.parentMessage }} - {{ index }} - {{ item.message }}
    </li> -->

    <div class="keyword" @mouseover="mouseover" @mouseout="mouseout">
      {{ form.keyword }}
    </div>

    <el-input
      v-model="form.keyword"
      @input="input"
      @focus="focus"
      @blur="blur"
      @keydown.enter="enter"
    ></el-input>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  count: 5,
  keyword: '',
  // awesome: false,
  // parentMessage: 'Parent',
  // items: [{ message: 'Foo' }, { message: 'Bar' }, { message: 'Foo' }, { message: 'Bar' }],
})

const engine = useEngineStore()

const router = useRouter()

const enter = () => {
  console.log('enter')
}
const mouseover = () => {
  console.log('mouseover')
}
const mouseout = () => {
  console.log('mouseout')
}
const focus = () => {
  console.log('focus')
}
const blur = () => {
  console.log('blur')
}
const input = () => {
  console.log('🌊', form.keyword)
}

const add = () => {
  form.count += 1
  // console.log('🌊', form.count)
  engine.index = 1
  form.keyword = String(form.count)
  // 跳转路由
  // router.push('/notes')
  // router.replace('/')
}

// console.log('🌊', engine.ids)
// console.log('🌊', engine.index)
</script>

<style lang="scss">
#page-me {
  background: pink;

  .keyword {
    background-color: aqua;
  }
}

// #page-me .keyword {}
</style>
