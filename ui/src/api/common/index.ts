import http from '@/utils/http'

export const getAssetsJson = <T = any[]>(fileName: string): Promise<T> => {
  return http.get<T>(`./assets/${fileName}.json`)
}
