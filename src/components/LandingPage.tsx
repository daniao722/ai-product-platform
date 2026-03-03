import { useState } from 'react';
import { Button, Card, Row, Col, Avatar, Input, message } from 'antd';
import { 
  RobotOutlined, 
  MessageOutlined, 
  PictureOutlined, 
  DatabaseOutlined,
  TeamOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  StarOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import LoginModal from './LoginModal';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [trialEmail, setTrialEmail] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleStartTrial = () => {
    if (trialEmail) {
      message.success('申请已提交，我们会尽快联系您！');
      setTrialEmail('');
    } else {
      message.error('请输入您的邮箱');
    }
  };

  const handleEnterPlatform = () => {
    if (isAuthenticated) {
      navigate('/new-chat');
    } else {
      setShowLogin(true);
    }
  };

  const features = [
    {
      icon: <MessageOutlined />,
      title: '智能对话',
      description: '基于先进AI模型，提供自然流畅的对话体验，支持多轮对话和上下文理解',
      color: 'var(--primary-color)',
    },
    {
      icon: <PictureOutlined />,
      title: 'AI应用集',
      description: '一键生成图片、视频、文章，释放创意潜能，提升内容创作效率',
      color: 'var(--secondary-color)',
    },
    {
      icon: <RobotOutlined />,
      title: 'Agent搭建',
      description: '可视化搭建AI Agent，无需编程即可创建专属智能助手',
      color: 'var(--accent-color)',
    },
    {
      icon: <TeamOutlined />,
      title: '数字员工',
      description: 'AI智能客服、运营助手，7x24小时不间断服务，降低人力成本',
      color: 'var(--success-color)',
    },
    {
      icon: <DatabaseOutlined />,
      title: '知识库管理',
      description: '企业知识自动学习与沉淀，构建品牌基因，赋能全场景AI应用',
      color: 'var(--warning-color)',
    },
    {
      icon: <SafetyCertificateOutlined />,
      title: '安全可靠',
      description: '企业级数据安全保障，支持私有化部署，满足合规要求',
      color: 'var(--error-color)',
    },
  ];

  const values = [
    {
      icon: <RocketOutlined />,
      title: '效率提升',
      stat: '300%',
      description: 'AI自动化处理，工作效率提升3倍以上',
    },
    {
      icon: <ThunderboltOutlined />,
      title: '响应速度',
      stat: '<1秒',
      description: '毫秒级AI响应，即时获取智能服务',
    },
    {
      icon: <BulbOutlined />,
      title: '创意激发',
      stat: '无限',
      description: 'AI辅助创作，突破思维边界',
    },
  ];

  const scenarios = [
    {
      title: '智能客服',
      description: '自动回答客户咨询，处理售后问题，提升客户满意度',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
    },
    {
      title: '内容营销',
      description: '自动生成营销文案、社交媒体内容，保持品牌一致性',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    },
    {
      title: '数据分析',
      description: '智能分析业务数据，生成洞察报告，辅助决策',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    },
    {
      title: '知识管理',
      description: '自动学习企业知识，构建智能知识库',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    },
  ];

  const testimonials = [
    {
      name: '张总',
      company: '某电商平台',
      avatar: 'Z',
      content: 'AI+帮助我们实现了客服自动化，响应速度提升了5倍，客户满意度显著提高。',
      rating: 5,
    },
    {
      name: '李经理',
      company: '某科技公司',
      avatar: 'L',
      content: '知识库功能太强大了，自动学习官网内容，AI客服回答更准确，节省了大量培训成本。',
      rating: 5,
    },
    {
      name: '王总监',
      company: '某营销机构',
      avatar: 'W',
      content: 'AI应用集让我们的内容创作效率提升了10倍，一键生成文案和图片，太方便了！',
      rating: 5,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '72px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        zIndex: 1000,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={{ fontSize: '20px', fontWeight: '700', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI+
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>功能</a>
          <a href="#scenarios" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>场景</a>
          <a href="#testimonials" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500' }}>客户</a>
          <Button 
            type="primary"
            onClick={handleEnterPlatform}
            style={{
              background: 'var(--gradient-primary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              height: '40px',
              padding: '0 24px',
            }}
          >
            {isAuthenticated ? '进入平台' : '登录 / 注册'}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 48px 80px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f5f3ff 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'var(--gradient-primary)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.2,
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'var(--gradient-secondary)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.2,
        }} />
        
        <div style={{ maxWidth: '1200px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'var(--primary-light)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--primary-color)',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '24px',
          }}>
            新一代企业AI智能平台
          </div>
          
          <h1 style={{
            fontSize: '64px',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            AI赋能企业<br />智能驱动增长
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: 'var(--text-secondary)',
            maxWidth: '640px',
            margin: '0 auto 40px',
            lineHeight: '1.6',
          }}>
            一站式AI产品平台，集成智能对话、AI应用、Agent搭建、数字员工、知识库管理，
            助力企业实现智能化转型，提升运营效率300%
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '48px' }}>
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={handleEnterPlatform}
              style={{
                background: 'var(--gradient-primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                height: '56px',
                padding: '0 32px',
                fontSize: '16px',
              }}
            >
              {isAuthenticated ? '立即体验' : '免费试用'}
            </Button>
            <Button
              size="large"
              icon={<PlayCircleOutlined />}
              style={{
                borderRadius: 'var(--radius-md)',
                height: '56px',
                padding: '0 32px',
                fontSize: '16px',
              }}
            >
              观看演示
            </Button>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '48px',
            justifyContent: 'center',
            color: 'var(--text-tertiary)',
            fontSize: '14px',
          }}>
            <span><CheckCircleOutlined style={{ color: 'var(--success-color)', marginRight: '8px' }} />免费试用14天</span>
            <span><CheckCircleOutlined style={{ color: 'var(--success-color)', marginRight: '8px' }} />无需信用卡</span>
            <span><CheckCircleOutlined style={{ color: 'var(--success-color)', marginRight: '8px' }} />专属客服支持</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '100px 48px', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
              强大的AI产品矩阵
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              覆盖企业AI应用全场景，一站式解决智能化需求
            </p>
          </div>
          
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.3s',
                  }}
                  styles={{ body: { padding: '32px' } }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-md)',
                    background: `${feature.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    fontSize: '24px',
                    color: feature.color,
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                    {feature.description}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Value Section */}
      <section style={{ padding: '100px 48px', background: 'var(--gradient-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: '700', marginBottom: '16px', color: 'white' }}>
              客户价值
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}>
              数据驱动的业务增长，实实在在的效果提升
            </p>
          </div>
          
          <Row gutter={[48, 48]}>
            {values.map((value, index) => (
              <Col xs={24} sm={8} key={index}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    fontSize: '32px',
                    color: 'white',
                  }}>
                    {value.icon}
                  </div>
                  <div style={{ fontSize: '48px', fontWeight: '800', color: 'white', marginBottom: '8px' }}>
                    {value.stat}
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>
                    {value.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                    {value.description}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Scenarios Section */}
      <section id="scenarios" style={{ padding: '100px 48px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
              应用场景
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              多行业、多场景的AI解决方案
            </p>
          </div>
          
          <Row gutter={[24, 24]}>
            {scenarios.map((scenario, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: 'none',
                  }}
                  styles={{ body: { padding: 0 } }}
                  cover={
                    <div style={{
                      height: '200px',
                      background: `url(${scenario.image}) center/cover`,
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '24px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      }}>
                        <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '600', margin: 0 }}>
                          {scenario.title}
                        </h3>
                      </div>
                    </div>
                  }
                >
                  <div style={{ padding: '20px' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
                      {scenario.description}
                    </p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{ padding: '100px 48px', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
              客户声音
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              来自真实用户的评价
            </p>
          </div>
          
          <Row gutter={[24, 24]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} sm={8} key={index}>
                <Card
                  style={{
                    height: '100%',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                  }}
                  styles={{ body: { padding: '32px' } }}
                >
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarOutlined key={i} style={{ color: '#fbbf24' }} />
                    ))}
                  </div>
                  <p style={{ 
                    fontSize: '14px', 
                    color: 'var(--text-secondary)', 
                    lineHeight: '1.6',
                    marginBottom: '24px',
                    fontStyle: 'italic',
                  }}>
                    "{testimonial.content}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Avatar style={{ background: 'var(--gradient-primary)' }}>
                      {testimonial.avatar}
                    </Avatar>
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                        {testimonial.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 48px', background: 'var(--bg-tertiary)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
            准备好开启AI之旅了吗？
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '40px' }}>
            立即申请试用，体验AI带来的效率革命
          </p>
          
          <div style={{
            display: 'flex',
            gap: '12px',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            <Input
              placeholder="请输入您的邮箱"
              size="large"
              value={trialEmail}
              onChange={(e) => setTrialEmail(e.target.value)}
              style={{ borderRadius: 'var(--radius-md)' }}
            />
            <Button
              type="primary"
              size="large"
              onClick={handleStartTrial}
              style={{
                background: 'var(--gradient-primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                padding: '0 32px',
              }}
            >
              申请试用
            </Button>
          </div>
          
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '16px' }}>
            注册即表示同意我们的服务条款和隐私政策
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '48px',
        background: 'var(--text-primary)',
        color: 'rgba(255,255,255,0.7)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[48, 32]}>
            <Col xs={24} sm={8}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>AI+</span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                新一代企业AI智能平台<br />
                助力企业实现智能化转型
              </p>
            </Col>
            <Col xs={24} sm={4}>
              <h4 style={{ color: 'white', marginBottom: '16px' }}>产品</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>智能对话</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>AI应用集</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Agent搭建</a>
              </div>
            </Col>
            <Col xs={24} sm={4}>
              <h4 style={{ color: 'white', marginBottom: '16px' }}>解决方案</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>智能客服</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>内容营销</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>数据分析</a>
              </div>
            </Col>
            <Col xs={24} sm={4}>
              <h4 style={{ color: 'white', marginBottom: '16px' }}>关于</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>关于我们</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>联系我们</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>加入我们</a>
              </div>
            </Col>
            <Col xs={24} sm={4}>
              <h4 style={{ color: 'white', marginBottom: '16px' }}>支持</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>帮助中心</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>API文档</a>
                <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>服务状态</a>
              </div>
            </Col>
          </Row>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            marginTop: '48px',
            paddingTop: '24px',
            textAlign: 'center',
            fontSize: '14px',
          }}>
            © 2024 AI+ 智能产品平台. All rights reserved.
          </div>
        </div>
      </footer>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}