import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SeoService } from '../../../services'

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  private readonly seoService = inject(SeoService)

  ngOnInit(): void {
    this.seoService.setMetaTitle('About AWS Speed Test')
    this.seoService.setMetaDescription(
      'Explore AWS Speed Test tool for checking your network latency across multiple global AWS regions'
    )
    this.seoService.setCanonicalUrl('https://awsspeedtest.com/about')
  }
}
