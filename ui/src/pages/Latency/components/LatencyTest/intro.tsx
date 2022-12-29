import React from 'react'

import { Link } from 'react-router-dom'

export default () => {
  const styleVar = {
    fontSize: 'small'
  }

  return (
    <>
      <div style={styleVar}>
        This tool runs latency test from your IP location to Azure datacenters around the world.
        <ul>
          <li>
            For latency test between Azure regions via Azure backbone network, please checkout
            <Link to="/azure/regionToRegionLatency">Azure Region to Region Latency</Link>.
          </li>
          <li>
            For latency test between Azure availability zones, please check out
            <a
              rel="noopener noreferrer"
              href="https://docs.microsoft.com/en-us/azure/virtual-machines/workloads/sap/sap-ha-availability-zones#network-latency-between-and-within-zones"
              target="_blank"
            >
              Network latency between and within zones
            </a>
          </li>
          <li>
            For AWS region latency test, please checkout{' '}
            <a rel="noopener noreferrer" href="https://www.awsspeedtest.com" target="_blank">
              AWS Speed Test
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
