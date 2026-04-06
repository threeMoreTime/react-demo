# 开发规约与工作流 (Development Guide & Workflow)

本文件定义了 `react-demo` 的编码规范建议、Git 提交规约及标准开发生命周期。

## 标准工作流 (Standard Workflow)

1.  **需求分析 (Requirement)**：明确业务意图与其实现的视觉对齐。
2.  **计划起稿 (Plan)**：更新 `docs/` 下受影响的架构文档。
3.  **编码实现 (Code)**：
    *   编写 TypeScript 类型定义。
    *   实现 UI 逻辑与 Hook。
    *   补全组件 README。
4.  **本地预检 (Verify)**：运行 `npm run lint` 确保无代码风格错误。
5.  **提交归档 (Commit)**：按照 Git 提交规约推送至 GitHub。

## 编码约束 (Coding Standards)

### 1. TypeScript & 类型优先
- **禁止使用 `any`**: 所有的 Props 与 State 必须有明确的 `type` 或 `interface`。
- **Props 解构**: 推荐在函数数参中直接解构 `const MyComp: React.FC<Props> = ({ title, children }) => { ... }`。

### 2. React Hooks 准则
- **原子化 Hooks**: 将复杂的状态逻辑从 `Page.tsx` 中抽离到专门的 `hooks/` 目录。
- **副作用隔离**: 所有的网络请求、LocalStorage 操作必须包裹在 `useEffect` 或自定义 Hook 中。

### 3. Git 提交规范 (Commit Specification)
推荐使用 **Emoji + Type: 描述** 的格式。

| 类型 (Type) | 表情 (Emoji) | 说明 (Description) |
| :--- | :--- | :--- |
| **feat** | ✨ | 新增功能、新关卡或新题库。 |
| **fix** | 🐛 | 修复 Bug、样式错位或逻辑死循环。 |
| **docs** | 📝 | 文档更新（如 README 或 docs/*）。 |
| **refactor** | ♻️ | 代码重构，不涉及业务逻辑变更。 |
| **style** | 🎨 | 仅 UI/CSS 样式调整，不涉及逻辑。 |

---

> [!CAUTION]
> **代码鲁棒性**: 在修改 `useQuestEngine` 核心分发逻辑时，必须确保 100 道题的解析逻辑向下兼容。任何破坏性变更必须首先更新 `docs/ARCHITECTURE.md`。
