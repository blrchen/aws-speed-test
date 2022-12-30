import { AxiosInstanceWithLatency, ResponseExtended } from '@/api/axios-core'
import { RegionModel } from '@/models'

export const getLatency = (region: RegionModel): Promise<ResponseExtended> => {
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
