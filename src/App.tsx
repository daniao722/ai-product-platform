import { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Space, Button, message } from 'antd';
import { Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { MessageOutlined, PictureOutlined, RobotOutlined, TeamOutlined, DatabaseOutlined, BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined, StarOutlined, HomeOutlined } from '@ant-design/icons';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import NewChat from './components/NewChat';
import AIApps from './components/AIApps';
import AIAgent from './components/AIAgent';
import DigitalEmployee from './components/DigitalEmployee';
import AIKnowledgeBase from './components/AIKnowledgeBase';

const { Sider, Content, Header } = Layout;

function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/new-chat',
      icon: <MessageOutlined />,
      label: '新对话',
    },
    {
      key: '/ai-apps',
      icon: <PictureOutlined />,
      label: 'AI应用集',
    },
    {
      key: '/ai-agent',
      icon: <RobotOutlined />,
      label: 'AI Agent搭建',
    },
    {
      key: '/digital-employee',
      icon: <TeamOutlined />,
      label: '数字员工',
    },
    {
      key: '/ai-knowledge-base',
      icon: <DatabaseOutlined />,
      label: 'AI知识库',
    },
  ];

  const handleLogout = () => {
    logout();
    message.success('已退出登录');
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '返回首页',
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
          background: 'var(--bg-primary)',
          borderRight: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
        }}
        width={240}
      >
        <div style={{
          padding: '24px 16px',
          borderBottom: '1px solid var(--border-light)',
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
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-md)',
            }}>
              <StarOutlined style={{ color: 'white', fontSize: '20px' }} />
            </div>
            {!collapsed && (
              <div style={{ textAlign: 'left' }}>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '700',
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  AI+
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'var(--text-tertiary)',
                  marginTop: '2px',
                }}>
                  智能产品平台
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
          }}
          items={menuItems.map(item => ({
            ...item,
            label: <Link to={item.key}>{item.label}</Link>,
          }))}
        />

        {!collapsed && (
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '16px',
            right: '16px',
            padding: '16px',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
          }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              AI助手状态
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--success-color)',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)',
              }} />
              <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
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
            {menuItems.find(item => item.key === location.pathname)?.label || 'AI+ 产品平台'}
          </div>

          <Space size={16}>
            <Badge count={3} size="small">
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
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                  {user?.username || '用户'}
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
          <Routes>
            <Route path="/" element={<Navigate to="/new-chat" replace />} />
            <Route path="/new-chat" element={<NewChat />} />
            <Route path="/ai-apps" element={<AIApps />} />
            <Route path="/ai-agent" element={<AIAgent />} />
            <Route path="/digital-employee" element={<DigitalEmployee />} />
            <Route path="/ai-knowledge-base" element={<AIKnowledgeBase />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return <LandingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <DashboardLayout />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;