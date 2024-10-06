import { Component } from '@angular/core'
import { FaIconLibrary } from '@fortawesome/angular-fontawesome'
import {
  faList,
  faRobot,
  faTachometerAlt,
  faGlobeAmericas,
  faMapMarkedAlt,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'

@Component({
  templateUrl: './layout.component.html',
  selector: 'app-layout'
})
export class LayoutComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faList,
      faRobot,
      faTachometerAlt,
      faGlobeAmericas,
      faMapMarkedAlt,
      faInfoCircle
    )
  }
}
