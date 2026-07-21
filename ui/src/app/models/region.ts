// Base interface matching the structure of regions.json
export interface Region {
  readonly regionId: string
  readonly displayName: string
  readonly longName: string
  readonly geography: string
  readonly regionGroup: string
  readonly geographicLocation: string
  readonly latitude: number | null
  readonly longitude: number | null
  readonly datacenterLocation: string
  readonly availabilityZoneCount: number
  readonly availabilityZones: readonly string[]
  readonly launchYear: string | null
}

// Extended interface with additional fields for application use
export interface RegionModel extends Region {
  readonly storageAccountName: string
}

export interface Geography {
  readonly name: string
  readonly regions: readonly RegionModel[]
}
