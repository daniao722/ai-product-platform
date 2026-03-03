import { useState } from 'react';
import { Card, Table, Tag, Input, Select, Space, Button, Modal, Descriptions, Progress, Tabs, Row, Col, Statistic, DatePicker, Avatar, Tooltip } from 'antd';
import { 
  SearchOutlined, 
  UserOutlined,
  EyeOutlined,
  EditOutlined,
  ExportOutlined,
  ReloadOutlined,
  CrownOutlined,
  TeamOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Search } = Input;
const { RangePicker } = DatePicker;

interface Member {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  registerTime: string;
  lastActive: string;
  tokenUsed: number;
  tokenBalance: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'banned';
  vipLevel: 'free' | 'pro' | 'enterprise';
  vipExpireTime?: string;
  loginCount: number;
  ip: string;
  device: string;
}

export default function MembersPage() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [vipFilter, setVipFilter] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const members: Member[] = [
    { 
      id: '1', 
      username: '张三', 
      email: 'zhangsan@example.com', 
      phone: '138****1234',
      avatar: 'Z',
      registerTime: '2024-01-01 10:00', 
      lastActive: '2024-01-15 18:30', 
      tokenUsed: 125000, 
      tokenBalance: 87500, 
      totalSpent: 2580,
      status: 'active', 
      vipLevel: 'pro',
      vipExpireTime: '2024-12-31',
      loginCount: 156,
      ip: '192.168.1.100',
      device: 'Windows / Chrome'
    },
    { 
      id: '2', 
      username: '李四', 
      email: 'lisi@example.com', 
      phone: '139****5678',
      avatar: 'L',
      registerTime: '2024-01-02 14:20', 
      lastActive: '2024-01-15 16:45', 
      tokenUsed: 82000, 
      tokenBalance: 41800, 
      totalSpent: 5200,
      status: 'active', 
      vipLevel: 'enterprise',
      vipExpireTime: '2025-06-30',
      loginCount: 289,
      ip: '192.168.1.101',
      device: 'MacOS / Safari'
    },
    { 
      id: '3', 
      username: '王五', 
      email: 'wangwu@example.com', 
      phone: '137****9012',
      avatar: 'W',
      registerTime: '2024-01-03 09:15', 
      lastActive: '2024-01-14 11:20', 
      tokenUsed: 3500, 
      tokenBalance: 6500, 
      totalSpent: 0,
      status: 'active', 
      vipLevel: 'free',
      loginCount: 23,
      ip: '192.168.1.102',
      device: 'iOS / Safari'
    },
    { 
      id: '4', 
      username: '赵六', 
      email: 'zhaoliu@example.com', 
      phone: '136****3456',
      avatar: '赵',
      registerTime: '2024-01-04 16:30', 
      lastActive: '2024-01-10 09:00', 
      tokenUsed: 1200, 
      tokenBalance: 3800, 
      totalSpent: 99,
      status: 'inactive', 
      vipLevel: 'free',
      loginCount: 8,
      ip: '192.168.1.103',
      device: 'Android / Chrome'
    },
    { 
      id: '5', 
      username: '钱七', 
      email: 'qianqi@example.com', 
      phone: '135****7890',
      avatar: '钱',
      registerTime: '2024-01-05 11:45', 
      lastActive: '2024-01-15 20:15', 
      tokenUsed: 250000, 
      tokenBalance: 125000, 
      totalSpent: 12800,
      status: 'active', 
      vipLevel: 'enterprise',
      vipExpireTime: '2025-03-15',
      loginCount: 412,
      ip: '192.168.1.104',
      device: 'Windows / Edge'
    },
    { 
      id: '6', 
      username: '孙八', 
      email: 'sunba@example.com', 
      phone: '134****1230',
      avatar: '孙',
      registerTime: '2024-01-06 08:30', 
      lastActive: '2024-01-12 15:30', 
      tokenUsed: 15000, 
      tokenBalance: 5000, 
      totalSpent: 299,
      status: 'banned', 
      vipLevel: 'pro',
      vipExpireTime: '2024-06-30',
      loginCount: 45,
      ip: '192.168.1.105',
      device: 'MacOS / Chrome'
    },
  ];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.username.includes(searchText) || 
                         member.email.includes(searchText) ||
                         member.phone.includes(searchText);
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesVip = vipFilter === 'all' || member.vipLevel === vipFilter;
    return matchesSearch && matchesStatus && matchesVip;
  });

  const columns = [
    {
      title: '用户',
      key: 'user',
      render: (_: any, record: Member) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar style={{ background: 'var(--gradient-primary)' }}>
            {record.avatar}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{record.username}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: '会员等级',
      dataIndex: 'vipLevel',
      key: 'vipLevel',
      render: (level: string) => {
        const configs: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
          free: { color: 'default', label: '免费版', icon: null },
          pro: { color: 'blue', label: '专业版', icon: <CrownOutlined /> },
          enterprise: { color: 'gold', label: '企业版', icon: <CrownOutlined /> },
        };
        const config = configs[level];
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.label}
          </Tag>
        );
      },
    },
    {
      title: 'Token余额',
      dataIndex: 'tokenBalance',
      key: 'tokenBalance',
      render: (balance: number, record: Member) => (
        <div>
          <div style={{ fontWeight: 600 }}>{balance.toLocaleString()}</div>
          <Progress 
            percent={Math.round((balance / (balance + record.tokenUsed)) * 100)} 
            size="small" 
            showInfo={false}
            strokeColor="var(--primary-color)"
          />
        </div>
      ),
    },
    {
      title: '已消耗',
      dataIndex: 'tokenUsed',
      key: 'tokenUsed',
      render: (used: number) => (
        <span style={{ color: 'var(--text-secondary)' }}>{used.toLocaleString()}</span>
      ),
    },
    {
      title: '累计消费',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (spent: number) => (
        <span style={{ color: 'var(--success-color)', fontWeight: 600 }}>
          ¥{spent.toLocaleString()}
        </span>
      ),
    },
    {
      title: '登录次数',
      dataIndex: 'loginCount',
      key: 'loginCount',
      render: (count: number) => (
        <Tooltip title="总登录次数">
          <span>{count}次</span>
        </Tooltip>
      ),
    },
    {
      title: '最后活跃',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (time: string) => (
        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{time}</span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const configs: Record<string, { color: string; label: string }> = {
          active: { color: 'success', label: '活跃' },
          inactive: { color: 'warning', label: '不活跃' },
          banned: { color: 'error', label: '已封禁' },
        };
        const config = configs[status];
        return <Tag color={config.color}>{config.label}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Member) => (
        <Space>
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedMember(record);
              setShowDetailModal(true);
            }}
          >
            详情
          </Button>
          <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
        </Space>
      ),
    },
  ];

  const getMemberUsageChart = () => {
    if (!selectedMember) return {};
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return {
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', data: days },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Token消耗',
          type: 'bar',
          data: [2500, 3200, 1800, 4500, 2800, 1200, 800].map(() => 
            Math.floor(Math.random() * selectedMember.tokenUsed / 7)
          ),
          itemStyle: { 
            color: 'var(--primary-color)',
            borderRadius: [4, 4, 0, 0],
          },
        },
      ],
    };
  };

  const stats = [
    { title: '总会员数', value: members.length, icon: <TeamOutlined />, color: '#6366f1' },
    { title: '活跃会员', value: members.filter(m => m.status === 'active').length, icon: <UserOutlined />, color: '#10b981' },
    { title: '付费会员', value: members.filter(m => m.vipLevel !== 'free').length, icon: <CrownOutlined />, color: '#f59e0b' },
    { title: '今日新增', value: 12, icon: <UserOutlined />, color: '#8b5cf6' },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {stats.map((stat, index) => (
          <Col xs={12} sm={6} key={index}>
            <Card style={{ borderRadius: 'var(--radius-lg)' }}>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={<span style={{ color: stat.color }}>{stat.icon}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ borderRadius: 'var(--radius-lg)' }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <Space wrap>
            <Search
              placeholder="搜索用户名、邮箱、手机号"
              allowClear
              style={{ width: 280 }}
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Select 
              value={statusFilter} 
              onChange={setStatusFilter}
              style={{ width: 120 }}
              options={[
                { value: 'all', label: '全部状态' },
                { value: 'active', label: '活跃' },
                { value: 'inactive', label: '不活跃' },
                { value: 'banned', label: '已封禁' },
              ]}
            />
            <Select 
              value={vipFilter} 
              onChange={setVipFilter}
              style={{ width: 120 }}
              options={[
                { value: 'all', label: '全部等级' },
                { value: 'free', label: '免费版' },
                { value: 'pro', label: '专业版' },
                { value: 'enterprise', label: '企业版' },
              ]}
            />
            <RangePicker />
          </Space>
          <Space>
            <Button icon={<ReloadOutlined />}>刷新</Button>
            <Button icon={<ExportOutlined />}>导出数据</Button>
          </Space>
        </div>

        <Table 
          dataSource={filteredMembers} 
          columns={columns} 
          rowKey="id"
          pagination={{
            total: filteredMembers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      <Modal
        title="会员详情"
        open={showDetailModal}
        onCancel={() => setShowDetailModal(false)}
        footer={null}
        width={800}
      >
        {selectedMember && (
          <Tabs
            items={[
              {
                key: 'basic',
                label: '基本信息',
                children: (
                  <Descriptions column={2} bordered>
                    <Descriptions.Item label="用户名">{selectedMember.username}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{selectedMember.email}</Descriptions.Item>
                    <Descriptions.Item label="手机号">{selectedMember.phone}</Descriptions.Item>
                    <Descriptions.Item label="会员等级">
                      <Tag color={selectedMember.vipLevel === 'enterprise' ? 'gold' : selectedMember.vipLevel === 'pro' ? 'blue' : 'default'}>
                        {selectedMember.vipLevel === 'enterprise' ? '企业版' : selectedMember.vipLevel === 'pro' ? '专业版' : '免费版'}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="注册时间">{selectedMember.registerTime}</Descriptions.Item>
                    <Descriptions.Item label="最后活跃">{selectedMember.lastActive}</Descriptions.Item>
                    <Descriptions.Item label="VIP到期">
                      {selectedMember.vipExpireTime || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="登录次数">{selectedMember.loginCount}次</Descriptions.Item>
                    <Descriptions.Item label="常用IP">{selectedMember.ip}</Descriptions.Item>
                    <Descriptions.Item label="常用设备">{selectedMember.device}</Descriptions.Item>
                    <Descriptions.Item label="状态" span={2}>
                      <Tag color={selectedMember.status === 'active' ? 'success' : selectedMember.status === 'inactive' ? 'warning' : 'error'}>
                        {selectedMember.status === 'active' ? '活跃' : selectedMember.status === 'inactive' ? '不活跃' : '已封禁'}
                      </Tag>
                    </Descriptions.Item>
                  </Descriptions>
                ),
              },
              {
                key: 'usage',
                label: '使用情况',
                children: (
                  <div>
                    <Row gutter={16} style={{ marginBottom: '24px' }}>
                      <Col span={8}>
                        <Card>
                          <Statistic
                            title="Token余额"
                            value={selectedMember.tokenBalance}
                            suffix="tokens"
                            valueStyle={{ color: '#6366f1' }}
                          />
                        </Card>
                      </Col>
                      <Col span={8}>
                        <Card>
                          <Statistic
                            title="已消耗"
                            value={selectedMember.tokenUsed}
                            suffix="tokens"
                            valueStyle={{ color: '#f59e0b' }}
                          />
                        </Card>
                      </Col>
                      <Col span={8}>
                        <Card>
                          <Statistic
                            title="累计消费"
                            value={selectedMember.totalSpent}
                            prefix="¥"
                            valueStyle={{ color: '#10b981' }}
                          />
                        </Card>
                      </Col>
                    </Row>
                    <Card title="近7天Token消耗">
                      <ReactECharts option={getMemberUsageChart()} style={{ height: 250 }} />
                    </Card>
                  </div>
                ),
              },
              {
                key: 'orders',
                label: '订单记录',
                children: (
                  <Table 
                    dataSource={[
                      { id: '1', type: '充值', amount: 500, tokens: 50000, time: '2024-01-15 14:30', status: 'completed' },
                      { id: '2', type: '升级VIP', amount: 299, tokens: 0, time: '2024-01-10 09:15', status: 'completed' },
                      { id: '3', type: '充值', amount: 100, tokens: 10000, time: '2024-01-05 16:45', status: 'completed' },
                    ]}
                    columns={[
                      { title: '订单ID', dataIndex: 'id' },
                      { title: '类型', dataIndex: 'type' },
                      { title: '金额', dataIndex: 'amount', render: (v) => `¥${v}` },
                      { title: 'Token', dataIndex: 'tokens', render: (v) => v ? v.toLocaleString() : '-' },
                      { title: '时间', dataIndex: 'time' },
                      { title: '状态', dataIndex: 'status', render: () => <Tag color="success">已完成</Tag> },
                    ]}
                    pagination={false}
                  />
                ),
              },
            ]}
          />
        )}
      </Modal>
    </div>
  );
}