import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'
import regionJson from '../../assets/data/regions.json'
import { RegionModel } from '../models'

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private selectedRegionsSubject = new BehaviorSubject<RegionModel[]>([])
  selectedRegions$ = this.selectedRegionsSubject.asObservable()

  updateSelectedRegions(regions: RegionModel[]) {
    this.selectedRegionsSubject.next(regions)
  }

  getAllRegions(): RegionModel[] {
    return regionJson.map((regionData) => {
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
  }
}
