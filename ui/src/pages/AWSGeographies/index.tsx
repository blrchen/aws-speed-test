import React from 'react'

import { Card } from 'antd'

import PagePanel from '@/components/PagePanel'
import Geographies from '@/pages/AWSGeographies/components/Geographies'

const AwsGeographies = () => {
  return (
    <PagePanel title="AWS Regions">
      <Card bordered={false}>
        <Geographies />
      </Card>
    </PagePanel>
  )
}
export default AwsGeographies
