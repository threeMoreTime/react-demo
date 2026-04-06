import { useState, type ChangeEvent, type FormEvent, type KeyboardEvent, type MouseEvent } from 'react';
import { Button, Space, Input, Tag, message, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ConceptCard from '@/components/common/ConceptCard';
import CodeBlock from '@/components/common/CodeBlock';
import DemoArea from '@/components/common/DemoArea';

/**
 * 事件处理页面
 * 核心知识点：事件绑定、合成事件、受控组件、表单处理
 */

// ===== 1. 事件绑定基础 =====
const EventBindingDemo: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [hoverTarget, setHoverTarget] = useState('无');

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <ConceptCard
      title="事件绑定"
      emoji="🎯"
      description="React 使用「合成事件」系统，驼峰命名（onClick 而非 onclick），传递函数引用而非字符串。事件处理器接收 SyntheticEvent 对象。"
      tags={[{ text: '核心', type: 'core' }]}
    >
      <CodeBlock
        label="TSX"
        code={`// React 事件绑定（驼峰命名 + 函数引用）
<button onClick={handleClick}>点击</button>

// 带事件对象参数
const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
  console.log(e.clientX, e.clientY);
};
<div onMouseMove={handleMouseMove}>...</div>

// 内联箭头函数（传参时使用）
<button onClick={() => deleteItem(id)}>删除</button>`}
      />
      <DemoArea>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {/* 点击计数 */}
          <div>
            <Button type="primary" onClick={handleClick}>
              🖱️ 点击我（已点击 {clickCount} 次）
            </Button>
          </div>

          {/* 鼠标移动追踪 */}
          <div
            onMouseMove={handleMouseMove}
            style={{
              padding: 20,
              background: 'rgba(15, 15, 35, 0.6)',
              borderRadius: 8,
              border: '1px dashed var(--border-active)',
              cursor: 'crosshair',
              fontSize: 13,
              color: 'var(--text-secondary)',
            }}
          >
            🎮 在此区域移动鼠标 →{' '}
            <span style={{ color: 'var(--color-accent-light)' }}>
              X: {lastPosition.x}, Y: {lastPosition.y}
            </span>
          </div>

          {/* Hover 演示 */}
          <Space>
            {['🍎 苹果', '🍊 橙子', '🍇 葡萄'].map((item) => (
              <Tag
                key={item}
                color={hoverTarget === item ? 'blue' : 'default'}
                onMouseEnter={() => setHoverTarget(item)}
                onMouseLeave={() => setHoverTarget('无')}
                style={{ cursor: 'pointer', fontSize: 14, padding: '4px 12px' }}
              >
                {item}
              </Tag>
            ))}
            <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>
              当前悬停：{hoverTarget}
            </span>
          </Space>
        </Space>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 2. 受控组件与表单 =====
const ControlledFormDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止默认表单提交
    if (!formData.username || !formData.email) {
      message.warning('请填写完整信息');
      return;
    }
    setSubmitted(true);
    message.success(`提交成功！用户: ${formData.username}`);
  };

  return (
    <ConceptCard
      title="受控组件与表单"
      emoji="📝"
      description="受控组件的值由 React state 驱动（value + onChange），确保 UI 与状态时刻同步。这是 React 表单处理的核心模式。"
      tags={[
        { text: '核心', type: 'core' },
        { text: '单向数据流', type: 'important' },
      ]}
    >
      <CodeBlock
        label="TSX"
        code={`// 受控组件核心模式
const [formData, setFormData] = useState({ username: '', email: '' });

// 统一的 onChange 处理器（用 name 属性区分字段）
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// 表单提交（阻止默认行为）
const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  console.log(formData);
};

<form onSubmit={handleSubmit}>
  <input name="username" value={formData.username} onChange={handleChange} />
  <button type="submit">提交</button>
</form>`}
      />
      <DemoArea title="受控表单演示">
        <form onSubmit={handleSubmit}>
          <Space direction="vertical" size="middle" style={{ width: '100%', maxWidth: 400 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                用户名
              </label>
              <Input
                name="username"
                value={formData.username}
                onChange={(e) => handleInputChange(e as unknown as ChangeEvent<HTMLInputElement>)}
                placeholder="输入用户名"
              />
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                邮箱
              </label>
              <Input
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange(e as unknown as ChangeEvent<HTMLInputElement>)}
                placeholder="输入邮箱"
              />
            </div>
            <Button type="primary" htmlType="submit" block>
              提交
            </Button>
            {submitted && (
              <div style={{ fontSize: 13, color: 'var(--color-accent-light)' }}>
                ✅ 实时状态：{JSON.stringify(formData)}
              </div>
            )}
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              💡 实时状态同步：{JSON.stringify(formData)}
            </div>
          </Space>
        </form>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 3. 键盘事件 + Todo List =====
const KeyboardEventDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<string[]>(['学习 React 核心概念', '练习 Hooks']);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      setTodos((prev) => [...prev, input.trim()]);
      setInput('');
    }
  };

  const handleDelete = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ConceptCard
      title="键盘事件与列表操作"
      emoji="⌨️"
      description="通过 onKeyDown 监听键盘事件实现快捷操作。结合 State 和列表渲染，构建完整的交互式 TodoList。"
      tags={[{ text: '实践', type: 'advanced' }]}
    >
      <CodeBlock
        label="TSX"
        code={`const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter' && input.trim()) {
    setTodos(prev => [...prev, input.trim()]);
    setInput('');
  }
};

// 不可变更新：用 filter 删除元素（而非 splice）
const handleDelete = (index: number) => {
  setTodos(prev => prev.filter((_, i) => i !== index));
};`}
      />
      <DemoArea title="Mini TodoList">
        <Space direction="vertical" size="small" style={{ width: '100%', maxWidth: 400 }}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e as unknown as KeyboardEvent<HTMLInputElement>)}
            placeholder="输入待办事项，按 Enter 添加"
            allowClear
          />
          <List
            size="small"
            dataSource={todos}
            locale={{ emptyText: '暂无待办事项' }}
            renderItem={(item, index) => (
              <List.Item
                style={{
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-subtle)',
                  padding: '8px 0',
                }}
                actions={[
                  <Button
                    key="delete"
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(index)}
                  />,
                ]}
              >
                <span style={{ fontSize: 13 }}>
                  {index + 1}. {item}
                </span>
              </List.Item>
            )}
          />
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            共 {todos.length} 项 | 💡 注意使用不可变更新（filter 创建新数组）
          </div>
        </Space>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 页面主体 =====
const EventsPage: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <h2>🖱️ 事件处理</h2>
        <p>
          React 的合成事件系统（SyntheticEvent）在原生 DOM 事件之上提供了跨浏览器兼容的统一接口。
          掌握受控组件和事件处理是构建交互式 UI 的基础。
        </p>
      </div>

      <EventBindingDemo />
      <ControlledFormDemo />
      <KeyboardEventDemo />
    </div>
  );
};

export default EventsPage;
