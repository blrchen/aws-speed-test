import { Service, Signal, signal } from '@angular/core'

import geographyJson from '../../assets/data/geographies.json'
import regionJson from '../../assets/data/regions.json'
import { Geography, RegionModel } from '../models'

export interface RegionGroup {
  readonly regionGroup: string
  readonly regions: readonly RegionModel[]
}

@Service()
export class RegionService {
  private readonly selectedRegionsState = signal<readonly RegionModel[]>([])
  readonly selectedRegions: Signal<readonly RegionModel[]> = this.selectedRegionsState.asReadonly()

  private cachedRegions: readonly RegionModel[] | null = null
  private cachedRegionGroups: readonly RegionGroup[] | null = null
  private cachedGeographies: readonly Geography[] | null = null
  private readonly regionCollator = new Intl.Collator('en', { sensitivity: 'base' })

  getRegionByName(name: string): RegionModel | undefined {
    const normalized = name.toLowerCase()
    const normalizedCompact = normalized.replace(/\s+/g, '')
    return this.getAllRegions().find(
      (region) =>
        region.regionId.toLowerCase() === normalized ||
        region.displayName.toLowerCase() === normalized ||
        region.longName.toLowerCase().replace(/\s+/g, '') === normalizedCompact
    )
  }

  updateSelectedRegions(regions: readonly RegionModel[]): void {
    this.selectedRegionsState.set([...regions])
  }

  getAllRegions(): readonly RegionModel[] {
    if (this.cachedRegions) {
      return [...this.cachedRegions]
    }

    this.cachedRegions = Object.freeze(
      regionJson.map((regionData) =>
        this.freezeRegion({
          ...regionData,
          storageAccountName: this.buildStorageAccountName(regionData.regionId),
        })
      )
    )

    return [...this.cachedRegions]
  }

  getRegionGroups(): readonly RegionGroup[] {
    if (this.cachedRegionGroups) {
      return [...this.cachedRegionGroups]
    }

    const groupsByName = new Map<string, RegionModel[]>()

    for (const region of this.getAllRegions()) {
      const key = region.regionGroup
      if (!key) continue

      const group = groupsByName.get(key)
      if (group) {
        group.push(region)
      } else {
        groupsByName.set(key, [region])
      }
    }

    const collator = this.regionCollator
    this.cachedRegionGroups = Object.freeze(
      Array.from(groupsByName.entries())
        .map(([regionGroup, groupedRegions]) =>
          Object.freeze({
            regionGroup,
            regions: Object.freeze(
              [...groupedRegions].sort((a, b) => collator.compare(a.displayName, b.displayName))
            ),
          })
        )
        .sort((a, b) => b.regions.length - a.regions.length)
    )

    return [...this.cachedRegionGroups]
  }

  getAllGeographies(): readonly Geography[] {
    if (this.cachedGeographies) {
      return [...this.cachedGeographies]
    }

    this.cachedGeographies = Object.freeze(
      geographyJson.map((geography) =>
        Object.freeze({
          ...geography,
          regions: Object.freeze(
            geography.regions.map((regionData) =>
              this.freezeRegion({
                ...regionData,
                storageAccountName: this.buildStorageAccountName(regionData.regionId),
              })
            )
          ),
        })
      )
    )

    return [...this.cachedGeographies]
  }

  private buildStorageAccountName(regionId: string): string {
    return `ast-${regionId}-693a6c0`
  }

  private freezeRegion(region: RegionModel): RegionModel {
    return Object.freeze({
      ...region,
      availabilityZones: Object.freeze([...region.availabilityZones]),
    })
  }
}
