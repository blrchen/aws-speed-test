import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { LineChartModule } from "@swimlane/ngx-charts";
import { AppComponent } from "./app.component";
import { APIService, GlobalErrorHandler, RegionService } from "./services";
import { ComponentsModule } from "./shared/components.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ComponentsModule, HttpClientModule, LineChartModule],
  providers: [APIService, RegionService, { provide: ErrorHandler, useClass: GlobalErrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
