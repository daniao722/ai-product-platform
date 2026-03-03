import { useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Select, DatePicker, Space, Typography } from 'antd';
import { 
  UserOutlined, 
  ApiOutlined, 
  TeamOutlined,
  RiseOutlined,
  FallOutlined,
  DollarOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface MemberData {
  id: string;
  username: string;
  email: string;
  registerTime: string;
  lastActive: string;
  tokenUsed: number;
  tokenBalance: number;
  status: 'active' | 'inactive';
  vipLevel: 'free' | 'pro' | 'enterprise';
}

interface DailyStats {
  date: string;
  newMembers: number;
  activeUsers: number;
  tokenUsed: number;
  revenue: number;
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const memberData: MemberData[] = [
    { id: '1', username: '张三', email: 'zhangsan@example.com', registerTime: '2024-01-01 10:00', lastActive: '2024-01-15 18:30', tokenUsed: 12500, tokenBalance: 87500, status: 'active', vipLevel: 'pro' },
    { id: '2', username: '李四', email: 'lisi@example.com', registerTime: '2024-01-02 14:20', lastActive: '2024-01-15 16:45', tokenUsed: 8200, tokenBalance: 41800, status: 'active', vipLevel: 'enterprise' },
    { id: '3', username: '王五', email: 'wangwu@example.com', registerTime: '2024-01-03 09:15', lastActive: '2024-01-14 11:20', tokenUsed: 3500, tokenBalance: 6500, status: 'active', vipLevel: 'free' },
    { id: '4', username: '赵六', email: 'zhaoliu@example.com', registerTime: '2024-01-04 16:30', lastActive: '2024-01-10 09:00', tokenUsed: 1200, tokenBalance: 3800, status: 'inactive', vipLevel: 'free' },
    { id: '5', username: '钱七', email: 'qianqi@example.com', registerTime: '2024-01-05 11:45', lastActive: '2024-01-15 20:15', tokenUsed: 25000, tokenBalance: 125000, status: 'active', vipLevel: 'enterprise' },
  ];

  const dailyStats: DailyStats[] = [
    { date: '01-09', newMembers: 12, activeUsers: 156, tokenUsed: 125000, revenue: 2500 },
    { date: '01-10', newMembers: 15, activeUsers: 189, tokenUsed: 142000, revenue: 3200 },
    { date: '01-11', newMembers: 8, activeUsers: 145, tokenUsed: 98000, revenue: 1800 },
    { date: '01-12', newMembers: 22, activeUsers: 234, tokenUsed: 187000, revenue: 4500 },
    { date: '01-13', newMembers: 18, activeUsers: 198, tokenUsed: 156000, revenue: 3800 },
    { date: '01-14', newMembers: 25, activeUsers: 267, tokenUsed: 210000, revenue: 5200 },
    { date: '01-15', newMembers: 30, activeUsers: 312, tokenUsed: 245000, revenue: 6100 },
  ];

  const overviewStats = [
    {
      title: '总会员数',
      value: 1256,
      prefix: <TeamOutlined />,
      suffix: '人',
      change: '+12.5%',
      changeType: 'rise' as const,
      color: '#6366f1',
    },
    {
      title: '活跃用户',
      value: 892,
      prefix: <UserOutlined />,
      suffix: '人',
      change: '+8.3%',
      changeType: 'rise' as const,
      color: '#10b981',
    },
    {
      title: 'Token消耗',
      value: 1256000,
      prefix: <ApiOutlined />,
      suffix: 'tokens',
      change: '+15.2%',
      changeType: 'rise' as const,
      color: '#f59e0b',
    },
    {
      title: '今日收入',
      value: 6100,
      prefix: <DollarOutlined />,
      suffix: '元',
      change: '-3.2%',
      changeType: 'fall' as const,
      color: '#ef4444',
    },
  ];

  const memberColumns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '会员等级',
      dataIndex: 'vipLevel',
      key: 'vipLevel',
      render: (level: string) => {
        const colors: Record<string, string> = {
          free: 'default',
          pro: 'blue',
          enterprise: 'gold',
        };
        const labels: Record<string, string> = {
          free: '免费版',
          pro: '专业版',
          enterprise: '企业版',
        };
        return <Tag color={colors[level]}>{labels[level]}</Tag>;
      },
    },
    {
      title: 'Token余额',
      dataIndex: 'tokenBalance',
      key: 'tokenBalance',
      render: (balance: number) => balance.toLocaleString(),
    },
    {
      title: '已消耗',
      dataIndex: 'tokenUsed',
      key: 'tokenUsed',
      render: (used: number) => used.toLocaleString(),
    },
    {
      title: '最后活跃',
      dataIndex: 'lastActive',
      key: 'lastActive',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? '活跃' : '不活跃'}
        </Tag>
      ),
    },
  ];

  const getUserTrendOption = () => ({
    tooltip: { trigger: 'axis' },
    legend: { data: ['新增会员', '活跃用户'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: { type: 'category', data: dailyStats.map(d => d.date) },
    yAxis: { type: 'value' },
    series: [
      {
        name: '新增会员',
        type: 'line',
        smooth: true,
        data: dailyStats.map(d => d.newMembers),
        itemStyle: { color: '#6366f1' },
        areaStyle: { color: 'rgba(99, 102, 241, 0.1)' },
      },
      {
        name: '活跃用户',
        type: 'line',
        smooth: true,
        data: dailyStats.map(d => d.activeUsers),
        itemStyle: { color: '#10b981' },
        areaStyle: { color: 'rgba(16, 185, 129, 0.1)' },
      },
    ],
  });

  const getTokenUsageOption = () => ({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: dailyStats.map(d => d.date) },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Token消耗',
        type: 'bar',
        data: dailyStats.map(d => d.tokenUsed),
        itemStyle: { 
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#f59e0b' },
              { offset: 1, color: '#fbbf24' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  });

  const getRevenueOption = () => ({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: dailyStats.map(d => d.date) },
    yAxis: { type: 'value' },
    series: [
      {
        name: '收入',
        type: 'line',
        smooth: true,
        data: dailyStats.map(d => d.revenue),
        itemStyle: { color: '#ef4444' },
        areaStyle: { color: 'rgba(239, 68, 68, 0.1)' },
      },
    ],
  });

  const getVipDistributionOption = () => ({
    tooltip: { trigger: 'item' },
    legend: { bottom: 0 },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
        data: [
          { value: 856, name: '免费版', itemStyle: { color: '#94a3b8' } },
          { value: 280, name: '专业版', itemStyle: { color: '#6366f1' } },
          { value: 120, name: '企业版', itemStyle: { color: '#f59e0b' } },
        ],
      },
    ],
  });

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4} style={{ margin: 0 }}>数据概览</Title>
        <Space>
          <Select 
            value={timeRange} 
            onChange={setTimeRange}
            style={{ width: 120 }}
            options={[
              { value: '7d', label: '近7天' },
              { value: '30d', label: '近30天' },
              { value: '90d', label: '近90天' },
            ]}
          />
          <RangePicker />
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {overviewStats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card 
              style={{ 
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
              }}
            >
              <Statistic
                title={<span style={{ color: 'var(--text-secondary)' }}>{stat.title}</span>}
                value={stat.value}
                prefix={<span style={{ color: stat.color }}>{stat.prefix}</span>}
                suffix={stat.suffix}
                valueStyle={{ fontWeight: 700 }}
              />
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {stat.changeType === 'rise' ? (
                  <RiseOutlined style={{ color: '#10b981' }} />
                ) : (
                  <FallOutlined style={{ color: '#ef4444' }} />
                )}
                <span style={{ 
                  color: stat.changeType === 'rise' ? '#10b981' : '#ef4444',
                  fontSize: '12px',
                }}>
                  {stat.change} 较上周
                </span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={16}>
          <Card 
            title="用户趋势" 
            style={{ borderRadius: 'var(--radius-lg)' }}
          >
            <ReactECharts option={getUserTrendOption()} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card 
            title="会员等级分布" 
            style={{ borderRadius: 'var(--radius-lg)' }}
          >
            <ReactECharts option={getVipDistributionOption()} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <Card 
            title="Token消耗趋势" 
            style={{ borderRadius: 'var(--radius-lg)' }}
          >
            <ReactECharts option={getTokenUsageOption()} style={{ height: 280 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            title="收入趋势" 
            style={{ borderRadius: 'var(--radius-lg)' }}
          >
            <ReactECharts option={getRevenueOption()} style={{ height: 280 }} />
          </Card>
        </Col>
      </Row>

      <Card 
        title="最近活跃会员" 
        style={{ borderRadius: 'var(--radius-lg)' }}
        extra={<a href="/admin/members">查看全部</a>}
      >
        <Table 
          dataSource={memberData} 
          columns={memberColumns} 
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
}