import { useState } from 'react';
import { Tabs, Input, Button, Card, message, Image, Row, Col, Typography } from 'antd';
import { LoadingOutlined, DownloadOutlined, PlusOutlined, PictureOutlined, VideoCameraOutlined, FileTextOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

const AIApps: React.FC = () => {
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageResult, setImageResult] = useState<string>('');
  const [imageLoading, setImageLoading] = useState(false);

  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoResult, setVideoResult] = useState<string>('');
  const [videoLoading, setVideoLoading] = useState(false);

  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleResult, setArticleResult] = useState<string>('');
  const [articleLoading, setArticleLoading] = useState(false);

  const handleGenerateImage = () => {
    if (!imagePrompt.trim()) {
      message.error('请输入描述');
      return;
    }
    setImageLoading(true);
    setTimeout(() => {
      const placeholderImage = `https://picsum.photos/seed/${Date.now()}/800/600`;
      setImageResult(placeholderImage);
      setImageLoading(false);
      message.success('图片生成成功');
    }, 2000);
  };

  const handleGenerateVideo = () => {
    if (!videoPrompt.trim()) {
      message.error('请输入描述');
      return;
    }
    setVideoLoading(true);
    setTimeout(() => {
      setVideoResult('视频生成完成，点击下载按钮获取');
      setVideoLoading(false);
      message.success('视频生成成功');
    }, 3000);
  };

  const handleGenerateArticle = () => {
    if (!articleTitle.trim()) {
      message.error('请输入标题');
      return;
    }
    setArticleLoading(true);
    setTimeout(() => {
      const generatedArticle = `# ${articleTitle}

## 引言

${articleContent || '本文将围绕这一主题展开深入讨论，为您提供全面的解析和实用的建议。'}

## 正文

### 核心概念

通过AI技术，我们可以快速生成高质量的内容，提高创作效率。AI辅助写作工具为内容创作带来了新的可能性。

### 应用场景

1. **营销内容创作** - 快速生成产品描述、广告文案
2. **技术文档编写** - 自动生成API文档、使用指南
3. **创意写作** - 小说、诗歌、剧本等创意内容

### 实践建议

- 明确写作目标和受众
- 提供详细的背景信息
- 多次迭代优化结果

## 结论

AI写作工具正在改变内容创作的方式，帮助创作者更高效地完成工作。`;
      setArticleResult(generatedArticle);
      setArticleLoading(false);
      message.success('文章生成成功');
    }, 2000);
  };

  const appCards = [
    {
      icon: <PictureOutlined style={{ fontSize: '32px' }} />,
      title: 'AI生图',
      description: '根据文字描述生成高质量图片',
      color: 'var(--gradient-primary)',
    },
    {
      icon: <VideoCameraOutlined style={{ fontSize: '32px' }} />,
      title: 'AI生视频',
      description: '将文字转换为动态视频内容',
      color: 'var(--gradient-secondary)',
    },
    {
      icon: <FileTextOutlined style={{ fontSize: '32px' }} />,
      title: 'AI写文章',
      description: '智能生成各类文章内容',
      color: 'var(--gradient-accent)',
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
            AI 应用集
          </h2>
          <p style={{ 
            margin: '4px 0 0', 
            fontSize: '14px', 
            color: 'var(--text-tertiary)' 
          }}>
            使用AI技术快速生成图片、视频和文章内容
          </p>
        </div>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {appCards.map((card, index) => (
          <Col xs={24} sm={8} key={index}>
            <Card
              hoverable
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                height: '100%',
              }}
              bodyStyle={{ padding: '20px' }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-lg)',
                background: card.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                color: 'white',
              }}>
                {card.icon}
              </div>
              <Title level={5} style={{ margin: '0 0 8px' }}>{card.title}</Title>
              <Paragraph style={{ margin: 0, color: 'var(--text-tertiary)', fontSize: '14px' }}>
                {card.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      <Tabs 
        defaultActiveKey="1"
        style={{ background: 'var(--bg-primary)' }}
        tabBarStyle={{ 
          padding: '0 16px',
          marginBottom: 0,
        }}
      >
        <TabPane 
          tab={<span><PictureOutlined /> AI生图</span>} 
          key="1"
        >
          <Card style={{ marginBottom: '20px', border: 'none', boxShadow: 'none' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: 'var(--text-primary)',
              }}>
                图片描述
              </label>
              <TextArea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="描述您想要生成的图片，例如：一只可爱的小猫在草地上玩耍，阳光明媚，色彩鲜艳"
                rows={4}
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                }}
              />
            </div>
            <Button 
              type="primary" 
              size="large"
              icon={imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
              onClick={handleGenerateImage}
              loading={imageLoading}
              style={{
                borderRadius: 'var(--radius-md)',
                height: '48px',
                padding: '0 32px',
              }}
            >
              生成图片
            </Button>
          </Card>
          
          {imageResult && (
            <Card 
              title="生成结果" 
              style={{ borderRadius: 'var(--radius-lg)' }}
              extra={
                <Button 
                  type="default" 
                  icon={<DownloadOutlined />} 
                  onClick={() => window.open(imageResult, '_blank')}
                >
                  下载图片
                </Button>
              }
            >
              <div style={{ textAlign: 'center' }}>
                <Image 
                  src={imageResult} 
                  alt="生成的图片" 
                  style={{ 
                    maxWidth: '100%',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
              </div>
            </Card>
          )}
        </TabPane>

        <TabPane 
          tab={<span><VideoCameraOutlined /> AI生视频</span>} 
          key="2"
        >
          <Card style={{ marginBottom: '20px', border: 'none', boxShadow: 'none' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: 'var(--text-primary)',
              }}>
                视频描述
              </label>
              <TextArea
                value={videoPrompt}
                onChange={(e) => setVideoPrompt(e.target.value)}
                placeholder="描述您想要生成的视频，例如：一段关于城市夜景的延时摄影，霓虹灯闪烁，车流如织"
                rows={4}
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                }}
              />
            </div>
            <Button 
              type="primary" 
              size="large"
              icon={videoLoading ? <LoadingOutlined /> : <PlusOutlined />}
              onClick={handleGenerateVideo}
              loading={videoLoading}
              style={{
                borderRadius: 'var(--radius-md)',
                height: '48px',
                padding: '0 32px',
              }}
            >
              生成视频
            </Button>
          </Card>
          
          {videoResult && (
            <Card 
              title="生成结果" 
              style={{ borderRadius: 'var(--radius-lg)' }}
              extra={
                <Button type="default" icon={<DownloadOutlined />}>
                  下载视频
                </Button>
              }
            >
              <div style={{ 
                padding: '40px', 
                textAlign: 'center',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
              }}>
                <VideoCameraOutlined style={{ fontSize: '48px', color: 'var(--text-tertiary)', marginBottom: '16px' }} />
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{videoResult}</p>
              </div>
            </Card>
          )}
        </TabPane>

        <TabPane 
          tab={<span><FileTextOutlined /> AI写文章</span>} 
          key="3"
        >
          <Card style={{ marginBottom: '20px', border: 'none', boxShadow: 'none' }}>
            <Row gutter={16}>
              <Col span={24}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                  }}>
                    文章标题 <span style={{ color: 'var(--error-color)' }}>*</span>
                  </label>
                  <Input
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    placeholder="输入文章标题"
                    style={{
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                    }}
                  />
                </div>
              </Col>
              <Col span={24}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                  }}>
                    文章大纲或关键词（可选）
                  </label>
                  <TextArea
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                    placeholder="输入文章大纲或关键词，帮助AI更好地理解您的需求"
                    rows={3}
                    style={{
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                    }}
                  />
                </div>
              </Col>
            </Row>
            <Button 
              type="primary" 
              size="large"
              icon={articleLoading ? <LoadingOutlined /> : <PlusOutlined />}
              onClick={handleGenerateArticle}
              loading={articleLoading}
              style={{
                borderRadius: 'var(--radius-md)',
                height: '48px',
                padding: '0 32px',
              }}
            >
              生成文章
            </Button>
          </Card>
          
          {articleResult && (
            <Card 
              title="生成结果" 
              style={{ borderRadius: 'var(--radius-lg)' }}
              extra={
                <Button type="default" icon={<DownloadOutlined />}>
                  下载文章
                </Button>
              }
            >
              <div style={{
                padding: '24px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                maxHeight: '500px',
                overflow: 'auto',
              }}>
                <pre style={{ 
                  whiteSpace: 'pre-wrap', 
                  margin: 0,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  lineHeight: '1.8',
                }}>
                  {articleResult}
                </pre>
              </div>
            </Card>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AIApps;