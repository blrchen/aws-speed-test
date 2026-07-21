#!/usr/bin/env node

const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('node:fs')
const { dirname, resolve } = require('node:path')

const projectRoot = resolve(__dirname, '..')
const projectName = 'aws-speed-test'
const siteOrigin = 'https://awsspeedtest.com'
const ignoredPrerenderRoutes = ['/', '/not-found']
const publicOutputPath = resolve(projectRoot, 'public', 'sitemap.xml')
const browserOutputPath = resolve(projectRoot, 'dist', projectName, 'browser', 'sitemap.xml')
const prerenderManifestPath = resolve(projectRoot, 'dist', projectName, 'prerendered-routes.json')

function fail(message) {
  console.error(message)
  process.exit(1)
}

function normalizeRoute(route) {
  if (typeof route !== 'string' || route.length === 0) {
    throw new Error(`Invalid route value: ${route}`)
  }

  const normalized = route.startsWith('/') ? route : `/${route}`
  return normalized.length > 1 ? normalized.replace(/\/+$/, '') : normalized
}

function uniqueSortedRoutes(routes) {
  return Array.from(new Set(routes.map(normalizeRoute))).sort((a, b) => a.localeCompare(b))
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function normalizeBaseUrl(value) {
  const normalized = value.replace(/\/+$/, '')

  if (!/^https?:\/\//.test(normalized)) {
    throw new Error(`Invalid base URL "${value}". Expected http:// or https://.`)
  }

  return normalized
}

function xmlEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function readPrerenderManifest() {
  if (!existsSync(prerenderManifestPath)) {
    fail(`Prerender manifest not found at ${prerenderManifestPath}. Run ng build first.`)
  }

  try {
    const manifest = JSON.parse(readFileSync(prerenderManifestPath, 'utf8'))

    if (!isRecord(manifest) || !isRecord(manifest.routes)) {
      fail(`Prerender manifest at ${prerenderManifestPath} must contain routes.`)
    }

    return manifest
  } catch (error) {
    fail(
      `Failed to read routes from ${prerenderManifestPath}: ${(error && error.message) || error}`
    )
  }
}

function getSitemapRoutesFromPrerenderManifest(prerenderManifest) {
  const prerenderRoutes = uniqueSortedRoutes(Object.keys(prerenderManifest.routes))

  if (prerenderRoutes.length === 0) {
    fail(`No routes were found in ${prerenderManifestPath}.`)
  }

  const ignoredSet = new Set(uniqueSortedRoutes(ignoredPrerenderRoutes))
  const sitemapRoutes = prerenderRoutes.filter((route) => !ignoredSet.has(route))

  if (sitemapRoutes.length === 0) {
    fail(`No sitemap routes remain after filtering ignored routes from ${prerenderManifestPath}.`)
  }

  return sitemapRoutes
}

function buildSitemapXml(baseUrl, routes) {
  const urlEntries = routes
    .map((route) => {
      const url = new URL(route, `${baseUrl}/`).href
      return `  <url>\n    <loc>${xmlEscape(url)}</loc>\n  </url>`
    })
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    '</urlset>',
    '',
  ].join('\n')
}

function writeFileEnsuringDirectory(path, contents) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, contents, 'utf8')
}

function generateSitemap() {
  const baseUrl = normalizeBaseUrl(process.env.SITEMAP_BASE_URL ?? siteOrigin)
  const prerenderManifest = readPrerenderManifest()
  const sitemapRoutes = getSitemapRoutesFromPrerenderManifest(prerenderManifest)

  const sitemapXml = buildSitemapXml(baseUrl, sitemapRoutes)

  writeFileEnsuringDirectory(publicOutputPath, sitemapXml)
  writeFileEnsuringDirectory(browserOutputPath, sitemapXml)

  console.log(
    `Sitemap written to ${publicOutputPath} and ${browserOutputPath} with ${sitemapRoutes.length} entries`
  )
}

if (require.main === module) {
  try {
    generateSitemap()
  } catch (error) {
    fail((error && error.message) || String(error))
  }
}

module.exports = { generateSitemap }
