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

export const errorCode: { [key: string]: string } = {
  404: '请求失败，请检查网络',
  1001: '用户名已存在',
}

const initError = (status: number) => {
  const code = String(status)
  if (errorCode[code]) {
    mp.error(errorCode[code])
  } else {
    mp.error(`未知错误，错误码：${code}`)
  }
}

export const initResponse = (response: AxiosResponse) => {
  const status = response?.data?.statusCode || response?.status || 404
  if (status >= 200 && status < 300) {
    return response.data
  } else {
    initError(status)
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
  id: number
  user_id: number
  title: string
  list: string[]
  is_public: boolean

  updated_time?: string
  author?: number[]
}

export interface User {
  id: number
  name: string
  password_hash: string
  sign_time: string

  avatar?: string
  phone?: string
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
  register(name: string, password_hash: string): Promise<User | null> {
    return axios({ method: 'post', url: '/user/register', data: { name, password_hash } })
  },
}

export default api
