import { Component, computed, effect, inject, input } from '@angular/core'
import { Router, RouterLink } from '@angular/router'

import { RegionModel } from '../../../models'
import { RegionService } from '../../../services/region.service'
import { SeoService } from '../../../services/seo.service'
import { LucideIconComponent } from '../../../shared/icons/lucide-icons.component'
import { buildRegionDetailRouterLink } from '../../../shared/utils'

@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.component.html',
  imports: [RouterLink, LucideIconComponent],
  host: { class: 'block' },
})
export class RegionDetailComponent {
  private readonly router = inject(Router)
  private readonly regionService = inject(RegionService)
  private readonly seoService = inject(SeoService)

  readonly regionId = input<string | undefined>(undefined)
  readonly region = computed<RegionModel | null>(() => {
    const regionId = this.regionId()?.trim()
    return regionId ? (this.regionService.getRegionByName(regionId) ?? null) : null
  })

  readonly mapsHref = computed(() => {
    const region = this.region()
    if (!region || region.latitude == null || region.longitude == null) return ''
    return `https://www.google.com/maps/search/${region.latitude},${region.longitude}`
  })
  readonly latencyQueryParams = computed(() => ({
    regions: this.region()?.regionId ?? this.regionId() ?? '',
  }))

  readonly relatedRegions = computed(() => {
    const current = this.region()
    if (!current) return []
    const allRegions = this.regionService.getAllRegions()
    return allRegions
      .filter((r) => r.regionId !== current.regionId && r.geography === current.geography)
      .slice(0, 6)
  })

  readonly regionSummary = computed(() => {
    const region = this.region()
    if (!region) return ''

    const descriptors = [
      region.datacenterLocation && `based in ${region.datacenterLocation}`,
      region.geography && `serving customers across ${region.geography}`,
    ].filter(Boolean)

    const intro = descriptors.length
      ? `AWS ${region.longName} (${region.regionId}) is ${descriptors.join(' and ')}.`
      : `AWS ${region.longName} (${region.regionId}) delivers regional AWS infrastructure.`

    const sentences = [intro]

    const zoneCount = region.availabilityZoneCount
    if (zoneCount > 0) {
      const zoneLabel = zoneCount === 1 ? 'availability zone' : 'availability zones'
      const zoneList = region.availabilityZones.length
        ? ` (${region.availabilityZones.join(', ')})`
        : ''
      sentences.push(`It offers ${zoneCount} ${zoneLabel}${zoneList}.`)
    }

    if (region.launchYear) {
      sentences.push(`The region launched in ${region.launchYear}.`)
    }

    return sentences.join(' ')
  })

  readonly buildRegionLink = buildRegionDetailRouterLink

  private navigatedToFallback = false

  constructor() {
    effect(() => this.handleNavigationAndSeo(this.regionId(), this.region()))
  }

  private handleNavigationAndSeo(regionId: string | undefined, region: RegionModel | null): void {
    if (!regionId || !region) {
      if (!this.navigatedToFallback) {
        this.navigatedToFallback = true
        void this.router.navigate(['/not-found'])
      }
      return
    }

    this.navigatedToFallback = false
    this.seoService.setPageMeta(this.buildSeoMeta(regionId, region))
  }

  private buildSeoMeta(
    regionId: string,
    region: RegionModel
  ): {
    title: string
    description: string
    canonicalUrl: string
  } {
    return {
      title: `${region.displayName} AWS Region | ${region.regionId}`,
      description: this.buildSeoDescription(region),
      canonicalUrl: `https://awsspeedtest.com/regions/${regionId}`,
    }
  }

  private buildSeoDescription(region: RegionModel): string {
    const locationParts = [
      ...new Set(
        [region.datacenterLocation, region.geography]
          .map((location) => location.trim())
          .filter(Boolean)
      ),
    ]
    const locationPhrase = locationParts.length ? ` in ${locationParts.join(', ')}` : ''

    return `Explore AWS ${region.displayName} (${region.regionId})${locationPhrase}. See availability zones, launch year, and nearby regions.`
  }
}
