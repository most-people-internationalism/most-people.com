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
        <span>{{ $t(engine.now.name) }}</span>
      </div>
      <div
        class="btn right"
        @click="logo.next"
        :style="{ visibility: engine.index >= engine.ids.length - 1 ? 'hidden' : 'visible' }"
      >
        <mp-icon name="next" />
      </div>
    </div>

    <div class="search">
      <input
        v-model="form.keyword"
        placeholder="风雨多经人不老 关山初度路犹长"
        @input="search.input"
        @focus="search.focus"
        @blur="search.blur"
        @keydown="search.keydown"
        @keyup="search.keyup"
        autofocus
      />
      <div class="suffix" @click="search.survey">
        <mp-icon name="search" />
      </div>
      <div class="sug" v-show="form.sug.length > 0 && form.sugShow">
        <div
          class="one"
          :class="{ active: form.sugIndex === i }"
          v-for="(e, i) in form.sug"
          :key="e"
          @mousedown.prevent="search.one(e, i)"
        >
          {{ e }}
        </div>
      </div>
    </div>

    <div ref="sugElement"></div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'

useHead({ title: computed(() => $t('MostPeople')) })

// data
const user = useUserStore()
const engine = useEngineStore()
const form = reactive({
  keyword: '',
  sug: [] as string[],
  sugIndex: -1,
  sugShow: false,
})

// element
const sugElement = ref<HTMLDivElement>()

// event
const search = {
  input() {
    const keyword = form.keyword
    if (!keyword) {
      form.sug = []
      return
    }
    // 缓存关键字
    user.keyword = keyword
    const url = 'https://sor.html5.qq.com/api/getsug?key=' + encodeURI(keyword)
    const script = document.createElement('script')
    script.src = url
    if (!sugElement.value) return
    for (const e of sugElement.value.childNodes) {
      e.remove()
    }
    sugElement.value.appendChild(script)
  },
  focus() {
    form.sugShow = true
  },
  blur() {
    form.sugShow = false
  },
  survey() {
    const keyword = encodeURIComponent(form.keyword)
    let url = ''
    const isPC = true
    if (isPC) {
      url = engine.now.pc
      // 有关键字
      if (keyword) {
        url = url.replace(mp.re('#{keyword}'), keyword)
      } else {
        url = engine.now.home_pc || mp.url(url).origin
      }
    } else {
      url = engine.now.mobile || engine.now.pc
      // 有关键字
      if (keyword) {
        url = url.replace(mp.re('#{keyword}'), keyword)
      } else {
        url = engine.now.home_mobile || mp.url(url).origin
      }
    }
    if (!engine.now.pc && engine.now.app) {
      ElMessageBox.alert('该引擎只有APP端可用', '提示', {
        confirmButtonText: '确定',
      })
      return
    }
    mp.open(url)
  },
  keydown(event: KeyboardEvent) {
    if (event.code === 'ArrowUp') {
      event.preventDefault()
    }
  },
  keyup(event: KeyboardEvent) {
    let now = form.sugIndex
    let len = form.sug.length
    if (event.code === 'ArrowUp') {
      form.sugIndex = (now + len - 1) % len
    } else if (event.code === 'ArrowDown') {
      form.sugIndex = (now + len + 1) % len
      form.keyword = form.sug[form.sugIndex]
    } else if (event.code === 'Enter') {
      search.survey()
    }
  },
  one(e: string, i: number) {
    form.sugIndex = i
    form.keyword = e
    this.survey()
  },
}
const logo = {
  prev() {
    if (engine.index > 0) engine.index -= 1
  },
  click() {},
  next() {
    if (engine.index < engine.ids.length - 1) engine.index += 1
  },
}

// jsonp
onBeforeMount(() => {
  window.sogou = {
    sug: (data) => {
      const arr = data[1]
      form.sug = arr
    },
  }
})
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
      font-weight: lighter;

      .mp-icon-app {
        font-size: 54px;
      }

      span {
        text-align: center;
        user-select: none;
        margin-top: 6px;
        line-height: 22px;
        white-space: nowrap;
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
          color: var(--red);
        }
      }
    }
  }
  .search {
    position: relative;
    margin-top: 30px;
    width: 100%;
    height: 44px;

    input {
      padding: 10px;
      padding-right: 60px;
      width: 100%;
      height: 100%;

      box-shadow: 0 0 0 1px #eee;
      outline: 0;
      border: 0;
      border-radius: 6px;

      &:hover {
        transition: box-shadow 0.3s;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.24);
      }
      &:focus {
        box-shadow: 0 0 0 1px #666;
        border-radius: 6px 6px 0 0;
      }
    }
    .suffix {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .icon-search {
        font-size: 18px;
        color: #666;
      }
      &:hover {
        .icon-search {
          color: var(--red);
        }
      }
    }
    .sug {
      padding-bottom: 5px;
      min-height: 100px;
      box-shadow: 0 0 0 1px #666;
      border-radius: 0 0 6px 6px;
      .one {
        color: #666;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 5px 10px;
      }

      .one:hover {
        background: rgba(0, 0, 0, 0.02);
        color: var(--text);
      }
      .one.active {
        background: #666;
        color: #fff;
      }
    }
  }
}

// pc
@media screen and (min-width: 800px) {
  #page-index {
    .search {
      width: 61.8%;
    }
  }
}
</style>
