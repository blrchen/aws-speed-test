import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { LineChartModule } from '@swimlane/ngx-charts'
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedModule } from '../shared/shared.module'
import { AwsRoutingModule } from './aws-routing.module'
import {
  AboutComponent,
  AwsComponent,
  GeographiesComponent,
  LatencyComponent,
  RegionsComponent
} from '.'

@NgModule({
  declarations: [
    AwsComponent,
    AboutComponent,
    GeographiesComponent,
    LatencyComponent,
    RegionsComponent
  ],
  imports: [
    CommonModule,
    AwsRoutingModule,
    SharedModule,
    LineChartModule,
    NgbModalModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [],
  exports: []
})
export class AwsModule {}
