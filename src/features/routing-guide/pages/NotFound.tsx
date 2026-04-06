import { NavLink } from 'react-router-dom';

/**
 * 404 页面组件
 */
const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: 80 }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
      <h2 style={{ color: 'var(--text-primary)', fontSize: 24 }}>404 - 页面未找到</h2>
      <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>
        这个页面不存在，请检查 URL 或返回首页
      </p>
      <NavLink to="/">
        <button
          style={{
            marginTop: 24,
            padding: '8px 24px',
            background: 'var(--gradient-primary)',
            border: 'none',
            borderRadius: 8,
            color: '#fff',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          返回首页
        </button>
      </NavLink>
    </div>
  );
};

export default NotFound;
