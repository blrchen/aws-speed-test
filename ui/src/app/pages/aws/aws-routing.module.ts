import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AwsComponent } from './aws.component'
import { AboutComponent, GeographiesComponent, LatencyComponent, RegionsComponent } from './index'

const routes: Routes = [
  {
    path: '',
    component: AwsComponent,
    children: [
      {
        path: 'latency',
        data: { title: 'AWS Latency Test' },
        component: LatencyComponent
      },
      {
        path: 'geographies',
        data: { title: 'AWS Geographies' },
        component: GeographiesComponent
      },
      {
        path: 'regions',
        data: { title: 'AWS Regions' },
        component: RegionsComponent
      },
      {
        path: 'about',
        data: { title: 'About' },
        component: AboutComponent
      },
      {
        path: '**',
        redirectTo: 'latency',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwsRoutingModule {}
