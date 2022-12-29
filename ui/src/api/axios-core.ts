import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export type ResponseExtended = AxiosResponse<any, any> & {
  region: string
  latency: number
  incomeTime: number
  sentTime: number
}

const CleanAxiosInstance = axios.create({
  xsrfCookieName: 'xsrf-token',
  // baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
})

const CancelTokenSource = () => {
  return axios.CancelToken.source()
}

const IsCancel = (error: any) => {
  return axios.isCancel(error)
}

const AxiosInstanceWithLatency = axios.create({
  // xsrfCookieName: 'xsrf-token',
  // baseURL: process.env.REACT_APP_API_URL,
  timeout: 1 * 60 * 1000
})

const onRequestFulfilled = async (config: AxiosRequestConfig) => {
  const heahers = config.headers

  config = {
    ...config,
    headers: {
      ...heahers,
      sentTime: new Date().getTime()
    }
  }
  return config
}

AxiosInstanceWithLatency.interceptors.request.use(onRequestFulfilled, (error) => {
  // console.log(error)
  return Promise.reject(error)
})

AxiosInstanceWithLatency.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    const incomeTime = new Date().getTime()
    const { config } = res
    const sentTime = config.headers?.sentTime as number
    const latency = incomeTime - sentTime
    console.log(`Execution time for: ${res.config.url} - ${latency} ms`)
    return { ...res, latency, incomeTime, sentTime }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { CleanAxiosInstance, AxiosInstanceWithLatency, CancelTokenSource, IsCancel }
