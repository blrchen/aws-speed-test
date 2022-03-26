import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { LineChartModule } from "@swimlane/ngx-charts";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../shared/shared.module";
import { AwsRoutingModule } from "./aws-routing.module";
import { AwsComponent, GeographiesComponent, LatencyComponent, RegionsComponent } from ".";

@NgModule({
  declarations: [AwsComponent, GeographiesComponent, LatencyComponent, RegionsComponent],
  imports: [CommonModule, AwsRoutingModule, SharedModule, HttpClientModule, LineChartModule, NgbModalModule, FormsModule],
  providers: [],
  bootstrap: [],
  entryComponents: [AwsComponent],
  exports: [],
})
export class AwsModule {}
