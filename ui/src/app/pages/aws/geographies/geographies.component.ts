import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Geography, RegionService, SeoService } from '../../../services'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-geographies',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './geographies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeographiesComponent implements OnInit {
  private readonly seoService = inject(SeoService)
  private readonly regionService = inject(RegionService)

  readonly tableData = signal<Geography[]>(this.regionService.getAllGeographies())

  ngOnInit(): void {
    this.seoService.setMetaTitle('AWS Geographies | Regions and Compliance Info')
    this.seoService.setMetaDescription(
      'Explore AWS geographies, each containing multiple regions, to maintain data residency and compliance.'
    )
    this.seoService.setCanonicalUrl('https://awsspeedtest.com/geographies')
  }
}
