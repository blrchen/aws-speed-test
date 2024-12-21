import { Component, OnInit } from '@angular/core'
import { Region } from '../../../models'
import { SeoService } from '../../../services'

import data from '../../../../assets/data/regions.json'

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html'
})
export class RegionsComponent implements OnInit {
  tableData: Region[] = []

  constructor(private seoService: SeoService) {
    this.initializeSeoProperties()
  }

  ngOnInit() {
    this.tableData = data.sort((a, b) => a.geography.localeCompare(b.geography))
  }

  private initializeSeoProperties(): void {
    this.seoService.setMetaTitle('AWS Regions and Data Centers')
    this.seoService.setMetaDescription(
      'Explore AWS regions and their available data centers. Get insights into geography, region names, and availability zones.'
    )
    this.seoService.setMetaKeywords('AWS Regions, Data Centers, Availability Zones')
    this.seoService.setCanonicalUrl('https://awsspeedtest.com/regions')
  }
}
