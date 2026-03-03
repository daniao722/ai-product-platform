import { useState } from 'react';
import { Card, Input, Button, Form, Select, Switch, Table, message, Space, Tag, Row, Col, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined, EditOutlined, RobotOutlined, ThunderboltOutlined, SettingOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Agent {
  id: number;
  name: string;
  description: string;
  type: string;
  isActive: boolean;
  createdAt: string;
}

const AIAgent: React.FC = () => {
  const [form] = Form.useForm();
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 1,
      name: '客服助手',
      description: '用于处理客户咨询的智能助手，支持多轮对话和情感分析',
      type: '客服',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      name: '营销助手',
      description: '用于营销活动策划的智能助手，自动生成营销文案',
      type: '营销',
      isActive: false,
      createdAt: '2024-01-02'
    },
    {
      id: 3,
      name: '数据分析助手',
      description: '自动分析业务数据，生成可视化报告和洞察建议',
      type: '运营',
      isActive: true,
      createdAt: '2024-01-03'
    }
  ]);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (values: any) => {
    if (editingAgent) {
      setAgents(prev => prev.map(agent => 
        agent.id === editingAgent.id 
          ? { ...agent, ...values, id: editingAgent.id }
          : agent
      ));
      message.success('Agent更新成功');
    } else {
      const newAgent: Agent = {
        id: Date.now(),
        ...values,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setAgents(prev => [newAgent, ...prev]);
      message.success('Agent创建成功');
    }
    form.resetFields();
    setEditingAgent(null);
    setShowModal(false);
  };

  const handleEdit = (agent: Agent) => {
    form.setFieldsValue(agent);
    setEditingAgent(agent);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个Agent吗？此操作不可恢复。',
      okText: '删除',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: () => {
        setAgents(prev => prev.filter(agent => agent.id !== id));
        message.success('Agent删除成功');
      }
    });
  };

  const handleToggleActive = (id: number, checked: boolean) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? { ...agent, isActive: checked } : agent
    ));
    message.success(checked ? 'Agent已启用' : 'Agent已停用');
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      '客服': 'var(--primary-color)',
      '营销': 'var(--secondary-color)',
      '运营': 'var(--accent-color)',
      '其他': 'var(--text-tertiary)'
    };
    return colors[type] || colors['其他'];
  };

  const columns = [
    {
      title: 'Agent名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Agent) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: record.isActive ? 'var(--gradient-primary)' : 'var(--bg-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <RobotOutlined style={{ 
              color: record.isActive ? 'white' : 'var(--text-tertiary)',
              fontSize: '18px'
            }} />
          </div>
          <div>
            <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{name}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
              创建于 {record.createdAt}
            </div>
          </div>
        </div>
      )
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag style={{
          background: `${getTypeColor(type)}20`,
          color: getTypeColor(type),
          border: 'none',
          borderRadius: 'var(--radius-full)',
          padding: '4px 12px',
        }}>
          {type}
        </Tag>
      )
    },
    {
      title: '状态',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text: boolean, record: Agent) => (
        <Switch 
          checked={text} 
          onChange={(checked) => handleToggleActive(record.id, checked)}
          checkedChildren="启用"
          unCheckedChildren="停用"
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Agent) => (
        <Space>
          <Button 
            type="default"
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            编辑
          </Button>
          <Button 
            type="default"
            danger
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDelete(record.id)}
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-light)',
      }}>
        <div>
          <h2 style={{ 
            margin: 0, 
            fontSize: '24px', 
            fontWeight: '600',
            color: 'var(--text-primary)',
          }}>
            AI Agent 搭建系统
          </h2>
          <p style={{ 
            margin: '4px 0 0', 
            fontSize: '14px', 
            color: 'var(--text-tertiary)' 
          }}>
            创建和管理智能AI助手，自动化业务流程
          </p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setShowModal(true)}
          style={{
            borderRadius: 'var(--radius-md)',
            height: '48px',
            padding: '0 24px',
          }}
        >
          创建Agent
        </Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <RobotOutlined style={{ fontSize: '24px', color: 'var(--primary-color)' }} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {agents.length}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
                  总Agent数
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--success-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ThunderboltOutlined style={{ fontSize: '24px', color: 'var(--success-color)' }} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {agents.filter(a => a.isActive).length}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
                  运行中
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--warning-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <SettingOutlined style={{ fontSize: '24px', color: 'var(--warning-color)' }} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {agents.filter(a => !a.isActive).length}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
                  已停用
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card style={{ borderRadius: 'var(--radius-lg)' }}>
        <Table 
          dataSource={agents} 
          columns={columns} 
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title={editingAgent ? '编辑Agent' : '创建新Agent'}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditingAgent(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: '24px' }}
        >
          <Form.Item
            name="name"
            label="Agent名称"
            rules={[{ required: true, message: '请输入Agent名称' }]}
          >
            <Input 
              placeholder="请输入Agent名称" 
              style={{ borderRadius: 'var(--radius-md)' }}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Agent描述"
            rules={[{ required: true, message: '请输入Agent描述' }]}
          >
            <Input.TextArea 
              rows={3} 
              placeholder="请输入Agent描述" 
              style={{ borderRadius: 'var(--radius-md)' }}
            />
          </Form.Item>

          <Form.Item
            name="type"
            label="Agent类型"
            rules={[{ required: true, message: '请选择Agent类型' }]}
          >
            <Select placeholder="请选择Agent类型" style={{ borderRadius: 'var(--radius-md)' }}>
              <Option value="客服">客服</Option>
              <Option value="营销">营销</Option>
              <Option value="运营">运营</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => {
                setShowModal(false);
                setEditingAgent(null);
                form.resetFields();
              }}>
                取消
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<SaveOutlined />}
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                {editingAgent ? '更新Agent' : '创建Agent'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AIAgent;