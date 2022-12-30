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
import { RegionLatencyModel, RegionModel } from '@/models/region.model'

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
  selectedRegions: RegionModel[]
  // the latency data is cahed value about five seconds ago
  // getLatencyMap: (
  //   selectedRegions: RegionModel[]
  // ) => Promise<[Date, Map<string, RegionLatencyModel>]>
}

const TimeLineChart = (props: propsModel) => {
  // const { getLatencyMap } = props
  const { selectedRegions } = props
  const [time, setTime] = React.useState(0)
  const [regions, setRegions] = useState<RegionModel[]>([])
  const [series, setSeries] = useState<Sery[]>([])

  // constructor(props: any) {
  //   super(props)
  //   this.state = {
  //     series: []
  //   }
  // }
  const interval: any = null

  useEffect(() => {
    console.log('selectedRegions changed')
    setRegions(selectedRegions)
  }, [selectedRegions])

  // componentDidMount() {
  useEffect(() => {
    console.log('1420======================useEffect1 fired', series)

    let axisPivot: string[] = []
    const generateLatestAxisTicks = (): [string[], string, boolean, string | undefined] => {
      const date = new Date()
      const timeStamp = date.getTime() / 1000
      const currentSecond = timeStamp * 1000

      const xLength = 10

      if (axisPivot.length === 0) {
        const secondArr = Array.from({ length: xLength }, (_j, i) => {
          const t = timeStamp - i
          return formatXAxisTick(t * 1000)
        }).reverse()

        axisPivot = secondArr

        return [axisPivot, secondArr[xLength - 1], true, '']
      } else {
        const newLabel = formatXAxisTick(currentSecond)
        const removedLabel = axisPivot.shift()
        axisPivot.push(newLabel)

        return [axisPivot, newLabel, false, removedLabel]
      }
    }
    setTimeout(async () => {
      setTime(time + 1)
      const [axisTicks, newAxisVal, isInit, removedAxisVal] = generateLatestAxisTicks()
      // if (series.length === 0) return

      const promises = regions.map((region) =>
        getLatency(region).then((res) => Promise.resolve([region, res]))
      )
      const dataMap = new Map<string, RegionLatencyModel>()
      await Promise.all(promises).then((items) => {
        return items.map((_ele) => {
          const [region, res] = _ele
          const { latency, incomeTime, sentTime } = res as any
          dataMap.set((region as RegionModel).regionName, {
            ...region,
            latencySnapshot: latency,
            incomeTime,
            sentTime
          } as RegionLatencyModel)
          return {
            ...region,
            latencySnapshot: latency,
            incomeTime,
            sentTime
          } as RegionLatencyModel
        })
      })

      // eslint-disable-next-line no-debugger

      series.forEach((sery: Sery) => {
        // eslint-disable-next-line no-debugger
        // debugger
        // if (!isInit) {
        //   sery.data = axisTicks.map((el) => ({ category: el, value: 0 }))
        // } else {
        const { data } = sery
        if (data.length > 0 && data[0].category === removedAxisVal) {
          data.shift()
        }

        data.push({
          category: time.toString(),
          value: dataMap.get(sery.name)?.latencySnapshot
        })
        console.log('2137==========data.push category', time)
        console.log('2137==========data.push value', dataMap.get(sery.name)?.latencySnapshot)
        sery.data = [...data]
        // }
      })
      // eslint-disable-next-line no-debugger
      // debugger
      // setSeries([...series])
      // eslint-disable-next-line no-debugger
      // debugger
      // console.log('1619=============useEffect1 setState fired', series[0].data)
    }, 5000)
  }, [time])

  // }

  // componentDidUpdate(preProps: Readonly<propsModel>, _: Readonly<stateModel>) {
  useEffect(() => {
    // console.log('1743======================useEffect2 fired', regions)
    const preRegionNames = series.map((e) => e.name)
    const inComingRegionNames = regions.map((e) => e.regionName)
    const seriesToKeep = series.filter((e) => preRegionNames.indexOf(e.name) > -1)
    const toAdd = inComingRegionNames.filter((e) => preRegionNames.indexOf(e) === -1)
    const latestSeries = seriesToKeep.concat(
      toAdd.map((e) => ({
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
