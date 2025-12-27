import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core'
import { RouterLink } from '@angular/router'

import { Geography } from '../../../models'
import { RegionService, SeoService } from '../../../services'

@Component({
  selector: 'app-geographies',
  imports: [RouterLink],
  templateUrl: './geographies.component.html',
  styleUrl: './geographies.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeographiesComponent implements OnInit {
  private readonly seoService = inject(SeoService)
  private readonly regionService = inject(RegionService)

  readonly tableData = signal<Geography[]>(
    [...this.regionService.getAllGeographies()].sort((a, b) => a.name.localeCompare(b.name))
  )

  ngOnInit(): void {
    this.seoService.setMetaTitle('AWS Geographies | Regions and Compliance Info')
    this.seoService.setMetaDescription(
      'Explore AWS geographies, each containing multiple regions, to maintain data residency and compliance.'
    )
    this.seoService.setCanonicalUrl('https://awsspeedtest.com/geographies')
  }
}
