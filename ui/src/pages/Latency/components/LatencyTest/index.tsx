import { useEffect, useState } from 'react'

import axios from 'axios'

import { RegionGroupModel, RegionLatencyModel, Region } from '@/models'
import Intro from '@/pages/Latency/components/LatencyTest/intro'
import RegionGroup from '@/pages/Latency/components/LatencyTest/region.group'
import TimeLineChart from '@/pages/Latency/components/LatencyTest/timeline.chart'

import FullLatencyCenter from './latency.table.full'
import ShortLatencyCenter from './latency.table.short'

const LatencyTest = () => {
  const [regionsGroup, setRegionsGroup] = useState<RegionGroupModel[]>([])
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([])

  const onRegionChange = (regionsGroup: RegionGroupModel[]) => {
    const selectedRegions = regionsGroup.reduce((acc: Region[], current: RegionGroupModel) => {
      const filtered = current.regions.filter((e) => e.checked)
      return acc.concat(filtered)
    }, [] as Region[])
    console.log('1115===========selectedRegions in onRegionChange', selectedRegions)
    setSelectedRegions(selectedRegions)
  }

  useEffect(() => {
    axios
      .get<Region[]>('/data/regions.json')
      .then((response) => {
        const inputRegions = response.data
        const groups = inputRegions.reduce<any[]>((arr, item) => {
          const { geography } = item
          if (!arr.includes(geography)) {
            arr.push(geography)
          }
          return arr
        }, [])
        const regionsGroup = groups.reduce((arr, item) => {
          const geography = item
          const regions = inputRegions
            .filter((i) => i.geography === geography)
            .map((i) => ({
              ...i,
              checked: false
            }))

          arr.push({
            geography,
            checked: false,
            regions
          })
          return arr
        }, [] as Array<RegionGroupModel>)
        setRegionsGroup(regionsGroup)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="px-4 py-2 latency">
      {/*<Intro />*/}
      <div className="mt-2">
        <RegionGroup regionsGroup={regionsGroup} onRegionSelected={onRegionChange} />
      </div>
      <div className="mt-3">{/*<ShortLatencyCenter tableData={data} />*/}</div>
      <div className="mt-4">
        <div className="mt-2 border bg-light px-2 pt-4">
          <div style={{ width: '100%', height: '280px' }}>
            <TimeLineChart selectedRegions={selectedRegions} />
          </div>
        </div>
      </div>
      <div className="mt-4">{/*<FullLatencyCenter tableData={data} />*/}</div>
    </div>
  )
}

export default LatencyTest
