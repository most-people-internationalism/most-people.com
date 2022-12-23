import Axios, { type AxiosResponse } from 'axios'

const api = Axios.create({
  baseURL: 'http://localhost:8001',
})

// interceptors https://axios-http.com/zh/docs/interceptors
api.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export const initError = (statusCode: number) => {
  console.log('error code:', statusCode)
}

export const initResponse = (response: AxiosResponse) => {
  if (!response.data?.statusCode) {
    response.data = { ok: false, statusCode: 404 }
  }
  // init error
  if (response.data.statusCode === 200) {
    response.data.ok = true
  } else {
    response.data.ok = false
    initError(response.data.statusCode)
  }
  return response.data
}

api.interceptors.response.use(
  function (response) {
    return initResponse(response)
  },
  function (error) {
    return initResponse(error.response)
  },
)

export default api
