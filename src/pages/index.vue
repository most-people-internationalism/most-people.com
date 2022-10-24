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

    <el-input
      class="search"
      v-model="form.keyword"
      placeholder="风雨多经人不老 关山初度路犹长"
      size="large"
      @input="search.input"
    >
      <template #suffix>
        <el-icon>
          <Search />
        </el-icon>
      </template>
    </el-input>
    <div ref="sugElement"></div>

    <!-- <input
        ref="search"
        type="text"
        v-model="keyword"
        @keydown="bindKeyDown"
        @keyup="bindKeyUp"
        @input="bindInput"
        @focus="bindFocus"
        @blur="bindBlur"
        :class="{ active: inputFocus && sugArr.length }"
        :placeholder="engineNow.placeholder || ''"
        autofocus
      />
      <div class="clear" v-show="keyword || showSug" @mousedown.prevent="bindClear">
        <icon name="close" />
      </div>
      <div class="btn" @click="bindSearch(null)">
        <icon name="search" />
      </div> -->
    <!-- <div class="sug" v-show="showSug" @mouseout="sugNow = null">
      <div
        @mouseover="sugNow = i"
        class="one"
        :class="{ active: sugNow === i }"
        v-for="(e, i) in sugArr"
        @mousedown.prevent="bindSearch(e)"
        :key="i"
      >
        {{ e }}
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

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
  .el-input.search {
    margin-top: 30px;
    width: 100%;
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
