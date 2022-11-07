import { ElMessageBox } from 'element-plus'

useHead({ title: computed(() => $t('MostPeople')) })

export const useIndex = () => {
  const router = useRouter()

  const user = useUserStore()
  const engine = useEngineStore()

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
      const now = form.sugIndex
      const len = form.sug.length
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

  return {
    sugElement,
    search,
    logo,
    form,
    engine,
    user,
  }
}
