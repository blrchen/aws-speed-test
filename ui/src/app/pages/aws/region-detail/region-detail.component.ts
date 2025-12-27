import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { distinctUntilChanged, map } from 'rxjs'

import { RegionModel } from '../../../models'
import { RegionService, SeoService } from '../../../services'

@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.component.html',
  styleUrl: './region-detail.component.css',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegionDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly regionService = inject(RegionService)
  private readonly seoService = inject(SeoService)
  private readonly destroyRef = inject(DestroyRef)

  private readonly regionIdSignal = signal<string | null>(
    this.route.snapshot.paramMap.get('regionId')
  )

  readonly regionId = this.regionIdSignal.asReadonly()
  readonly region = computed<RegionModel | null>(() => {
    const regionId = this.regionId()
    if (!regionId) {
      return null
    }
    return this.regionService.getRegionByName(regionId) ?? null
  })
  readonly regionSummary = computed(() => {
    const region = this.region()
    if (!region) {
      return ''
    }

    const descriptors: string[] = []
    if (region.datacenterLocation) {
      descriptors.push(`based in ${region.datacenterLocation}`)
    }
    if (region.geography) {
      descriptors.push(`serving customers across ${region.geography}`)
    }

    const formatList = (items: string[]): string => {
      if (items.length <= 1) {
        return items[0] ?? ''
      }
      if (items.length === 2) {
        return `${items[0]} and ${items[1]}`
      }
      return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
    }

    let intro = `AWS ${region.longName} (${region.regionId})`
    if (descriptors.length > 0) {
      intro += ` is ${formatList(descriptors)}`
    } else {
      intro += ` delivers regional AWS infrastructure`
    }
    intro += '.'

    const sentences = [intro]

    const zoneCount = region.availabilityZoneCount ?? region.availabilityZones?.length ?? 0
    if (zoneCount > 0) {
      const zoneLabel = zoneCount === 1 ? 'availability zone' : 'availability zones'
      const zoneList =
        region.availabilityZones && region.availabilityZones.length > 0
          ? ` (${region.availabilityZones.join(', ')})`
          : ''
      sentences.push(`It offers ${zoneCount} ${zoneLabel}${zoneList}.`)
    }

    if (region.launchYear) {
      sentences.push(`The region launched in ${region.launchYear}.`)
    }

    return sentences.join(' ')
  })

  private navigatedToFallback = false

  ngOnInit(): void {
    // Subscribe to route changes and handle SEO
    this.route.paramMap
      .pipe(
        map((params) => params.get('regionId')),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((regionId) => {
        this.regionIdSignal.set(regionId)
        this.handleNavigationAndSeo(regionId, this.region())
      })
  }

  private handleNavigationAndSeo(regionId: string | null, region: RegionModel | null): void {
    if (!regionId || !region) {
      if (!this.navigatedToFallback) {
        this.navigatedToFallback = true
        void this.router.navigate(['/not-found'])
      }
      return
    }

    this.navigatedToFallback = false
    this.seoService.setMetaTitle(`AWS Region ${region.longName} - AWS Speed Test`)
    this.seoService.setMetaDescription(
      `Comprehensive information about AWS ${region.longName} region including location, availability zones, coordinates, and launch details.`
    )
    this.seoService.setCanonicalUrl(`https://awsspeedtest.com/regions/${regionId}`)
  }
}
