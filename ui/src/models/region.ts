export interface Region {
  displayName: string
  geography: string
  physicalLocation?: string
  regionName: string
  checked?: boolean
}

interface RegionStorageAccount {
  storageAccountName: string
  url?: string
}

export interface RegionLatencyModel extends Region {
  latencySnapshot: number
}

export interface RegionGroupModel {
  geography: string
  regions: Region[]
  checked?: boolean
}
