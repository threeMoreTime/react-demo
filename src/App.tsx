import { Suspense } from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme, Spin } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { routes } from '@/routes/config';

/**
 * 路由渲染器组件
 */
const AppRoutes = () => {
  const element = useRoutes(routes);
  return <Suspense fallback={
    <div className="app-suspense-fallback">
      <Spin size="large" tip="加载中…" />
    </div>
  }>
    {element}
  </Suspense>;
};

/**
 * 应用主入口组件
 * 配置：Ant Design 全局主题、国际化、React Router
 */
const App: React.FC = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#8b5cf6',
          colorInfo: '#38bdf8',
          colorSuccess: '#10b981',
          colorWarning: '#fbbf24',
          colorError: '#f87171',
          borderRadius: 10,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          colorBgElevated: 'rgba(15, 18, 25, 0.96)',
          colorBgContainer: 'rgba(15, 18, 25, 0.55)',
          colorBorder: 'rgba(255, 255, 255, 0.08)',
          colorBorderSecondary: 'rgba(255, 255, 255, 0.06)',
          colorText: 'rgba(241, 245, 249, 0.94)',
          colorTextSecondary: 'rgba(148, 163, 184, 0.95)',
          colorTextTertiary: 'rgba(148, 163, 184, 0.65)',
          boxShadowSecondary: '0 12px 40px rgba(0, 0, 0, 0.45)',
        },
        components: {
          Button: {
            primaryShadow: '0 4px 18px rgba(139, 92, 246, 0.4)',
          },
          Card: {
            headerBg: 'transparent',
          },
          Modal: {
            contentBg: 'rgba(15, 18, 25, 0.94)',
            headerBg: 'transparent',
            titleFontSize: 17,
            titleLineHeight: 1.4,
          },
          Tabs: {
            itemColor: 'rgba(255, 255, 255, 0.45)',
            itemSelectedColor: '#c4b5fd',
            inkBarColor: '#8b5cf6',
            titleFontSize: 14,
          },
        },
      }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
