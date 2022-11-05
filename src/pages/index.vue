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
      <div ref="sugElement"></div>
      <input
        :class="{ showSug: form.focus && form.sug.length > 0 }"
        v-model="form.keyword"
        @input="search.input"
        @focus="search.focus"
        @blur="search.blur"
        @keydown="search.keydown"
        @keyup="search.keyup"
        type="search"
        autofocus
        autocomplete="off"
      />
      <div class="suffix">
        <mp-icon
          :style="{ visibility: form.keyword ? '' : 'hidden' }"
          name="close"
          @click="search.clear"
        />
        <mp-icon name="search" @click="search.survey" />
      </div>
      <div class="sug" v-show="form.focus && form.sug.length > 0">
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

    <div class="engines">
      <div
        class="engine"
        :class="{ active: engine.now.id === e.id }"
        :style="{ color: engine.now.id === e.id ? e.color : '' }"
        v-for="(e, i) in engine.list"
        :key="e.id"
        @click="engine.click(i)"
      >
        <mp-icon-app :name="e.icon" />
        <span>{{ $t(e.name) }}</span>
      </div>
      <div class="engine add" @click="engine.add">+</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'

useHead({ title: computed(() => $t('MostPeople')) })

const router = useRouter()
// data

const user = useUserStore()
const engine = useEngineStore()

const form = reactive({
  keyword: '',
  sug: [] as string[],
  sugIndex: -1,
  focus: false,
})

// element
const sugElement = ref<HTMLDivElement>()

// event
const search = {
  input() {
    const keyword = form.keyword
    if (!keyword) {
      form.sug = []
      form.sugIndex = -1
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
    form.focus = true
  },
  blur() {
    form.focus = false
  },
  survey() {
    const keyword = encodeURIComponent(form.keyword)
    let url = ''
    if (user.isPC) {
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
  clear() {
    form.keyword = ''
    form.sug = []
    form.sugIndex = -1
  },
  keydown(event: KeyboardEvent) {
    if (event.code === 'ArrowUp' || event.keyCode === 38) {
      event.preventDefault()
    }
  },
  keyup(event: KeyboardEvent) {
    let now = form.sugIndex
    let len = form.sug.length
    if (event.code === 'ArrowUp' || event.keyCode === 38) {
      form.sugIndex = (now + len - 1) % len
    } else if (event.code === 'ArrowDown' || event.keyCode === 40) {
      form.sugIndex = (now + len + 1) % len
      form.keyword = form.sug[form.sugIndex]
    } else if (event.code === 'Enter' || event.keyCode === 13) {
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
  click() {
    router.push('/engines')
  },
  next() {
    if (engine.index < engine.ids.length - 1) engine.index += 1
  },
}

// jsonp
onBeforeMount(() => {
  window.sogou = {
    sug: (data) => {
      const keyword = data[0]
      if (keyword === form.keyword) {
        const arr = data[1]
        form.sugIndex = -1
        form.sug = arr
      }
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

      &.outWall {
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
      }
      &.showSug {
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
      justify-content: space-between;

      .mp-icon {
        cursor: pointer;

        padding: 5px;
      }

      .icon-close {
        font-size: 12px;
        color: #666;
        &:hover {
          color: #333;
        }
      }

      .icon-search {
        padding-right: 10px;
        font-size: 18px;
        color: #666;
        &:hover {
          color: var(--red);
        }
      }
    }

    .sug {
      padding-bottom: 5px;
      box-shadow: 0 0 0 1px #666;
      border-radius: 0 0 6px 6px;
      background: #fff;
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

  .engines {
    width: 100%;
    // http://ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html
    display: grid;
    grid-template-columns: repeat(auto-fill, 85px);
    justify-content: space-between;
    padding: 8px 0;

    .engine {
      cursor: pointer;
      width: 85px;
      padding: 4px 0;
      margin: 3px 0;
      text-align: center;
      background: rgba(0, 0, 0, 0.01);
      border-radius: 12px;
      color: #333;

      .mp-icon-app {
        font-size: 24px;
      }

      span {
        font-size: 14px;
        margin-top: 8px;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &:hover {
        background: rgba(234, 234, 234, 0.5);
      }

      &.active {
        color: #000;
      }

      &.empty {
        visibility: hidden;
        margin: 0;
        padding: 0;
      }

      &.add {
        color: rgba(0, 0, 0, 0.3);
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &.add:hover {
        color: #0f60ab;
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
