import { isPlatformBrowser, Location } from '@angular/common'
import {
  afterNextRender,
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core'
import { form, FormField } from '@angular/forms/signals'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'

import regionJson from '../../../../assets/data/regions.json'
import { Region } from '../../../models'
import { SeoService } from '../../../services/seo.service'
import { LucideIconComponent } from '../../../shared/icons/lucide-icons.component'
import {
  AvailabilityZoneFilter,
  countGeographies,
  createRegionGroupCatalog,
  formatCount,
  groupRegionsByGeography,
  normalizeSearchInput,
  normalizeSearchValue,
  normalizeZoneFilterInput,
  toQueryValue,
} from '../../../shared/region-directory'
import { buildRegionDetailRouterLink } from '../../../shared/utils'

interface GeographyViewState {
  readonly search: string
  readonly regionGroup: string
  readonly zoneSupport: AvailabilityZoneFilter
}

const PAGE_URL = 'https://awsspeedtest.com/geographies'
const PAGE_DESCRIPTION =
  'Browse AWS geographies and regions, compare availability-zone support, and filter the global infrastructure directory by AWS region group.'
const ALL_REGIONS = regionJson as Region[]
const REGION_GROUPS = createRegionGroupCatalog(ALL_REGIONS)

@Component({
  selector: 'app-geographies',
  imports: [FormField, LucideIconComponent, RouterLink],
  templateUrl: './geographies.component.html',
  host: { class: 'block' },
})
export class GeographiesComponent implements OnInit {
  private readonly seoService = inject(SeoService)
  private readonly location = inject(Location)
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID))
  private readonly canSyncUrl = signal(false)

  readonly q = input('', { transform: normalizeSearchInput })
  readonly group = input('', { transform: REGION_GROUPS.normalizeInput })
  readonly zones = input<AvailabilityZoneFilter, string | undefined>('', {
    transform: normalizeZoneFilterInput,
  })

  readonly regionGroupOptions = REGION_GROUPS.options
  protected readonly buildRegionDetailRouterLink = buildRegionDetailRouterLink

  private readonly routeViewState = computed<GeographyViewState>(() => ({
    search: this.q(),
    regionGroup: this.group(),
    zoneSupport: this.zones(),
  }))

  readonly filtersModel = linkedSignal(() => this.routeViewState())
  readonly filtersForm = form(this.filtersModel, { name: 'awsGeographiesFilters' })

  readonly selectedRegionGroup = computed(() =>
    REGION_GROUPS.byValue.get(this.filtersModel().regionGroup)
  )

  readonly selectedRegionGroupDescription = computed(() => {
    const selectedGroup = this.selectedRegionGroup()
    if (!selectedGroup) {
      return 'Browse all AWS regions grouped by geography.'
    }
    return (
      'Browse ' +
      formatCount(selectedGroup.count, 'region', 'regions') +
      ' in the ' +
      selectedGroup.label +
      ' region group.'
    )
  })

  readonly groupRegions = computed(() => {
    const selectedGroup = this.selectedRegionGroup()?.label
    return selectedGroup
      ? ALL_REGIONS.filter((region) => region.regionGroup === selectedGroup)
      : ALL_REGIONS
  })

  readonly groupRegionCount = computed(() => this.groupRegions().length)
  readonly groupGeographyCount = computed(() => countGeographies(this.groupRegions()))
  readonly availabilityZoneRegionCount = computed(
    () => this.groupRegions().filter((region) => region.availabilityZoneCount > 0).length
  )

  readonly filteredGeographies = computed(() => {
    const { search, zoneSupport } = this.filtersModel()
    const normalizedSearch = normalizeSearchValue(search.trim())

    const filteredRegions = this.groupRegions().filter((region) => {
      if (zoneSupport === 'supported' && region.availabilityZoneCount === 0) return false
      if (zoneSupport === 'unsupported' && region.availabilityZoneCount > 0) return false

      if (!normalizedSearch) return true

      return [
        region.regionId,
        region.displayName,
        region.longName,
        region.geography,
        region.regionGroup,
        region.geographicLocation,
        region.datacenterLocation,
        region.availabilityZones.join(' '),
        region.launchYear ?? '',
      ].some((value) => normalizeSearchValue(value).includes(normalizedSearch))
    })

    return groupRegionsByGeography(filteredRegions)
  })

  readonly filteredRegionCount = computed(() =>
    this.filteredGeographies().reduce((total, geography) => total + geography.regions.length, 0)
  )

  readonly resultSummary = computed(() => {
    const shownGeographies = this.filteredGeographies().length
    const shownRegions = this.filteredRegionCount()
    const totalGeographies = this.groupGeographyCount()
    const totalRegions = this.groupRegionCount()

    if (shownGeographies === totalGeographies && shownRegions === totalRegions) {
      return (
        'Showing ' +
        formatCount(shownGeographies, 'geography', 'geographies') +
        ' and ' +
        formatCount(shownRegions, 'region', 'regions')
      )
    }

    return (
      'Showing ' +
      shownGeographies +
      ' of ' +
      totalGeographies +
      ' geographies and ' +
      shownRegions +
      ' of ' +
      totalRegions +
      ' regions'
    )
  })

  readonly tableCaption = computed(
    () => this.resultSummary() + '. Regions are grouped by AWS geography.'
  )

  readonly hasActiveFilters = computed(() => {
    const { search, regionGroup, zoneSupport } = this.filtersModel()
    return Boolean(search.trim() || regionGroup || zoneSupport)
  })

  constructor() {
    if (this.isBrowser) {
      afterNextRender(() => this.canSyncUrl.set(true))

      effect(() => {
        if (!this.canSyncUrl()) return
        this.syncUrlState(this.filtersModel(), this.routeViewState())
      })
    }
  }

  ngOnInit(): void {
    this.seoService.setPageMeta({
      title: 'AWS Geographies | Regions and Data Residency',
      description: PAGE_DESCRIPTION,
      canonicalUrl: PAGE_URL,
    })
  }

  clearFilters(): void {
    this.filtersModel.update((state) => ({
      ...state,
      search: '',
      regionGroup: '',
      zoneSupport: '',
    }))
  }

  clearSearch(): void {
    this.filtersModel.update((state) => ({ ...state, search: '' }))
  }

  geographyAnchor(name: string): string {
    return 'geography-' + toQueryValue(name)
  }

  private syncUrlState(nextState: GeographyViewState, routeState: GeographyViewState): void {
    const nextQueryParams = this.buildQueryParams(nextState)
    const currentQueryParams = this.buildQueryParams(routeState)
    if (JSON.stringify(nextQueryParams) === JSON.stringify(currentQueryParams)) return

    const urlTree = this.router.createUrlTree([], {
      relativeTo: this.route,
      queryParams: nextQueryParams,
      queryParamsHandling: 'merge',
      preserveFragment: true,
    })
    this.location.replaceState(this.router.serializeUrl(urlTree))
  }

  private buildQueryParams(state: GeographyViewState): Record<string, string | null> {
    const search = state.search.trim()
    return {
      q: search || null,
      group: state.regionGroup || null,
      zones: state.zoneSupport || null,
    }
  }
}
