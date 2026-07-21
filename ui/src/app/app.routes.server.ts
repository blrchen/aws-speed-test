import { readFileSync } from 'fs'
import { join } from 'path'
import { RenderMode, ServerRoute } from '@angular/ssr'

import type { Region } from './models'

interface AwsRegionDetailParam extends Record<string, string> {
  regionId: string
}

const awsRegionIdPattern = /^[a-z]{2}-[a-z]+-\d+$/

function readJsonFile<T>(path: string, description: string): T {
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as T
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to read ${description} from ${path}: ${message}`, { cause: error })
  }
}

function assertUnique(values: readonly string[], description: string): void {
  const seen = new Set<string>()
  const duplicates = new Set<string>()

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value)
    }
    seen.add(value)
  }

  if (duplicates.size > 0) {
    throw new Error(`${description} contains duplicate values: ${[...duplicates].join(', ')}`)
  }
}

function getAwsRegionDetailParams(): AwsRegionDetailParam[] {
  const regionsPath = join(process.cwd(), 'src', 'assets', 'data', 'regions.json')
  const regions = readJsonFile<Region[]>(regionsPath, 'AWS regions')

  if (!Array.isArray(regions) || regions.length === 0) {
    throw new Error(`AWS regions at ${regionsPath} must be a non-empty array.`)
  }

  const regionIds = regions.map((region) => region.regionId)
  const invalidRegionIds = regionIds.filter(
    (regionId) => typeof regionId !== 'string' || !awsRegionIdPattern.test(regionId)
  )

  if (invalidRegionIds.length > 0) {
    throw new Error(`AWS regions contain invalid regionId values: ${invalidRegionIds.join(', ')}`)
  }

  assertUnique(regionIds, 'AWS regionIds')

  return regionIds.map((regionId) => ({ regionId }))
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'regions/:regionId',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve(getAwsRegionDetailParams()),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
]
