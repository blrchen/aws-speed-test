import React, { useContext } from 'react'

import {
  CompressOutlined,
  ExpandOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Layout, Space, Input, Dropdown, Avatar } from 'antd'
import { Link } from 'react-router-dom'

import GlobalContext from '@/contexts/globalContext'
import { useFullScreen } from '@/hooks'

import styles from './index.module.less'
const { Header } = Layout

const HeaderBar = () => {
  const { onSearch } = useContext(GlobalContext)
  const { fullScreen, toggleFullScreen } = useFullScreen()

  return (
    <>
      <Header className={styles.header}>
        <div className={styles.logoBar}>
          <Link to="/">
            <img alt="logo" src="/logo192.png" />
            <h1>AWSSpeedTest.com</h1>
          </Link>
        </div>
        <Space className={styles.right} size={0}>
          <span className={styles.searchBar}>
            <Input
              allowClear
              placeholder="search..."
              prefix={<SearchOutlined />}
              onPressEnter={(e) => {
                const { value } = e.target as HTMLInputElement
                onSearch?.(value)
              }}
            />
          </span>

          <span className={styles.action} onClick={toggleFullScreen}>
            {fullScreen ? (
              <CompressOutlined style={{ fontSize: 16 }} />
            ) : (
              <ExpandOutlined style={{ fontSize: 16 }} />
            )}
          </span>
          <Dropdown
            menu={{
              className: styles.menu,
              items: [
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: 'Logout'
                }
              ]
            }}
            placement="bottomLeft"
          >
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                className={styles.avatar}
                icon={<UserOutlined />}
                size="small"
                // src={`data:image/png;base64,${account?.idTokenClaims?.aio}`}
              />
              <span>user@contoso.com</span>
            </span>
          </Dropdown>
        </Space>
      </Header>
      <div className={styles.vacancy} />
    </>
  )
}

export default HeaderBar
