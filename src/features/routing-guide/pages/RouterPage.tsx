import { useParams, useSearchParams, useNavigate, Outlet, Link } from 'react-router-dom';
import { Button, Space, Tag, Descriptions, Input } from 'antd';
import { useState } from 'react';
import ConceptCard from '@/components/common/ConceptCard';
import CodeBlock from '@/components/common/CodeBlock';
import DemoArea from '@/components/common/DemoArea';

/**
 * React Router 学习页面
 * 核心知识点：路由配置、动态参数、查询参数、编程式导航、嵌套路由
 */

// ===== 1. 路由基础概览 =====
const RouterOverview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ConceptCard
      title="路由系统概览"
      emoji="🗺️"
      description="React Router 是 React 生态中最主流的前端路由库。它实现了 SPA 的页面切换（不刷新浏览器），核心概念包括：Route 配置、Link 跳转、Hooks 获取参数。"
      tags={[{ text: '核心', type: 'core' }]}
    >
      <CodeBlock
        label="TSX"
        code={`// 路由配置（声明式）
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

<BrowserRouter>
  <nav>
    <Link to="/">首页</Link>
    <Link to="/about">关于</Link>
  </nav>

  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/user/:id" element={<UserPage />} />  {/* 动态路由 */}
    <Route path="*" element={<NotFound />} />           {/* 404 兜底 */}
  </Routes>
</BrowserRouter>

// 编程式导航
const navigate = useNavigate();
navigate('/about');           // 跳转
navigate(-1);                 // 后退
navigate('/search?q=react');  // 带查询参数`}
      />
      <DemoArea title="编程式导航演示">
        <Space wrap>
          <Button type="primary" onClick={() => navigate('/')}>
            🏠 跳转首页
          </Button>
          <Button onClick={() => navigate('/jsx')}>
            📝 跳转 JSX 页面
          </Button>
          <Button onClick={() => navigate(-1)}>
            ← 后退一步
          </Button>
          <Button onClick={() => navigate('/router/detail/42')}>
            👤 动态路由 /detail/42
          </Button>
          <Button onClick={() => navigate('/router/search?q=React&page=1')}>
            🔍 带查询参数
          </Button>
        </Space>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 2. 动态路由参数（子页面） =====
export const RouterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div style={{ marginTop: 24 }}>
      <ConceptCard
        title="动态路由参数"
        emoji="🔗"
        description="通过 :param 定义动态路由段，使用 useParams() Hook 获取参数值。"
        tags={[{ text: '路由 Hook', type: 'core' }]}
      >
        <CodeBlock
          label="TSX"
          code={`// 路由配置中定义参数
<Route path="/user/:id" element={<UserPage />} />

// 组件中获取参数
const { id } = useParams<{ id: string }>();
// 访问 /user/42 → id = "42"`}
        />
        <DemoArea>
          <Descriptions
            column={1}
            size="small"
            style={{ maxWidth: 400 }}
            labelStyle={{ color: 'var(--text-muted)' }}
            contentStyle={{ color: 'var(--color-accent-light)' }}
          >
            <Descriptions.Item label="路由路径">/router/detail/:id</Descriptions.Item>
            <Descriptions.Item label="当前 id 参数">
              <Tag color="blue" style={{ fontSize: 14 }}>{id ?? '未设置'}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="获取方式">
              <code style={{ fontSize: 12 }}>useParams()</code>
            </Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: 12 }}>
            <Space>
              <Link to="/router/detail/1"><Button size="small">ID = 1</Button></Link>
              <Link to="/router/detail/99"><Button size="small">ID = 99</Button></Link>
              <Link to="/router/detail/hello"><Button size="small">ID = hello</Button></Link>
            </Space>
          </div>
        </DemoArea>
      </ConceptCard>
    </div>
  );
};

// ===== 3. 查询参数（子页面） =====
export const RouterSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('q') ?? '');

  const query = searchParams.get('q') ?? '';
  const page = searchParams.get('page') ?? '1';

  const handleSearch = () => {
    setSearchParams({ q: searchInput, page: '1' });
  };

  return (
    <div style={{ marginTop: 24 }}>
      <ConceptCard
        title="查询参数（Query String）"
        emoji="🔍"
        description="使用 useSearchParams() Hook 读取和修改 URL 中的查询参数（?key=value），无需刷新页面。"
        tags={[{ text: '路由 Hook', type: 'core' }]}
      >
        <CodeBlock
          label="TSX"
          code={`// 获取查询参数
const [searchParams, setSearchParams] = useSearchParams();
const q = searchParams.get('q');       // ?q=React → "React"
const page = searchParams.get('page'); // ?page=2 → "2"

// 更新查询参数（不刷新页面）
setSearchParams({ q: 'React 18', page: '1' });`}
        />
        <DemoArea>
          <Space direction="vertical" size="middle" style={{ width: '100%', maxWidth: 400 }}>
            <Descriptions
              column={1}
              size="small"
              labelStyle={{ color: 'var(--text-muted)' }}
              contentStyle={{ color: 'var(--color-accent-light)' }}
            >
              <Descriptions.Item label="当前 q 参数">
                <Tag color="blue">{query || '(空)'}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="当前 page 参数">
                <Tag color="purple">{page}</Tag>
              </Descriptions.Item>
            </Descriptions>

            <div style={{ display: 'flex', gap: 8 }}>
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onPressEnter={handleSearch}
                placeholder="输入搜索词"
              />
              <Button type="primary" onClick={handleSearch}>
                搜索
              </Button>
            </div>

            <Space>
              <Button
                size="small"
                onClick={() => setSearchParams({ q: query, page: String(Math.max(1, Number(page) - 1)) })}
              >
                ← 上一页
              </Button>
              <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>第 {page} 页</span>
              <Button
                size="small"
                onClick={() => setSearchParams({ q: query, page: String(Number(page) + 1) })}
              >
                下一页 →
              </Button>
            </Space>
          </Space>
        </DemoArea>
      </ConceptCard>
    </div>
  );
};

// ===== 嵌套路由出口 =====
const NestedRouteDemo: React.FC = () => {
  return (
    <ConceptCard
      title="嵌套路由"
      emoji="📂"
      description="React Router 支持嵌套路由：父路由渲染共享布局，子路由通过 <Outlet /> 渲染在指定位置。本页面的「动态路由」和「查询参数」演示就是通过嵌套路由实现的。"
      tags={[{ text: '路由模式', type: 'advanced' }]}
    >
      <CodeBlock
        label="TSX"
        code={`// 嵌套路由配置
<Route path="/router" element={<RouterPage />}>         {/* 父路由（布局） */}
  <Route path="detail/:id" element={<DetailPage />} /> {/* 子路由 */}
  <Route path="search" element={<SearchPage />} />     {/* 子路由 */}
</Route>

// 父组件中用 <Outlet /> 标记子路由渲染位置
const RouterPage = () => (
  <div>
    <h2>路由学习</h2>
    <Outlet />  {/* 子路由内容渲染在这里 */}
  </div>
);`}
      />
      <DemoArea title="嵌套路由演示（点击按钮加载子页面）">
        <Space wrap>
          <Link to="/router/detail/42">
            <Button type="primary">📄 动态路由演示</Button>
          </Link>
          <Link to="/router/search?q=React&page=1">
            <Button>🔍 查询参数演示</Button>
          </Link>
        </Space>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
          💡 子页面内容将通过 {'<Outlet />'} 渲染在下方
        </div>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 页面主体 =====
const RouterPage: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <h2>🧭 React Router</h2>
        <p>
          React Router 实现了单页应用（SPA）的客户端路由。它管理 URL 与组件的映射关系，
          支持动态路由、嵌套路由、查询参数等功能。
        </p>
      </div>

      <RouterOverview />
      <NestedRouteDemo />

      {/* 嵌套路由出口 - 子页面渲染位置 */}
      <Outlet />
    </div>
  );
};

export default RouterPage;
