import React from 'react'

import { Layout } from 'antd'

import VersionBar from './VersionBar'

import styles from './index.module.less'

const { Footer } = Layout

const FooterBar = () => {
  return (
    <Footer className={styles.footer}>
      <VersionBar className={styles.versionBar} />
      <div>Demo App Design ©2022</div>
    </Footer>
  )
}

export default FooterBar
