import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterLink,
  RouterOutlet
} from '@angular/router'

import { FooterComponent } from './shared/footer/footer.component'
import { LucideIconComponent } from './shared/icons/lucide-icons.component'
import { NavGroup, NavGroupsComponent } from './shared/nav-groups/nav-groups.component'
import { ThemeToggleComponent } from './shared/theme'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    FooterComponent,
    NavGroupsComponent,
    LucideIconComponent,
    ThemeToggleComponent
  ],
  host: {
    '(document:keydown.escape)': 'handleEscapeKey()'
  },
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly router = inject(Router)
  private readonly destroyRef = inject(DestroyRef)

  readonly mobileNavOpen = signal(false)
  readonly isRouteLoading = signal(false)
  private readonly hasCompletedInitialNavigation = signal(false)
  readonly showRouteLoader = computed(
    () => this.hasCompletedInitialNavigation() && this.isRouteLoading()
  )

  readonly navGroups = signal<NavGroup[]>([
    {
      heading: 'Featured',
      items: [
        {
          label: 'ChatGPT Assistant',
          icon: 'sparkles',
          routerLink: '/chatgpt/chatgpt-assistant'
        }
      ]
    },
    {
      heading: 'Testing',
      items: [
        {
          label: 'AWS Latency Test',
          icon: 'zap',
          routerLink: '/latency'
        }
      ]
    },
    {
      heading: 'Resources',
      items: [
        {
          label: 'AWS Regions',
          icon: 'globe',
          routerLink: '/regions'
        },
        {
          label: 'AWS Availability Zones',
          icon: 'map-pin',
          routerLink: '/availability-zones'
        },
        {
          label: 'AWS Geographies',
          icon: 'globe',
          routerLink: '/geographies'
        }
      ]
    },
    {
      heading: 'Info',
      items: [
        {
          label: 'About',
          icon: 'info',
          routerLink: '/about'
        }
      ]
    }
  ])

  constructor() {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationStart || event instanceof RouteConfigLoadStart) {
        if (this.hasCompletedInitialNavigation()) {
          this.isRouteLoading.set(true)
        }
        return
      }

      if (
        event instanceof RouteConfigLoadEnd ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isRouteLoading.set(false)
        if (!this.hasCompletedInitialNavigation()) {
          this.hasCompletedInitialNavigation.set(true)
        }
      }
    })
  }

  toggleMobileNav(): void {
    this.mobileNavOpen.update((open) => !open)
  }

  closeMobileNav(): void {
    this.mobileNavOpen.set(false)
  }

  handleMobileNavigate(): void {
    this.closeMobileNav()
  }

  handleEscapeKey(): void {
    if (this.mobileNavOpen()) {
      this.closeMobileNav()
    }
  }
}
