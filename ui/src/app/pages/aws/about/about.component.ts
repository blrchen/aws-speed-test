import { Component, inject, OnInit } from '@angular/core'

import { SeoService } from '../../../services/seo.service'
import { LucideIconComponent } from '../../../shared/icons/lucide-icons.component'

@Component({
  selector: 'app-about',
  imports: [LucideIconComponent],
  templateUrl: './about.component.html',
  host: { class: 'block' },
})
export class AboutComponent implements OnInit {
  private readonly seoService = inject(SeoService)

  ngOnInit(): void {
    this.seoService.setPageMeta({
      title: 'About AWS Speed Test',
      description:
        'Explore AWS Speed Test tool for checking your network latency across multiple global AWS regions',
      canonicalUrl: 'https://awsspeedtest.com/about',
    })
  }
}
