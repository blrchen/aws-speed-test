import { useEffect, useState } from 'react'

import { Row } from 'antd'

import { AxiosResponseWithLatency } from '@/api/axios-core'
import { getLatency } from '@/api/storage.api'
import RegionData from '@/assets/regions.json'
import { RegionGroupModel, RegionLatencyModel, Region } from '@/models'
import RegionGroup from '@/pages/AwsLatencyTest/components/LatencyTest/RegionGroup'
import TimelineChart from '@/pages/AwsLatencyTest/components/LatencyTest/TimelineChart'

const LatencyTest = () => {
  const [regionsGroup, setRegionsGroup] = useState<RegionGroupModel[]>([])
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([])

  const onRegionChange = (regionsGroup: RegionGroupModel[]) => {
    const selectedRegions = regionsGroup.reduce((acc: Region[], current: RegionGroupModel) => {
      const filtered = current.regions.filter((e) => e.checked)
      return acc.concat(filtered)
    }, [] as Region[])
    setSelectedRegions(selectedRegions)
  }

  // Loop ping test for selected region.
  const getRegionLatencyMap = async (): Promise<Map<string, RegionLatencyModel>> => {
    // Run ping test parallel, save results to map <region, latency>
    const regionLatencyMap = new Map<string, RegionLatencyModel>()
    const promises = selectedRegions.map((region) =>
      getLatency(region)
        .then((response) => Promise.resolve([region, response]))
        .catch(() => Promise.resolve([region, null]))
    )
    await Promise.all(promises)
      .then((items) => {
        return items.map((resolved) => {
          const [region, regionLatency] = resolved
          const { latency } = (regionLatency as AxiosResponseWithLatency) || {}

          regionLatencyMap.set((region as Region).regionName, {
            ...region,
            latencySnapshot: latency
          } as RegionLatencyModel)

          return {
            ...region,
            latencySnapshot: latency
          } as RegionLatencyModel
        })
      })
      .catch((e) => {
        console.log(e)
      })
    return regionLatencyMap
  }

  useEffect(() => {
    const groups = (RegionData as Region[]).reduce<any[]>((arr, item) => {
      const { geography } = item
      if (!arr.includes(geography)) {
        arr.push(geography)
      }
      return arr
    }, [])
    const regionsGroup = groups.reduce((arr, item) => {
      const geography = item
      const regions = (RegionData as Region[])
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
  }, [])

  return (
    <>
      <Row>
        <RegionGroup regionsGroup={regionsGroup} onRegionSelected={onRegionChange} />
      </Row>
      <TimelineChart selectedRegions={selectedRegions} getRegionLatencyMap={getRegionLatencyMap} />
    </>
  )
}

export default LatencyTest
