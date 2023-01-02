import React, { lazy, ReactNode, Suspense } from 'react'

import type { RouteObject } from 'react-router-dom'

import Loading from '@/components/Loading'
import AppLayout from '@/layouts/AppLayout'

const About = lazy(() => import('@/pages/About'))
const LatencyTest = lazy(() => import('@/pages/AwsLatencyTest'))
const AwsRegions = lazy(() => import('@/pages/AwsRegions'))
const AwsGeographies = lazy(() => import('@/pages/AwsGeographies'))

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export const routers: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/about',
        element: lazyLoad(<About />)
      },
      {
        path: '/latency',
        element: lazyLoad(<LatencyTest />)
      },
      {
        path: '/regions',
        element: lazyLoad(<AwsRegions />)
      },
      {
        path: '/geographies',
        element: lazyLoad(<AwsGeographies />)
      },
      {
        path: '*',
        element: lazyLoad(<AwsGeographies />)
      }
    ]
  }
]
