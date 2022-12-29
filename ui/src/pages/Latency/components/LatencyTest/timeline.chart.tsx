import React from 'react'

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

type stateModel = {
  series: Sery[]
}

class Promose<T> {}

type propsModel = {
  selectedRegions: RegionModel[]
  // the latency data is cahed value about five seconds ago
  getLatencyMap: (
    selectedRegions: RegionModel[]
  ) => Promise<[Date, Map<string, RegionLatencyModel>]>
}

export default class TimeLineChart extends React.Component<propsModel, stateModel> {
  constructor(props: any) {
    super(props)
    this.state = {
      series: []
    }
  }

  interval: any = null
  componentDidMount() {
    const { getLatencyMap, selectedRegions } = this.props
    this.interval = setInterval(async () => {
      const [axisTicks, newAxisVal, isInit, removedAxisVal] = this.generateLatestAxisTicks()
      const { series } = this.state
      if (series.length === 0) return

      const [, cachedLatencyMap] = await getLatencyMap(selectedRegions)
      series.forEach((sery: Sery) => {
        if (isInit) {
          sery.data = axisTicks.map((el) => ({ category: el, value: 0 }))
        } else {
          const { data } = sery
          if (data.length > 0 && data[0].category === removedAxisVal) {
            data.shift()
          }

          data.push({
            category: newAxisVal,
            value: cachedLatencyMap.get(sery.name)?.latencySnapshot
          })

          sery.data = [...data]
        }
      })

      this.setState({ series: [...series] })
    }, 5000)
  }

  componentDidUpdate(preProps: Readonly<propsModel>, _: Readonly<stateModel>) {
    const { selectedRegions: preSelectedRegions } = preProps
    const { selectedRegions } = this.props

    if (preSelectedRegions !== selectedRegions) {
      const { series } = this.state
      const preRegionNames = series.map((e) => e.name)
      const inComingRegionNames = selectedRegions.map((e) => e.regionName)
      const seriesToKeep = series.filter((e) => inComingRegionNames.indexOf(e.name) > -1)
      const toAdd = inComingRegionNames.filter((e) => preRegionNames.indexOf(e) === -1)
      const latestSeries = seriesToKeep.concat(
        toAdd.map((e) => ({
          name: e,
          data: []
        }))
      )
      this.setState({ series: [...latestSeries] })
    }
  }

  componentWillUnmount() {
    this.setState({ series: [] })
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  private axisPivot: string[] = []
  generateLatestAxisTicks(): [string[], string, boolean, string | undefined] {
    const date = new Date()
    const timeStamp = date.getTime() / 1000
    const currentSecond = timeStamp * 1000

    const xLength = 10

    if (this.axisPivot.length === 0) {
      const secondArr = Array.from({ length: xLength }, (_j, i) => {
        const t = timeStamp - i
        return formatXAxisTick(t * 1000)
      }).reverse()

      this.axisPivot = secondArr

      return [this.axisPivot, secondArr[xLength - 1], true, '']
    } else {
      const newLabel = formatXAxisTick(currentSecond)
      const removedLabel = this.axisPivot.shift()
      this.axisPivot.push(newLabel)

      return [this.axisPivot, newLabel, false, removedLabel]
    }
  }

  render() {
    const { series } = this.state
    return (
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
    )
  }
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
