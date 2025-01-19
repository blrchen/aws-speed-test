import { Component, OnInit } from '@angular/core'
import { Region } from '../../../models'
import { SeoService } from '../../../services'

import data from '../../../../assets/data/geographies.json'

export interface Geography {
  name: string
  regions: Region[]
}

@Component({
  selector: 'app-geographies',
  templateUrl: './geographies.component.html'
})
export class GeographiesComponent implements OnInit {
  tableData: Geography[] = []

  constructor(private seoService: SeoService) {
    this.initializeSeoProperties()
  }

  ngOnInit() {
    this.tableData = data
  }

  private initializeSeoProperties(): void {
    this.seoService.setMetaTitle('AWS Geographies | Regions and Compliance Info')
    this.seoService.setMetaDescription(
      'Explore AWS geographies, each containing multiple regions, to maintain data residency and compliance.'
    )
    this.seoService.setCanonicalUrl('https://awsspeedtest.com/geographies')
  }
}
