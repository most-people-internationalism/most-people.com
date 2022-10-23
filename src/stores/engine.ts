import engines from '@/assets/engines.json'

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
      ids: [5, 1, 14, 52, 93, 6, 37, 44, 4, 16, 60, 2, 31, 3],
    }
  },
  getters: {
    now(): Engine {
      const engine = engines.find((e) => e.id === this.ids[this.index])
      return engine || engines[0]
    },
  },
  actions: {},
})
