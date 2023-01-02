import React from 'react'

import { Card, Table } from 'antd'

import { RegionLatencyModel } from '@/models'

interface LatencyTableProps {
  tableData: RegionLatencyModel[]
}

const LatencyTable = (props: LatencyTableProps) => {
  const { tableData } = props
  const columns = [
    {
      title: 'Region Id',
      dataIndex: 'regionName',
      key: 'regionName'
    },
    {
      title: 'Region Name',
      dataIndex: 'displayName',
      key: 'displayName'
    },
    {
      title: 'Geography',
      dataIndex: 'geography',
      key: 'geography'
    },
    {
      title: 'Latency',
      dataIndex: 'latencySnapshot',
      key: 'latency'
    }
  ]
  console.log(tableData)
  return <Table dataSource={tableData} columns={columns} pagination={false} />
}

export default LatencyTable
