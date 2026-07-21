import { NAV_SUBSET_MATCH_OPTIONS, NavGroup } from './shared/nav-groups/nav-groups.component'

export const APP_BRAND_LABEL = 'AWS Speed Test'
export const APP_HOME_LINK = '/latency'
export const APP_GITHUB_URL = 'https://github.com/blrchen/aws-speed-test'
export const APP_GITHUB_ARIA_LABEL = 'AWS Speed Test on GitHub'

export const APP_NAV_GROUPS: readonly NavGroup[] = [
  {
    id: 'testing',
    heading: 'Testing',
    items: [
      {
        label: 'AWS Latency Test',
        icon: 'zap',
        routerLink: APP_HOME_LINK,
      },
    ],
  },
  {
    id: 'resources',
    heading: 'Resources',
    items: [
      {
        label: 'AWS Regions',
        icon: 'globe',
        routerLink: '/regions',
        activeMatchOptions: NAV_SUBSET_MATCH_OPTIONS,
      },
      {
        label: 'AWS Availability Zones',
        icon: 'map-pin',
        routerLink: '/availability-zones',
      },
      {
        label: 'AWS Geographies',
        icon: 'globe',
        routerLink: '/geographies',
      },
    ],
  },
  {
    id: 'info',
    heading: 'Info',
    items: [
      {
        label: 'About',
        icon: 'info',
        routerLink: '/about',
      },
    ],
  },
]
