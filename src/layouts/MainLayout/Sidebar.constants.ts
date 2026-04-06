/**
 * 侧边栏导航配置
 */
export const navSections = [
  {
    title: '开始',
    items: [
      { key: 'home', label: '🏠 概览', path: '/' },
    ],
  },
  {
    title: '基础关卡',
    items: [
      { key: 'jsx', label: '📝 JSX 基础', path: '/jsx' },
      { key: 'components', label: '🧩  组件与 Props', path: '/components' },
      { key: 'state', label: '⚡ State 与副作用', path: '/state' },
      { key: 'events', label: '🖱️ 事件处理', path: '/events' },
    ],
  },
  {
    title: '进阶部分',
    items: [
      { key: 'hooks', label: '🪝 Hooks 进阶', path: '/hooks' },
      { key: 'router', label: '🧭 React Router', path: '/router' },
    ],
  },
  {
    title: '闯关实验室',
    items: [
      { key: 'quest', label: '⚔️ 闯关实验室', path: '/quest' },
    ],
  },
];
