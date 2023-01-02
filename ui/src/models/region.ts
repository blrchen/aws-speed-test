export interface Region {
  displayName: string
  geography: string
  physicalLocation?: string
  regionName: string
  checked?: boolean
}
export interface RegionLatencyModel extends Region {
  latencySnapshot: number
}

export interface RegionGroupModel {
  geography: string
  regions: Region[]
  checked?: boolean
}
