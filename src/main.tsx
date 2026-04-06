import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

/**
 * React 18 应用入口
 * 知识点：
 * 1. createRoot - React 18 的新渲染 API（替代 ReactDOM.render）
 * 2. StrictMode - 开发模式下帮助发现潜在问题（双次渲染检测副作用）
 */

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('找不到 #root 挂载节点，请检查 index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
