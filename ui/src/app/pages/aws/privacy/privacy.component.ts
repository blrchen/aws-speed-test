import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SeoService } from '../../../services'

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyComponent implements OnInit {
  private readonly seoService = inject(SeoService)

  ngOnInit(): void {
    this.seoService.setMetaTitle('Privacy Policy - AWS Speed Test')
    this.seoService.setMetaDescription(
      'Learn how AWS Speed Test collects, uses, and protects information when you run latency checks across AWS regions.'
    )
    this.seoService.setCanonicalUrl('https://awsspeedtest.com/privacy')
  }
}
