import React, { lazy, ReactNode, Suspense } from 'react'

import type { RouteObject } from 'react-router-dom'

import Loading from '@/components/Loading'
import AppLayout from '@/layouts/AppLayout'

const Home = lazy(() => import('@/pages/Home'))

const About = lazy(() => import('@/pages/About'))

const LatencyTest = lazy(() => import('@/pages/AWSLatencyTest'))

const AWSRegions = lazy(() => import('@/pages/AWSRegions'))

const AWSGeographies = lazy(() => import('@/pages/AWSGeographies'))

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export const routers: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        path: '/',
        element: lazyLoad(<Home />)
      },
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
        element: lazyLoad(<AWSRegions />)
      },
      {
        path: '/geographies',
        element: lazyLoad(<AWSGeographies />)
      },
      {
        path: '*',
        element: lazyLoad(<AWSGeographies />)
      }
    ]
  }
]
