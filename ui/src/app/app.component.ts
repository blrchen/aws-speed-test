import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { RegionService } from './services'
import { DefaultRegionsKey } from './models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(
    private regionService: RegionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const regions = localStorage.getItem(DefaultRegionsKey)
      this.regionService.updateSelectedRegions(regions ? JSON.parse(regions) : [])
    }
  }
}
