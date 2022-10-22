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
      id: 0,
    }
  },
  getters: {
    engine(): Engine {
      const engine = engines.find((e) => e.id === this.id)
      return engine || engines[0]
    },
  },
  actions: {},
})
