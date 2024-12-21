import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'chatgpt',
    loadChildren: () => import('./pages/chatgpt/chatgpt.module').then((_) => _.ChatGPTModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/aws/aws.module').then((_) => _.AwsModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
