export interface Region {
  regionId: string
  displayName: string
  longName: string
  geography: string
  regionGroup: string
  geographicLocation: string
  latitude: number | null
  longitude: number | null
  datacenterLocation: string
  availabilityZoneCount: number
  availabilityZones: string[]
  launchYear: string | null
}

export interface RegionModel extends Region {
  geographicGroup: string
  storageAccountName: string
}
