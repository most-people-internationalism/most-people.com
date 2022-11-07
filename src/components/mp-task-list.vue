<template>
  <div class="mp-task-list">
    <div v-for="(e, i) in form.taskList" :key="i" class="task">
      <input ref="elements" v-model="form.taskList[i]" @keydown="task.keydown($event, i)" />
    </div>
  </div>
</template>

<script setup lang="ts">
const elements = ref<HTMLInputElement[]>()

const form = reactive({
  taskList: ['为了人类的崇高的理想而战'],
})

const task = {
  focus(index: number) {
    nextTick(() => {
      if (elements.value) elements.value[index].focus()
    })
  },
  keydown(event: KeyboardEvent, i: number) {
    const { keyCode, code } = event
    const ArrowUp = code === 'ArrowUp' || keyCode === 38
    const ArrowDown = code === 'ArrowDown' || keyCode === 40
    const Enter = code === 'Enter' || keyCode === 13
    const Backspace = code === 'Backspace' || keyCode === 8

    const v = form.taskList[i]

    if (Backspace && v === '' && form.taskList.length > 1) {
      event.preventDefault()
      form.taskList.splice(i, 1)
      this.focus(i > 0 ? i - 1 : i)
    } else if (Enter) {
      event.preventDefault()
      const index = i + 1
      form.taskList.splice(index, 0, '')
      this.focus(index)
    } else if (ArrowUp) {
      event.preventDefault()
      this.focus(i - 1)
    } else if (ArrowDown) {
      event.preventDefault()
      this.focus(i + 1)
    }
  },
}
</script>

<style lang="scss">
.mp-task-list {
  width: 100%;
  background: rgba(0, 0, 0, 0.02);
  transition: all 0.4s;
  padding: 10px 0;
  border-radius: 6px;
  .task {
    input {
      outline: 0;
      border: 0;
      color: #666;
      height: 44px;
      width: 100%;
      padding: 0 10px;
      background: transparent;
      border-radius: 4px;
    }
    input:focus {
      color: #444;
      background: rgba(0, 0, 0, 0.02);
    }
  }
}
</style>
