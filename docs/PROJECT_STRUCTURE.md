# 项目目录结构 (Project Structure & Hierarchy)

本文件定义了 `react-demo` 的目录职责分布。所有开发者与 AI 模型必须严格遵循此结构，不得随意建立顶层文件夹。

## 全景目录树 (Directory Tree)

```text
react-demo/
├── docs/                 # 项目真理文档库 (本项目之生命线)
├── src/
│   ├── assets/           # 静态资源 (图片、字体、全局样式)
│   ├── components/
│   │   └── common/       # 原子化、无业务逻辑的公共 UI 组件
│   ├── features/         # 核心业务功能模块 (内聚设计)
│   │   └── quest-lab/    # 闯关实验室功能区 (主体功能)
│   │       ├── components/ # 该功能专用的复杂业务组件
│   │       ├── hooks/      # 业务逻辑 Hook (useQuestEngine)
│   │       ├── pages/      # 业务页面入口
│   │       └── constants/  # 常量定义与分片题库数据
│   ├── layouts/          # 全局页面框架布局 (Sidebar, Header)
│   ├── routes/           # 路由配置中心 (react-router v7)
│   ├── types/            # 全局 TypeScript 契约与类型定义
│   └── main.tsx          # 应用启动入口 (ReactDOM Render)
├── index.html            # 页面宿主
├── vite.config.ts        # 打包配置
└── package.json          # 依赖管理
```

## 职责边界 (Responsibilities)

### 1. `src/features/` (业务核心)
- **定义**: 每一个业务功能应当是一个独立的闭环目录。
- **约束**: 严禁将业务逻辑代码直接写在根目录的 `components/` 中。

### 2. `src/components/common/` (公共组件库)
- **定义**: 仅存放与业务完全解耦的 UI 原子组件。
- **文档**: 每个复杂公共组件必须包含 `README.md`。

### 3. `src/types/` (契约中心)
- **定义**: 所有的核心数据接口 (Data Interface) 必须在此定义。
- **原则**: 逻辑层应优先通过 Import 这里的类型来驱动编写。

---

> [!TIP]
> **AI 建议**: 在寻求 AI 帮助重构代码时，请先让其阅读此文档，确保其产生的代码片段位于正确的职责目录下。
