import { useState } from 'react';
import { Modal, Form, Input, Button, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const success = await login(values.username, values.password);
      if (success) {
        message.success('登录成功！');
        loginForm.resetFields();
        onClose();
      } else {
        message.error('用户名或密码错误');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values: { username: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const success = await register(values.username, values.email, values.password);
      if (success) {
        message.success('注册成功！');
        registerForm.resetFields();
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={420}
      centered
      styles={{
        content: {
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
        }
      }}
    >
      <div style={{
        background: 'var(--gradient-primary)',
        padding: '32px 24px',
        textAlign: 'center',
        color: 'white',
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.2)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>AI+</h2>
        <p style={{ margin: '8px 0 0', opacity: 0.9, fontSize: '14px' }}>智能产品平台</p>
      </div>

      <div style={{ padding: '24px' }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            {
              key: 'login',
              label: '登录',
              children: (
                <Form
                  form={loginForm}
                  onFinish={handleLogin}
                  layout="vertical"
                  style={{ marginTop: '16px' }}
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input
                      prefix={<UserOutlined style={{ color: 'var(--text-tertiary)' }} />}
                      placeholder="用户名"
                      size="large"
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined style={{ color: 'var(--text-tertiary)' }} />}
                      placeholder="密码"
                      size="large"
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      block
                      loading={loading}
                      style={{
                        borderRadius: 'var(--radius-md)',
                        height: '48px',
                        background: 'var(--gradient-primary)',
                        border: 'none',
                      }}
                    >
                      登录
                    </Button>
                  </Form.Item>
                  <div style={{ 
                    textAlign: 'center', 
                    marginTop: '16px',
                    padding: '12px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                  }}>
                    演示账号：admin / 123456
                  </div>
                </Form>
              ),
            },
            {
              key: 'register',
              label: '注册',
              children: (
                <Form
                  form={registerForm}
                  onFinish={handleRegister}
                  layout="vertical"
                  style={{ marginTop: '16px' }}
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input
                      prefix={<UserOutlined style={{ color: 'var(--text-tertiary)' }} />}
                      placeholder="用户名"
                      size="large"
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: '请输入邮箱' },
                      { type: 'email', message: '请输入有效的邮箱地址' },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined style={{ color: 'var(--text-tertiary)' }} />}
                      placeholder="邮箱"
                      size="large"
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: '请输入密码' },
                      { min: 6, message: '密码至少6位' },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined style={{ color: 'var(--text-tertiary)' }} />}
                      placeholder="密码"
                      size="large"
                      style={{ borderRadius: 'var(--radius-md)' }}
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      block
                      loading={loading}
                      style={{
                        borderRadius: 'var(--radius-md)',
                        height: '48px',
                        background: 'var(--gradient-primary)',
                        border: 'none',
                      }}
                    >
                      注册
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      </div>
    </Modal>
  );
}