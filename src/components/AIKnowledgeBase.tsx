import { useState } from 'react';
import { Layout, Menu, Card, Input, Button, Table, message, Upload, Space, Tabs, Form, Switch, Modal, Image, Empty } from 'antd';
import { FileTextOutlined, UploadOutlined, PlusOutlined, EditOutlined, DeleteOutlined, LinkOutlined, BookOutlined, ApiOutlined, SearchOutlined, GlobalOutlined, MessageOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

interface KnowledgeItem {
  id: number;
  title: string;
  content: string;
  contentType: 'text' | 'image';
  imageUrl?: string;
  category: string;
  sourceUrl?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const AIKnowledgeBase: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('brand');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createMode, setCreateMode] = useState<'url' | 'document'>('url');
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [brandKnowledge, setBrandKnowledge] = useState<KnowledgeItem[]>([
    {
      id: 1,
      title: 'Official website link',
      content: 'https://www.300.cn',
      contentType: 'text',
      category: 'brand',
      tags: ['官网'],
      createdAt: '2026-01-07 18:29:49',
      updatedAt: '2026-01-07 18:29:49'
    },
    {
      id: 2,
      title: 'Brand Introduction',
      content: 'Digital Portal is a comprehensive platform offering full-spectrum digital marketing and business solutions for enterprises. With over 20 years of innovative solutions and extensive service experience, originating from China, Digital Portal is committed to empowering businesses with digital marketing and branding solutions.',
      contentType: 'text',
      category: 'brand',
      tags: ['品牌'],
      createdAt: '2026-01-07 18:29:49',
      updatedAt: '2026-01-07 18:29:49'
    },
    {
      id: 3,
      title: 'Brand Essentials',
      content: 'Our core values include innovation, customer-centric service, and global vision.',
      contentType: 'text',
      category: 'brand',
      tags: ['核心价值'],
      createdAt: '2026-01-07 18:29:49',
      updatedAt: '2026-01-07 18:29:49'
    }
  ]);

  const [productKnowledge, setProductKnowledge] = useState<KnowledgeItem[]>([
    {
      id: 1,
      title: 'Product Introduction',
      content: 'The Digital Portal Industry Solution is designed to enhance brand and visibility, boost marketing efforts, and support business growth.',
      contentType: 'text',
      category: 'product',
      tags: ['产品介绍'],
      createdAt: '2026-01-07 17:02:46',
      updatedAt: '2026-01-07 17:02:46'
    },
    {
      id: 2,
      title: 'Product Features',
      content: 'The Digital Portal offers twelve core capabilities: brand enhancement, multi-channel marketing, customer conversion optimization.',
      contentType: 'text',
      category: 'product',
      tags: ['产品功能'],
      createdAt: '2026-01-07 17:02:46',
      updatedAt: '2026-01-07 17:02:46'
    },
    {
      id: 3,
      title: 'QR Code for Solution Access',
      content: 'This image provides quick access to more detailed solutions related...',
      contentType: 'image',
      imageUrl: 'https://via.placeholder.com/300x200',
      category: 'product',
      tags: ['二维码'],
      createdAt: '2026-01-07 17:02:21',
      updatedAt: '2026-01-07 17:02:21'
    }
  ]);

  const [solutionKnowledge, setSolutionKnowledge] = useState<KnowledgeItem[]>([]);
  const [caseKnowledge, setCaseKnowledge] = useState<KnowledgeItem[]>([]);

  const [form] = Form.useForm();
  const [extractImages, setExtractImages] = useState(false);

  const getCurrentKnowledgeItems = () => {
    switch (selectedMenu) {
      case 'brand':
        return brandKnowledge.filter(item => 
          item.title.toLowerCase().includes(searchText.toLowerCase()) || 
          item.content.toLowerCase().includes(searchText.toLowerCase())
        );
      case 'product':
        return productKnowledge.filter(item => 
          item.title.toLowerCase().includes(searchText.toLowerCase()) || 
          item.content.toLowerCase().includes(searchText.toLowerCase())
        );
      case 'solution':
        return solutionKnowledge.filter(item => 
          item.title.toLowerCase().includes(searchText.toLowerCase()) || 
          item.content.toLowerCase().includes(searchText.toLowerCase())
        );
      case 'case':
        return caseKnowledge.filter(item => 
          item.title.toLowerCase().includes(searchText.toLowerCase()) || 
          item.content.toLowerCase().includes(searchText.toLowerCase())
        );
      default:
        return [];
    }
  };

  const getCategoryName = () => {
    switch (selectedMenu) {
      case 'brand': return '品牌知识';
      case 'product': return '产品知识';
      case 'solution': return '解决方案知识';
      case 'case': return '客户案例知识';
      default: return '';
    }
  };

  const getCreateTitle = () => {
    switch (selectedMenu) {
      case 'brand': return '创建品牌知识';
      case 'product': return '创建产品';
      case 'solution': return '创建解决方案';
      case 'case': return '创建客户案例';
      default: return '创建知识';
    }
  };

  const handleLearnFromWebsite = () => {
    setLoading(true);
    setTimeout(() => {
      message.success('已从官网成功学习品牌知识');
      setLoading(false);
    }, 2000);
  };

  const handleLearnFromUrl = () => {
    setLoading(true);
    setTimeout(() => {
      message.success('已从URL成功学习知识');
      setLoading(false);
      setShowCreateModal(false);
    }, 2000);
  };

  const handleFileUpload = () => {
    message.success('文件上传成功，正在解析...');
    setTimeout(() => {
      message.success('文档解析完成');
      setShowCreateModal(false);
    }, 2000);
    return false;
  };

  const handleDelete = (id: number) => {
    switch (selectedMenu) {
      case 'brand':
        setBrandKnowledge(prev => prev.filter(item => item.id !== id));
        break;
      case 'product':
        setProductKnowledge(prev => prev.filter(item => item.id !== id));
        break;
      case 'solution':
        setSolutionKnowledge(prev => prev.filter(item => item.id !== id));
        break;
      case 'case':
        setCaseKnowledge(prev => prev.filter(item => item.id !== id));
        break;
    }
    message.success('删除成功');
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOutlined />
          <span style={{ fontWeight: 'bold' }}>{title}</span>
        </div>
      )
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      render: (content: string, record: KnowledgeItem) => {
        if (record.contentType === 'image') {
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📷 图片内容</span>
              {record.imageUrl && <Image width={40} height={40} src={record.imageUrl} />}
            </div>
          );
        }
        return content.length > 50 ? content.substring(0, 50) + '...' : content;
      }
    },
    {
      title: '字数',
      key: 'wordCount',
      render: (_: any, record: KnowledgeItem) => record.content.length
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: KnowledgeItem) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} size="small">
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small" onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      )
    }
  ];

  const renderEmptyState = () => (
    <div style={{ textAlign: 'center', padding: '80px 0' }}>
      <Empty 
        description="没有知识"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
      <Button 
        type="primary" 
        icon={<PlusOutlined />}
        style={{ marginTop: '20px', background: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)' }}
        onClick={() => setShowCreateModal(true)}
      >
        {selectedMenu === 'solution' ? '创建解决方案' : 
         selectedMenu === 'product' ? '创建产品' : 
         selectedMenu === 'case' ? '创建客户案例' : '添加品牌知识'}
      </Button>
    </div>
  );

  const renderCreateModal = () => (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px', fontWeight: 'bold' }}>
          <span style={{ fontSize: '28px' }}>←</span>
          {getCreateTitle()}
        </div>
      }
      open={showCreateModal}
      onCancel={() => setShowCreateModal(false)}
      footer={null}
      width={800}
    >
      <div style={{ marginBottom: '24px', fontSize: '18px', color: '#666' }}>
        {selectedMenu === 'brand' ? '从官网URLs或知识库文档中提取品牌知识' :
         selectedMenu === 'product' ? '从产品URLs或知识库文档中提取产品知识' :
         selectedMenu === 'solution' ? '从解决方案URLs或知识库文档中提取解决方案知识' :
         '从客户案例URLs或知识库文档中提取客户案例知识'}
      </div>

      <Tabs 
        activeKey={createMode} 
        onChange={(key) => setCreateMode(key as 'url' | 'document')}
        style={{ marginBottom: '24px' }}
        items={[
          { key: 'url', label: selectedMenu === 'solution' ? '从解决方案URL' : 
                              selectedMenu === 'product' ? '从产品URL' :
                              selectedMenu === 'case' ? '从客户案例URL' : '从品牌URL' },
          { key: 'document', label: '从文档' }
        ]}
      />

      {createMode === 'url' ? (
        <div>
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label={<span style={{ fontSize: '18px' }}><span style={{ color: 'red' }}>*</span> {selectedMenu === 'solution' ? '解决方案名' : selectedMenu === 'product' ? '产品名' : selectedMenu === 'case' ? '客户案例名' : '品牌名'}</span>}
              rules={[{ required: true, message: '请输入名称' }]}
            >
              <Input 
                placeholder="" 
                style={{ borderRadius: '20px', padding: '12px 20px', background: '#f5f5f5', border: 'none', fontSize: '16px' }}
              />
            </Form.Item>

            <Form.Item
              name="url"
              label={<span style={{ fontSize: '18px' }}><span style={{ color: 'red' }}>*</span> 参考<br />{selectedMenu === 'solution' ? '解决方案URL' : selectedMenu === 'product' ? '产品URL' : selectedMenu === 'case' ? '客户案例URL' : '品牌URL'}</span>}
              rules={[{ required: true, message: '请输入URL' }]}
            >
              <Input 
                placeholder="https://quickcreator.io/ai-blog-writer" 
                prefix={<LinkOutlined style={{ color: '#999' }} />}
                style={{ borderRadius: '20px', padding: '12px 20px', background: '#f5f5f5', border: 'none', fontSize: '16px' }}
              />
            </Form.Item>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Switch 
                checked={extractImages} 
                onChange={setExtractImages}
                style={{ backgroundColor: extractImages ? '#722ed1' : undefined }}
              />
              <span style={{ fontSize: '18px' }}>提取图片</span>
              <span style={{ color: '#999' }}>?</span>
            </div>

            <Button
              type="primary"
              size="large"
              block
              loading={loading}
              onClick={handleLearnFromUrl}
              style={{ 
                borderRadius: '30px', 
                padding: '24px', 
                fontSize: '18px',
                background: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
                border: 'none'
              }}
            >
              {selectedMenu === 'solution' ? '创建解决方案知识' :
               selectedMenu === 'product' ? '创建产品知识' :
               selectedMenu === 'case' ? '创建客户案例知识' : '创建品牌知识'}
            </Button>
          </Form>
        </div>
      ) : (
        <div>
          <Upload.Dragger
            name="file"
            multiple={true}
            beforeUpload={handleFileUpload}
            style={{ marginBottom: '20px', borderRadius: '20px' }}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
            <p className="ant-upload-hint">
              支持上传 PDF、Word、Excel 等格式的文件
            </p>
          </Upload.Dragger>
        </div>
      )}
    </Modal>
  );

  return (
    <Layout style={{ minHeight: '100%', background: '#f5f5f5' }}>
      <Sider width={240} theme="light" style={{ borderRight: '1px solid #e8e8e8' }}>
        <div style={{ padding: '16px', fontSize: '16px', color: '#666', fontWeight: '500' }}>
          知识
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          style={{ border: 'none' }}
          items={[
            {
              key: 'brand',
              label: '品牌',
              icon: <BookOutlined />
            },
            {
              key: 'product',
              label: '产品',
              icon: <ApiOutlined />
            },
            {
              key: 'solution',
              label: '解决方案',
              icon: <FileTextOutlined />
            },
            {
              key: 'case',
              label: '客户案例',
              icon: <BookOutlined />
            },
            {
              type: 'divider'
            },
            {
              key: 'faq',
              label: 'FAQ',
              icon: <MessageOutlined />
            },
            {
              key: 'documents',
              label: '文档',
              icon: <FileTextOutlined />
            },
            {
              key: 'integration',
              label: '集成',
              icon: <ApiOutlined />
            }
          ]}
          onClick={({ key }) => setSelectedMenu(key)}
        />
        
        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '16px', borderTop: '1px solid #e8e8e8', fontSize: '12px', color: '#999' }}>
          <div style={{ marginBottom: '8px' }}>3 文档 · 50 下字符</div>
          <div>用了792.14 KB, 总量1.00 GB</div>
        </div>
      </Sider>
      
      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        {selectedMenu === 'faq' ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>FAQ</h2>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                style={{ background: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)', border: 'none' }}
              >
                添加FAQ
              </Button>
            </div>
            <Card style={{ borderRadius: '12px' }}>
              <Empty description="暂无FAQ" />
            </Card>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{getCategoryName()}</h2>
              <Space>
                {selectedMenu === 'brand' && (
                  <Button 
                    icon={<GlobalOutlined />}
                    loading={loading}
                    onClick={handleLearnFromWebsite}
                  >
                    从官网学习
                  </Button>
                )}
                <Input 
                  placeholder="搜索知识名称" 
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 240 }}
                />
                <Button>
                  复制全部
                </Button>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  style={{ background: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)', border: 'none' }}
                  onClick={() => setShowCreateModal(true)}
                >
                  {selectedMenu === 'solution' ? '创建解决方案' : 
                   selectedMenu === 'product' ? '创建产品' : 
                   selectedMenu === 'case' ? '创建客户案例' : '添加品牌知识'}
                </Button>
              </Space>
            </div>

            {selectedMenu === 'product' ? (
              <Layout style={{ background: '#f5f5f5', minHeight: '600px' }}>
                <Sider width={200} theme="light" style={{ borderRadius: '12px', marginRight: '16px' }}>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ border: 'none', borderRadius: '12px' }}
                    items={[
                      { key: '1', label: '行业解决方案' }
                    ]}
                  />
                </Sider>
                <Content>
                  <Card style={{ borderRadius: '12px', minHeight: '600px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginBottom: '16px' }}>
                      <Input 
                        placeholder="搜索知识名称" 
                        prefix={<SearchOutlined />}
                        style={{ width: 200 }}
                      />
                      <Button>复制全部</Button>
                      <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        style={{ background: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)', border: 'none' }}
                        onClick={() => setShowCreateModal(true)}
                      >
                        添加产品知识
                      </Button>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <Space>
                        <Button type="link" style={{ fontWeight: 'bold' }}>全部</Button>
                        <Button type="link">Text</Button>
                        <Button type="link">Image</Button>
                      </Space>
                    </div>
                    {getCurrentKnowledgeItems().length === 0 ? renderEmptyState() : (
                      <Table 
                        dataSource={getCurrentKnowledgeItems()} 
                        columns={columns} 
                        rowKey="id"
                        pagination={false}
                      />
                    )}
                  </Card>
                </Content>
              </Layout>
            ) : (
              <Card style={{ borderRadius: '12px' }}>
                {getCurrentKnowledgeItems().length === 0 ? renderEmptyState() : (
                  <Table 
                    dataSource={getCurrentKnowledgeItems()} 
                    columns={columns} 
                    rowKey="id"
                    pagination={false}
                  />
                )}
              </Card>
            )}
          </div>
        )}

        {renderCreateModal()}
      </Content>
    </Layout>
  );
};

export default AIKnowledgeBase;