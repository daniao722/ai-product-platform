import { useState } from 'react';
import { Card, Row, Col, Table, Tag, Select, DatePicker, Space, Statistic, Tabs, Button, Modal, Descriptions, Progress, Typography } from 'antd';
import { 
  DollarOutlined, 
  TransactionOutlined,
  RiseOutlined,
  FallOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  DownloadOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface Order {
  id: string;
  userId: string;
  username: string;
  type: 'recharge' | 'vip' | 'package';
  amount: number;
  tokens: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  time: string;
  transactionId: string;
}

interface RechargePackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  bonus: number;
  sales: number;
}

export default function OrdersPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');

  const orders: Order[] = [
    { id: 'ORD001', userId: '1', username: '张三', type: 'recharge', amount: 500, tokens: 50000, paymentMethod: '支付宝', status: 'completed', time: '2024-01-15 18:30:15', transactionId: 'TXN20240115183015001' },
    { id: 'ORD002', userId: '2', username: '李四', type: 'vip', amount: 299, tokens: 0, paymentMethod: '微信支付', status: 'completed', time: '2024-01-15 17:25:42', transactionId: 'TXN20240115172542002' },
    { id: 'ORD003', userId: '5', username: '钱七', type: 'package', amount: 999, tokens: 120000, paymentMethod: '银行卡', status: 'completed', time: '2024-01-15 16:15:10', transactionId: 'TXN20240115161510003' },
    { id: 'ORD004', userId: '3', username: '王五', type: 'recharge', amount: 100, tokens: 10000, paymentMethod: '支付宝', status: 'pending', time: '2024-01-15 15:45:33', transactionId: 'TXN20240115154533004' },
    { id: 'ORD005', userId: '1', username: '张三', type: 'recharge', amount: 200, tokens: 20000, paymentMethod: '微信支付', status: 'failed', time: '2024-01-15 14:20:18', transactionId: 'TXN20240115142018005' },
    { id: 'ORD006', userId: '4', username: '赵六', type: 'vip', amount: 99, tokens: 0, paymentMethod: '支付宝', status: 'refunded', time: '2024-01-14 11:30:45', transactionId: 'TXN20240114113045006' },
    { id: 'ORD007', userId: '2', username: '李四', type: 'recharge', amount: 1000, tokens: 110000, paymentMethod: '银行卡', status: 'completed', time: '2024-01-14 10:15:22', transactionId: 'TXN20240114101522007' },
    { id: 'ORD008', userId: '5', username: '钱七', type: 'package', amount: 2999, tokens: 400000, paymentMethod: '微信支付', status: 'completed', time: '2024-01-13 09:45:10', transactionId: 'TXN20240113094510008' },
  ];

  const rechargePackages: RechargePackage[] = [
    { id: '1', name: '入门套餐', tokens: 10000, price: 100, bonus: 0, sales: 1256 },
    { id: '2', name: '标准套餐', tokens: 50000, price: 450, bonus: 5000, sales: 892 },
    { id: '3', name: '专业套餐', tokens: 100000, price: 800, bonus: 15000, sales: 456 },
    { id: '4', name: '企业套餐', tokens: 500000, price: 3500, bonus: 100000, sales: 128 },
    { id: '5', name: '旗舰套餐', tokens: 1000000, price: 6000, bonus: 250000, sales: 67 },
  ];

  const dailyRevenue = [
    { date: '01-09', revenue: 8500, orders: 45, recharge: 6500, vip: 2000 },
    { date: '01-10', revenue: 12300, orders: 62, recharge: 9800, vip: 2500 },
    { date: '01-11', revenue: 6800, orders: 38, recharge: 5200, vip: 1600 },
    { date: '01-12', revenue: 15600, orders: 78, recharge: 12500, vip: 3100 },
    { date: '01-13', revenue: 11200, orders: 56, recharge: 8900, vip: 2300 },
    { date: '01-14', revenue: 18900, orders: 92, recharge: 15200, vip: 3700 },
    { date: '01-15', revenue: 22100, orders: 105, recharge: 17800, vip: 4300 },
  ];

  const orderColumns = [
    {
      title: '订单号',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{text}</span>,
    },
    {
      title: '用户',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const configs: Record<string, { color: string; label: string }> = {
          recharge: { color: 'blue', label: 'Token充值' },
          vip: { color: 'gold', label: 'VIP购买' },
          package: { color: 'purple', label: '套餐购买' },
        };
        const config = configs[type];
        return <Tag color={config.color}>{config.label}</Tag>;
      },
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <span style={{ fontWeight: 600, color: 'var(--success-color)' }}>
          ¥{amount.toLocaleString()}
        </span>
      ),
    },
    {
      title: 'Token',
      dataIndex: 'tokens',
      key: 'tokens',
      render: (tokens: number) => tokens > 0 ? tokens.toLocaleString() : '-',
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method: string) => <Tag>{method}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const configs: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
          completed: { color: 'success', label: '已完成', icon: <CheckCircleOutlined /> },
          pending: { color: 'processing', label: '处理中', icon: <ClockCircleOutlined /> },
          failed: { color: 'error', label: '已失败', icon: <CloseCircleOutlined /> },
          refunded: { color: 'warning', label: '已退款', icon: <ReloadOutlined /> },
        };
        const config = configs[status];
        return <Tag color={config.color} icon={config.icon}>{config.label}</Tag>;
      },
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (time: string) => (
        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{time}</span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Order) => (
        <Button 
          type="link" 
          size="small" 
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedOrder(record);
            setShowDetailModal(true);
          }}
        >
          详情
        </Button>
      ),
    },
  ];

  const packageColumns = [
    {
      title: '套餐名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: 'Token数量',
      dataIndex: 'tokens',
      key: 'tokens',
      render: (tokens: number) => tokens.toLocaleString(),
    },
    {
      title: '赠送',
      dataIndex: 'bonus',
      key: 'bonus',
      render: (bonus: number) => bonus > 0 ? (
        <Tag color="green">+{bonus.toLocaleString()}</Tag>
      ) : '-',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span style={{ fontWeight: 600, color: 'var(--primary-color)' }}>
          ¥{price.toLocaleString()}
        </span>
      ),
    },
    {
      title: '销量',
      dataIndex: 'sales',
      key: 'sales',
      render: (sales: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Progress 
            percent={Math.round((sales / 1256) * 100)} 
            size="small" 
            style={{ width: 60 }} 
            showInfo={false}
          />
          <span>{sales}单</span>
        </div>
      ),
    },
    {
      title: '单价/千Token',
      key: 'unitPrice',
      render: (_: any, record: RechargePackage) => (
        <span style={{ color: 'var(--text-secondary)' }}>
          ¥{((record.price / (record.tokens + record.bonus)) * 1000).toFixed(2)}
        </span>
      ),
    },
  ];

  const getRevenueChart = () => ({
    tooltip: { trigger: 'axis' },
    legend: { data: ['总收入', '充值收入', 'VIP收入'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: { type: 'category', data: dailyRevenue.map(d => d.date) },
    yAxis: { type: 'value' },
    series: [
      {
        name: '总收入',
        type: 'bar',
        data: dailyRevenue.map(d => d.revenue),
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
      {
        name: '充值收入',
        type: 'line',
        smooth: true,
        data: dailyRevenue.map(d => d.recharge),
        itemStyle: { color: '#10b981' },
      },
      {
        name: 'VIP收入',
        type: 'line',
        smooth: true,
        data: dailyRevenue.map(d => d.vip),
        itemStyle: { color: '#f59e0b' },
      },
    ],
  });

  const getPaymentMethodChart = () => ({
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
        data: [
          { value: 45, name: '支付宝', itemStyle: { color: '#1677ff' } },
          { value: 35, name: '微信支付', itemStyle: { color: '#07c160' } },
          { value: 15, name: '银行卡', itemStyle: { color: '#6366f1' } },
          { value: 5, name: '其他', itemStyle: { color: '#94a3b8' } },
        ],
      },
    ],
  });

  const stats = [
    { 
      title: '今日收入', 
      value: 22100, 
      prefix: '¥', 
      change: '+16.7%', 
      changeType: 'rise' as const,
      icon: <DollarOutlined style={{ color: '#10b981' }} />,
    },
    { 
      title: '今日订单', 
      value: 105, 
      suffix: '单', 
      change: '+14.1%', 
      changeType: 'rise' as const,
      icon: <ShoppingCartOutlined style={{ color: '#6366f1' }} />,
    },
    { 
      title: '待处理订单', 
      value: 12, 
      suffix: '单', 
      change: '-8.3%', 
      changeType: 'fall' as const,
      icon: <ClockCircleOutlined style={{ color: '#f59e0b' }} />,
    },
    { 
      title: '本月总收入', 
      value: 95400, 
      prefix: '¥', 
      change: '+28.5%', 
      changeType: 'rise' as const,
      icon: <WalletOutlined style={{ color: '#8b5cf6' }} />,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4} style={{ margin: 0 }}>订单与充值</Title>
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
          <Button icon={<DownloadOutlined />}>导出数据</Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card style={{ borderRadius: 'var(--radius-lg)' }}>
              <Statistic
                title={<span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{stat.icon}{stat.title}</span>}
                value={stat.value}
                prefix={stat.prefix}
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
                  {stat.change} 较昨日
                </span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={16}>
          <Card title="收入趋势" style={{ borderRadius: 'var(--radius-lg)' }}>
            <ReactECharts option={getRevenueChart()} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="支付方式分布" style={{ borderRadius: 'var(--radius-lg)' }}>
            <ReactECharts option={getPaymentMethodChart()} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      <Card style={{ borderRadius: 'var(--radius-lg)' }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'orders',
              label: <span><TransactionOutlined /> 订单记录</span>,
              children: (
                <Table 
                  dataSource={orders} 
                  columns={orderColumns} 
                  rowKey="id"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `共 ${total} 条记录`,
                  }}
                />
              ),
            },
            {
              key: 'packages',
              label: <span><ShoppingCartOutlined /> 充值套餐</span>,
              children: (
                <Table 
                  dataSource={rechargePackages} 
                  columns={packageColumns} 
                  rowKey="id"
                  pagination={false}
                />
              ),
            },
          ]}
        />
      </Card>

      <Modal
        title="订单详情"
        open={showDetailModal}
        onCancel={() => setShowDetailModal(false)}
        footer={null}
        width={600}
      >
        {selectedOrder && (
          <Descriptions column={2} bordered>
            <Descriptions.Item label="订单号" span={2}>
              <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{selectedOrder.id}</span>
            </Descriptions.Item>
            <Descriptions.Item label="用户">{selectedOrder.username}</Descriptions.Item>
            <Descriptions.Item label="用户ID">{selectedOrder.userId}</Descriptions.Item>
            <Descriptions.Item label="订单类型">
              <Tag color={selectedOrder.type === 'recharge' ? 'blue' : selectedOrder.type === 'vip' ? 'gold' : 'purple'}>
                {selectedOrder.type === 'recharge' ? 'Token充值' : selectedOrder.type === 'vip' ? 'VIP购买' : '套餐购买'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="支付方式">{selectedOrder.paymentMethod}</Descriptions.Item>
            <Descriptions.Item label="金额">
              <span style={{ fontWeight: 600, fontSize: '16px', color: 'var(--success-color)' }}>
                ¥{selectedOrder.amount.toLocaleString()}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Token数量">
              {selectedOrder.tokens > 0 ? selectedOrder.tokens.toLocaleString() : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={
                selectedOrder.status === 'completed' ? 'success' : 
                selectedOrder.status === 'pending' ? 'processing' : 
                selectedOrder.status === 'failed' ? 'error' : 'warning'
              }>
                {selectedOrder.status === 'completed' ? '已完成' : 
                 selectedOrder.status === 'pending' ? '处理中' : 
                 selectedOrder.status === 'failed' ? '已失败' : '已退款'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="下单时间">{selectedOrder.time}</Descriptions.Item>
            <Descriptions.Item label="交易号" span={2}>{selectedOrder.transactionId}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}