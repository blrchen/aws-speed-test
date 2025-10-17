import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { FooterComponent } from './shared/footer/footer.component'
import { HeroIconComponent } from './shared/icons/hero-icons.imports'
import { NavGroup, NavGroupsComponent } from './shared/nav-groups/nav-groups.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    FooterComponent,
    NavGroupsComponent,
    HeroIconComponent
  ],
  host: {
    '(document:keydown.escape)': 'handleEscapeKey()'
  },
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly mobileNavOpen = signal(false)

  readonly navGroups = signal<NavGroup[]>([
    {
      heading: 'Testing',
      items: [
        {
          label: 'AWS Latency Test',
          icon: 'heroBolt',
          routerLink: '/latency'
        }
      ]
    },
    {
      heading: 'Resources',
      items: [
        {
          label: 'AWS Regions',
          icon: 'heroGlobeAlt',
          routerLink: '/regions'
        },
        {
          label: 'AWS Availability Zones',
          icon: 'heroMapPin',
          routerLink: '/availability-zones'
        },
        {
          label: 'AWS Geographies',
          icon: 'heroGlobeAmericas',
          routerLink: '/geographies'
        }
      ]
    },
    {
      heading: 'Info',
      items: [
        {
          label: 'About',
          icon: 'heroInformationCircle',
          routerLink: '/about'
        },
        {
          label: 'Privacy Policy',
          icon: 'heroShieldCheck',
          routerLink: '/privacy'
        }
      ]
    }
  ])

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
