import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation
} from '@angular/core'
import {
  Activity,
  AlertCircle,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Cloud,
  Copy,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  Github,
  Globe,
  Info,
  LucideAngularModule,
  MapPin,
  Menu,
  Moon,
  Radar,
  Search,
  Share2,
  ShieldCheck,
  SignalHigh,
  Sparkles,
  Sun,
  X,
  Zap
} from 'lucide-angular'

const ICON_MAP = {
  activity: Activity,
  'alert-circle': AlertCircle,
  'building-2': Building2,
  calendar: Calendar,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  cloud: Cloud,
  copy: Copy,
  download: Download,
  'external-link': ExternalLink,
  eye: Eye,
  'eye-off': EyeOff,
  github: Github,
  globe: Globe,
  info: Info,
  'map-pin': MapPin,
  menu: Menu,
  moon: Moon,
  radar: Radar,
  search: Search,
  'share-2': Share2,
  'shield-check': ShieldCheck,
  'signal-high': SignalHigh,
  sparkles: Sparkles,
  sun: Sun,
  x: X,
  zap: Zap
} as const

export type LucideIconName = keyof typeof ICON_MAP

@Component({
  selector: 'app-lucide-icon',
  imports: [LucideAngularModule],
  template: `
    <lucide-icon
      [img]="iconClass()"
      [strokeWidth]="strokeWidth()"
      [absoluteStrokeWidth]="absoluteStrokeWidth()"
    />
  `,
  styles: [
    `
      app-lucide-icon {
        display: inline-flex;
        line-height: 0;
      }
      app-lucide-icon svg {
        width: 100%;
        height: 100%;
        display: block;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LucideIconComponent {
  readonly name = input.required<LucideIconName>()
  readonly strokeWidth = input(1.5)
  readonly absoluteStrokeWidth = input(false)

  readonly iconClass = computed(() => ICON_MAP[this.name()])
}
