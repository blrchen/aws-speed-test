import { Region } from '@/models'
import http from '@/utils/http'

export const getAssetsJson = <T = any[]>(fileName: string): Promise<T> => {
  return http.get<T>(`./assets/${fileName}.json`)
}

export const getRegions = (): Promise<Region[]> => {
  return http.get('/data/regions.json')
}
