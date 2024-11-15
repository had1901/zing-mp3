import React, { useEffect, useState } from 'react'
import {
  BellOutlined,
    DesktopOutlined,
    FileOutlined,
    MoonOutlined,
    PieChartOutlined,
    SearchOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme, Avatar, Badge, Button, Flex, Space, Col, Divider, Row} from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { handleLogout } from '../../service'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/actions'
const { Header, Content, Footer, Sider } = Layout

const getItem = (label, key, icon, children) => {
    return { label, key,icon,children }
  }
  
const items = [
    getItem('', '0', ''),
    getItem('Dashboard', 'dashboard', <PieChartOutlined />),
    getItem('Musics', 'music', <DesktopOutlined />),
    getItem('Members', 'members', <UserOutlined/>),
    getItem('Media', 'media', <TeamOutlined />, [getItem('Theme', 'theme'), getItem('Slider Show', 'slideshow')]),
    getItem('Setting', 'setting', <FileOutlined />),
]





function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false)
    const [title, setTitle] = useState('')
    const [breadCrumb, setBreadCrumb] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { token: { colorBgContainer, borderRadiusLG },} = theme.useToken()

    const item = [
      { title: 'Home' },
      { title: title.slice(0,1).toUpperCase() + title.slice(1) },
      { title: breadCrumb }
    ]
  const handleMenuClick = (e) => {
    setTitle(e.key)
    if(e.keyPath.length > 1) {
      if(e.key === 'dashboard'){
        navigate(`/auth/admin`)
      } else {
        navigate(`/auth/admin/${e.keyPath[1]}/${e.key}`)
        setBreadCrumb(e.keyPath[1])
      }
    } else {
      navigate(`/auth/admin/${e.key}`)
      setBreadCrumb('')

    }
  }
const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
  useEffect(() => {
    navigate(location.pathname)
  }, [navigate, location.pathname])

  return (
    <>
      <Layout style={{minHeight: '100vh',}}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="text-white">
            {/* <img src='' alt='' /> */}
            Logo
          </div>
          <Menu theme="dark" defaultSelectedKeys={['dashboard']} mode="inline" items={items} onSelect={handleMenuClick}  />
        </Sider>
        <Layout>
          <Header style={{background: colorBgContainer, height: 60}} className='flex items-center justify-between p-4 font'>
            <h1 className='text-2xl font-semibold'>{title.slice(0,1).toUpperCase() + title.slice(1)}</h1>
            
            <Space size={16} wrap className='flex text-xl'>
                <SearchOutlined />
                <MoonOutlined />
                <Badge count={99} overflowCount={99}>
                    <BellOutlined className='text-lg'/>
                </Badge>
                <Avatar style={{ backgroundColor: '#ccc' }} icon={<UserOutlined />} src={<img src={url} alt="avatar" />}  
                />
            </Space>
          </Header>
          <Content style={{margin: '0 16px',}}>
            <div className='flex items-center justify-between'>
              <Breadcrumb style={{margin: '16px 0',}} items={item} />
              <Flex wrap gap="small">
                <Button onClick={() => handleLogout(dispatch, actions, navigate)} type="primary" danger>Đăng xuất</Button>
              </Flex>
            </div>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
    
  )
}

export default AdminLayout