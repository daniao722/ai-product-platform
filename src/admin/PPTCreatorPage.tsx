import { useState } from 'react';
import { 
  Layout, 
  Button, 
  Input, 
  Select, 
  Upload, 
  message, 
  Modal,
  Card,
  Tooltip,
  Space,
  Divider,
  ColorPicker,
  InputNumber,
  Tabs
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PictureOutlined,
  BarChartOutlined,
  FontSizeOutlined,
  CopyOutlined,
  FileImageOutlined
} from '@ant-design/icons';
import PptxGenJS from 'pptxgenjs';

const { Sider, Content, Header } = Layout;
const { TextArea } = Input;

interface SlideElement {
  id: string;
  type: 'text' | 'title' | 'image' | 'chart';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontColor?: string;
  bold?: boolean;
  chartType?: 'bar' | 'pie' | 'line';
  chartData?: { labels: string[]; values: number[] };
  imageUrl?: string;
}

interface Slide {
  id: string;
  elements: SlideElement[];
  backgroundColor: string;
}

interface Template {
  id: string;
  name: string;
  preview: string;
  slides: Slide[];
}

const PPT_TEMPLATES: Template[] = [
  {
    id: 'business',
    name: '商务风格',
    preview: '📊',
    slides: [
      {
        id: '1',
        backgroundColor: '#1e3a8a',
        elements: [
          { id: '1', type: 'title', content: '商务演示标题', x: 1, y: 2, width: 8, height: 1, fontSize: 44, fontColor: '#ffffff', bold: true },
          { id: '2', type: 'text', content: '副标题内容', x: 1, y: 3.5, width: 8, height: 0.5, fontSize: 24, fontColor: '#e0e7ff' }
        ]
      }
    ]
  },
  {
    id: 'creative',
    name: '创意风格',
    preview: '🎨',
    slides: [
      {
        id: '1',
        backgroundColor: '#7c3aed',
        elements: [
          { id: '1', type: 'title', content: '创意展示', x: 1, y: 2, width: 8, height: 1, fontSize: 48, fontColor: '#ffffff', bold: true },
          { id: '2', type: 'text', content: '让想法绽放光彩', x: 1, y: 3.5, width: 8, height: 0.5, fontSize: 28, fontColor: '#fbbf24' }
        ]
      }
    ]
  },
  {
    id: 'minimal',
    name: '极简风格',
    preview: '✨',
    slides: [
      {
        id: '1',
        backgroundColor: '#ffffff',
        elements: [
          { id: '1', type: 'title', content: '简约之美', x: 1, y: 2, width: 8, height: 1, fontSize: 44, fontColor: '#1f2937', bold: true },
          { id: '2', type: 'text', content: '少即是多', x: 1, y: 3.5, width: 8, height: 0.5, fontSize: 24, fontColor: '#6b7280' }
        ]
      }
    ]
  },
  {
    id: 'tech',
    name: '科技风格',
    preview: '💻',
    slides: [
      {
        id: '1',
        backgroundColor: '#0f172a',
        elements: [
          { id: '1', type: 'title', content: '科技创新', x: 1, y: 2, width: 8, height: 1, fontSize: 48, fontColor: '#06b6d4', bold: true },
          { id: '2', type: 'text', content: '引领未来发展', x: 1, y: 3.5, width: 8, height: 0.5, fontSize: 24, fontColor: '#94a3b8' }
        ]
      }
    ]
  }
];

export default function PPTCreatorPage() {
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: '1',
      backgroundColor: '#ffffff',
      elements: [
        { id: '1', type: 'title', content: '点击编辑标题', x: 1, y: 2, width: 8, height: 1, fontSize: 44, fontColor: '#1f2937', bold: true }
      ]
    }
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [chartModalVisible, setChartModalVisible] = useState(false);
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar');
  const [chartDataInput, setChartDataInput] = useState({ labels: '标签1,标签2,标签3', values: '10,20,30' });

  const currentSlide = slides[currentSlideIndex];
  const selectedElement = currentSlide?.elements.find(el => el.id === selectedElementId);

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      backgroundColor: '#ffffff',
      elements: []
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
  };

  const deleteSlide = (index: number) => {
    if (slides.length === 1) {
      message.warning('至少保留一页幻灯片');
      return;
    }
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1);
    }
  };

  const duplicateSlide = (index: number) => {
    const newSlide = { ...slides[index], id: Date.now().toString(), elements: slides[index].elements.map(el => ({ ...el, id: Date.now().toString() + Math.random() })) };
    const newSlides = [...slides];
    newSlides.splice(index + 1, 0, newSlide);
    setSlides(newSlides);
    message.success('幻灯片已复制');
  };

  const addElement = (type: 'text' | 'title') => {
    const newElement: SlideElement = {
      id: Date.now().toString(),
      type,
      content: type === 'title' ? '标题文本' : '正文文本',
      x: 1,
      y: 2,
      width: 8,
      height: type === 'title' ? 1 : 0.5,
      fontSize: type === 'title' ? 36 : 18,
      fontColor: '#1f2937',
      bold: type === 'title'
    };
    const newSlides = [...slides];
    newSlides[currentSlideIndex] = {
      ...currentSlide,
      elements: [...currentSlide.elements, newElement]
    };
    setSlides(newSlides);
    setSelectedElementId(newElement.id);
  };

  const addImageElement = (imageUrl: string) => {
    const newElement: SlideElement = {
      id: Date.now().toString(),
      type: 'image',
      content: '',
      imageUrl,
      x: 1,
      y: 1,
      width: 4,
      height: 3
    };
    const newSlides = [...slides];
    newSlides[currentSlideIndex] = {
      ...currentSlide,
      elements: [...currentSlide.elements, newElement]
    };
    setSlides(newSlides);
    setSelectedElementId(newElement.id);
  };

  const addChartElement = () => {
    const labels = chartDataInput.labels.split(',').map(s => s.trim());
    const values = chartDataInput.values.split(',').map(s => parseFloat(s.trim()));
    
    const newElement: SlideElement = {
      id: Date.now().toString(),
      type: 'chart',
      content: '',
      x: 1,
      y: 1,
      width: 6,
      height: 4,
      chartType,
      chartData: { labels, values }
    };
    const newSlides = [...slides];
    newSlides[currentSlideIndex] = {
      ...currentSlide,
      elements: [...currentSlide.elements, newElement]
    };
    setSlides(newSlides);
    setChartModalVisible(false);
    setSelectedElementId(newElement.id);
    message.success('图表已添加');
  };

  const updateElement = (elementId: string, updates: Partial<SlideElement>) => {
    const newSlides = [...slides];
    newSlides[currentSlideIndex] = {
      ...currentSlide,
      elements: currentSlide.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    };
    setSlides(newSlides);
  };

  const deleteElement = (elementId: string) => {
    const newSlides = [...slides];
    newSlides[currentSlideIndex] = {
      ...currentSlide,
      elements: currentSlide.elements.filter(el => el.id !== elementId)
    };
    setSlides(newSlides);
    setSelectedElementId(null);
  };

  const applyTemplate = (template: Template) => {
    setSlides(template.slides.map(slide => ({
      ...slide,
      id: Date.now().toString() + Math.random(),
      elements: slide.elements.map(el => ({
        ...el,
        id: Date.now().toString() + Math.random()
      }))
    })));
    setCurrentSlideIndex(0);
    setTemplateModalVisible(false);
    message.success(`已应用${template.name}模板`);
  };

  const exportToPPTX = async () => {
    const pptx = new PptxGenJS();
    pptx.defineLayout({ name: 'CUSTOM', width: 10, height: 7.5 });
    pptx.layout = 'CUSTOM';

    slides.forEach(slide => {
      const pptxSlide = pptx.addSlide();
      pptxSlide.background = { color: slide.backgroundColor.replace('#', '') };

      slide.elements.forEach(element => {
        if (element.type === 'text' || element.type === 'title') {
          pptxSlide.addText(element.content, {
            x: element.x,
            y: element.y,
            w: element.width,
            h: element.height,
            fontSize: element.fontSize,
            color: element.fontColor?.replace('#', ''),
            bold: element.bold,
            valign: 'middle'
          });
        } else if (element.type === 'image' && element.imageUrl) {
          pptxSlide.addImage({
            data: element.imageUrl,
            x: element.x,
            y: element.y,
            w: element.width,
            h: element.height
          });
        } else if (element.type === 'chart' && element.chartData) {
          const chartData = element.chartData.labels.map((label, i) => ({
            label,
            value: element.chartData!.values[i]
          }));

          if (element.chartType === 'bar') {
            pptxSlide.addChart(pptx.ChartType.bar, chartData, {
              x: element.x,
              y: element.y,
              w: element.width,
              h: element.height
            });
          } else if (element.chartType === 'pie') {
            pptxSlide.addChart(pptx.ChartType.pie, chartData, {
              x: element.x,
              y: element.y,
              w: element.width,
              h: element.height
            });
          } else if (element.chartType === 'line') {
            pptxSlide.addChart(pptx.ChartType.line, chartData, {
              x: element.x,
              y: element.y,
              w: element.width,
              h: element.height
            });
          }
        }
      });
    });

    await pptx.writeFile({ fileName: 'presentation.pptx' });
    message.success('PPT已成功导出！');
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      addImageElement(imageUrl);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const renderSlidePreview = (slide: Slide, index: number) => (
    <Card
      key={slide.id}
      hoverable
      style={{
        width: '100%',
        marginBottom: '12px',
        border: currentSlideIndex === index ? '2px solid #1890ff' : '1px solid #d9d9d9',
        backgroundColor: slide.backgroundColor
      }}
      bodyStyle={{ padding: '8px', height: '80px', position: 'relative' }}
      onClick={() => setCurrentSlideIndex(index)}
    >
      <div style={{ 
        position: 'absolute', 
        top: '4px', 
        left: '4px', 
        fontSize: '10px',
        color: '#666',
        fontWeight: 'bold'
      }}>
        {index + 1}
      </div>
      <div style={{ 
        position: 'absolute', 
        top: '4px', 
        right: '4px',
        display: 'flex',
        gap: '4px'
      }}>
        <Tooltip title="复制">
          <CopyOutlined 
            onClick={(e) => { e.stopPropagation(); duplicateSlide(index); }}
            style={{ fontSize: '12px', color: '#666' }}
          />
        </Tooltip>
        <Tooltip title="删除">
          <DeleteOutlined 
            onClick={(e) => { e.stopPropagation(); deleteSlide(index); }}
            style={{ fontSize: '12px', color: '#ff4d4f' }}
          />
        </Tooltip>
      </div>
      <div style={{ fontSize: '8px', color: slide.backgroundColor === '#ffffff' ? '#333' : '#fff' }}>
        {slide.elements[0]?.content?.substring(0, 20) || '空白幻灯片'}
      </div>
    </Card>
  );

  const renderElement = (element: SlideElement) => {
    const isSelected = selectedElementId === element.id;
    
    if (element.type === 'text' || element.type === 'title') {
      return (
        <div
          key={element.id}
          onClick={() => setSelectedElementId(element.id)}
          style={{
            position: 'absolute',
            left: `${element.x * 10}%`,
            top: `${element.y * 10}%`,
            width: `${element.width * 10}%`,
            height: `${element.height * 10}%`,
            fontSize: `${element.fontSize}px`,
            color: element.fontColor,
            fontWeight: element.bold ? 'bold' : 'normal',
            border: isSelected ? '2px solid #1890ff' : '2px solid transparent',
            cursor: 'move',
            padding: '8px',
            backgroundColor: isSelected ? 'rgba(24, 144, 255, 0.05)' : 'transparent',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none'
          }}
        >
          {element.content}
        </div>
      );
    } else if (element.type === 'image' && element.imageUrl) {
      return (
        <div
          key={element.id}
          onClick={() => setSelectedElementId(element.id)}
          style={{
            position: 'absolute',
            left: `${element.x * 10}%`,
            top: `${element.y * 10}%`,
            width: `${element.width * 10}%`,
            height: `${element.height * 10}%`,
            border: isSelected ? '2px solid #1890ff' : '2px solid transparent',
            cursor: 'move',
            borderRadius: '4px',
            overflow: 'hidden',
            backgroundColor: '#f0f0f0'
          }}
        >
          <img 
            src={element.imageUrl} 
            alt="slide" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      );
    } else if (element.type === 'chart') {
      return (
        <div
          key={element.id}
          onClick={() => setSelectedElementId(element.id)}
          style={{
            position: 'absolute',
            left: `${element.x * 10}%`,
            top: `${element.y * 10}%`,
            width: `${element.width * 10}%`,
            height: `${element.height * 10}%`,
            border: isSelected ? '2px solid #1890ff' : '2px solid #d9d9d9',
            cursor: 'move',
            borderRadius: '4px',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '16px'
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>
            {element.chartType === 'bar' && '📊'}
            {element.chartType === 'pie' && '🥧'}
            {element.chartType === 'line' && '📈'}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {element.chartType === 'bar' && '柱状图'}
            {element.chartType === 'pie' && '饼图'}
            {element.chartType === 'line' && '折线图'}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Layout style={{ height: '100vh', background: '#f5f5f5' }}>
      <Header style={{ 
        background: '#fff', 
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={addSlide}
          >
            新建幻灯片
          </Button>
          <Button 
            icon={<FileImageOutlined />}
            onClick={() => setTemplateModalVisible(true)}
          >
            选择模板
          </Button>
          <Divider type="vertical" />
          <Button 
            icon={<FontSizeOutlined />}
            onClick={() => addElement('title')}
          >
            添加标题
          </Button>
          <Button 
            icon={<FontSizeOutlined />}
            onClick={() => addElement('text')}
          >
            添加文本
          </Button>
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={handleImageUpload}
          >
            <Button icon={<PictureOutlined />}>插入图片</Button>
          </Upload>
          <Button 
            icon={<BarChartOutlined />}
            onClick={() => setChartModalVisible(true)}
          >
            插入图表
          </Button>
        </Space>
        <Button 
          type="primary" 
          icon={<DownloadOutlined />}
          onClick={exportToPPTX}
          size="large"
        >
          导出PPT
        </Button>
      </Header>

      <Layout>
        <Sider 
          width={200} 
          style={{ 
            background: '#fff',
            padding: '16px',
            overflowY: 'auto',
            borderRight: '1px solid #f0f0f0'
          }}
        >
          <div style={{ marginBottom: '12px', fontWeight: 'bold', color: '#666' }}>
            幻灯片列表 ({slides.length})
          </div>
          {slides.map((slide, index) => renderSlidePreview(slide, index))}
        </Sider>

        <Content style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '24px',
          background: '#e8e8e8'
        }}>
          <div style={{
            width: '1000px',
            height: '750px',
            background: currentSlide.backgroundColor,
            position: 'relative',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            {currentSlide.elements.map(renderElement)}
          </div>
        </Content>

        <Sider 
          width={300} 
          style={{ 
            background: '#fff',
            padding: '16px',
            overflowY: 'auto',
            borderLeft: '1px solid #f0f0f0'
          }}
        >
          <Tabs defaultActiveKey="slide" items={[
            {
              key: 'slide',
              label: '幻灯片',
              children: (
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ marginBottom: '8px', fontWeight: 500 }}>背景颜色</div>
                    <ColorPicker
                      value={currentSlide.backgroundColor}
                      onChange={(color) => {
                        const newSlides = [...slides];
                        newSlides[currentSlideIndex] = {
                          ...currentSlide,
                          backgroundColor: color.toHexString()
                        };
                        setSlides(newSlides);
                      }}
                      showText
                    />
                  </div>
                </div>
              )
            },
            {
              key: 'element',
              label: '元素',
              children: selectedElement ? (
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <Button 
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={() => deleteElement(selectedElement.id)}
                      block
                    >
                      删除元素
                    </Button>
                  </div>

                  {(selectedElement.type === 'text' || selectedElement.type === 'title') && (
                    <>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ marginBottom: '8px', fontWeight: 500 }}>文本内容</div>
                        <TextArea
                          value={selectedElement.content}
                          onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ marginBottom: '8px', fontWeight: 500 }}>字体大小</div>
                        <InputNumber
                          value={selectedElement.fontSize}
                          onChange={(value) => updateElement(selectedElement.id, { fontSize: value || 18 })}
                          min={12}
                          max={72}
                          style={{ width: '100%' }}
                        />
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ marginBottom: '8px', fontWeight: 500 }}>字体颜色</div>
                        <ColorPicker
                          value={selectedElement.fontColor}
                          onChange={(color) => updateElement(selectedElement.id, { fontColor: color.toHexString() })}
                          showText
                        />
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ marginBottom: '8px', fontWeight: 500 }}>粗体</div>
                        <Select
                          value={selectedElement.bold ? 'bold' : 'normal'}
                          onChange={(value) => updateElement(selectedElement.id, { bold: value === 'bold' })}
                          style={{ width: '100%' }}
                          options={[
                            { value: 'normal', label: '正常' },
                            { value: 'bold', label: '粗体' }
                          ]}
                        />
                      </div>
                    </>
                  )}

                  <Divider>位置与大小</Divider>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ marginBottom: '8px', fontWeight: 500 }}>X 位置</div>
                    <InputNumber
                      value={selectedElement.x}
                      onChange={(value) => updateElement(selectedElement.id, { x: value || 0 })}
                      min={0}
                      max={9}
                      step={0.1}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ marginBottom: '8px', fontWeight: 500 }}>Y 位置</div>
                    <InputNumber
                      value={selectedElement.y}
                      onChange={(value) => updateElement(selectedElement.id, { y: value || 0 })}
                      min={0}
                      max={6.5}
                      step={0.1}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ marginBottom: '8px', fontWeight: 500 }}>宽度</div>
                    <InputNumber
                      value={selectedElement.width}
                      onChange={(value) => updateElement(selectedElement.id, { width: value || 1 })}
                      min={1}
                      max={10}
                      step={0.1}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ marginBottom: '8px', fontWeight: 500 }}>高度</div>
                    <InputNumber
                      value={selectedElement.height}
                      onChange={(value) => updateElement(selectedElement.id, { height: value || 1 })}
                      min={0.5}
                      max={7.5}
                      step={0.1}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ color: '#999', textAlign: 'center', marginTop: '40px' }}>
                  点击元素进行编辑
                </div>
              )
            }
          ]} />
        </Sider>
      </Layout>

      <Modal
        title="选择模板"
        open={templateModalVisible}
        onCancel={() => setTemplateModalVisible(false)}
        footer={null}
        width={800}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {PPT_TEMPLATES.map(template => (
            <Card
              key={template.id}
              hoverable
              onClick={() => applyTemplate(template)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>
                {template.preview}
              </div>
              <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {template.name}
              </div>
            </Card>
          ))}
        </div>
      </Modal>

      <Modal
        title="插入图表"
        open={chartModalVisible}
        onOk={addChartElement}
        onCancel={() => setChartModalVisible(false)}
        okText="插入"
        cancelText="取消"
      >
        <div style={{ marginBottom: '16px' }}>
          <div style={{ marginBottom: '8px', fontWeight: 500 }}>图表类型</div>
          <Select
            value={chartType}
            onChange={setChartType}
            style={{ width: '100%' }}
            options={[
              { value: 'bar', label: '📊 柱状图' },
              { value: 'pie', label: '🥧 饼图' },
              { value: 'line', label: '📈 折线图' }
            ]}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ marginBottom: '8px', fontWeight: 500 }}>标签（用逗号分隔）</div>
          <Input
            value={chartDataInput.labels}
            onChange={(e) => setChartDataInput({ ...chartDataInput, labels: e.target.value })}
            placeholder="例如: 标签1,标签2,标签3"
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ marginBottom: '8px', fontWeight: 500 }}>数值（用逗号分隔）</div>
          <Input
            value={chartDataInput.values}
            onChange={(e) => setChartDataInput({ ...chartDataInput, values: e.target.value })}
            placeholder="例如: 10,20,30"
          />
        </div>
      </Modal>
    </Layout>
  );
}
