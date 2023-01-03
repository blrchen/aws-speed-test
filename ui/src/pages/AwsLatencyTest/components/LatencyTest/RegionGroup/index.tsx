import React, { useEffect, useState } from 'react'

import { RegionGroupModel, Region } from '@/models/region'

interface RegionGroupProps {
  regionsGroup: Array<RegionGroupModel>
  onRegionSelected?: (regionsGroup: RegionGroupModel[]) => void
  onRegionRemoved?: (regionsGroup: Region[]) => void
  onRegionAdded?: (regionsGroup: Region[]) => void
}

const RegionGroup = (props: RegionGroupProps) => {
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
        <p>
          <strong>Please select regions to get started</strong>
        </p>
      )}
      {
        <div>
          {regionsGroupState.map((group, index) => {
            return (
              <div key={index}>
                <div>
                  <div>
                    <strong>{group.geography}</strong>
                    <label htmlFor={group.geography}>
                      <input
                        style={{ marginLeft: '5px', marginRight: '5px' }}
                        type="checkbox"
                        id={group.geography}
                        checked={group.checked}
                        onChange={(_) => onAllSelect(group)}
                      />
                      <span>Check all</span>
                    </label>
                  </div>
                  <div>
                    {group?.regions.map((region, index) => {
                      return (
                        <label key={index} htmlFor={region.regionName}>
                          <input
                            style={{ marginLeft: '5px', marginRight: '5px' }}
                            type="checkbox"
                            id={region.regionName}
                            checked={region.checked}
                            onChange={() => onPartialSelect(region, group)}
                          />
                          <span>{region.displayName}</span>
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
