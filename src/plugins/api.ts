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

const showCode: { [key: string]: string } = {
  404: '请求失败，请检查网络',
}

export const initResponse = (response: AxiosResponse) => {
  if (response?.status === 200) {
    return response.data
  } else {
    const code = String(response?.status || 404)
    if (showCode[code]) {
      mp.error(showCode[code])
    } else {
      mp.error(`请求失败，错误码：${code}`)
    }
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
  title: string
  list: string[]
  note_id: number
  user_id: number
  is_public: boolean
  updated_time?: string
  author?: number[]
}

const api = {
  getNote(id: string): Promise<null | Note> {
    return axios({ url: '/note', params: { id } })
  },
  getUser(id: string) {
    return axios({ url: '/user', params: { id } })
  },
}
export default api
