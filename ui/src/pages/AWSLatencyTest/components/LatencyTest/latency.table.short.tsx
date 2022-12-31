import React from 'react'

import { RegionLatencyModel } from '@/models'

interface propsModel {
  tableData: Array<RegionLatencyModel>
}

export default (props: propsModel) => {
  const { tableData } = props

  const tableDataTop3 = tableData
    .slice(0, tableData.length)
    .sort((a: any, b: any) => a.averageLatency - b.averageLatency)
    .slice(0, 3)

  return (
    <>
      <div className="text-primary">
        <i className="fa fa-list-alt text-primary" aria-hidden="true"></i>
        Closest Datacenters
      </div>
      <table className="table table-sm table-bordered table-striped ft-14 mt-2">
        <thead>
          <tr>
            <th scope="col">Region</th>
            <th scope="col">Average Latency (ms)</th>
          </tr>
        </thead>
        <tbody>
          {tableDataTop3.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  {item.displayName} ({item.physicalLocation})
                </td>
                <td>{item.latencySnapshot} ms</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
