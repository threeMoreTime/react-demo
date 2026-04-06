# ⚛️ React 核心进阶：闯关升级宝典 (React Mastery Quest)

欢迎来到 `react-demo` 实验室！本手册不仅是项目规范，更是你从 React 菜鸟进化为架构师的**互动闯关指南**。

---

## 📂 第一章：现代架构与别名 (The Fortress)

在开始战斗前，请确保你已经熟悉我们重构后的城堡布局。

### 1.1 项目地图
- **`@/`**：指向 `src/` 目录的快捷传送阵。
- **`@/features/`**：核心战区，按功能分包（内含 Pages/Hooks/Types）。
- **`@/layouts/`**：城堡框架，负责页面整体结构。
- **`@/routes/`**：传送门中心，管理所有页面跳转。

### 1.2 战备规范
1. **单一职责**：一个文件只做一件事。
2. **禁止 Any**：TypeScript 的盔甲必须全覆盖。
3. **不可变状态**：永远不要直接修改 `state`，请使用更新函数。

---

## 🎮 第二章：React 18 闯关之路 (The Quest)

每一关都包含**心法**、**挑战**与**复盘**。建议你在 `src/features/` 下创建临时的 `PracticePage.tsx` 来运行这些代码。

### 🛡️ 第一关：JSX 幻境 (Mirror of JSX)

**📜 核心心法**：
JSX 本质上是 `React.createElement` 的语法糖。React 最终会把 JSX 变成一棵 **Virtual DOM 树**（普通的 JS 对象）。

**⚔️ 破阵挑战**：
请修复以下代码中的两个致命错误，并解释为什么。
```tsx
// 你的挑战代码
return (
  <h1 className="title">欢迎</h1>
  <p>开始你的 React 之旅</p>
  <input type="text" class="input-box">
)
```

**🧘 战后复盘（深入浅出）**：
1. **根元素限制**：为什么必须有一个根元素？因为函数只能返回一个值。React 在生成 Virtual DOM 时，需要一棵树的起始节点。你可以使用 `<></>` (Fragment) 来避免多余的 DOM 节点。
2. **属性命名**：为什么是 `className`？因为 JSX 最终是 JS，而 `class` 是 JS 的关键词。
3. **闭合标签**：所有的标签（包括 `<input />`）都必须闭合，否则解析器会迷路。

---

### 🗡️ 第二关：Props 契约 (The Prop Covenant)

**📜 核心心法**：
Props 是组件间通信的**契约**。数据流是**单向**的：从父到子，严禁子组件私自反向修改父组件传递的 Props。

**⚔️ 破阵挑战（填空）**：
在子组件中，我们想点击按钮修改父组件的状态。请填空：
```tsx
// 父组件
const Parent = () => {
  const [count, setCount] = useState(0);
  return <Child count={count} _________={() => setCount(count + 1)} />;
}

// 子组件
const Child = ({ count, _________ }) => (
  <button onClick={_________}>当前计数为 {count}</button>
)
```

**🧘 战后复盘（深入浅出）**：
*   **单向数据流**：React 就像一条单行道，数据向下流动，变更请求向上发送（通过回调函数）。这种模式让数据流向清晰，调试时你只需要关注“状态源”在哪里被修改。

---

### 🧪 第三关：State 炼金 (Alchemy of State)

**📜 核心心法**：
State 是组件的**记忆**。它是异步更新的，且具有“快照”特性。

**⚔️ 破阵挑战（逻辑推演）**：
点击一次按钮后，控制台打印的 `count` 是多少？界面显示的 `count` 是多少？
```tsx
const [count, setCount] = useState(0);
const handleClick = () => {
  setCount(count + 1);
  console.log(count);
  setCount(count + 1);
};
```

**🧘 战后复盘（深入浅出）**：
*   **快照机制**：在同一个渲染周期内，`count` 的值是固定的（本例中永远是 0）。点击时，React 安排了一次重新渲染。
*   **异步更新**：`setCount` 并不会立刻改变变量，而是通知 React：“HI，下次渲染请把 count 变成 1”。
*   **批量更新 (Batching)**：React 18 会自动把多次状态修改合并为一次渲染，防止性能浪费。

---

### 🌊 第四关：Effect 潮汐 (Tides of Effects)

**📜 核心心法**：
`useEffect` 是同步 Virtual DOM 到外部系统的**同步器**。它的清理函数（Cleanup）是防止内存泄漏的唯一保险。

**⚔️ 破阵挑战（找 Bug）**：
以下代码每秒会创建一个新的定时器，但从不清理。请修复它。
```tsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  // 缺失的部分：如何停止潮汐？
}, []);
```

**🧘 战后复盘（深入浅出）**：
*   **依赖数组的真相**：`[]` 表示只在挂载时运行一次。如果不传任何数组，则每次渲染都运行。
*   **清理函数**：当组件卸载或依赖项改变前，React 会运行返回的函数。就像离开房间要关灯一样。

---

### 👑 第五关：Hooks 传承 (The Hook Inheritance)

**📜 核心心法**：
Hooks 允许你在不编写 Class 的情况下使用状态。高手的境界是编写**自定义 Hook**，实现逻辑的极致复用。

**⚔️ 任务**：
请去查看项目中的 `src/features/hooks-advanced/pages/HooksPage.tsx`，那里演示了如何将状态逻辑封装。

---

## 🔮 终极真理：Fiber 调和算法 (The Hidden Secret)

为什么 React 这么快？
React 内部有一套叫 **Fiber** 的系统。它把“更新 UI”这件事变成了可中断的小任务。
1. **Render 阶段**：计算哪些地方变了（在内存中进行，非常快）。
2. **Commit 阶段**：一次性把变化画到真正的网页上（操作真实的 DOM）。

> [!IMPORTANT]
> **闯关结语**：
> 不要试图操作 DOM，要试图管理**状态 (State)**。你定义了状态，UI 就会像影子一样随之而动。
