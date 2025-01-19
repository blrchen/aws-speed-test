export interface Region {
  displayName: string
  geographyGroup: string
  //geography: string
  physicalLocation: string
  name: string
  availabilityZoneCount: number
}

export interface RegionModel extends Region {
  checked?: boolean
  storageAccountName: string
}
