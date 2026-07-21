import { Component, inject, OnInit } from '@angular/core'

import { SeoService } from '../../../services/seo.service'
import { LucideIconComponent } from '../../../shared/icons/lucide-icons.component'

@Component({
  selector: 'app-privacy',
  imports: [LucideIconComponent],
  templateUrl: './privacy.component.html',
  host: { class: 'block' },
})
export class PrivacyComponent implements OnInit {
  private readonly seoService = inject(SeoService)

  ngOnInit(): void {
    this.seoService.setPageMeta({
      title: 'Privacy Policy - AWS Speed Test',
      description:
        'Learn how AWS Speed Test collects, uses, and protects information when you run latency checks across AWS regions.',
      canonicalUrl: 'https://awsspeedtest.com/privacy',
    })
  }
}
