import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { DefaultRegionsKey, RegionModel } from '../../../models'
import { RegionService } from '../../../services'

interface RegionGroupModel {
  geography: string
  regions: RegionModel[]
  checked?: boolean
}

@Component({
  selector: 'app-region-group',
  templateUrl: './region-group.component.html'
})
export class RegionGroupComponent implements OnInit {
  regionGroups: RegionGroupModel[] = []
  totalCheckedRegions = 0

  constructor(
    private regionService: RegionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const distinctGeographies = this.regionService
      .getAllRegions()
      .reduce((geographies: string[], region: RegionModel) => {
        if (!geographies.includes(region.geography)) {
          geographies.push(region.geography)
        }
        return geographies
      }, [])

    this.regionGroups = distinctGeographies
      .reduce((arr: RegionGroupModel[], geography: string) => {
        const regions = this.regionService
          .getAllRegions()
          .filter((_) => _.geography === geography)
          .map((_) => ({ ..._, checked: false }))

        arr.push({ geography, checked: false, regions })
        return arr
      }, [])
      .sort((a, b) => {
        return b.regions.length - a.regions.length
      })
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeRegions()
    }
  }

  onChange(region: RegionModel | null, group: RegionGroupModel) {
    if (region) {
      this.updateRegionCheckStatus(region, group)
    } else {
      this.updateGroupCheckStatus(group)
    }

    const checkedRegions = this.getCheckedRegions()
    this.regionService.updateSelectedRegions(checkedRegions)
  }

  private initializeRegions() {
    const storedRegions = localStorage.getItem(DefaultRegionsKey)
    const defaultRegions: RegionModel[] = storedRegions ? JSON.parse(storedRegions) : []
    if (Array.isArray(defaultRegions)) {
      this.regionGroups.forEach((group) => {
        let isGroupChecked = true

        group.regions.forEach((region) => {
          const isDefault = defaultRegions.some(
            (_) => _.storageAccountName === region.storageAccountName
          )
          if (isDefault) {
            region.checked = true
            this.totalCheckedRegions++
          }
          if (!region.checked) {
            isGroupChecked = false
          }
        })
        group.checked = isGroupChecked
      })
    }
  }

  private updateRegionCheckStatus(region: RegionModel, group: RegionGroupModel) {
    const { checked } = region
    if (checked) {
      group.checked = group.regions.every((_) => _.checked)
    } else {
      group.checked = false
    }
  }

  private updateGroupCheckStatus(group: RegionGroupModel) {
    const { checked, regions } = group
    regions.forEach((_) => {
      _.checked = checked
    })
  }

  private getCheckedRegions() {
    return this.regionGroups.reduce((checkedRegions: RegionModel[], group: RegionGroupModel) => {
      group.regions.forEach((region) => {
        if (region.checked) {
          checkedRegions.push(region)
        }
      })
      this.totalCheckedRegions = checkedRegions.length
      return checkedRegions
    }, [])
  }
}
