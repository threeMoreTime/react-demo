# 部署与生产环境指南 (Deployment & Production)

本文件规定了 `react-demo` 项目从开发环境到生产环境的交付流程。

## 构建流程 (Build Workflow)

### 1. 本地执行 (Local Build)
```bash
npm run build
```
- **产物**: 将在 `dist/` 目录下生成静态资产。
- **预检**: 自动运行 `tsc` 类型检查。

### 2. 环境变量 (Env Config)
- **VITE_API_URL**: 生产环境接口基址。
- **VITE_APP_BASE**: 如果部署在 GitHub 子路径（例如 `/react-demo/`），必须在 Vite 中配置。

## 托管平台 (Hosting)

### 1. GitHub Pages
- **自动 CI**: 建议在 `.github/workflows/deploy.yml` 建立自动化推送。
- **配置**: `vite.config.ts` 中的 `base: '/react-demo/'`。

### 2. Vercel / Netlify
- **零配置**: 直接关联仓库，Vite 默认即可完美支持。

---

> [!CAUTION]
> **缓存清理 (Cache Purge)**: 在批量更新 100 题的大版本上线后，若使用 CDN，必须执行 `invalidate` 清理以便用户侧获取最新的 `batch_x.ts` 题库。
