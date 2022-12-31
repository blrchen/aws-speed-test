import React, { useEffect, useState } from 'react'

import { RegionGroupModel, Region } from '@/models/region'

interface propsModel {
  regionsGroup: Array<RegionGroupModel>
  onRegionSelected?: (regionsGroup: RegionGroupModel[]) => void
  onRegionRemoved?: (regionsGroup: Region[]) => void
  onRegionAdded?: (regionsGroup: Region[]) => void
}

const RegionGroup = (props: propsModel) => {
  const styleVar = {
    fontSize: 'small'
  }

  const { regionsGroup, onRegionSelected, onRegionRemoved, onRegionAdded } = props
  const [regionsGroupState, setRegionsGroup] = useState(() => regionsGroup)
  const [totalCheckedRegions, setTotalCheckedRegions] = useState<number>(() => {
    const regions = regionsGroup.reduce((acc: Region[], current: RegionGroupModel) => {
      const filtered = current.regions.filter((e) => e.checked)
      return acc.concat(filtered)
    }, [] as Region[])

    return regions.length
  })

  const onAllSelect = (ev: RegionGroupModel) => {
    console.log(ev)
    ev.checked = !ev.checked
    ev.regions.forEach((el) => (el.checked = ev.checked))

    const index = regionsGroupState.findIndex((e) => e.geography === ev.geography)

    if (index > -1) {
      regionsGroupState[index] = ev
      setRegionsGroup([...regionsGroupState])
    }

    onRegionSelected?.call(null, regionsGroupState)

    if (!ev.checked) {
      onRegionRemoved?.call(null, ev.regions)
      setTotalCheckedRegions(totalCheckedRegions - ev.regions.length)
    } else {
      onRegionAdded?.call(null, ev.regions)
      setTotalCheckedRegions(totalCheckedRegions + ev.regions.length)
    }
  }

  const onPartialSelect = (region: Region, group: RegionGroupModel) => {
    region.checked = !region.checked

    const regionIndex = group.regions.findIndex((e) => e.regionName === region.regionName)

    if (regionIndex > -1) {
      group.regions[regionIndex] = region
    }

    const index = regionsGroupState.findIndex((e) => e.geography === group.geography)

    if (index > -1) {
      regionsGroupState[index] = group
      setRegionsGroup([...regionsGroupState])
    }

    onRegionSelected?.call(null, regionsGroupState)

    if (!region.checked) {
      onRegionRemoved?.call(null, [region])
      setTotalCheckedRegions(totalCheckedRegions - 1)
    } else {
      onRegionAdded?.call(null, [region])
      setTotalCheckedRegions(totalCheckedRegions + 1)
    }
  }

  useEffect(() => {
    setRegionsGroup(regionsGroup)
  }, [regionsGroup])

  return (
    <>
      {totalCheckedRegions === 0 && (
        <div className="text-danger font-weight-bold">Please select regions to get started</div>
      )}
      {
        <div className="row mx-0 mt-2" style={styleVar}>
          {regionsGroupState.map((group, index) => {
            return (
              <div key={index} className="col-lg-4 pl-0 pr-2 mt-2">
                <div className="ft-14 border rounded-sm">
                  <div className="d-flex justify-content-between bg-light border-bottom p-2">
                    <strong>{group.geography}</strong>
                    <label className="mb-0" htmlFor={group.geography}>
                      <input
                        type="checkbox"
                        id={group.geography}
                        checked={group.checked}
                        onChange={(_) => onAllSelect(group)}
                      />
                      <span className="checkbox-header">Check all</span>
                    </label>
                  </div>
                  <div className="mt-1 px-3 py-2">
                    {group?.regions.map((region, index) => {
                      const checkedClass = region.checked ? 'text-primary' : ''
                      return (
                        <label
                          key={index}
                          htmlFor={region.regionName}
                          className={`cursor-pointer mr-3 mb-1 ${checkedClass}`}
                        >
                          <input
                            type="checkbox"
                            id={region.regionName}
                            checked={region.checked}
                            onChange={() => onPartialSelect(region, group)}
                          />
                          <span className="checkbox-item">{region.displayName}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      }
    </>
  )
}

export default RegionGroup
