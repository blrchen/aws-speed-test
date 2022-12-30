export interface Region {
  displayName: string
  geography: string
  physicalLocation?: string
  regionName: string
  checked?: boolean
}

interface RegionStorageAccount {
  checked?: boolean
  storageAccountName: string
  url?: string
}

interface RegionLatency {
  latencySnapshot: number
}

/**
 * to learn how Intersection works in typescript
 * https://blog.logrocket.com/types-vs-interfaces-in-typescript/#:~:text=TypeScript%20will%20automatically%20merge%20both%20interfaces%20declarations%20into,properties%2C%20TypeScript%20would%20still%20throw%20us%20an%20error.?msclkid=a1135048c39411ecaa8226604ce6cbbd
 */
export type RegionModel = Region & RegionStorageAccount
export type RegionLatencyModel = Region & RegionLatency

export interface RegionGroupModel {
  geography: string
  regions: Region[]
  checked?: boolean
}
