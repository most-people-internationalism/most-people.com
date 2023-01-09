import { ElMessageBox } from 'element-plus'

export const useIndex = () => {
  const userStore = useUserStore()
  const engineStore = useEngineStore()

  // data
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
      userStore.keyword = keyword
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
      if (userStore.isPC) {
        url = engineStore.now.pc
        // 有关键字
        if (keyword) {
          url = url.replace(mp.re('#{keyword}'), keyword)
        } else {
          url = engineStore.now.home_pc || mp.url(url).origin
        }
      } else {
        url = engineStore.now.mobile || engineStore.now.pc
        // 有关键字
        if (keyword) {
          url = url.replace(mp.re('#{keyword}'), keyword)
        } else {
          url = engineStore.now.home_mobile || mp.url(url).origin
        }
      }
      if (!engineStore.now.pc && engineStore.now.app) {
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
      const { keyCode, code } = event
      const ArrowUp = code === 'ArrowUp' || keyCode === 38

      if (ArrowUp) {
        event.preventDefault()
      }
    },
    keyup(event: KeyboardEvent) {
      const { keyCode, code } = event
      const ArrowUp = code === 'ArrowUp' || keyCode === 38
      const ArrowDown = code === 'ArrowDown' || keyCode === 40
      const Enter = code === 'Enter' || keyCode === 13

      const now = form.sugIndex
      const len = form.sug.length
      if (ArrowUp) {
        form.sugIndex = (now + len - 1) % len
      } else if (ArrowDown) {
        form.sugIndex = (now + len + 1) % len
        form.keyword = form.sug[form.sugIndex]
      } else if (Enter) {
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
      if (engineStore.index > 0) engineStore.index -= 1
    },
    next() {
      if (engineStore.index < engineStore.ids.length - 1) engineStore.index += 1
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

  return {
    sugElement,
    search,
    logo,
    form,
    engineStore,
    userStore,
  }
}
