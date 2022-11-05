import engines from '@/assets/engines.json'
import router from '@/plugins/router'

export interface Engine {
  name: string
  color: string
  pc: string
  mobile: string
  id: number
  out_wall: boolean
  tags: string[]
  icon: string
  app: string
  home_mobile: string
  home_pc: string
}

export const useEngineStore = defineStore({
  id: 'engineStore',
  state: () => {
    return {
      index: 0,
      // ids: [5, 1, 14, 52, 93, 6, 37, 44, 4, 16, 60, 2, 31, 3],
      ids: engines.map((e) => e.id),
    }
  },
  getters: {
    now(): Engine {
      const engine = engines.find((e) => e.id === this.ids[this.index])
      return engine || engines[0]
    },
    list(): Engine[] {
      const list = []
      for (const id of this.ids) {
        const e = engines.find((engine) => engine.id === id)
        if (e) {
          list.push(e)
        }
      }
      return list
    },
  },
  actions: {
    click(i: number) {
      this.index = i
    },
    add() {
      router.push('/engines')
    },
  },
})
