import { ReactNode } from 'react'

export interface CommonModel {
  [key: string]: any
}

export interface ColumnModel {
  key: string
  title: string | ReactNode
  dataIndex: string | string[]
  show?: boolean
  ellipsis?: boolean | ColumnEllipsisModel
}

export interface ColumnEllipsisModel {
  showTitle?: boolean
}

export interface BasicStateForListModel<T = any> {
  loading: boolean
  columns: Array<ColumnModel>
  data: Array<T>
  pageSize: number
  pageIndex: number
  totalCount: number
}
