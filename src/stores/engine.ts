import engines from '@/stores/engines'
import type { Engine } from '@/stores/engines'
import router from '@/plugins/router'

export const useEngineStore = defineStore({
  id: 'engineStore',
  state: () => {
    return {
      index: 0,
      ids: [5, 1, 14, 52, 93, 6, 37, 44, 4, 16, 60, 2, 31, 3],
      // ids: engines.map((e) => e.id),
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
