import { RegionLatencyModel } from '@/models'

interface propsModel {
  tableData: Array<RegionLatencyModel>
}

export default (props: propsModel) => {
  const { tableData } = props

  return (
    <>
      <div className="text-primary">
        <i className="fa fa-list-alt text-primary" aria-hidden="true"></i>
        AWS Latency Test
      </div>
      <table className="table table-sm table-bordered table-striped ft-14 mt-2">
        <thead>
          <tr>
            <th scope="col">Geography</th>
            <th scope="col">Region</th>
            <th scope="col">Physical Location</th>
            <th scope="col">Average Latency (ms)</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.geography}</td>
                <td>{item.displayName}</td>
                <td>{item.physicalLocation}</td>
                <td>{item.latencySnapshot} ms</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
