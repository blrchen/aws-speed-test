import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LatencyComponent } from "./latency/latency.component";

const routes: Routes = [
  { path: "latency", data: { title: "AWS Latency Test" }, component: LatencyComponent },
  { path: "", redirectTo: "/latency", pathMatch: "full" },
  // TODO: Add global 404 page for all invalid page
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
