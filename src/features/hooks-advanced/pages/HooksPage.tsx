import { useState, useReducer, useMemo, useCallback, useContext, createContext } from 'react';
import { Button, Space, Input, Tag, Switch, List, Badge } from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import ConceptCard from '@/components/common/ConceptCard';
import CodeBlock from '@/components/common/CodeBlock';
import DemoArea from '@/components/common/DemoArea';
import type { TodoItem, TodoAction, ThemeContextValue } from '@/types';

/**
 * Hooks 进阶页面
 * 核心知识点：useContext、useReducer、useMemo、useCallback、自定义 Hook
 */

// ===== 1. useContext 跨层通信 =====

// 创建 Context
const ThemeContext = createContext<ThemeContextValue>({
  isDark: true,
  toggleTheme: () => {},
  primaryColor: '#6366f1',
});

/** 深层子组件 - 直接消费 Context，无需 Props 传递 */
const DeepChild: React.FC = () => {
  const { isDark, primaryColor } = useContext(ThemeContext);
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        background: isDark ? 'rgba(15, 15, 35, 0.6)' : 'rgba(255, 255, 255, 0.9)',
        border: `1px solid ${primaryColor}`,
        color: isDark ? '#e2e8f0' : '#1a1a2e',
        fontSize: 13,
        transition: 'all 0.3s',
      }}
    >
      🎨 我是深层子组件，通过 useContext 直接获取主题
      <br />
      <Tag color={primaryColor} style={{ marginTop: 4 }}>
        模式: {isDark ? '深色' : '浅色'}
      </Tag>
      <Tag color={primaryColor}>色值: {primaryColor}</Tag>
    </div>
  );
};

const UseContextDemo: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#6366f1');

  const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#22c55e'];

  return (
    <ConceptCard
      title="useContext - 跨层通信"
      emoji="🌐"
      description="Context 提供了一种跨组件层级传递数据的方式，避免了逐层传递 Props（即 Props Drilling）的繁琐。"
      tags={[
        { text: '进阶 Hook', type: 'advanced' },
        { text: '替代 Props Drilling', type: 'important' },
      ]}
    >
      <CodeBlock
        label="TSX"
        code={`// 1. 创建 Context（带默认值和类型）
const ThemeContext = createContext<ThemeContextValue>({
  isDark: true,
  toggleTheme: () => {},
  primaryColor: '#6366f1',
});

// 2. Provider 提供数据（顶层包裹）
<ThemeContext.Provider value={{ isDark, toggleTheme, primaryColor }}>
  <ChildComponent />
</ThemeContext.Provider>

// 3. 任何子组件直接消费（无论多深）
const DeepChild = () => {
  const { isDark, primaryColor } = useContext(ThemeContext);
  return <div style={{ background: isDark ? '#000' : '#fff' }}>...</div>;
};`}
      />
      <DemoArea title="Context 主题切换">
        <ThemeContext.Provider
          value={{
            isDark,
            toggleTheme: () => setIsDark(!isDark),
            primaryColor,
          }}
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Switch
                checked={isDark}
                onChange={setIsDark}
                checkedChildren="🌙"
                unCheckedChildren="☀️"
              />
              <Space>
                {colors.map((c) => (
                  <div
                    key={c}
                    onClick={() => setPrimaryColor(c)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: c,
                      cursor: 'pointer',
                      border: primaryColor === c ? '2px solid #fff' : '2px solid transparent',
                      transition: 'border 0.2s',
                    }}
                  />
                ))}
              </Space>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              ↓ 以下子组件通过 useContext 接收上面的设置（无需 Props 传递）
            </div>
            <DeepChild />
          </Space>
        </ThemeContext.Provider>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 2. useReducer 复杂状态管理 =====

/** Todo Reducer 函数 */
const todoReducer = (state: TodoItem[], action: TodoAction): TodoItem[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE':
      return state.map((item) =>
        item.id === action.payload ? { ...item, completed: !item.completed } : item
      );
    case 'DELETE':
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

const UseReducerDemo: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, [
    { id: 1, text: '学习 useReducer', completed: true },
    { id: 2, text: '理解 dispatch 模式', completed: false },
    { id: 3, text: '对比 useState vs useReducer', completed: false },
  ]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD', payload: input.trim() });
      setInput('');
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <ConceptCard
      title="useReducer - 复杂状态管理"
      emoji="🔧"
      description="useReducer 是 useState 的替代方案，适用于状态逻辑较复杂、涉及多个子值、或下一个状态依赖于之前状态的场景。它的设计灵感来自 Redux。"
      tags={[
        { text: '进阶 Hook', type: 'advanced' },
        { text: 'Redux 模式', type: 'important' },
      ]}
    >
      <CodeBlock
        label="TSX"
        code={`// 1. 定义 Action 类型
type TodoAction =
  | { type: 'ADD'; payload: string }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'DELETE'; payload: number };

// 2. 定义 Reducer（纯函数）
const todoReducer = (state: TodoItem[], action: TodoAction) => {
  switch (action.type) {
    case 'ADD': return [...state, { id: Date.now(), text: action.payload }];
    case 'TOGGLE': return state.map(item =>
      item.id === action.payload ? { ...item, completed: !item.completed } : item
    );
    case 'DELETE': return state.filter(item => item.id !== action.payload);
  }
};

// 3. 使用 useReducer
const [todos, dispatch] = useReducer(todoReducer, initialTodos);
dispatch({ type: 'ADD', payload: '新任务' }); // 派发 Action`}
      />
      <DemoArea title="TodoList（useReducer 版）">
        <Space direction="vertical" size="small" style={{ width: '100%', maxWidth: 450 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={handleAdd}
              placeholder="输入新任务，按 Enter 添加"
            />
            <Button type="primary" onClick={handleAdd}>
              添加
            </Button>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            <Badge status="success" text={`已完成 ${completedCount}/${todos.length}`} />
          </div>
          <List
            size="small"
            dataSource={todos}
            renderItem={(item) => (
              <List.Item
                style={{ borderColor: 'var(--border-subtle)', padding: '6px 0' }}
                actions={[
                  <Button
                    key="toggle"
                    type="text"
                    size="small"
                    icon={<CheckOutlined />}
                    style={{ color: item.completed ? '#22c55e' : 'var(--text-muted)' }}
                    onClick={() => dispatch({ type: 'TOGGLE', payload: item.id })}
                  />,
                  <Button
                    key="delete"
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => dispatch({ type: 'DELETE', payload: item.id })}
                  />,
                ]}
              >
                <span
                  style={{
                    textDecoration: item.completed ? 'line-through' : 'none',
                    color: item.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                    fontSize: 13,
                  }}
                >
                  {item.text}
                </span>
              </List.Item>
            )}
          />
        </Space>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 3. useMemo & useCallback =====
const PerformanceDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // useMemo：缓存计算结果，仅 count 变化时重新计算
  const expensiveResult = useMemo(() => {
    let sum = 0;
    for (let i = 0; i <= count * 1000; i++) {
      sum += i;
    }
    return sum;
  }, [count]);

  // useCallback：缓存函数引用，避免子组件不必要重渲染
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <ConceptCard
      title="useMemo & useCallback 性能优化"
      emoji="⚡"
      description="useMemo 缓存计算结果，useCallback 缓存函数引用。它们是 React 性能优化的核心工具，可避免不必要的重渲染和重复计算。"
      tags={[
        { text: '性能优化', type: 'advanced' },
        { text: '按需使用', type: 'important' },
      ]}
    >
      <CodeBlock
        label="TSX"
        code={`// useMemo：缓存昂贵的计算结果
const expensiveResult = useMemo(() => {
  let sum = 0;
  for (let i = 0; i <= count * 1000; i++) sum += i;
  return sum;
}, [count]); // 仅 count 变化时重新计算

// useCallback：缓存函数引用
const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []); // 空依赖 → 函数引用永不变化

// ⚠️ 何时使用？
// - useMemo：昂贵计算、复杂对象作为子组件 Props
// - useCallback：传给被 React.memo 包裹的子组件的回调
// - 不要过度优化！简单场景无需使用`}
      />
      <DemoArea title="性能优化演示">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button type="primary" onClick={handleIncrement}>
              count: {count}（点击 +1）
            </Button>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              useMemo 计算结果：
              <strong style={{ color: 'var(--color-accent-light)' }}>
                {expensiveResult.toLocaleString()}
              </strong>
            </span>
          </div>
          <div>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="输入文字（不会触发 useMemo 重新计算）"
              style={{ maxWidth: 400 }}
            />
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
              💡 文字输入不影响 useMemo 的计算（依赖项是 count，不是 text）
            </div>
          </div>
        </Space>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 4. 自定义 Hook =====

/** 自定义 Hook：useLocalStorage */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}

/** 自定义 Hook：useToggle */
function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((prev) => !prev), []);
  return [value, toggle];
}

const CustomHookDemo: React.FC = () => {
  const [name, setName] = useLocalStorage('react-demo-name', '');
  const [isVisible, toggleVisible] = useToggle(true);

  return (
    <ConceptCard
      title="自定义 Hook"
      emoji="🪝"
      description="自定义 Hook 是以 use 开头的函数，用于封装可复用的状态逻辑。它是 React 代码复用的主要方式，替代了旧的 HOC 和 Render Props 模式。"
      tags={[
        { text: '进阶', type: 'advanced' },
        { text: '逻辑复用', type: 'core' },
      ]}
    >
      <CodeBlock
        label="TSX"
        code={`// 自定义 Hook 规则：
// 1. 必须以 "use" 开头
// 2. 内部可使用其他 Hooks
// 3. 每次调用都有独立的状态

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}

// 使用自定义 Hook（像普通 Hook 一样）
const [name, setName] = useLocalStorage('key', '默认值');`}
      />
      <DemoArea title="自定义 Hook 演示">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {/* useLocalStorage 演示 */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>
              useLocalStorage（刷新页面数据仍在）：
            </div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入你的名字（会自动保存到 localStorage）"
              style={{ maxWidth: 400 }}
            />
            {name && (
              <div style={{ marginTop: 4, fontSize: 13, color: 'var(--color-accent-light)' }}>
                👋 你好，{name}！（此数据已持久化存储）
              </div>
            )}
          </div>

          {/* useToggle 演示 */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>
              useToggle（封装布尔值切换逻辑）：
            </div>
            <Button onClick={toggleVisible}>
              {isVisible ? '🙈 隐藏内容' : '🙉 显示内容'}
            </Button>
            {isVisible && (
              <div
                style={{
                  marginTop: 8,
                  padding: 12,
                  background: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: 8,
                  fontSize: 13,
                  color: 'var(--text-primary)',
                }}
              >
                ✨ 这段内容的显示/隐藏由 useToggle 自定义 Hook 控制
              </div>
            )}
          </div>
        </Space>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 页面主体 =====
const HooksPage: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <h2>🪝 Hooks 进阶</h2>
        <p>
          Hooks 让函数组件具备了类组件的所有能力。掌握 useContext、useReducer、useMemo/useCallback
          等进阶 Hook，以及学会编写自定义 Hook，是成为 React 高手的必经之路。
        </p>
      </div>

      <UseContextDemo />
      <UseReducerDemo />
      <PerformanceDemo />
      <CustomHookDemo />
    </div>
  );
};

export default HooksPage;
