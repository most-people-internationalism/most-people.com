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
      />
      <div class="suffix">
        <mp-icon name="search" />
      </div>
    </div>

    <div ref="sugElement"></div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: computed(() => $t('MostPeople')) })

// data
const user = useUserStore()
const engine = useEngineStore()
const form = reactive({
  keyword: '',
  sug: [] as string[],
  sugIndex: -1,
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
      console.log('🌊', arr)
      form.sug = arr
      form.sugIndex = -1
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
          color: #333;
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
      transition: border 0.3s;
      border: 1px solid #eee;
      outline: 0;
      border-radius: 6px;

      &:hover {
        border-color: rgba(0, 0, 0, 0.24);
      }
      &:focus {
        border-color: rgba(0, 0, 0, 0.44);
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
  }
}

// pc
@media screen and (min-width: 800px) {
  #page-index {
    .el-input.search {
      width: 61.8%;
    }
  }
}
</style>
