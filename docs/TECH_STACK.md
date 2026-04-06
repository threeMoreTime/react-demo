# 技术栈版本基准 (Tech Stack Baseline)

本文件记录了 `react-demo` 项目的核心依赖库及其作用版本，确保在任何开发环境下都具有高度的可预测性。

## 核心引擎 (Core Engine)

| 依赖 (Dependency) | 版本 (Version) | 描述 (Description) |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | 基于 Concurrent Mode (并发模式) 的 UI 渲染引擎。 |
| **react-dom** | `^18.3.1` | Web 端渲染器实现。 |
| **Vite** | `^8.0.1` | 基于 ESM 的极速构建工具与开发服务器。 |
| **TypeScript** | `~5.9.3` | 类型强屏障，禁止隐式 any。 |

## UI & 路由 (UI & Routing)

| 依赖 (Dependency) | 版本 (Version) | 描述 (Description) |
| :--- | :--- | :--- |
| **Ant Design (antd)** | `^5.29.3` | 基础 UI 组件库与 Design Token 系统。 |
| **@ant-design/icons** | `^5.6.1` | AntD 官方矢量图标库。 |
| **react-router-dom** | `^7.14.0` | 前端路由管理系统，支持 Data Router 架构。 |

## 开发工具 (Dev Tools)

| 依赖 (Dependency) | 版本 (Version) | 描述 (Description) |
| :--- | :--- | :--- |
| **ESLint** | `^9.39.4` | 代码静态扫描与风格约束。 |
| **@vitejs/plugin-react** | `^6.0.1` | Vite 的官方 React 增强插件。 |

---

> [!IMPORTANT]
> **版本锁定策略**: 本项目使用 `package-lock.json` 或 `pnpm-lock.yaml` (如有) 锁定依赖版本。除非执行重大底层架构升级，否则严禁随意大规模 `npm update`。
