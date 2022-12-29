export interface Region {
  availabilityZoneCount?: number
  displayName: string
  geography: string
  latitude?: string
  longitude?: string
  pairedRegion?: string
  physicalLocation?: string
  regionalDisplayName?: string
  regionName: string
  restricted: boolean
  accessEnabled: boolean
}

interface RegionExtends {
  checked?: boolean
  storageAccountName: string
  url?: string
}

interface RegionExtendLatency {
  latencySnapshot: number
  incomeTime: number
  sentTime: number
}

interface RegionExtendUploadSpeed {
  progress: string
  speed: string
  skipped: boolean
}

interface RegionExtendDownloadSpeed {
  downloadExternalUrl: string
}

/**
 * to learn how Intersection works in typescript
 * https://blog.logrocket.com/types-vs-interfaces-in-typescript/#:~:text=TypeScript%20will%20automatically%20merge%20both%20interfaces%20declarations%20into,properties%2C%20TypeScript%20would%20still%20throw%20us%20an%20error.?msclkid=a1135048c39411ecaa8226604ce6cbbd
 */
export type RegionModel = Region & RegionExtends
export type RegionLatencyModel = Region & RegionExtendLatency

export type RegionUploadSpeedModel = Region & RegionExtendUploadSpeed
export type RegionExtendDownloadModel = Region & RegionExtendDownloadSpeed

export interface RegionGroupModel {
  geography: string
  regions: RegionModel[]
  checked?: boolean
}

export type RegionLatencyStoreModel = {
  data: RegionLatencyModel[]
  time: Date
}
