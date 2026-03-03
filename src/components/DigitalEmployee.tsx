import { useState } from 'react';
import { Tabs, Card, Input, Button, Table, message, Select, Space, Tag, Row, Col } from 'antd';
import { MessageOutlined, BellOutlined, CheckCircleOutlined, ExclamationCircleOutlined, TeamOutlined, CustomerServiceOutlined, RocketOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

interface Ticket {
  id: number;
  customer: string;
  issue: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  resolvedAt?: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;
}

const DigitalEmployee: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      customer: '张三',
      issue: '网站登录问题',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-01 10:00'
    },
    {
      id: 2,
      customer: '李四',
      issue: '订单未发货',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2024-01-01 11:30'
    },
    {
      id: 3,
      customer: '王五',
      issue: '产品使用咨询',
      status: 'resolved',
      priority: 'low',
      createdAt: '2024-01-01 09:15',
      resolvedAt: '2024-01-01 10:45'
    }
  ]);
  const [newTicket, setNewTicket] = useState({ customer: '', issue: '', priority: 'medium' });
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: '每日数据分析',
      description: '分析昨日网站流量和转化率',
      assignee: '运营A',
      status: 'todo',
      dueDate: '2024-01-02'
    },
    {
      id: 2,
      title: '社交媒体发布',
      description: '在微博和微信发布最新活动',
      assignee: '运营B',
      status: 'in-progress',
      dueDate: '2024-01-02'
    },
    {
      id: 3,
      title: '用户调研',
      description: '完成新功能用户反馈收集',
      assignee: '运营C',
      status: 'done',
      dueDate: '2024-01-01'
    }
  ]);
  const [newTask, setNewTask] = useState({ title: '', description: '', assignee: '', dueDate: '' });

  const handleAIResponse = () => {
    if (!newTicket.issue) {
      message.error('请输入问题描述');
      return;
    }
    setAiLoading(true);
    setTimeout(() => {
      const response = `您好，针对"${newTicket.issue}"，我建议您：

1. 检查网络连接是否正常
2. 尝试刷新页面或清除浏览器缓存
3. 如果问题仍然存在，请提供更多详细信息

我们的技术团队将尽快为您处理。`;
      setAiResponse(response);
      setAiLoading(false);
    }, 1500);
  };

  const handleSubmitTicket = () => {
    if (!newTicket.customer || !newTicket.issue) {
      message.error('请填写所有必填字段');
      return;
    }
    const ticket: Ticket = {
      id: Date.now(),
      customer: newTicket.customer,
      issue: newTicket.issue,
      priority: newTicket.priority as 'low' | 'medium' | 'high',
      status: 'open',
      createdAt: new Date().toLocaleString()
    };
    setTickets(prev => [ticket, ...prev]);
    setNewTicket({ customer: '', issue: '', priority: 'medium' });
    message.success('工单创建成功');
  };

  const handleSubmitTask = () => {
    if (!newTask.title || !newTask.assignee || !newTask.dueDate) {
      message.error('请填写所有必填字段');
      return;
    }
    const task: Task = {
      id: Date.now(),
      ...newTask,
      status: 'todo'
    };
    setTasks(prev => [task, ...prev]);
    setNewTask({ title: '', description: '', assignee: '', dueDate: '' });
    message.success('任务创建成功');
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'open': 'var(--error-color)',
      'in-progress': 'var(--warning-color)',
      'resolved': 'var(--success-color)',
      'todo': 'var(--text-tertiary)',
      'done': 'var(--success-color)'
    };
    return colors[status] || 'var(--text-tertiary)';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      'open': '未处理',
      'in-progress': '处理中',
      'resolved': '已解决',
      'todo': '待处理',
      'done': '已完成'
    };
    return texts[status] || status;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'high': 'var(--error-color)',
      'medium': 'var(--warning-color)',
      'low': 'var(--success-color)'
    };
    return colors[priority] || 'var(--text-tertiary)';
  };

  const ticketColumns = [
    {
      title: '工单ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '客户',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '问题描述',
      dataIndex: 'issue',
      key: 'issue',
      ellipsis: true,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag style={{
          background: `${getPriorityColor(priority)}20`,
          color: getPriorityColor(priority),
          border: 'none',
        }}>
          {priority === 'high' ? '高' : priority === 'medium' ? '中' : '低'}
        </Tag>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag style={{
          background: `${getStatusColor(status)}20`,
          color: getStatusColor(status),
          border: 'none',
        }}>
          {getStatusText(status)}
        </Tag>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  const taskColumns = [
    {
      title: '任务ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '任务名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '负责人',
      dataIndex: 'assignee',
      key: 'assignee',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag style={{
          background: `${getStatusColor(status)}20`,
          color: getStatusColor(status),
          border: 'none',
        }}>
          {getStatusText(status)}
        </Tag>
      )
    },
    {
      title: '截止日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
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
            数字员工
          </h2>
          <p style={{ 
            margin: '4px 0 0', 
            fontSize: '14px', 
            color: 'var(--text-tertiary)' 
          }}>
            AI智能客服和运营助手，提升工作效率
          </p>
        </div>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={6}>
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
                <CustomerServiceOutlined style={{ fontSize: '24px', color: 'var(--primary-color)' }} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {tickets.length}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
                  总工单
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--error-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ExclamationCircleOutlined style={{ fontSize: '24px', color: 'var(--error-color)' }} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {tickets.filter(t => t.status === 'open').length}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
                  待处理
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
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
                <RocketOutlined style={{ fontSize: '24px', color: 'var(--success-color)' }} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {tasks.length}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
                  运营任务
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TeamOutlined style={{ fontSize: '24px', color: 'var(--accent-color)' }} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  2
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
                  数字员工
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1">
        <TabPane 
          tab={<span><CustomerServiceOutlined /> AI智能客服</span>} 
          key="1"
        >
          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Card 
                title="AI客服助手" 
                style={{ marginBottom: '20px', borderRadius: 'var(--radius-lg)' }}
              >
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Input 
                    placeholder="客户名称" 
                    value={newTicket.customer}
                    onChange={(e) => setNewTicket({ ...newTicket, customer: e.target.value })}
                    style={{ borderRadius: 'var(--radius-md)' }}
                  />
                  <TextArea 
                    placeholder="问题描述" 
                    value={newTicket.issue}
                    onChange={(e) => setNewTicket({ ...newTicket, issue: e.target.value })}
                    rows={4}
                    style={{ borderRadius: 'var(--radius-md)' }}
                  />
                  <Select 
                    style={{ width: '100%' }}
                    value={newTicket.priority}
                    onChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                  >
                    <Option value="low">低优先级</Option>
                    <Option value="medium">中优先级</Option>
                    <Option value="high">高优先级</Option>
                  </Select>
                  <Space>
                    <Button 
                      type="primary" 
                      icon={<MessageOutlined />} 
                      onClick={handleAIResponse}
                      loading={aiLoading}
                      style={{ borderRadius: 'var(--radius-md)' }}
                    >
                      AI回复
                    </Button>
                    <Button 
                      icon={<CheckCircleOutlined />} 
                      onClick={handleSubmitTicket}
                      style={{ borderRadius: 'var(--radius-md)' }}
                    >
                      提交工单
                    </Button>
                  </Space>
                </Space>
              </Card>
              
              {aiResponse && (
                <Card 
                  title="AI回复" 
                  style={{ borderRadius: 'var(--radius-lg)' }}
                >
                  <pre style={{ 
                    whiteSpace: 'pre-wrap',
                    margin: 0,
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    lineHeight: '1.6',
                  }}>
                    {aiResponse}
                  </pre>
                </Card>
              )}
            </Col>
            
            <Col xs={24} lg={12}>
              <Card 
                title="工单列表" 
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <Table 
                  dataSource={tickets} 
                  columns={ticketColumns} 
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane 
          tab={<span><RocketOutlined /> AI运营助手</span>} 
          key="2"
        >
          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Card 
                title="创建运营任务" 
                style={{ marginBottom: '20px', borderRadius: 'var(--radius-lg)' }}
              >
                <Space direction="vertical" style={{ width: '100%' }} size="middle">
                  <Input 
                    placeholder="任务标题" 
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    style={{ borderRadius: 'var(--radius-md)' }}
                  />
                  <TextArea 
                    placeholder="任务描述" 
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    rows={3}
                    style={{ borderRadius: 'var(--radius-md)' }}
                  />
                  <Input 
                    placeholder="负责人" 
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    style={{ borderRadius: 'var(--radius-md)' }}
                  />
                  <Input 
                    placeholder="截止日期 (YYYY-MM-DD)" 
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    style={{ borderRadius: 'var(--radius-md)' }}
                  />
                  <Button 
                    type="primary" 
                    icon={<BellOutlined />} 
                    onClick={handleSubmitTask}
                    style={{ borderRadius: 'var(--radius-md)' }}
                  >
                    创建任务
                  </Button>
                </Space>
              </Card>
            </Col>
            
            <Col xs={24} lg={12}>
              <Card 
                title="任务列表" 
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <Table 
                  dataSource={tasks} 
                  columns={taskColumns} 
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DigitalEmployee;