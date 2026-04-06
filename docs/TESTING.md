# 测试策略与规约 (Testing Strategy & QA)

本文件规定了 `react-demo` 项目的质量保障路径。虽然目前已存在 100 个手动关卡，但为了工程长久演进，必须预留自动化测试槽位。

## 技术选型 (Tech Stack)

| 层级 (Layer) | 工具 (Tool) | 目的 (Purpose) |
| :--- | :--- | :--- |
| **单元测试** | `Vitest` | 测试 `useQuestEngine` 逻辑分发。 |
| **组件测试** | `React Testing Library` | 测试 `ComparisonCard` 渲染是否正确。 |
| **端到端测试** | `Playwright` | 模拟用户从 Level 1 到 Level 100 的闯关路径闭环。 |

## 编写准则 (Writing Rules)

### 1. 业务逻辑 (Hook Test)
- **要求**: 所有的 `useQuestEngine` 更新必须覆盖其状态迁移逻辑测例。
- **示例**: 测试输入正确答案 -> `isCorrect` 为 `true` -> `completedLevels` 增加。

### 2. UI 渲染 (Component Test)
- **要求**: 测试组件由于 Props 变更引起的快照 (Snapshot) 变化。
- **视觉回归 (Visual Regression)**: 针对“星海地图”的 Modal 开启状态建立 Baseline。

---

> [!CAUTION]
> **题库校验中断**: 在批量更新 `batch_x.ts` 题库时，若由于 JSON 拼写错误导致题库解析失败，必须立刻运行测试用例进行熔断中断，严禁将损坏的题库推送至主分支。
