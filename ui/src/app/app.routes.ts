import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'chatgpt',
    loadChildren: () => import('./pages/chatgpt/chatgpt.routes').then((_) => _.chatgptRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./pages/aws/aws.routes').then((_) => _.awsRoutes)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]
