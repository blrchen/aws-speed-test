import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { LayoutComponent, NotFoundComponent, RegionsComponent } from './index'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [LayoutComponent, NotFoundComponent, RegionsComponent],
  imports: [CommonModule, RouterModule, FormsModule, FontAwesomeModule],
  exports: [LayoutComponent, NotFoundComponent, RegionsComponent]
})
export class SharedModule {}
