import { Link } from 'react-router-dom';
import { RocketOutlined } from '@ant-design/icons';
import type { NavItem } from '@/types';

/**
 * 首页 - 概览所有 React 核心概念
 * 演示知识点：组件、JSX、列表渲染、Link 路由跳转
 */

// 学习模块数据
const modules: NavItem[] = [
  {
    key: 'jsx',
    label: 'JSX 基础',
    icon: '📝',
    path: '/jsx',
    badge: '入门',
    difficulty: 'easy',
    description: '学习 JSX 语法、嵌入表达式、条件渲染、列表渲染等 React 视图层核心知识。',
  },
  {
    key: 'components',
    label: '组件与 Props',
    icon: '🧩',
    path: '/components',
    badge: '核心',
    difficulty: 'easy',
    description: '理解函数组件的定义方式，掌握 Props 传值、默认值、children 插槽等核心模式。',
  },
  {
    key: 'state',
    label: 'State 与副作用',
    icon: '⚡',
    path: '/state',
    badge: '核心',
    difficulty: 'medium',
    description: '深入 useState 状态管理、useEffect 副作用处理、useRef 引用等核心 Hooks。',
  },
  {
    key: 'events',
    label: '事件处理',
    icon: '🖱️',
    path: '/events',
    badge: '实践',
    difficulty: 'easy',
    description: '掌握 React 合成事件系统、事件处理函数绑定、表单受控组件等交互模式。',
  },
  {
    key: 'hooks',
    label: 'Hooks 进阶',
    icon: '🪝',
    path: '/hooks',
    badge: '进阶',
    difficulty: 'hard',
    description: '探索 useContext 跨层通信、useReducer 复杂状态、useMemo/useCallback 性能优化、自定义 Hook。',
  },
  {
    key: 'router',
    label: 'React Router',
    icon: '🧭',
    path: '/router',
    badge: '生态',
    difficulty: 'medium',
    description: '学习前端路由的核心概念：声明式路由、动态路由、嵌套路由、路由守卫等。',
  },
];

const HomePage: React.FC = () => {
  return (
    <div>
      {/* 页面标题区 */}
      <div className="page-header animate-fade-in-up">
        <h2>
          <RocketOutlined style={{ marginRight: 10 }} />
          React 学习实验室
        </h2>
        <p>
          这是一个交互式 React 18 学习项目，每个模块都包含<strong>核心概念讲解</strong>和
          <strong>可运行的实时演示</strong>。点击下方卡片进入对应模块，跟着代码动手实践。
        </p>
      </div>

      {/* 模块卡片网格 */}
      <div className="home-grid">
        {modules.map((mod, index) => (
          <Link
            key={mod.key}
            to={mod.path}
            className={`home-card animate-fade-in-up stagger-${index + 1}`}
          >
            <div className="home-card-icon">{mod.icon}</div>
            <h3>{mod.label}</h3>
            <p>{mod.description}</p>
            <div className="home-card-footer">
              <span className={`difficulty ${mod.difficulty}`}>
                {mod.difficulty === 'easy' ? '⭐ 入门' : mod.difficulty === 'medium' ? '⭐⭐ 进阶' : '⭐⭐⭐ 高级'}
              </span>
              <span className="arrow">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
