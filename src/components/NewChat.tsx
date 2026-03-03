import { useState, useRef, useEffect } from 'react';
import { Input, Button, Avatar, Spin } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined, ClearOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const NewChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        content: `感谢您的提问！关于"${inputValue}"，我来为您详细解答：

这是一个很好的问题。在实际应用中，我会调用真实的AI模型来生成更加智能和个性化的回复。

目前我正在模拟AI的响应过程，展示完整的对话流程。您可以在后续接入真实的AI服务，如OpenAI、Claude等。

有什么其他问题需要我帮助您解答吗？`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  const handleClear = () => {
    setMessages([]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ 
      height: 'calc(100vh - 160px)',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-primary)',
    }}>
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
            AI 智能对话
          </h2>
          <p style={{ 
            margin: '4px 0 0', 
            fontSize: '14px', 
            color: 'var(--text-tertiary)' 
          }}>
            与AI助手进行自然语言对话，获取智能回复
          </p>
        </div>
        {messages.length > 0 && (
          <Button 
            icon={<ClearOutlined />}
            onClick={handleClear}
            style={{
              borderRadius: 'var(--radius-md)',
            }}
          >
            清空对话
          </Button>
        )}
      </div>

      <div style={{ 
        flex: 1, 
        overflowY: 'auto',
        padding: '16px',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '16px',
      }}>
        {messages.length === 0 ? (
          <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-lg)',
            }}>
              <ThunderboltOutlined style={{ fontSize: '40px', color: 'white' }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ 
                margin: '0 0 8px', 
                fontSize: '20px', 
                fontWeight: '600',
                color: 'var(--text-primary)',
              }}>
                开始新的对话
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: '14px', 
                color: 'var(--text-tertiary)',
                maxWidth: '400px',
              }}>
                输入您的问题，AI助手将为您提供智能解答
              </p>
            </div>
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              {['如何使用AI生成内容？', '知识库如何管理？', '如何创建AI Agent？'].map((suggestion, index) => (
                <Button
                  key={index}
                  onClick={() => setInputValue(suggestion)}
                  style={{
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  animation: 'fadeIn 0.3s ease-in-out',
                }}
              >
                <Avatar
                  size={36}
                  style={{
                    background: message.sender === 'user' 
                      ? 'var(--gradient-secondary)' 
                      : 'var(--gradient-primary)',
                    flexShrink: 0,
                  }}
                  icon={message.sender === 'user' ? <UserOutlined /> : <RobotOutlined />}
                />
                <div style={{ flex: 1, maxWidth: 'calc(100% - 48px)' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px',
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                    }}>
                      {message.sender === 'user' ? '您' : 'AI助手'}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: 'var(--text-tertiary)',
                    }}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-lg)',
                    background: message.sender === 'user' 
                      ? 'var(--primary-light)' 
                      : 'var(--bg-primary)',
                    border: '1px solid',
                    borderColor: message.sender === 'user' 
                      ? 'var(--primary-color)' 
                      : 'var(--border-color)',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: 'var(--text-primary)',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
              }}>
                <Avatar
                  size={36}
                  style={{
                    background: 'var(--gradient-primary)',
                  }}
                  icon={<RobotOutlined />}
                />
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                }}>
                  <Spin size="small" />
                  <span style={{ marginLeft: '8px', color: 'var(--text-tertiary)' }}>
                    AI正在思考...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-end',
        padding: '16px',
        background: 'var(--bg-primary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
      }}>
        <TextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入您的问题..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          style={{
            flex: 1,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            padding: '8px 12px',
            fontSize: '14px',
          }}
          onPressEnter={(e) => {
            if (e.nativeEvent.isComposing) return;
            handleSend();
          }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={loading}
          disabled={!inputValue.trim()}
          style={{
            height: '40px',
            padding: '0 24px',
            borderRadius: 'var(--radius-md)',
          }}
        >
          发送
        </Button>
      </div>
    </div>
  );
};

export default NewChat;