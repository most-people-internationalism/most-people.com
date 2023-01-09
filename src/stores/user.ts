import type { User } from '@/plugins/api'
import Bowser from 'bowser'

const browser = Bowser.getParser(window.navigator.userAgent)

interface UserStore {
  user: User | null
  out_wall: boolean
  keyword: string
  isPC: boolean
}

export const useUserStore = defineStore({
  id: 'userStore',
  state: (): UserStore => {
    return {
      user: null,
      out_wall: false,
      keyword: '',
      isPC: browser.getPlatformType(true) !== 'mobile',
    }
  },
  actions: {},
})
