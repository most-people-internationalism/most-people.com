import Axios, { type AxiosResponse } from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:8001',
})

// interceptors https://axios-http.com/zh/docs/interceptors
axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export const initResponse = (response: AxiosResponse) => {
  // init error
  if (response.status === 200) {
    return response.data
  } else {
    mp.error(`请求失败，错误码：${response.status}`)
    return null
  }
}

axios.interceptors.response.use(
  function (response) {
    return initResponse(response)
  },
  function (error) {
    return initResponse(error.response)
  },
)

export interface Note {
  is_public: boolean
  user_id: number
  arr: string[]
  id: number
  title: string
}

const api = {
  getNote(id: string): Promise<Note | null> {
    return axios({ url: '/note', params: { id } })
  },
}
export default api
