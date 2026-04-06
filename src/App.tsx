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
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0c' }}>
      <Spin size="large" tip="加载中..." />
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
          colorPrimary: '#6366f1',
          borderRadius: 8,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
