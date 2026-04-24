import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { navSections } from './Sidebar.constants';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';

const allRoutes = navSections.flatMap((s) => s.items);

type VisitedTag = { path: string; label: string };

const HOME_TAG: VisitedTag = { path: '/', label: '概览' };

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
 * 4. 头部多标签页记录与右键菜单
 */
const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visitedTags, setVisitedTags] = useState<VisitedTag[]>([HOME_TAG]);

  useEffect(() => {
    const route = allRoutes.find((r) => r.path === location.pathname);
    if (!route) return;
    setVisitedTags((prev) => {
      if (prev.some((t) => t.path === route.path)) return prev;
      const labelText = route.label.slice(2).trim();
      return [...prev, { path: route.path, label: labelText }];
    });
  }, [location.pathname]);

  const removeTagByPath = useCallback(
    (pathToRemove: string) => {
      if (pathToRemove === '/') return;
      setVisitedTags((prev) => {
        const newTags = prev.filter((t) => t.path !== pathToRemove);
        if (pathToRemove === location.pathname) {
          const lastTag = newTags[newTags.length - 1];
          navigate(lastTag.path);
        }
        return newTags;
      });
    },
    [location.pathname, navigate],
  );

  const closeTagFromButton = (pathToRemove: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeTagByPath(pathToRemove);
  };

  const closeAllTags = useCallback(() => {
    setVisitedTags([HOME_TAG]);
    navigate('/');
  }, [navigate]);

  const closeOtherTags = useCallback(
    (keepPath: string) => {
      setVisitedTags((prev) => {
        const keep = prev.find((t) => t.path === keepPath);
        if (!keep) return prev;

        const next: VisitedTag[] =
          keepPath === '/' ? [HOME_TAG] : [HOME_TAG, keep];

        const allowed = new Set(next.map((t) => t.path));
        if (!allowed.has(location.pathname)) {
          navigate(keepPath === '/' ? '/' : keepPath);
        }
        return next;
      });
    },
    [location.pathname, navigate],
  );

  const buildContextMenu = useCallback(
    (tag: VisitedTag): MenuProps => ({
      items: [
        {
          key: 'close',
          label: '关闭选择标签',
          disabled: tag.path === '/',
        },
        {
          key: 'closeAll',
          label: '关闭所有标签',
          disabled: visitedTags.length <= 1,
        },
        {
          key: 'closeOthers',
          label: '关闭其他标签',
          disabled:
            visitedTags.length <= 1 ||
            visitedTags.every((t) => t.path === '/' || t.path === tag.path),
        },
      ],
      onClick: ({ key, domEvent }) => {
        domEvent.stopPropagation();
        if (key === 'close') removeTagByPath(tag.path);
        else if (key === 'closeAll') closeAllTags();
        else if (key === 'closeOthers') closeOtherTags(tag.path);
      },
    }),
    [visitedTags, removeTagByPath, closeAllTags, closeOtherTags],
  );

  const tagList = useMemo(
    () =>
      visitedTags.map((tag) => (
        <Dropdown
          key={tag.path}
          trigger={['contextMenu']}
          menu={buildContextMenu(tag)}
          getPopupContainer={() => document.body}
          popupClassName="tags-context-dropdown"
        >
          <Link
            to={tag.path}
            className={`tags-view-item ${location.pathname === tag.path ? 'active' : ''}`}
            onContextMenu={(e) => e.preventDefault()}
          >
            {tag.label}
            {tag.path !== '/' && (
              <span
                className="tags-view-close"
                onClick={(e) => closeTagFromButton(tag.path, e)}
                title="关闭"
              >
                ✕
              </span>
            )}
          </Link>
        </Dropdown>
      )),
    [visitedTags, location.pathname, buildContextMenu],
  );

  return (
    <div className="app-layout">
      <ScrollToTop />
      <Sidebar />

      <main className="app-main" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="tags-view-container">{tagList}</div>

        <div className="main-layout-scroll">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
