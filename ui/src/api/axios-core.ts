import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface AxiosResponseWithLatency extends AxiosResponse<any, any> {
  region: string
  latency: number
  incomeTime: number
  sentTime: number
}

const AxiosInstanceWithLatency = axios.create({
  timeout: 5 * 1000
})

const onRequestFulfilled = async (config: AxiosRequestConfig) => {
  const headers = config.headers

  config = {
    ...config,
    headers: {
      ...headers,
      sentTime: new Date().getTime()
    }
  }
  return config
}

AxiosInstanceWithLatency.interceptors.request.use(onRequestFulfilled, (error) => {
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

export { AxiosInstanceWithLatency }
