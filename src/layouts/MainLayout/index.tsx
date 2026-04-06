import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { navSections } from './Sidebar.constants';
import { useState } from 'react';

// 获取所有扁平的路由以便查找
const allRoutes = navSections.flatMap(s => s.items);

/**
 * 页面切换时自动滚动到顶部
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
  void pathname;
  return null;
};

/**
 * 主页面布局组件
 * 核心功能：
 * 1. 组合 Sidebar 侧边栏
 * 2. 提供渲染子路由的 Outlet
 * 3. 处理全局页面滚动
 * 4. 头部多标签页记录
 */
const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 维护标签页数据：默认留存一个首页
  const [visitedTags, setVisitedTags] = useState<{path: string, label: string}[]>([
    { path: '/', label: '概览' }
  ]);

  // 根据当前 pathname 找出对应的路由，并派生更新访问记录
  const currentRoute = allRoutes.find(r => r.path === location.pathname);
  if (currentRoute && !visitedTags.some(t => t.path === currentRoute.path)) {
    const labelText = currentRoute.label.slice(2).trim();
    setVisitedTags([...visitedTags, { path: currentRoute.path, label: labelText }]);
  }

  const removeTag = (pathToRemove: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // 首页不能删
    if (pathToRemove === '/') return;

    setVisitedTags(prev => {
      const newTags = prev.filter(t => t.path !== pathToRemove);
      // 如果删除的是当前处于激活状态的 tag，则需要跳到剩余 tag 的最后一个
      if (pathToRemove === location.pathname) {
        const lastTag = newTags[newTags.length - 1];
        navigate(lastTag.path);
      }
      return newTags;
    });
  };

  return (
    <div className="app-layout">
      <ScrollToTop />
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容渲染区 */}
      <main className="app-main" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
        {/* 顶部标签页 */}
        <div className="tags-view-container">
          {visitedTags.map(tag => (
            <Link 
              key={tag.path} 
              to={tag.path}
              className={`tags-view-item ${location.pathname === tag.path ? 'active' : ''}`}
            >
              {tag.label}
              {tag.path !== '/' && (
                <span 
                  className="tags-view-close" 
                  onClick={(e) => removeTag(tag.path, e)}
                  title="关闭"
                >
                  ✕
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* 实际页面内容区域 */}
        <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
