import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { navSections } from './Sidebar.constants';
import { useState } from 'react';

/**
 * 侧边栏组件
 * 演示知识点：NavLink 活动状态、列表渲染、组件拆分
 */
export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 默认全部关闭，且仅保存当前展开的一个父级菜单的标题
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // 监听路由变化（仅渲染期间派生更新），自动联动展开当前标签所在的父级菜单
  const currentPath = location.pathname;
  const activeSection = navSections.find(section => 
    section.items.some(item => item.path === currentPath)
  );
  if (activeSection && expandedSection !== activeSection.title) {
    setExpandedSection(activeSection.title);
  }

  const toggleSection = (section: typeof navSections[0]) => {
    const title = section.title;
    
    setExpandedSection(prev => {
      // 如果点击的是当前已展开的，则将其关闭
      if (prev === title) {
        return null;
      }
      
      // 如果点击的是未展开的，且该菜单有子菜单，则自动跳转到对应的第一个子菜单，并展开该项
      if (section.items.length > 0) {
        navigate(section.items[0].path);
      }
      return title;
    });
  };

  return (
    <aside className="app-sidebar">
      {/* Logo 区域 */}
      <div className="sidebar-header">
        <NavLink to="/" className="sidebar-logo">
          <div className="sidebar-logo-icon">⚛️</div>
          <div className="sidebar-logo-text">
            <h1>React 实验室</h1>
            <p>React 18 + Ant Design 5</p>
          </div>
        </NavLink>
      </div>

      {/* 导航菜单 */}
      <nav className="sidebar-nav">
        {navSections.map((section) => {
          const isExpanded = expandedSection === section.title;
          return (
            <div key={section.title}>
              <div 
                className="nav-section-title"
                onClick={() => toggleSection(section)}
              >
                <span>{section.title}</span>
                <span className={`nav-section-arrow ${isExpanded ? 'expanded' : ''}`}>▶</span>
              </div>
              <div className={`nav-section-content ${isExpanded ? 'expanded' : ''}`}>
                <div className="nav-section-inner">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.key}
                      to={item.path}
                      end={item.path === '/'}
                      className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                      <span className="nav-item-icon">{item.label.slice(0, 2)}</span>
                      <span>{item.label.slice(2).trim()}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {/* 底部信息 */}
      <div
        style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: 11,
          color: 'var(--text-muted)',
          lineHeight: 1.8,
        }}
      >
        <div>📖 技术栈：React 18 + TypeScript</div>
        <div>🎨 组件库：Ant Design 5</div>
        <div>⚡ 构建工具：Vite</div>
      </div>
    </aside>
  );
};
