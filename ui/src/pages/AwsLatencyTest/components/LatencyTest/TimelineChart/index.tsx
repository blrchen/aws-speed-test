import React, { useEffect, useState } from 'react'

import { Card, Row } from 'antd'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

import { RegionLatencyModel, Region } from '@/models/region'
import LatencyTable from '@/pages/AwsLatencyTest/components/LatencyTest/LatencyTable'

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#F0F8FF',
  '#FAEBD7',
  '#00FFFF',
  '#7FFFD4',
  '#F0FFFF',
  '#F5F5DC',
  '#FFE4C4',
  '#FFEBCD'
]

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
    // console.log('1420======================useEffect1 fired', series)

    if (timerIndex > 100) {
      return
    }
    setTimeout(async () => {
      console.log('1556==================setTimeout start')
      setTimerIndex(timerIndex + 1)

      const regionLatencyMap = await getRegionLatencyMap()
      setTableData(Array.from(regionLatencyMap.values()))

      // eslint-disable-next-line no-debugger
      // debugger
      // console.log('13333================validResults', validResults)
      // eslint-disable-next-line no-debugger
      // debugger
      series.forEach((sery: Sery) => {
        const { data } = sery
        data.push({
          category: timerIndex.toString(),
          value: regionLatencyMap.get(sery.name)?.latencySnapshot
        })
        sery.data = [...data]
        // }
      })
      // eslint-disable-next-line no-debugger
      // debugger
      // setSeries([...series])
      // eslint-disable-next-line no-debugger
      // debugger
      // console.log('1619=============useEffect1 setState fired', series[0].data)
      console.log('1556==================setTimeout end')
    }, 3000)
  }, [timerIndex])

  // }

  // If selected regions are changed, init series for new regions that has not been initialized yet
  useEffect(() => {
    // console.log('1743======================useEffect2 fired', regions)
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
    console.log('1420=============useEffect2 setState fired', [...latestSeries])

    setSeries([...latestSeries])
    // eslint-disable-next-line no-debugger
    // debugger
  }, [regions])

  // componentWillUnmount() {
  //   this.setState({ series: [] })
  //   if (this.interval) {
  //     clearInterval(this.interval)
  //   }
  // }

  return (
    <>
      <Row>
        <Card title="Chart" bodyStyle={{ padding: 0 }}>
          {/*<ResponsiveContainer>*/}
          <LineChart width={1000} height={300}>
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
          {/*</ResponsiveContainer>*/}
        </Card>
      </Row>
      <Row>
        <LatencyTable tableData={tableData} />
      </Row>
      <Row>
        <Card title="Debug" bodyStyle={{ padding: 0 }}>
          <p>
            <strong>[State]Series</strong>
          </p>
          {series.map((s, index) => (
            <>
              <p>{s.name}</p>
              <p>
                {s.data.map((d) => {
                  return (
                    <span>
                      [{d.category}-{d.value}]{' '}
                    </span>
                  )
                })}
              </p>
            </>
          ))}
          <p>
            <strong>[Props]selectedRegions:</strong>
          </p>
          {selectedRegions.map((s, index) => (
            <>
              <span>{s.regionName} </span>
            </>
          ))}
          <p>
            <strong>[State]regions:</strong>
          </p>
          {regions.map((s, index) => (
            <>
              <span>{s.regionName} </span>
            </>
          ))}
        </Card>{' '}
      </Row>
    </>
  )
}
export default TimelineChart
