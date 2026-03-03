import { useState } from 'react';
import { Card, Row, Col, Select, DatePicker, Space, Typography, Table } from 'antd';
import { 
  LineChartOutlined,
  UserOutlined,
  ApiOutlined,
  ClockCircleOutlined,
  RiseOutlined,
  FallOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const hourlyActiveUsers = [
    { hour: '00:00', users: 45 }, { hour: '01:00', users: 32 }, { hour: '02:00', users: 18 },
    { hour: '03:00', users: 12 }, { hour: '04:00', users: 8 }, { hour: '05:00', users: 15 },
    { hour: '06:00', users: 28 }, { hour: '07:00', users: 56 }, { hour: '08:00', users: 89 },
    { hour: '09:00', users: 145 }, { hour: '10:00', users: 198 }, { hour: '11:00', users: 234 },
    { hour: '12:00', users: 189 }, { hour: '13:00', users: 167 }, { hour: '14:00', users: 212 },
    { hour: '15:00', users: 245 }, { hour: '16:00', users: 267 }, { hour: '17:00', users: 289 },
    { hour: '18:00', users: 312 }, { hour: '19:00', users: 298 }, { hour: '20:00', users: 256 },
    { hour: '21:00', users: 198 }, { hour: '22:00', users: 145 }, { hour: '23:00', users: 89 },
  ];

  const featureUsage = [
    { feature: 'AI对话', users: 1256, sessions: 15680, avgDuration: '8.5分钟', trend: 12.5 },
    { feature: 'AI生图', users: 892, sessions: 4560, avgDuration: '3.2分钟', trend: 8.3 },
    { feature: 'AI写文章', users: 567, sessions: 2340, avgDuration: '5.8分钟', trend: -2.1 },
    { feature: '知识库', users: 423, sessions: 1890, avgDuration: '4.2分钟', trend: 15.8 },
    { feature: 'AI生视频', users: 234, sessions: 890, avgDuration: '2.5分钟', trend: 25.6 },
    { feature: 'Agent', users: 189, sessions: 670, avgDuration: '12.3分钟', trend: 5.2 },
  ];

  const regionData = [
    { region: '北京', users: 256, percentage: 20.4 },
    { region: '上海', users: 198, percentage: 15.8 },
    { region: '广州', users: 167, percentage: 13.3 },
    { region: '深圳', users: 145, percentage: 11.5 },
    { region: '杭州', users: 123, percentage: 9.8 },
    { region: '成都', users: 98, percentage: 7.8 },
    { region: '其他', users: 269, percentage: 21.4 },
  ];

  const deviceData = [
    { device: 'Windows', users: 456, percentage: 36.3 },
    { device: 'MacOS', users: 312, percentage: 24.8 },
    { device: 'iOS', users: 234, percentage: 18.6 },
    { device: 'Android', users: 189, percentage: 15.0 },
    { device: '其他', users: 67, percentage: 5.3 },
  ];

  const retentionData = [
    { day: '次日留存', rate: 68.5 },
    { day: '3日留存', rate: 52.3 },
    { day: '7日留存', rate: 38.7 },
    { day: '14日留存', rate: 28.2 },
    { day: '30日留存', rate: 21.5 },
  ];

  const getHourlyActiveChart = () => ({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { 
      type: 'category', 
      data: hourlyActiveUsers.map(d => d.hour),
      axisLabel: { interval: 2 }
    },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'line',
        smooth: true,
        data: hourlyActiveUsers.map(d => d.users),
        itemStyle: { color: '#6366f1' },
        areaStyle: { 
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(99, 102, 241, 0.3)' },
              { offset: 1, color: 'rgba(99, 102, 241, 0.05)' },
            ],
          },
        },
      },
    ],
  });

  const getRegionChart = () => ({
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'pie',
        radius: ['30%', '55%'],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: { borderRadius: 5 },
        label: { show: false },
        data: regionData.map((item, index) => ({
          value: item.users,
          name: item.region,
          itemStyle: { 
            color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#94a3b8'][index],
          },
        })),
      },
    ],
  });

  const getDeviceChart = () => ({
    tooltip: { trigger: 'item' },
    legend: { bottom: 0 },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
        data: deviceData.map((item, index) => ({
          value: item.users,
          name: item.device,
          itemStyle: { 
            color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#94a3b8'][index],
          },
        })),
      },
    ],
  });

  const getRetentionChart = () => ({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: retentionData.map(d => d.day) },
    yAxis: { type: 'value', max: 100 },
    series: [
      {
        type: 'bar',
        data: retentionData.map(d => d.rate),
        itemStyle: { 
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#10b981' },
              { offset: 1, color: '#34d399' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
        label: { 
          show: true, 
          position: 'top',
          formatter: '{c}%',
        },
      },
    ],
  });

  const featureColumns = [
    {
      title: '功能模块',
      dataIndex: 'feature',
      key: 'feature',
      render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: '使用人数',
      dataIndex: 'users',
      key: 'users',
      render: (users: number) => users.toLocaleString(),
    },
    {
      title: '使用次数',
      dataIndex: 'sessions',
      key: 'sessions',
      render: (sessions: number) => sessions.toLocaleString(),
    },
    {
      title: '平均时长',
      dataIndex: 'avgDuration',
      key: 'avgDuration',
    },
    {
      title: '趋势',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend: number) => (
        <span style={{ color: trend > 0 ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {trend > 0 ? <RiseOutlined /> : <FallOutlined />}
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4} style={{ margin: 0 }}>数据分析</Title>
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
                <UserOutlined style={{ fontSize: '24px', color: 'var(--primary-color)' }} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>1,256</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>总用户数</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
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
                <LineChartOutlined style={{ fontSize: '24px', color: 'var(--success-color)' }} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>892</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>活跃用户</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
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
                <ClockCircleOutlined style={{ fontSize: '24px', color: 'var(--warning-color)' }} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>12.5分钟</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>平均使用时长</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
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
                <ApiOutlined style={{ fontSize: '24px', color: 'var(--accent-color)' }} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>3.2次</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>人均使用次数</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="24小时活跃用户分布" style={{ borderRadius: 'var(--radius-lg)' }}>
            <ReactECharts option={getHourlyActiveChart()} style={{ height: 280 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="用户留存率" style={{ borderRadius: 'var(--radius-lg)' }}>
            <ReactECharts option={getRetentionChart()} style={{ height: 280 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="地区分布" style={{ borderRadius: 'var(--radius-lg)' }}>
            <ReactECharts option={getRegionChart()} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="设备分布" style={{ borderRadius: 'var(--radius-lg)' }}>
            <ReactECharts option={getDeviceChart()} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      <Card title="功能使用统计" style={{ borderRadius: 'var(--radius-lg)' }}>
        <Table 
          dataSource={featureUsage} 
          columns={featureColumns} 
          rowKey="feature"
          pagination={false}
        />
      </Card>
    </div>
  );
}