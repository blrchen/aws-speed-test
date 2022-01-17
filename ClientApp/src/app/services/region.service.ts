import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DefaultRegionsKey, RegionModel } from "../models";
import data from "../../assets/data/regions.json";

@Injectable({
  providedIn: "root",
})
export class RegionService {
  private regionSubject = new BehaviorSubject<RegionModel[]>([]);

  updateRegions(regions: RegionModel[]) {
    this.regionSubject.next(regions);
    localStorage.setItem(DefaultRegionsKey, JSON.stringify(regions));
  }

  getRegions(): Observable<RegionModel[]> {
    return this.regionSubject.asObservable();
  }

  getAllRegions(): RegionModel[] {
    const regions = data
      .map((_) => {
        const r = new RegionModel(_);
        const prefix = "ast";
        r.storageAccountName = `${prefix}${_.regionName}`;
        return r;
      })
      .filter((_) => _.accessEnabled);
    return regions;
  }

  clearRegions() {
    this.regionSubject.next(null);
    localStorage.removeItem(DefaultRegionsKey);
  }
}
