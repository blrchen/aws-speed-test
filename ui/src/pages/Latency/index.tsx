import React from 'react'

import { Card } from 'antd'

import PagePanel from '@/components/PagePanel'
import { observer } from '@/hooks'
import LatencyTest from '@/pages/Latency/components/LatencyTest'
const Latency = () => {
  return (
    <PagePanel title="Latency Test">
      <Card bordered={false}>
        <LatencyTest />
      </Card>
    </PagePanel>
  )
}

export default observer(Latency)
