import React, { useEffect, useState } from 'react'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import { getLatency } from '@/api/storage.api'
import { RegionLatencyModel, Region } from '@/models/region'

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

type propsModel = {
  selectedRegions: Region[]
  getLatencyMap: (selectedRegions: Region[]) => Promise<[Date, Map<string, RegionLatencyModel>]>
}

const TimeLineChart = (props: propsModel) => {
  // const { getLatencyMap } = props
  const { selectedRegions } = props
  const [timerIndex, setTimerIndex] = React.useState(0)
  const [regions, setRegions] = useState<Region[]>([])
  const [series, setSeries] = useState<Sery[]>([])

  // Subscribe selectedRegions in region group component
  useEffect(() => {
    setRegions(selectedRegions)
  }, [selectedRegions])

  // Loop ping test for selected region.
  // Use setTimeout instead of setInterval here as setInterval can not access the latest region in state.
  useEffect(() => {
    // console.log('1420======================useEffect1 fired', series)

    setTimeout(async () => {
      console.log('1556==================setTimeout start')
      setTimerIndex(timerIndex + 1)

      // Run ping test parallel, save results to map <region, latency>
      const regionLatencyMap = new Map<string, RegionLatencyModel>()
      const promises = regions.map((region) =>
        getLatency(region)
          .then((response) => Promise.resolve([region, response]))
          .catch(() => Promise.resolve([region, null]))
      )
      await Promise.all(promises)
        .then((items) => {
          return items.map((resolved) => {
            const [region, regionLatency] = resolved
            const { latency } = regionLatency as any

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
      // const validResults = results.filter((result: any) => !(result instanceof Error))
      // validResults.forEach((_) => {
      //   regionLatencyMap.set(_.regionName, _)
      // })

      // console.log('13333================results', results)
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
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300}>
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
    </>
  )
  // }
}

function formatXAxisTick(timeStamp: number): string {
  const date = new Date(timeStamp)
  const second = date.getSeconds()
  const h = date.getHours()
  const m = date.getMinutes()
  const hStr = h > 9 ? h : `0${h}`
  const mStr = m > 9 ? m : `0${m}`
  return second === 0 ? `${hStr}:${mStr}` : `:${second}`
}

export default TimeLineChart
