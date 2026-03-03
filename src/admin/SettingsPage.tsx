import { useState } from 'react';
import { Card, Form, Input, Switch, Select, Button, Divider, message, Row, Col, Space, Typography, Tabs } from 'antd';
import { 
  SettingOutlined, 
  SafetyOutlined, 
  MailOutlined,
  ApiOutlined,
  SaveOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [generalForm] = Form.useForm();
  const [aiForm] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [securityForm] = Form.useForm();

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      message.success('设置保存成功');
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <Title level={4} style={{ marginBottom: '24px' }}>系统设置</Title>

      <Tabs
        items={[
          {
            key: 'general',
            label: <span><SettingOutlined /> 基础设置</span>,
            children: (
              <Card style={{ borderRadius: 'var(--radius-lg)' }}>
                <Form
                  form={generalForm}
                  layout="vertical"
                  initialValues={{
                    siteName: 'AI+ 智能产品平台',
                    siteUrl: 'https://ai-product-platform.vercel.app',
                    siteDescription: '一站式AI产品平台，集成智能对话、AI应用、Agent搭建、数字员工、知识库管理',
                    icp: '京ICP备XXXXXXXX号',
                    enableRegister: true,
                    enableInvite: false,
                    defaultVipLevel: 'free',
                  }}
                >
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="平台名称" name="siteName">
                        <Input placeholder="请输入平台名称" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="平台地址" name="siteUrl">
                        <Input placeholder="请输入平台地址" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="平台描述" name="siteDescription">
                    <TextArea rows={3} placeholder="请输入平台描述" />
                  </Form.Item>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="ICP备案号" name="icp">
                        <Input placeholder="请输入ICP备案号" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="默认会员等级" name="defaultVipLevel">
                        <Select>
                          <Option value="free">免费版</Option>
                          <Option value="pro">专业版</Option>
                          <Option value="enterprise">企业版</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider />
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="开放注册" name="enableRegister" valuePropName="checked">
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="邀请注册" name="enableInvite" valuePropName="checked">
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button type="primary" icon={<SaveOutlined />} loading={loading} onClick={handleSave}>
                      保存设置
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            ),
          },
          {
            key: 'ai',
            label: <span><ApiOutlined /> AI配置</span>,
            children: (
              <Card style={{ borderRadius: 'var(--radius-lg)' }}>
                <Form
                  form={aiForm}
                  layout="vertical"
                  initialValues={{
                    defaultModel: 'gpt-4',
                    maxTokens: 4096,
                    temperature: 0.7,
                    enableImageGen: true,
                    enableVideoGen: true,
                    enableArticleGen: true,
                  }}
                >
                  <Title level={5}>模型配置</Title>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="默认模型" name="defaultModel">
                        <Select>
                          <Option value="gpt-4">GPT-4</Option>
                          <Option value="gpt-3.5-turbo">GPT-3.5 Turbo</Option>
                          <Option value="claude-3">Claude 3</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="最大Token数" name="maxTokens">
                        <Input type="number" placeholder="4096" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Temperature" name="temperature">
                    <Input type="number" step="0.1" min="0" max="2" placeholder="0.7" />
                  </Form.Item>
                  <Divider />
                  <Title level={5}>功能开关</Title>
                  <Row gutter={24}>
                    <Col span={8}>
                      <Form.Item label="AI生图" name="enableImageGen" valuePropName="checked">
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="AI生视频" name="enableVideoGen" valuePropName="checked">
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="AI写文章" name="enableArticleGen" valuePropName="checked">
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider />
                  <Title level={5}>API密钥配置</Title>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="OpenAI API Key" name="openaiKey">
                        <Input.Password placeholder="sk-..." />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Claude API Key" name="claudeKey">
                        <Input.Password placeholder="sk-ant-..." />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button type="primary" icon={<SaveOutlined />} loading={loading} onClick={handleSave}>
                      保存设置
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            ),
          },
          {
            key: 'email',
            label: <span><MailOutlined /> 邮件配置</span>,
            children: (
              <Card style={{ borderRadius: 'var(--radius-lg)' }}>
                <Form
                  form={emailForm}
                  layout="vertical"
                  initialValues={{
                    smtpHost: 'smtp.example.com',
                    smtpPort: 465,
                    smtpUser: 'noreply@example.com',
                    enableSsl: true,
                  }}
                >
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="SMTP服务器" name="smtpHost">
                        <Input placeholder="smtp.example.com" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="端口" name="smtpPort">
                        <Input type="number" placeholder="465" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="发件人邮箱" name="smtpUser">
                        <Input placeholder="noreply@example.com" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="邮箱密码" name="smtpPassword">
                        <Input.Password placeholder="请输入邮箱密码" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="启用SSL" name="enableSsl" valuePropName="checked">
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>
                  <Form.Item>
                    <Space>
                      <Button type="primary" icon={<SaveOutlined />} loading={loading} onClick={handleSave}>
                        保存设置
                      </Button>
                      <Button>发送测试邮件</Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Card>
            ),
          },
          {
            key: 'security',
            label: <span><SafetyOutlined /> 安全设置</span>,
            children: (
              <Card style={{ borderRadius: 'var(--radius-lg)' }}>
                <Form
                  form={securityForm}
                  layout="vertical"
                  initialValues={{
                    loginAttempts: 5,
                    lockDuration: 30,
                    passwordMinLength: 8,
                    requireSpecialChar: true,
                    enableTwoFactor: false,
                    sessionTimeout: 24,
                  }}
                >
                  <Title level={5}>登录安全</Title>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="最大登录尝试次数" name="loginAttempts">
                        <Input type="number" placeholder="5" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="锁定时长(分钟)" name="lockDuration">
                        <Input type="number" placeholder="30" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="会话超时时间(小时)" name="sessionTimeout">
                    <Input type="number" placeholder="24" />
                  </Form.Item>
                  <Divider />
                  <Title level={5}>密码策略</Title>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="最小密码长度" name="passwordMinLength">
                        <Input type="number" placeholder="8" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="要求特殊字符" name="requireSpecialChar" valuePropName="checked">
                        <Switch checkedChildren="是" unCheckedChildren="否" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider />
                  <Title level={5}>两步验证</Title>
                  <Form.Item label="启用两步验证" name="enableTwoFactor" valuePropName="checked">
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" icon={<SaveOutlined />} loading={loading} onClick={handleSave}>
                      保存设置
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}