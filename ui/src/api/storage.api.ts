import { AxiosInstanceWithLatency, AxiosResponseWithLatency } from '@/api/axios-core'
import { Region } from '@/models'

export const getLatency = (region: Region): Promise<AxiosResponseWithLatency> => {
  const { regionName, geography } = region
  const storageAccountName = `a8${regionName}`
  const url =
    geography === 'China'
      ? `https://${storageAccountName}.blob.core.chinacloudapi.cn/public/latency-test.json`
      : `https://${storageAccountName}.blob.core.windows.net/public/latency-test.json`
  return AxiosInstanceWithLatency.get(url, {
    headers: {
      'Cache-Control': 'no-cache',
      Accept: '*/*'
    }
  })
}
