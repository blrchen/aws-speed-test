import React, { useEffect, useState } from 'react'

import { List } from 'antd'
import axios from 'axios'

const Geographies = () => {
  const [dataSource, setDataSource] = useState<{ title: string; description: string }[]>([])
  const AWS_GEOGRAPHIES_FILE = '/data/aws/geographies.json'
  useEffect(() => {
    axios
      .get(AWS_GEOGRAPHIES_FILE)
      .then((response) => {
        const list = []
        for (const d of response.data) {
          const regions = []
          for (const r of d.regions) {
            const regionName = `${r.displayName}`
            regions.push(regionName)
          }
          list.push({ title: d.geography, description: regions.join(', ') })
        }
        setDataSource(list)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  console.log('=========[render] fired')

  return (
    <List
      renderItem={(item: { title: string; description: string }) => (
        <List.Item>
          <List.Item.Meta title={item.title} description={item.description}>
            {item.description}
          </List.Item.Meta>
        </List.Item>
      )}
      itemLayout="horizontal"
      dataSource={dataSource}
    />
  )
}

export default Geographies
