import React, { useEffect, useState } from 'react'

import { Table } from 'antd'
import axios from 'axios'

const Regions = () => {
  const [dataSource, setDataSource] = useState([])
  const AWS_REGIONS_FILE = '/data/aws/regions.json'
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
      title: 'Availability Zone #',
      dataIndex: 'availabilityZoneCount',
      key: 'availabilityZoneCount'
    }
  ]

  useEffect(() => {
    axios
      .get(AWS_REGIONS_FILE)
      .then((response) => {
        setDataSource(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  console.log('=========[render] fired')
  return <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 15 }} />
}

export default Regions
