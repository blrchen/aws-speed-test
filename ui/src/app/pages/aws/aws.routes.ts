import { Routes } from '@angular/router'

export const awsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./aws.component').then((m) => m.AwsComponent),
    children: [
      {
        path: '',
        redirectTo: 'latency',
        pathMatch: 'full'
      },
      {
        path: 'latency',
        loadComponent: () => import('./latency/latency.component').then((m) => m.LatencyComponent)
      },
      {
        path: 'geographies',
        loadComponent: () =>
          import('./geographies/geographies.component').then((m) => m.GeographiesComponent)
      },
      {
        path: 'regions',
        loadComponent: () => import('./regions/regions.component').then((m) => m.RegionsComponent)
      },
      {
        path: 'regions/:regionId',
        loadComponent: () =>
          import('./region-detail/region-detail.component').then((m) => m.RegionDetailComponent)
      },
      {
        path: 'availability-zones',
        loadComponent: () =>
          import('./availability-zones/availability-zones.component').then(
            (m) => m.AvailabilityZonesComponent
          )
      },
      {
        path: 'privacy',
        loadComponent: () => import('./privacy/privacy.component').then((m) => m.PrivacyComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./about/about.component').then((m) => m.AboutComponent)
      },
      {
        path: '**',
        redirectTo: 'latency',
        pathMatch: 'full'
      }
    ]
  }
]
