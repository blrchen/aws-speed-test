import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: 'chatgpt',
    loadChildren: () => import('./chatgpt/chatgpt.module').then((m) => m.ChatGPTModule)
  },
  {
    path: '',
    loadChildren: () => import('./aws/aws.module').then((m) => m.AwsModule)
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
