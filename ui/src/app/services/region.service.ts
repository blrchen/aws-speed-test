import { Injectable, Signal, signal } from '@angular/core'

import geographyJson from '../../assets/data/geographies.json'
import regionJson from '../../assets/data/regions.json'
import { Geography, RegionModel } from '../models'

export interface RegionGroup {
  regionGroup: string
  regions: RegionModel[]
}

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private readonly selectedRegionsState = signal<RegionModel[]>([])
  readonly selectedRegions: Signal<RegionModel[]> = this.selectedRegionsState.asReadonly()

  // Memoization cache
  private cachedRegions: RegionModel[] | null = null
  private cachedRegionGroups: RegionGroup[] | null = null
  private cachedGeographies: Geography[] | null = null
  private readonly regionCollator = new Intl.Collator('en', { sensitivity: 'base' })

  getRegionByName(name: string): RegionModel | undefined {
    const normalized = name.toLowerCase()
    return this.getAllRegions().find((region: RegionModel) => {
      const matchesRegionId = region.regionId.toLowerCase() === normalized
      const matchesDisplayName = region.displayName.toLowerCase() === normalized
      const matchesLongName = region.longName?.toLowerCase().replace(/\s+/g, '') === normalized

      return matchesRegionId || matchesDisplayName || matchesLongName
    })
  }

  updateSelectedRegions(regions: RegionModel[]): void {
    this.selectedRegionsState.set(regions)
  }

  getAllRegions(): RegionModel[] {
    if (this.cachedRegions) {
      return this.cachedRegions
    }

    this.cachedRegions = regionJson.map((regionData) => {
      return {
        ...regionData,
        storageAccountName: this.buildStorageAccountName(regionData.regionId)
      }
    })

    return this.cachedRegions
  }

  getRegionGroups(): RegionGroup[] {
    if (this.cachedRegionGroups) {
      return this.cachedRegionGroups
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
    this.cachedRegionGroups = Array.from(groupsByName.entries())
      .map(([regionGroup, groupedRegions]) => ({
        regionGroup,
        regions: [...groupedRegions].sort((a, b) => collator.compare(a.displayName, b.displayName))
      }))
      .sort((a, b) => b.regions.length - a.regions.length)

    return this.cachedRegionGroups
  }

  getAllGeographies(): Geography[] {
    if (this.cachedGeographies) {
      return this.cachedGeographies
    }

    this.cachedGeographies = geographyJson.map((geography) => ({
      ...geography,
      regions: geography.regions.map((regionData) => {
        return {
          ...regionData,
          storageAccountName: this.buildStorageAccountName(regionData.regionId)
        }
      })
    }))

    return this.cachedGeographies
  }

  private buildStorageAccountName(regionId: string): string {
    const prefix = 'ast'
    const postfix = '693a6c0'
    return `${prefix}-${regionId}-${postfix}`
  }
}
