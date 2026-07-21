import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'latency',
    pathMatch: 'full',
  },
  {
    path: 'latency',
    loadComponent: () =>
      import('./pages/aws/latency/latency.component').then((m) => m.LatencyComponent),
  },
  {
    path: 'geographies',
    loadComponent: () =>
      import('./pages/aws/geographies/geographies.component').then((m) => m.GeographiesComponent),
  },
  {
    path: 'regions',
    loadComponent: () =>
      import('./pages/aws/regions/regions.component').then((m) => m.RegionsComponent),
  },
  {
    path: 'regions/:regionId',
    loadComponent: () =>
      import('./pages/aws/region-detail/region-detail.component').then(
        (m) => m.RegionDetailComponent
      ),
  },
  {
    path: 'availability-zones',
    loadComponent: () =>
      import('./pages/aws/availability-zones/availability-zones.component').then(
        (m) => m.AvailabilityZonesComponent
      ),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./pages/aws/privacy/privacy.component').then((m) => m.PrivacyComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/aws/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/shared/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/shared/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
]
