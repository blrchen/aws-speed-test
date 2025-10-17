#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Read regions data
const regionsPath = path.join(__dirname, '..', 'src', 'assets', 'data', 'regions.json')
const regions = JSON.parse(fs.readFileSync(regionsPath, 'utf8'))

// Define all static routes
const staticRoutes = [
  '/latency',
  '/geographies',
  '/regions',
  '/availability-zones',
  '/privacy',
  '/about',
  '/chatgpt',
  '/chatgpt/chatgpt-assistant'
]

// Generate dynamic region routes
const regionRoutes = regions.map(region => `/regions/${region.regionId}`)

// Combine all routes
const allRoutes = [...staticRoutes, ...regionRoutes]

// Sort routes alphabetically for consistency
allRoutes.sort()

// Write to prerender-routes.txt
const outputPath = path.join(__dirname, '..', 'prerender-routes.txt')
fs.writeFileSync(outputPath, allRoutes.join('\n') + '\n', 'utf8')

console.log(`Generated ${allRoutes.length} routes in prerender-routes.txt`)
console.log(`- ${staticRoutes.length} static routes`)
console.log(`- ${regionRoutes.length} region routes`)