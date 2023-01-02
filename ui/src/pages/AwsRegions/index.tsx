import React from 'react'

import { Card } from 'antd'

import PagePanel from '@/components/PagePanel'
import Regions from '@/pages/AwsRegions/components/Regions'

const AwsRegions = () => {
  return (
    <PagePanel title="AWS Regions">
      <Card bordered={false}>
        <Regions />
      </Card>
    </PagePanel>
  )
}

export default AwsRegions
