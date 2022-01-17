import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, ErrorHandler } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { LineChartModule } from "@swimlane/ngx-charts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { APIService, GlobalErrorHandler, RegionService } from "./services";
import { ComponentsModule } from "./shared/components.module";
import { LatencyComponent } from "./latency/latency.component";


@NgModule({
  declarations: [AppComponent, LatencyComponent],
  imports: [AppRoutingModule, BrowserAnimationsModule, BrowserModule, ComponentsModule, HttpClientModule, LineChartModule, NgbModule],
  providers: [APIService, RegionService, { provide: ErrorHandler, useClass: GlobalErrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
