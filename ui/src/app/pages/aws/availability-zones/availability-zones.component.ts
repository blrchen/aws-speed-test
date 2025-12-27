import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'

import { Region } from '../../../models'
import { RegionService, SeoService } from '../../../services'
import { LucideIconComponent } from '../../../shared/icons/lucide-icons.component'

@Component({
  selector: 'app-availability-zones',
  imports: [ReactiveFormsModule, RouterLink, LucideIconComponent],
  templateUrl: './availability-zones.component.html',
  styleUrl: './availability-zones.component.css',
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

  readonly totalRegions = computed(() => this.regions().length)
  readonly totalAZs = computed(() =>
    this.regions().reduce((sum, region) => sum + (region.availabilityZoneCount || 0), 0)
  )
  readonly minAzPerRegion = computed(() => {
    const counts = this.regions()
      .map((region) => region.availabilityZoneCount || 0)
      .filter((count) => count > 0)
    return counts.length ? Math.min(...counts) : null
  })

  readonly availableGeographies = computed(() =>
    [...new Set(this.regions().map((region) => region.regionGroup))].sort()
  )

  readonly hasSearchTerm = computed(() => {
    const { search } = this.filtersValue()
    return (search ?? '').trim().length > 0
  })

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

  hasActiveFilters(): boolean {
    const { search, geography } = this.filtersValue()
    return Boolean((search ?? '').trim()) || (geography ?? 'all') !== 'all'
  }

  clearFilters(): void {
    this.filtersForm.setValue({ search: '', geography: 'all' })
  }

  clearSearch(): void {
    this.filtersForm.controls.search.setValue('')
  }
}
