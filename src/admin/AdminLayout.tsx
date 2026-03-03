import { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Space, Button } from 'antd';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  LineChartOutlined, 
  TransactionOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  ApiOutlined,
  FileImageOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Sider, Content, Header } = Layout;

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: '数据概览',
    },
    {
      key: '/admin/ppt-creator',
      icon: <FileImageOutlined />,
      label: 'PPT创建',
    },
    {
      key: '/admin/members',
      icon: <TeamOutlined />,
      label: '会员管理',
    },
    {
      key: '/admin/analytics',
      icon: <LineChartOutlined />,
      label: '数据分析',
    },
    {
      key: '/admin/tokens',
      icon: <ApiOutlined />,
      label: 'Token消耗',
    },
    {
      key: '/admin/orders',
      icon: <TransactionOutlined />,
      label: '订单充值',
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '返回前台',
      onClick: () => navigate('/'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)',
          boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
        }}
        width={240}
      >
        <div style={{
          padding: '24px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '12px',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
            }}>
              <DashboardOutlined style={{ color: 'white', fontSize: '20px' }} />
            </div>
            {!collapsed && (
              <div style={{ textAlign: 'left' }}>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '700',
                  color: 'white',
                }}>
                  AI+ 运营后台
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'rgba(255,255,255,0.6)',
                  marginTop: '2px',
                }}>
                  Management System
                </div>
              </div>
            )}
          </div>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ 
            border: 'none',
            padding: '12px 8px',
            background: 'transparent',
          }}
          items={menuItems.map(item => ({
            ...item,
            label: <Link to={item.key} style={{ color: 'inherit' }}>{item.label}</Link>,
          }))}
        />

        {!collapsed && (
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '16px',
            right: '16px',
            padding: '16px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
              系统状态
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)',
              }} />
              <span style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>
                运行正常
              </span>
            </div>
          </div>
        )}
      </Sider>

      <Layout>
        <Header style={{
          background: 'var(--bg-primary)',
          padding: '0 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          <div style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>
            {menuItems.find(item => item.key === location.pathname)?.label || '运营管理后台'}
          </div>

          <Space size={16}>
            <Badge count={5} size="small">
              <Button 
                type="text" 
                icon={<BellOutlined style={{ fontSize: '18px' }} />}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </Badge>

            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '6px 12px 6px 6px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
              }}>
                <Avatar 
                  size={32}
                  style={{ 
                    background: 'var(--gradient-primary)',
                    fontSize: '14px',
                  }}
                >
                  {user?.username?.charAt(0).toUpperCase() || 'A'}
                </Avatar>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                  {user?.username || '管理员'}
                </span>
              </div>
            </Dropdown>
          </Space>
        </Header>

        <Content style={{
          margin: '24px',
          padding: '24px',
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)',
          minHeight: 'calc(100vh - 112px)',
          overflow: 'auto',
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}