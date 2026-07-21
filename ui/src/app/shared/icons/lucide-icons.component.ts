import { Component, computed, input } from '@angular/core'
import {
  LucideActivity,
  LucideBuilding2,
  LucideCalendar,
  LucideCheck,
  LucideChevronDown,
  LucideChevronRight,
  LucideCloud,
  LucideCopy,
  LucideDownload,
  LucideDynamicIcon,
  LucideExternalLink,
  LucideGlobe,
  LucideInfo,
  LucideMapPin,
  LucideMenu,
  LucideMoon,
  LucideSearch,
  LucideShare2,
  LucideSignalHigh,
  LucideSparkles,
  LucideSun,
  LucideX,
  LucideZap,
  type LucideIconData,
} from '@lucide/angular'

const GITHUB_ICON = {
  name: 'github',
  node: [
    [
      'path',
      {
        d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
        key: 'tonef',
      },
    ],
    ['path', { d: 'M9 18c-4.51 2-5-2-7-2', key: '9comsn' }],
  ],
} satisfies LucideIconData

const ICON_MAP = {
  activity: LucideActivity,
  'building-2': LucideBuilding2,
  calendar: LucideCalendar,
  check: LucideCheck,
  'chevron-down': LucideChevronDown,
  'chevron-right': LucideChevronRight,
  cloud: LucideCloud,
  copy: LucideCopy,
  download: LucideDownload,
  'external-link': LucideExternalLink,
  github: GITHUB_ICON,
  globe: LucideGlobe,
  info: LucideInfo,
  'map-pin': LucideMapPin,
  menu: LucideMenu,
  moon: LucideMoon,
  search: LucideSearch,
  'share-2': LucideShare2,
  'signal-high': LucideSignalHigh,
  sparkles: LucideSparkles,
  sun: LucideSun,
  x: LucideX,
  zap: LucideZap,
} as const

export type LucideIconName = keyof typeof ICON_MAP

@Component({
  selector: 'app-lucide-icon',
  imports: [LucideDynamicIcon],
  template: `
    <svg
      [lucideIcon]="iconClass()"
      [strokeWidth]="strokeWidth()"
      [absoluteStrokeWidth]="absoluteStrokeWidth()"
    ></svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        line-height: 0;
      }
      svg {
        width: 100%;
        height: 100%;
        display: block;
      }
    `,
  ],
})
export class LucideIconComponent {
  readonly name = input.required<LucideIconName>()
  readonly strokeWidth = input(1.5)
  readonly absoluteStrokeWidth = input(false)

  readonly iconClass = computed(() => ICON_MAP[this.name()])
}
