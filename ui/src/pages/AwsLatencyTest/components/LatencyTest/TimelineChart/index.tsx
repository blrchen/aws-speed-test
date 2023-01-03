import React, { useEffect, useState } from 'react'

import { Card, Row } from 'antd'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { Region, RegionLatencyModel } from '@/models/region'
import LatencyTable from '@/pages/AwsLatencyTest/components/LatencyTest/LatencyTable'
import { COLORS } from '@/pages/AwsLatencyTest/components/LatencyTest/TimelineChart/colors'

interface Sery {
  name: string
  data: { category: string; value: any }[]
}

interface TimelineChartProps {
  selectedRegions: Region[]
  getRegionLatencyMap: () => Promise<Map<string, RegionLatencyModel>>
}

const TimelineChart = (props: TimelineChartProps) => {
  const { selectedRegions, getRegionLatencyMap } = props
  const [timerIndex, setTimerIndex] = useState(0)
  const [regions, setRegions] = useState<Region[]>([])
  const [series, setSeries] = useState<Sery[]>([])
  const [tableData, setTableData] = useState<RegionLatencyModel[]>([])

  // Subscribe selectedRegions in region group component
  useEffect(() => {
    setRegions(selectedRegions)
  }, [selectedRegions])

  // Use setTimeout instead of setInterval here as setInterval can not access the latest region in state.
  useEffect(() => {
    if (timerIndex > 100) {
      return
    }
    setTimeout(async () => {
      setTimerIndex(timerIndex + 1)

      const regionLatencyMap = await getRegionLatencyMap()
      setTableData(Array.from(regionLatencyMap.values()))

      series.forEach((sery: Sery) => {
        const { data } = sery
        data.push({
          category: timerIndex.toString(),
          value: regionLatencyMap.get(sery.name)?.latencySnapshot
        })
        sery.data = [...data]
      })
    }, 3000)
  }, [timerIndex])

  // }

  // If selected regions are changed, init series for new regions that has not been initialized yet
  useEffect(() => {
    const preRegionNames = series.map((e) => e.name)
    const inComingRegionNames = regions.map((e) => e.regionName)
    const toAddRegionNames = inComingRegionNames.filter((e) => preRegionNames.indexOf(e) === -1)
    const seriesToKeep = series.filter((e) => preRegionNames.indexOf(e.name) > -1)
    const latestSeries = seriesToKeep.concat(
      toAddRegionNames.map((e) => ({
        name: e,
        data: []
      }))
    )

    setSeries([...latestSeries])
  }, [regions])

  return (
    <>
      <Row>
        <Card title="Result" bodyStyle={{ padding: 0 }} style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer width="95%" height={250}>
            <LineChart width={1000} height={250}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" type="category" allowDuplicatedCategory={false} />
              <YAxis dataKey="value" />
              <Tooltip />
              <Legend />
              {series.map((s, index) => (
                <Line
                  key={s.name}
                  type="monotone"
                  dataKey="value"
                  data={s.data}
                  name={s.name}
                  stroke={COLORS[index % COLORS.length]}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <LatencyTable tableData={tableData} />
      </Row>
      {/*<Row>*/}
      {/*  <Card title="Debug" bodyStyle={{ padding: 0 }}>*/}
      {/*    <p>*/}
      {/*      <strong>[State]Series</strong>*/}
      {/*    </p>*/}
      {/*    {series.map((s, index) => (*/}
      {/*      <>*/}
      {/*        <p>{s.name}</p>*/}
      {/*        <p>*/}
      {/*          {s.data.map((d) => {*/}
      {/*            return (*/}
      {/*              <span>*/}
      {/*                [{d.category}-{d.value}]{' '}*/}
      {/*              </span>*/}
      {/*            )*/}
      {/*          })}*/}
      {/*        </p>*/}
      {/*      </>*/}
      {/*    ))}*/}
      {/*    <p>*/}
      {/*      <strong>[Props]selectedRegions:</strong>*/}
      {/*    </p>*/}
      {/*    {selectedRegions.map((s, index) => (*/}
      {/*      <>*/}
      {/*        <span>{s.regionName} </span>*/}
      {/*      </>*/}
      {/*    ))}*/}
      {/*    <p>*/}
      {/*      <strong>[State]regions:</strong>*/}
      {/*    </p>*/}
      {/*    {regions.map((s, index) => (*/}
      {/*      <>*/}
      {/*        <span>{s.regionName} </span>*/}
      {/*      </>*/}
      {/*    ))}*/}
      {/*  </Card>{' '}*/}
      {/*</Row>*/}
    </>
  )
}
export default TimelineChart
