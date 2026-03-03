import { useState } from 'react';
import { Card, Row, Col, Table, Tag, Select, DatePicker, Space, Statistic, Progress, Typography } from 'antd';
import { 
  ApiOutlined, 
  RiseOutlined,
  UserOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface TokenUsage {
  id: string;
  userId: string;
  username: string;
  feature: string;
  tokens: number;
  cost: number;
  time: string;
  model: string;
}

interface FeatureUsage {
  feature: string;
  tokens: number;
  percentage: number;
  trend: number;
}

export default function TokensPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const tokenUsageData: TokenUsage[] = [
    { id: '1', userId: '1', username: '张三', feature: 'AI对话', tokens: 2500, cost: 0.05, time: '2024-01-15 18:30:15', model: 'GPT-4' },
    { id: '2', userId: '2', username: '李四', feature: 'AI生图', tokens: 1500, cost: 0.03, time: '2024-01-15 18:28:42', model: 'DALL-E-3' },
    { id: '3', userId: '5', username: '钱七', feature: 'AI写文章', tokens: 3200, cost: 0.064, time: '2024-01-15 18:25:10', model: 'GPT-4' },
    { id: '4', userId: '1', username: '张三', feature: 'AI对话', tokens: 1800, cost: 0.036, time: '2024-01-15 18:20:33', model: 'GPT-3.5' },
    { id: '5', userId: '3', username: '王五', feature: '知识库问答', tokens: 800, cost: 0.016, time: '2024-01-15 18:15:22', model: 'GPT-3.5' },
    { id: '6', userId: '2', username: '李四', feature: 'AI生视频', tokens: 5000, cost: 0.1, time: '2024-01-15 18:10:45', model: 'Sora' },
    { id: '7', userId: '5', username: '钱七', feature: 'Agent执行', tokens: 4200, cost: 0.084, time: '2024-01-15 18:05:18', model: 'GPT-4' },
    { id: '8', userId: '1', username: '张三', feature: 'AI对话', tokens: 2100, cost: 0.042, time: '2024-01-15 17:58:30', model: 'GPT-4' },
  ];

  const featureUsageData: FeatureUsage[] = [
    { feature: 'AI对话', tokens: 456000, percentage: 35, trend: 12.5 },
    { feature: 'AI生图', tokens: 234000, percentage: 18, trend: 8.3 },
    { feature: 'AI写文章', tokens: 198000, percentage: 15, trend: -2.1 },
    { feature: '知识库问答', tokens: 156000, percentage: 12, trend: 15.8 },
    { feature: 'AI生视频', tokens: 125000, percentage: 10, trend: 25.6 },
    { feature: 'Agent执行', tokens: 87000, percentage: 7, trend: 5.2 },
    { feature: '其他', tokens: 52000, percentage: 3, trend: -1.5 },
  ];

  const dailyData = [
    { date: '01-09', total: 125000, chat: 45000, image: 25000, article: 20000, other: 35000 },
    { date: '01-10', total: 142000, chat: 52000, image: 28000, article: 22000, other: 40000 },
    { date: '01-11', total: 98000, chat: 38000, image: 18000, article: 15000, other: 27000 },
    { date: '01-12', total: 187000, chat: 68000, image: 35000, article: 28000, other: 56000 },
    { date: '01-13', total: 156000, chat: 58000, image: 30000, article: 25000, other: 43000 },
    { date: '01-14', total: 210000, chat: 75000, image: 42000, article: 32000, other: 61000 },
    { date: '01-15', total: 245000, chat: 88000, image: 48000, article: 38000, other: 71000 },
  ];

  const columns = [
    {
      title: '用户',
      dataIndex: 'username',
      key: 'username',
      render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: '功能',
      dataIndex: 'feature',
      key: 'feature',
      render: (text: string) => {
        const colors: Record<string, string> = {
          'AI对话': 'blue',
          'AI生图': 'purple',
          'AI生视频': 'magenta',
          'AI写文章': 'cyan',
          '知识库问答': 'green',
          'Agent执行': 'orange',
        };
        return <Tag color={colors[text] || 'default'}>{text}</Tag>;
      },
    },
    {
      title: '模型',
      dataIndex: 'model',
      key: 'model',
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: '消耗Token',
      dataIndex: 'tokens',
      key: 'tokens',
      render: (tokens: number) => (
        <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>
          {tokens.toLocaleString()}
        </span>
      ),
    },
    {
      title: '成本',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: number) => `$${cost.toFixed(3)}`,
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (time: string) => (
        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{time}</span>
      ),
    },
  ];

  const getTrendChart = () => ({
    tooltip: { trigger: 'axis' },
    legend: { data: ['总消耗', 'AI对话', 'AI生图', 'AI写文章'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: { type: 'category', data: dailyData.map(d => d.date) },
    yAxis: { type: 'value' },
    series: [
      {
        name: '总消耗',
        type: 'line',
        smooth: true,
        data: dailyData.map(d => d.total),
        itemStyle: { color: '#6366f1' },
        areaStyle: { color: 'rgba(99, 102, 241, 0.1)' },
      },
      {
        name: 'AI对话',
        type: 'line',
        smooth: true,
        data: dailyData.map(d => d.chat),
        itemStyle: { color: '#3b82f6' },
      },
      {
        name: 'AI生图',
        type: 'line',
        smooth: true,
        data: dailyData.map(d => d.image),
        itemStyle: { color: '#8b5cf6' },
      },
      {
        name: 'AI写文章',
        type: 'line',
        smooth: true,
        data: dailyData.map(d => d.article),
        itemStyle: { color: '#06b6d4' },
      },
    ],
  });

  const getDistributionChart = () => ({
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, left: 'center' },
    series: [
      {
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
        data: featureUsageData.map((item, index) => ({
          value: item.tokens,
          name: item.feature,
          itemStyle: { 
            color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#94a3b8'][index],
          },
        })),
      },
    ],
  });

  const getModelUsageChart = () => ({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['GPT-4', 'GPT-3.5', 'DALL-E-3', 'Sora', '其他'] },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'bar',
        data: [520000, 380000, 180000, 150000, 80000],
        itemStyle: { 
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#6366f1' },
              { offset: 1, color: '#8b5cf6' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  });

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4} style={{ margin: 0 }}>Token消耗统计</Title>
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
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 'var(--radius-lg)' }}>
            <Statistic
              title="今日消耗"
              value={245000}
              suffix="tokens"
              prefix={<ApiOutlined style={{ color: '#6366f1' }} />}
            />
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <RiseOutlined style={{ color: '#10b981' }} />
              <span style={{ color: '#10b981', fontSize: '12px' }}>+16.7% 较昨日</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 'var(--radius-lg)' }}>
            <Statistic
              title="本月消耗"
              value={1163000}
              suffix="tokens"
              prefix={<ApiOutlined style={{ color: '#f59e0b' }} />}
            />
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <RiseOutlined style={{ color: '#10b981' }} />
              <span style={{ color: '#10b981', fontSize: '12px' }}>+23.5% 较上月</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 'var(--radius-lg)' }}>
            <Statistic
              title="今日成本"
              value={49.00}
              prefix={<span style={{ color: '#ef4444' }}>$</span>}
              precision={2}
            />
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <RiseOutlined style={{ color: '#ef4444' }} />
              <span style={{ color: '#ef4444', fontSize: '12px' }}>+18.2% 较昨日</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 'var(--radius-lg)' }}>
            <Statistic
              title="活跃用户"
              value={312}
              suffix="人"
              prefix={<UserOutlined style={{ color: '#10b981' }} />}
            />
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <RiseOutlined style={{ color: '#10b981' }} />
              <span style={{ color: '#10b981', fontSize: '12px' }}>+8.3% 较昨日</span>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={16}>
          <Card title="消耗趋势" style={{ borderRadius: 'var(--radius-lg)' }}>
            <ReactECharts option={getTrendChart()} style={{ height: 320 }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="功能分布" style={{ borderRadius: 'var(--radius-lg)' }}>
            <ReactECharts option={getDistributionChart()} style={{ height: 320 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="各功能消耗明细" style={{ borderRadius: 'var(--radius-lg)' }}>
            <Table 
              dataSource={featureUsageData} 
              columns={[
                { 
                  title: '功能', 
                  dataIndex: 'feature',
                  render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
                },
                { 
                  title: '消耗Token', 
                  dataIndex: 'tokens',
                  render: (tokens: number) => tokens.toLocaleString(),
                },
                { 
                  title: '占比', 
                  dataIndex: 'percentage',
                  render: (p: number) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Progress percent={p} size="small" style={{ width: 80 }} showInfo={false} />
                      <span>{p}%</span>
                    </div>
                  ),
                },
                { 
                  title: '趋势', 
                  dataIndex: 'trend',
                  render: (trend: number) => (
                    <span style={{ color: trend > 0 ? '#10b981' : '#ef4444' }}>
                      {trend > 0 ? '+' : ''}{trend}%
                    </span>
                  ),
                },
              ]}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="模型使用分布" style={{ borderRadius: 'var(--radius-lg)' }}>
            <ReactECharts option={getModelUsageChart()} style={{ height: 250 }} />
          </Card>
        </Col>
      </Row>

      <Card 
        title="消耗明细记录" 
        style={{ borderRadius: 'var(--radius-lg)' }}
        extra={<Space>
          <Select defaultValue="all" style={{ width: 120 }}>
            <Select.Option value="all">全部功能</Select.Option>
            <Select.Option value="chat">AI对话</Select.Option>
            <Select.Option value="image">AI生图</Select.Option>
            <Select.Option value="video">AI生视频</Select.Option>
            <Select.Option value="article">AI写文章</Select.Option>
          </Select>
        </Space>}
      >
        <Table 
          dataSource={tokenUsageData} 
          columns={columns} 
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>
    </div>
  );
}