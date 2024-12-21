import { BehaviorSubject } from 'rxjs'
import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { DefaultRegionsKey, RegionModel } from '../models'
import data from '../../assets/data/regions.json'

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private selectedRegionsSubject = new BehaviorSubject<RegionModel[]>([])
  selectedRegions$ = this.selectedRegionsSubject.asObservable()

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const res = localStorage.getItem(DefaultRegionsKey)
      // If fetched region items from local storage is not valid, clear it
      try {
        const defaultRegions: RegionModel[] = JSON.parse(res || '[]')
        if (defaultRegions && defaultRegions[0]) {
          if (!defaultRegions[0].geography || !defaultRegions[0].name) {
            this.clearRegions()
          }
        }
      } catch (e) {
        console.log(e)
        this.clearRegions()
      }
    }
  }

  updateSelectedRegions(regions: RegionModel[]) {
    this.selectedRegionsSubject.next(regions)
    localStorage.setItem(DefaultRegionsKey, JSON.stringify(regions))
  }

  getAllRegions(): RegionModel[] {
    return data.map((regionData) => {
      const prefix = 'ast'
      const postfix = '8a1cce82'
      return {
        ...regionData,
        storageAccountName: `${prefix}-${regionData.name}-${postfix}`
      }
    })
  }

  clearRegions() {
    this.selectedRegionsSubject.next([])
    localStorage.removeItem(DefaultRegionsKey)
  }
}
