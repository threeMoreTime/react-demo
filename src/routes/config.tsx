import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';

// 使用 React.lazy 动态加载页面，优化首屏包体积
const HomePage = lazy(() => import('@/features/jsx-guide/pages/HomePage'));
const JsxPage = lazy(() => import('@/features/jsx-guide/pages/JsxPage'));
const ComponentsPage = lazy(() => import('@/features/component-props/pages/ComponentsPage'));
const StatePage = lazy(() => import('@/features/state-effects/pages/StatePage'));
const EventsPage = lazy(() => import('@/features/event-handling/pages/EventsPage'));
const HooksPage = lazy(() => import('@/features/hooks-advanced/pages/HooksPage'));
const RouterPage = lazy(() => import('@/features/routing-guide/pages/RouterPage'));
const QuestPage = lazy(() => import('@/features/quest-lab/pages/QuestPage'));
const { RouterDetailPage, RouterSearchPage } = {
  RouterDetailPage: lazy(() => import('@/features/routing-guide/pages/RouterPage').then(m => ({ default: m.RouterDetailPage }))),
  RouterSearchPage: lazy(() => import('@/features/routing-guide/pages/RouterPage').then(m => ({ default: m.RouterSearchPage })))
};
const NotFound = lazy(() => import('@/features/routing-guide/pages/NotFound'));

/**
 * 路由集中化定义
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'jsx', element: <JsxPage /> },
      { path: 'components', element: <ComponentsPage /> },
      { path: 'state', element: <StatePage /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'quest', element: <QuestPage /> },
      { path: 'hooks', element: <HooksPage /> },
      {
        path: 'router',
        element: <RouterPage />,
        children: [
          { path: 'detail/:id', element: <RouterDetailPage /> },
          { path: 'search', element: <RouterSearchPage /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];
