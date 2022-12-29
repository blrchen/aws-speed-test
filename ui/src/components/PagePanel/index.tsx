import React, { CSSProperties, ReactNode } from 'react'

import { PageHeader } from 'antd'
import type { PageHeaderProps } from 'antd'
import cs from 'classnames'

import styles from './index.module.less'

export interface PagePanelProps {
  className?: string
  style?: CSSProperties
  title?: string
  body?: ReactNode
  subTitle?: ReactNode
  breadcrumb?: PageHeaderProps['breadcrumb']
  children?: ReactNode
}

const PagePanel = (props: PagePanelProps) => {
  const { className, style, title, subTitle, body, breadcrumb, children } = props
  return (
    <div className={cs(styles.page, className)} style={style}>
      <PageHeader breadcrumb={breadcrumb} ghost={false} subTitle={subTitle} title={title}>
        {body}
      </PageHeader>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default PagePanel
