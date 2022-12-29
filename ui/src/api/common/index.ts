import { RegionModel } from '@/models'
import http from '@/utils/http'

export const getAssetsJson = <T = any[]>(fileName: string): Promise<T> => {
  return http.get<T>(`./assets/${fileName}.json`)
}

export const getRegions = (): Promise<RegionModel[]> => {
  return http.get('/data/regions.json')
}
