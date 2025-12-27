import { readFileSync } from 'fs'
import { join } from 'path'
import { RenderMode, ServerRoute } from '@angular/ssr'

interface Region {
  regionId: string
}

function getRegionIds(): string[] {
  try {
    const regionsPath = join(process.cwd(), 'src', 'assets', 'data', 'regions.json')
    const regions: Region[] = JSON.parse(readFileSync(regionsPath, 'utf8'))
    return regions.map((r) => r.regionId)
  } catch {
    return []
  }
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'regions/:regionId',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const regionIds = getRegionIds()
      return regionIds.map((regionId) => ({ regionId }))
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
]
