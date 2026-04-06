import { useState, useEffect, useRef } from 'react';
import { Button, Space, Progress, InputNumber, Statistic, Tag } from 'antd';
import { PlusOutlined, MinusOutlined, ReloadOutlined } from '@ant-design/icons';
import ConceptCard from '@/components/common/ConceptCard';
import CodeBlock from '@/components/common/CodeBlock';
import DemoArea from '@/components/common/DemoArea';

/**
 * State 与副作用页面
 * 核心知识点：useState、useEffect、useRef
 */

// ===== 1. useState 基础 =====
const UseStateDemo: React.FC = () => {
  // 基本计数器
  const [count, setCount] = useState(0);
  // 对象状态 - 注意需要展开合并
  const [profile, setProfile] = useState({ name: 'React', version: 18 });

  return (
    <ConceptCard
      title="useState - 状态管理"
      emoji="🔄"
      description="useState 是最基础的 Hook，用于在函数组件中声明一个状态变量。它返回一个数组：[当前状态值, 更新函数]。"
      tags={[{ text: '核心 Hook', type: 'core' }]}
    >
      <CodeBlock
        label="TSX"
        code={`// 基本用法：声明状态
const [count, setCount] = useState(0);

// 更新状态（直接赋值）
setCount(10);

// 更新状态（基于前值 - 推荐）
setCount(prev => prev + 1);

// 对象状态更新（展开合并，保持不可变性）
const [profile, setProfile] = useState({ name: 'React', version: 18 });
setProfile(prev => ({ ...prev, version: 19 }));`}
      />
      <DemoArea title="计数器演示">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {/* 计数器 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button icon={<MinusOutlined />} onClick={() => setCount((prev) => prev - 1)} />
            <Statistic
              value={count}
              valueStyle={{ color: 'var(--color-primary-light)', fontSize: 32 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCount((prev) => prev + 1)}
            />
            <Button icon={<ReloadOutlined />} onClick={() => setCount(0)}>
              重置
            </Button>
          </div>

          {/* 对象状态 */}
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            <span>对象状态：</span>
            <Tag color="blue">{profile.name}</Tag>
            <Tag color="purple">v{profile.version}</Tag>
            <Button
              size="small"
              type="link"
              onClick={() => setProfile((prev) => ({ ...prev, version: prev.version + 1 }))}
            >
              升级版本
            </Button>
          </div>
        </Space>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 2. useEffect 副作用 =====
const UseEffectDemo: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 定时器 - 演示 effect 的依赖和清理
  useEffect(() => {
    if (!isRunning) return; // 不运行时不启动定时器

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // 清理函数 - 组件卸载或依赖变化时执行
    return () => {
      clearInterval(timer);
    };
  }, [isRunning]); // 依赖数组：isRunning 变化时重新执行

  // 监听窗口大小 - 演示全局事件监听
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // 清理：移除事件监听
    return () => window.removeEventListener('resize', handleResize);
  }, []); // 空依赖数组：仅组件挂载/卸载时执行

  return (
    <ConceptCard
      title="useEffect - 副作用处理"
      emoji="🌊"
      description="useEffect 用于执行副作用操作（数据获取、订阅、DOM 操作、定时器等）。它在组件渲染后执行，并可选返回清理函数。"
      tags={[
        { text: '核心 Hook', type: 'core' },
        { text: '清理函数', type: 'important' },
      ]}
    >
      <CodeBlock
        label="TSX"
        code={`// useEffect 三种执行时机：
useEffect(() => {
  // 1. 无依赖数组 → 每次渲染后执行
});

useEffect(() => {
  // 2. 空数组 [] → 仅首次挂载时执行（类似 onMounted）
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

useEffect(() => {
  // 3. 有依赖 [dep] → dep 变化时执行
  if (!isRunning) return;
  const timer = setInterval(() => setSeconds(s => s + 1), 1000);
  return () => clearInterval(timer); // 清理定时器
}, [isRunning]);`}
      />
      <DemoArea title="秒表 + 窗口监听">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {/* 秒表 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Progress
              type="circle"
              percent={seconds % 60 * (100 / 60)}
              format={() => `${seconds}s`}
              size={80}
              strokeColor={{
                '0%': '#6366f1',
                '100%': '#06b6d4',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? '⏸ 暂停' : '▶ 开始'}
              </Button>
              <Button
                onClick={() => {
                  setIsRunning(false);
                  setSeconds(0);
                }}
              >
                🔄 重置
              </Button>
            </Space>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            💡 定时器在 isRunning 改变时创建/销毁，清理函数确保不会内存泄漏
          </div>

          {/* 窗口宽度 */}
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            🖥️ 当前窗口宽度：<strong style={{ color: 'var(--color-accent-light)' }}>{windowWidth}px</strong>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>
              （调整浏览器窗口大小试试）
            </span>
          </div>
        </Space>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 3. useRef 引用 =====
const UseRefDemo: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCountRef = useRef(0);
  const [inputValue, setInputValue] = useState('');

  // 使用 useEffect 记录渲染次数（副作用）
  useEffect(() => {
    renderCountRef.current += 1;
  });

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <ConceptCard
      title="useRef - 持久引用"
      emoji="📌"
      description="useRef 返回一个可变的 ref 对象，其 .current 属性在整个组件生命周期内保持不变。常用于：访问 DOM 节点、存储不需要触发重渲染的值。"
      tags={[
        { text: '核心 Hook', type: 'core' },
        { text: '不触发渲染', type: 'important' },
      ]}
    >
      <CodeBlock
        label="TSX"
        code={`// 1. 引用 DOM 元素
const inputRef = useRef<HTMLInputElement>(null);
<input ref={inputRef} />
inputRef.current?.focus(); // 直接操作 DOM

// 2. 存储不触发渲染的值
const renderCount = useRef(0);
renderCount.current += 1; // 修改不触发重渲染
// 对比：useState 的 setState 会触发重渲染`}
      />
      <DemoArea title="DOM 操作 + 渲染计数">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入内容后点击聚焦按钮"
              style={{
                padding: '6px 12px',
                background: 'rgba(15, 15, 35, 0.8)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 8,
                color: 'var(--text-primary)',
                fontSize: 14,
                outline: 'none',
                flex: 1,
              }}
            />
            <Button type="primary" onClick={focusInput}>
              🎯 聚焦输入框
            </Button>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            📊 本组件已渲染过多次（查看控制台或使用调试工具）
            <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>
              （useRef.current 的变化不会触发渲染）
            </span>
          </div>
          <InputNumber
            style={{ width: 200 }}
            placeholder="修改此值触发渲染"
            onChange={() => setInputValue((prev) => prev)} // 触发一次渲染
          />
        </Space>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 页面主体 =====
const StatePage: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <h2>⚡ State 与副作用</h2>
        <p>
          State（状态）是组件的「记忆」，让组件能够响应用户交互并更新 UI。
          Hooks（useState、useEffect、useRef）是 React 18 函数组件中管理状态和副作用的核心工具。
        </p>
      </div>

      <UseStateDemo />
      <UseEffectDemo />
      <UseRefDemo />
    </div>
  );
};

export default StatePage;
