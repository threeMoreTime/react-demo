import { useState } from 'react';
import { Tag, Space } from 'antd';
import ConceptCard from '@/components/common/ConceptCard';
import CodeBlock from '@/components/common/CodeBlock';
import DemoArea from '@/components/common/DemoArea';

/**
 * JSX 基础页面
 * 核心知识点：JSX 语法、表达式嵌入、条件渲染、列表渲染
 */

// ===== 1. JSX 中嵌入表达式 =====
const ExpressionDemo: React.FC = () => {
  const name = 'React 学习者';
  const now = new Date();
  const hour = now.getHours();

  // 根据时间动态生成问候语
  const getGreeting = (): string => {
    if (hour < 12) return '☀️ 早上好';
    if (hour < 18) return '🌤️ 下午好';
    return '🌙 晚上好';
  };

  return (
    <ConceptCard
      title="表达式嵌入"
      emoji="📐"
      description="JSX 中使用花括号 {} 可以嵌入任意 JavaScript 表达式（变量、函数调用、三元运算等）。"
      tags={[{ text: '核心', type: 'core' }]}
    >
      <CodeBlock
        label="JSX"
        code={`// 在 JSX 中嵌入变量和表达式
const name = 'React 学习者';
const hour = new Date().getHours();

return (
  <div>
    <p>{name}，{getGreeting()}！</p>
    <p>当前时间：{new Date().toLocaleString()}</p>
    <p>2 + 3 = {2 + 3}</p>
  </div>
);`}
      />
      <DemoArea>
        <p style={{ color: 'var(--text-primary)', fontSize: 15 }}>
          {name}，{getGreeting()}！
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 4 }}>
          当前时间：{now.toLocaleString('zh-CN')}
        </p>
        <p style={{ color: 'var(--color-accent-light)', fontSize: 14, marginTop: 4 }}>
          2 + 3 = <strong>{2 + 3}</strong>
        </p>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 2. 条件渲染 =====
const ConditionalDemo: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [score, setScore] = useState(75);

  return (
    <ConceptCard
      title="条件渲染"
      emoji="🔀"
      description="React 提供多种条件渲染方式：三元运算符、&& 短路运算、if-else 提前返回。"
      tags={[{ text: '核心', type: 'core' }]}
    >
      <CodeBlock
        label="JSX"
        code={`// 方式一：三元运算符
{isLoggedIn ? <p>欢迎回来！</p> : <p>请先登录</p>}

// 方式二：&& 短路运算（显示/隐藏）
{score >= 60 && <Tag color="green">及格</Tag>}

// 方式三：多条件映射
{score >= 90 ? '优秀' : score >= 60 ? '及格' : '不及格'}`}
      />
      <DemoArea>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {/* 三元运算符演示 */}
          <div>
            <span style={{ color: 'var(--text-secondary)', marginRight: 12, fontSize: 13 }}>
              登录状态：
            </span>
            <Tag
              color={isLoggedIn ? 'green' : 'red'}
              style={{ cursor: 'pointer' }}
              onClick={() => setIsLoggedIn(!isLoggedIn)}
            >
              {isLoggedIn ? '✅ 已登录（点击切换）' : '❌ 未登录（点击切换）'}
            </Tag>
          </div>
          <div style={{ color: 'var(--text-primary)', fontSize: 14 }}>
            {isLoggedIn ? '🎉 欢迎回来，React 学习者！' : '🔒 请先登录后继续学习'}
          </div>

          {/* 分数评级演示 */}
          <div style={{ marginTop: 8 }}>
            <span style={{ color: 'var(--text-secondary)', marginRight: 12, fontSize: 13 }}>
              分数：
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              style={{ verticalAlign: 'middle' }}
            />
            <span style={{ color: 'var(--color-accent-light)', marginLeft: 8 }}>{score} 分</span>
            <span style={{ marginLeft: 12 }}>
              {score >= 90 ? (
                <Tag color="gold">🏆 优秀</Tag>
              ) : score >= 60 ? (
                <Tag color="green">✅ 及格</Tag>
              ) : (
                <Tag color="red">⚠️ 不及格</Tag>
              )}
            </span>
          </div>
        </Space>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 3. 列表渲染 =====
const ListRenderDemo: React.FC = () => {
  const fruits = [
    { id: 1, name: '🍎 苹果', color: 'red' },
    { id: 2, name: '🍊 橙子', color: 'orange' },
    { id: 3, name: '🍇 葡萄', color: 'purple' },
    { id: 4, name: '🍌 香蕉', color: 'gold' },
  ];

  return (
    <ConceptCard
      title="列表渲染"
      emoji="📋"
      description="使用 Array.map() 将数组数据映射为 JSX 元素列表。每个列表项必须提供唯一的 key 属性。"
      tags={[
        { text: '核心', type: 'core' },
        { text: 'key 属性', type: 'important' },
      ]}
    >
      <CodeBlock
        label="JSX"
        code={`const fruits = [
  { id: 1, name: '🍎 苹果', color: 'red' },
  { id: 2, name: '🍊 橙子', color: 'orange' },
];

// 使用 map + key 进行列表渲染
{fruits.map(fruit => (
  <Tag key={fruit.id} color={fruit.color}>
    {fruit.name}
  </Tag>
))}`}
      />
      <DemoArea>
        <Space wrap>
          {fruits.map((fruit) => (
            <Tag key={fruit.id} color={fruit.color} style={{ fontSize: 14, padding: '4px 12px' }}>
              {fruit.name}
            </Tag>
          ))}
        </Space>
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
          💡 key 帮助 React 识别哪些元素发生了变化，应使用稳定且唯一的标识（如 id），而不是数组索引。
        </div>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 页面主体 =====
const JsxPage: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <h2>📝 JSX 基础</h2>
        <p>
          JSX 是 JavaScript 的语法扩展，让你在 JS 代码中编写类似 HTML 的标记。
          它是 React 描述 UI 结构的核心方式。本质上，JSX 会被编译为 <code>React.createElement()</code> 调用。
        </p>
      </div>

      <ExpressionDemo />
      <ConditionalDemo />
      <ListRenderDemo />
    </div>
  );
};

export default JsxPage;
