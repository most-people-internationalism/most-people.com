export const useEngineStore = defineStore({
  id: 'engineStore',
  state: () => {
    return {
      outWall: false,
      index: 0,
      now: 0,
      name: '123',
      icon: '',
      list: [],
    }
  },
  actions: {},
})
