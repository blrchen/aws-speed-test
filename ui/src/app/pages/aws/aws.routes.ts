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
        data: { title: 'AWS Latency Test' },
        loadComponent: () => import('./latency/latency.component').then((m) => m.LatencyComponent)
      },
      {
        path: 'geographies',
        data: { title: 'AWS Geographies' },
        loadComponent: () =>
          import('./geographies/geographies.component').then((m) => m.GeographiesComponent)
      },
      {
        path: 'regions',
        data: { title: 'AWS Regions' },
        loadComponent: () => import('./regions/regions.component').then((m) => m.RegionsComponent)
      },
      {
        path: 'regions/:regionId',
        data: { title: 'AWS Region Detail' },
        loadComponent: () =>
          import('./region-detail/region-detail.component').then((m) => m.RegionDetailComponent)
      },
      {
        path: 'availability-zones',
        data: { title: 'AWS Availability Zones' },
        loadComponent: () =>
          import('./availability-zones/availability-zones.component').then(
            (m) => m.AvailabilityZonesComponent
          )
      },
      {
        path: 'privacy',
        data: { title: 'Privacy Policy' },
        loadComponent: () => import('./privacy/privacy.component').then((m) => m.PrivacyComponent)
      },
      {
        path: 'about',
        data: { title: 'About' },
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
