<template>
  <div class="mp-task-list">
    <div v-for="(e, i) in form.taskList" :key="i" class="task">
      <el-input
        ref="elements"
        autocomplete="off"
        type="textarea"
        autosize
        resize="none"
        v-model="form.taskList[i]"
        @keydown="task.keydown($event as KeyboardEvent, i)"
        @focus="form.focusIndex = i"
        @blur="form.focusIndex = -1"
        v-show="form.focusIndex > -1"
      />
      <div class="markdown" v-html="markdown.render(e)" @click="task.focus(i)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const elements = ref<HTMLInputElement[]>()

const form = reactive({
  taskList: ['## 为了人类的崇高的理想而战'],
  focusIndex: -1,
})

const markdown = mp.markdown

const task = {
  focus(index: number) {
    nextTick(() => {
      if (elements.value) {
        const input = elements.value[index]
        if (input) {
          form.focusIndex = index
          input.focus()
        }
      }
    })
  },
  keydown(event: KeyboardEvent, i: number) {
    const { keyCode, code, shiftKey } = event
    const ArrowUp = code === 'ArrowUp' || keyCode === 38
    const ArrowDown = code === 'ArrowDown' || keyCode === 40
    const Enter = code === 'Enter' || keyCode === 13
    const Backspace = code === 'Backspace' || keyCode === 8

    const v = form.taskList[i]

    if (Backspace && v === '' && form.taskList.length > 1) {
      event.preventDefault()

      form.taskList.splice(i, 1)

      this.focus(i > 0 ? i - 1 : i)
    } else if (Enter && shiftKey) {
      event.preventDefault()

      const index = i + 1
      form.taskList.splice(index, 0, '')

      this.focus(index)
    } else if (ArrowUp && shiftKey) {
      event.preventDefault()

      this.focus(i - 1)
    } else if (ArrowDown && shiftKey) {
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
    .el-textarea {
      font-size: 100%;
      textarea {
        outline: 0;
        border: 0;
        padding: 0 10px;
        border-radius: 4px;
        color: #666;
        box-shadow: none;
        width: 100%;
        background: transparent;

        &:focus {
          color: #444;
          background: rgba(0, 0, 0, 0.02);
        }
      }
    }

    .markdown {
      color: #666;
      padding: 0 10px;
      min-height: 24px;
    }
  }
}
</style>
