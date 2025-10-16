import { Injectable, Signal, signal } from '@angular/core'
import regionJson from '../../assets/data/regions.json'
import geographyJson from '../../assets/data/geographies.json'
import { RegionModel } from '../models'

export interface Geography {
  name: string
  regions: RegionModel[]
}

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private readonly selectedRegionsSignal = signal<RegionModel[]>([])
  readonly selectedRegions: Signal<RegionModel[]> = this.selectedRegionsSignal.asReadonly()

  // Memoization cache
  private cachedRegions: RegionModel[] | null = null
  private cachedGeographies: Geography[] | null = null

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
    this.selectedRegionsSignal.set(regions)
  }

  getAllRegions(): RegionModel[] {
    if (this.cachedRegions) {
      return this.cachedRegions
    }

    this.cachedRegions = regionJson.map((regionData) => {
      const prefix = 'ast'
      const postfix = '693a6c0'
      return {
        ...regionData,
        geographicGroup: regionData.regionGroup,
        storageAccountName: `${prefix}-${regionData.regionId}-${postfix}`
      }
    })

    return this.cachedRegions
  }

  getAllGeographies(): Geography[] {
    if (this.cachedGeographies) {
      return this.cachedGeographies
    }

    this.cachedGeographies = geographyJson.map((geography) => ({
      ...geography,
      regions: geography.regions.map((regionData) => {
        const prefix = 'ast'
        const postfix = '693a6c0'
        return {
          ...regionData,
          geographicGroup: regionData.regionGroup,
          storageAccountName: `${prefix}-${regionData.regionId}-${postfix}`
        }
      })
    }))

    return this.cachedGeographies
  }
}
