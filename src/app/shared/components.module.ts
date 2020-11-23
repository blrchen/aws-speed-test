import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { RegionsComponent } from "./index";

@NgModule({
  declarations: [RegionsComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [RegionsComponent],
})
export class ComponentsModule {}
