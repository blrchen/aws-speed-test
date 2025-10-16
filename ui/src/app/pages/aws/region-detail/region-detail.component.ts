import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { distinctUntilChanged, map } from 'rxjs/operators'
import { RegionService, SeoService } from '../../../services'
import { RegionModel } from '../../../models'

@Component({
  selector: 'app-region-detail',
  standalone: true,
  templateUrl: './region-detail.component.html',
  imports: [CommonModule, RouterModule],
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
    this.seoService.setMetaTitle(`${region.longName} - AWS Region Details`)
    this.seoService.setMetaDescription(
      `Comprehensive information about AWS ${region.longName} region including location, availability zones, coordinates, and launch details.`
    )
    this.seoService.setCanonicalUrl(`https://awsspeedtest.com/regions/${regionId}`)
  }
}
