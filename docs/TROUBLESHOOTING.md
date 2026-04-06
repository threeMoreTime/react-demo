# 故障排查与常见问题 (Troubleshooting & FAQ)

本文件归纳了在开发 `React Quest Laboratory` 时可能遇到的常见技术难题及其标准解决方案，旨在缩短排错耗时。

## 1. 题库解析语法错误 (Syntax Errors in Batches)

### 问题表现
在 `batch_x.ts` 中填入 `explanation` 或 `concept` 后，前端页面白屏或 Vite 报错 `Unterminated string constant`。

### 根源分析
由于这些字段经常包含单引号（如 `Don't`）或双引号，若使用传统的单/双引号包裹字符串，会导致字符串提前截断。

### 解决方案
- **强制规范**: 所有长文本字段（`concept`, `vueAnalogy`, `explanation`）必须使用 **反引号 (Template Literals ` `)** 包裹。
- **转义**: 若必须在反引号内使用反引号，请使用 `\`` 进行转义。

---

## 2. 样式覆盖难题 (CSS Overriding)

### 问题表现
想要修改 Ant Design 的 `Modal` 背景为毛玻璃效果，但设置了 `background` 却被 AntD 内部样式覆盖。

### 解决方案
- **层级提升**: 在 `LevelMapModal.css` 中使用 `.quest-map-modal .ant-modal-content` 这种高权重选择器。
- **强制声明**: 必要时在 CSS 属性后加上 `!important`，因为 AntD 5.x 使用了 CSS-in-JS，某些动态生成的内联样式权重极高。

---

## 3. 状态同步延迟 (State Sync Lag)

### 问题表现
调用 `goToLevel(id)` 后，立即读取 `currentQuest` 发现还是旧的题目。

### 根源分析
React 的 `useState` 是异步更新的。`useQuestEngine` 中的 `currentQuest` 是基于 `state.currentLevel` 计算出来的依赖值，它会在下一轮渲染周期才计算出最新值。

### 解决方案
- **逻辑习惯**: 避免在同一个同步代码块中修改等级并立即消费“最新题目内容”。
- **监听更新**: 若必须在题目变动后执行逻辑，请在 `Page` 组件中使用 `useEffect` 监听 `currentQuest.id` 的变化。

---

## 4. 开发环境进度重置 (Resetting Progress)

### 问题表现
想要从第 1 关重新测试流程，但页面由于 `localStorage` 的存在始终停留在第 100 关。

### 解决方案
在浏览器控制台执行以下命令并刷新：
```javascript
localStorage.removeItem('react_quest_progress');
location.reload();
```

---

> [!WARNING]
> **Git 权限问题**: 若在 `git push` 时提示 `credential-manager-core` 缺失或权限拒绝，请检查本地 Git 是否正确安装了 GitHub CLI 或确认 SSH Key 已添加。建议使用生成的 `GH Token` 作为临时认证手段。
