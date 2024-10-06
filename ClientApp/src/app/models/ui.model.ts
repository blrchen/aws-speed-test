export const DefaultRegionsKey = 'currentSelectedRegions'

export interface Region {
  displayName: string
  geography: string
  physicalLocation?: string
  name: string
  availabilityZoneCount?: number
}

export interface RegionModel extends Region {
  averageLatency?: number
  checked?: boolean
  storageAccountName?: string
}
