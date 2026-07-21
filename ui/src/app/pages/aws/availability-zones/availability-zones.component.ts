import { Component, inject, OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'

import regionJson from '../../../../assets/data/regions.json'
import { Region } from '../../../models'
import { SeoService } from '../../../services/seo.service'
import { LucideIconComponent } from '../../../shared/icons/lucide-icons.component'
import { REGION_DIRECTORY_COLLATOR } from '../../../shared/region-directory'
import { buildRegionDetailRouterLink } from '../../../shared/utils'

const ALL_REGIONS = regionJson as Region[]

@Component({
  selector: 'app-availability-zones',
  imports: [RouterLink, LucideIconComponent],
  templateUrl: './availability-zones.component.html',
  host: { class: 'block' },
})
export class AvailabilityZonesComponent implements OnInit {
  private readonly seoService = inject(SeoService)

  readonly tableData = ALL_REGIONS.filter((region) => region.availabilityZoneCount > 0).sort(
    (left, right) => REGION_DIRECTORY_COLLATOR.compare(left.displayName, right.displayName)
  )
  readonly totalAvailabilityZoneCount = this.tableData.reduce(
    (total, region) => total + region.availabilityZoneCount,
    0
  )
  readonly minimumAvailabilityZoneCount = this.tableData.reduce<number | null>(
    (minimum, region) =>
      minimum === null
        ? region.availabilityZoneCount
        : Math.min(minimum, region.availabilityZoneCount),
    null
  )
  protected readonly buildRegionDetailRouterLink = buildRegionDetailRouterLink

  ngOnInit(): void {
    this.seoService.setPageMeta({
      title: 'AWS Availability Zones',
      description:
        'Explore AWS Availability Zones by region, including zone counts and identifiers for resilient multi-AZ architecture planning.',
      canonicalUrl: 'https://awsspeedtest.com/availability-zones',
    })
  }
}
