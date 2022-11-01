import Bowser from 'bowser'

const browser = Bowser.getParser(window.navigator.userAgent)

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => {
    return {
      out_wall: false,
      keyword: '',
      isPC: browser.getPlatformType(true) !== 'mobile',
    }
  },
  actions: {},
})
