import Axios, { type AxiosResponse } from 'axios'

const axios = Axios.create({
  baseURL: import.meta.env.PROD ? 'https://43.139.26.30:1976' : 'http://localhost:8001',
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
  const status = response?.status || 404
  // 2xx
  if (status >= 200 && status < 300) {
    return response.data || null
  } else {
    const code = String(status)
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
  note_id: number
  user_id: number
  title: string
  list: string[]
  is_public: boolean

  updated_time?: string
  author?: number[]
}

export interface User {
  user_id: number
  name: string
  password_hash: string
  sign_time: string

  task_list?: string[]
  task_history?: string[]
  motto?: string
}

const api = {
  getNote(id: string): Promise<Note | null> {
    return axios({ url: '/note', params: { id } })
  },
  getUser(name: string): Promise<User | null> {
    return axios({ url: '/user', params: { name } })
  },
  checkUserName(name: string): Promise<boolean> {
    return axios({ method: 'post', url: '/user/check.name', data: { name } })
  },
  register(name: string, passwordHash: string): Promise<User | null> {
    return axios({ method: 'post', url: '/user/register', data: { name, passwordHash } })
  },
}

export default api
