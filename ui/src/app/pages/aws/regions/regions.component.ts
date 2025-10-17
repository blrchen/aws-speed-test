import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { toSignal } from '@angular/core/rxjs-interop'
import { Region } from '../../../models'
import { RegionService, SeoService } from '../../../services'
import { HeroIconComponent } from '../../../shared/icons/hero-icons.imports'

@Component({
  selector: 'app-regions',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HeroIconComponent],
  templateUrl: './regions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegionsComponent implements OnInit {
  private readonly seoService = inject(SeoService)
  private readonly regionService = inject(RegionService)
  private readonly formBuilder = inject(NonNullableFormBuilder)
  private readonly regions = signal<Region[]>(
    this.regionService.getAllRegions().sort((a, b) => a.geography.localeCompare(b.geography))
  )

  readonly filtersForm = this.formBuilder.group({
    search: [''],
    regionGroup: ['all']
  })

  private readonly filtersValue = toSignal(this.filtersForm.valueChanges, {
    initialValue: this.filtersForm.getRawValue()
  })

  readonly totalRegions = computed(() => this.regions().length)
  readonly totalAZs = computed(() =>
    this.regions().reduce((sum, r) => sum + (r.availabilityZoneCount || 0), 0)
  )
  readonly uniqueGeographies = computed(() => new Set(this.regions().map((r) => r.geography)).size)
  readonly availableGeographies = computed(() =>
    [...new Set(this.regions().map((region) => region.regionGroup))].sort()
  )
  readonly filteredData = computed<Region[]>(() => {
    const { search, regionGroup } = this.filtersValue()
    const selectedRegionGroup = regionGroup ?? 'all'
    const normalizedSearch = (search ?? '').trim().toLowerCase()

    return this.regions().filter((region) => {
      const matchesGroup =
        selectedRegionGroup === 'all' || region.regionGroup === selectedRegionGroup
      if (!normalizedSearch) {
        return matchesGroup
      }

      return (
        (region.regionId.toLowerCase().includes(normalizedSearch) ||
          region.longName.toLowerCase().includes(normalizedSearch) ||
          region.datacenterLocation.toLowerCase().includes(normalizedSearch) ||
          region.geography.toLowerCase().includes(normalizedSearch) ||
          region.regionGroup.toLowerCase().includes(normalizedSearch)) &&
        matchesGroup
      )
    })
  })

  formatRegionLongName(region: Region): string {
    if (!region.longName) {
      return region.displayName
    }

    return region.longName.replace(` ${region.regionId}`, '').trim()
  }

  ngOnInit(): void {
    this.seoService.setMetaTitle('AWS Regions and Data Centers')
    this.seoService.setMetaDescription(
      'Explore AWS regions and their available data centers. Get insights into geography, region names, and availability zones.'
    )
    this.seoService.setCanonicalUrl('https://awsspeedtest.com/regions')
  }

  trackByRegion(index: number, region: Region): string {
    return region.regionId || `region-${index}`
  }

  hasActiveFilters(): boolean {
    const { search, regionGroup } = this.filtersValue()
    return Boolean((search ?? '').trim()) || (regionGroup ?? 'all') !== 'all'
  }

  clearFilters(): void {
    this.filtersForm.setValue({ search: '', regionGroup: 'all' })
  }
}
