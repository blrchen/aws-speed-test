import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { toSignal } from '@angular/core/rxjs-interop'
import { Region } from '../../../models'
import { RegionService, SeoService } from '../../../services'
import { HeroIconComponent } from '../../../shared/icons/hero-icons.imports'

@Component({
  selector: 'app-availability-zones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeroIconComponent],
  templateUrl: './availability-zones.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvailabilityZonesComponent implements OnInit {
  private readonly seoService = inject(SeoService)
  private readonly regionService = inject(RegionService)
  private readonly formBuilder = inject(NonNullableFormBuilder)
  private readonly regions = signal<Region[]>(this.regionService.getAllRegions())

  readonly filtersForm = this.formBuilder.group({
    search: [''],
    geography: ['all']
  })

  private readonly filtersValue = toSignal(this.filtersForm.valueChanges, {
    initialValue: this.filtersForm.getRawValue()
  })

  readonly availableGeographies = computed(() =>
    [...new Set(this.regions().map((region) => region.regionGroup))].sort()
  )

  readonly filteredData = computed<Region[]>(() => {
    const { search, geography } = this.filtersValue()
    const geographyFilter = geography ?? 'all'
    const term = (search ?? '').trim().toLowerCase()

    return this.regions().filter((region) => {
      const matchesGeography = geographyFilter === 'all' || region.regionGroup === geographyFilter
      if (!term) {
        return matchesGeography
      }

      const matchesSearch =
        region.regionId.toLowerCase().includes(term) ||
        region.longName.toLowerCase().includes(term) ||
        region.datacenterLocation.toLowerCase().includes(term) ||
        region.geography.toLowerCase().includes(term) ||
        region.regionGroup.toLowerCase().includes(term)

      return matchesGeography && matchesSearch
    })
  })

  ngOnInit(): void {
    this.seoService.setMetaTitle('AWS Availability Zones')
    this.seoService.setMetaDescription(
      'Explore AWS Availability Zones (AZs) - isolated data centers engineered for high availability, fault tolerance, and reliable cloud infrastructure.'
    )
    this.seoService.setCanonicalUrl('https://awsspeedtest.com/availability-zones')
  }
}
