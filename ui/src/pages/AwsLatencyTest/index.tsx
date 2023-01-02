import React from 'react'

import { Card } from 'antd'

import PagePanel from '@/components/PagePanel'
import LatencyTest from '@/pages/AwsLatencyTest/components/LatencyTest'

const Latency = () => (
  <PagePanel title="Latency Test">
    <Card bordered={false}>
      <LatencyTest />
    </Card>
  </PagePanel>
)

export default Latency
