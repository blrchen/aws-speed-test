import { Component } from '@angular/core'
import { SeoService } from '../../../services'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent {
  constructor(private seoService: SeoService) {
    this.initializeSeoProperties()
  }

  private initializeSeoProperties(): void {
    this.seoService.setMetaTitle('About AWS Speed Test')
    this.seoService.setMetaDescription(
      'Explore AWS Speed Test tool for checking your network latency across multiple global AWS regions'
    )
    this.seoService.setMetaKeywords('AWS, speed test, network latency, Blair Chen, open-source')
    this.seoService.setCanonicalUrl('https://awsspeedtest.com/about')
  }
}
