import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LayoutComponent, NotFoundComponent, RegionGroupComponent } from "./index";

@NgModule({
  declarations: [LayoutComponent, NotFoundComponent, RegionGroupComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [LayoutComponent, NotFoundComponent, RegionGroupComponent],
})
export class SharedModule {}
