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
  const status = response?.status || 404
  // 2xx
  if (status >= 200 && status < 300) {
    return response.data
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
  getNote(id: string): Promise<null | Note> {
    return axios({ url: '/note', params: { id } })
  },
  getUser(id: string): Promise<null | User> {
    return axios({ url: '/user', params: { id } })
  },
  checkUserName(name: string): Promise<null | boolean> {
    return axios({ method: 'post', url: '/user/check.name', data: { name } })
  },
  register(name: string, passwordHash: string): Promise<null | User> {
    return axios({ method: 'post', url: '/user/register', data: { name, passwordHash } })
  },
}
export default api
