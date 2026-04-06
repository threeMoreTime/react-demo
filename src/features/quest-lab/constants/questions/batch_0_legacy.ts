import type { Quest } from '../../types';

export const batch0Legacy: Quest[] = [
  {
    id: 1,
    level: 'Level 1',
    title: '快照的觉醒 (Snapshots vs Proxy)',
    concept: 'React 状态更新不是响应式的，而是“快照”式的。每次渲染都有自己的 Props 和 State。',
    vueAnalogy: {
      vueFeature: 'ref / reactive (Proxy 自动响应)',
      reactDifference: 'Vue 像是在物品上装了感应器，改了就动；React 则是通过“重新拍照”来更新画面。',
      tips: '在 React 里，你改了变量，页面不会动。你必须调用 setCount 告诉 React：请用新数据帮我重新拍张照片。',
    },
    codeTemplate: `const [count, setCount] = useState(0);
const handleClick = () => {
  // 挑战：如何正确地在当前基础上加 1？
  setCount(_______ => _______ + 1);
};`,
    missingParts: ['prev', 'prev'],
    validationLogic: '必须使用函数式更新，确保拿到的是最新状态。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `prev`。在 `setCount` 的参数函数中，React 会把“当前内存中最真实的状态”作为参数传入。它代表了上一次状态演算的结果。',
      deepDive: '【底层逻辑】：React 18 会将所有 `setCount` 放入一个“更新队列 (Update Queue)”。如果你直接传递数值，它们会覆盖彼此；但如果你传递函数，React 会按照 FIFO (先入先出) 顺序运行这些函数，确保逻辑是连续叠加的。\n【设计初衷】：为了追求“纯粹性 (Purity)”。React 认为数据不应该被“隐式修改”，而应该被“显式替换”。这让调试和时间旅行 (Time Travel) 变得极度容易。\n【与 Vue 不同】：Vue 基于 Proxy 拦截，你执行 `count++` 时 Vue 自动通知 DOM 更新。React 则需要你手动提交变更请求并生成新的虚拟 DOM 树。\n【实战频率】：极高（95%）。只要你的新状态依赖于旧状态，就必须用这种方式。\n【常用范式】：`setCount(c => c + 1)` 是 React 开发的绝对标准写法。',
      conclusion: '状态不是变量，而是数据的快照；函数式更新是确保快照连续性的金钥匙。',
    },
  },
  {
    id: 2,
    level: 'Level 2',
    title: '契约 of 受控 (Controlled vs v-model)',
    concept: '在 React 里，输入框里的字不是由键盘决定的，而是由 State（状态）决定的。',
    vueAnalogy: {
      vueFeature: 'v-model (双向绑定)',
      reactDifference: 'Vue 中 v-model 自动完成了“监听键盘”和“同步变量”；React 则需要手动闭环。',
      tips: '如果你只写 value={state} 而不写 onChange，你会发现输入框一个字都打不进去！',
    },
    codeTemplate: `<input 
  value={value} 
  _______={(e) => setValue(e.target._______)} 
/>`,
    missingParts: ['onChange', 'value'],
    validationLogic: '受控组件意味着数据流必须是一个完整的圆圈。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `onChange` 和 `value`。它们分别代表了“监听变更”的协定和“绑定数值”的契约。',
      deepDive: '【底层逻辑】：当你输入时，React 实际上拦截了原生输入，触发事件后修改 State，再根据新 State 重新渲染 Input。如果中间你没写 setValue，React 重新渲染时 Input 的值依然是旧的，所以看起来“打不动字”。\n【设计初衷】：为了追求“单一事实来源 (Single Source of Truth)”。React 希望数据的出口和入口都在 JavaScript 精确控制下，而不是交给不可控的 DOM 节点。\n【与 Vue 不同】：Vue 的 `v-model` 是语法糖，底层依然是 `value + input` 事件。但在 React 中，这种“麻烦”的写法是强制的，因为它给了你 100% 的劫持控制力（如：限制输入大写）。\n【实战频率】：极高（100%）。React 开发中 99% 的表单都是受控的。\n【常用范式】：推荐将 `onChange` 抽离，或结合 `React Hook Form` 自动管理。',
      conclusion: '数据从状态流向 UI，事件从 UI 流回状态，形成闭环。',
    },
  },
  {
    id: 3,
    level: 'Level 3',
    title: '闭包的枷锁 (The Closure Trap)',
    concept: 'useEffect 就像一个录制现场，它在运行的那一刻录下了当时的所有变量环境。',
    vueAnalogy: {
      vueFeature: 'watch / onMounted',
      reactDifference: 'Vue 的监听器总是盯着最新的值；React 的 useEffect 像是一个独立的快照任务。',
      tips: '如果你发现定时器里打印的值永远不更新，那就是你忘了告诉 useEffect：如果有新值请重新录制。',
    },
    codeTemplate: `useEffect(() => {
  const timer = setInterval(() => console.log(count), 1000);
  return () => _______(timer);
}, [_______]);`,
    missingParts: ['clearInterval', 'count'],
    validationLogic: '必须包含清除逻辑，且依赖项必须完整。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `clearInterval` 和 `count`。前者代表了对旧副作用的销毁，后者代表了副作用重启动的触发阈值。',
      deepDive: '【底层逻辑】：React 会在清理相位 (Cleanup Phase) 执行 `return` 回调。如果不清理，堆内存中会残留无数个定时器。如果不写依赖项，Effect 内部逻辑会因为“闭包”永久锁定在它创建时的那一秒。\n【设计初衷】：为了并发安全。React 可以在任何时候中断并重启渲染，所以必须有一种机制（依赖数组）明确告知哪些外部系统需要同步。\n【与 Vue 不同】：Vue 的 `watch` 会自动追踪依赖，你不需要手动写 `[count]`。React 则要求开发者作为“第一责任人”显式声明，这防止了隐式更新带来的性能灾难。\n【实战频率】：极高（90%）。涉及 `WebSocket`, `Interval`, `EventListener` 必用。\n【常用范式】：对于定时逻辑，通常封装为 `useInterval` 等 Custom Hooks。',
      conclusion: '依赖数组不是优化提示，它是对外部同步逻辑的诚实声明。',
    },
  },
  {
    id: 4,
    level: 'Level 4',
    title: '逻辑的传承 (Hooks Rules)',
    concept: 'React 就像一个按索引拿药的自动药盒，如果顺序乱了，药就吃错了。',
    vueAnalogy: {
      vueFeature: 'Composition API (setup)',
      reactDifference: 'Vue 基于变量引用；React 基于“执行顺序链表”确定 Hook 身份。',
      tips: '千万别在 if 或者 for 循环里写 useXxxx，React 会直接罢工！',
    },
    codeTemplate: `// ❌ 错误做法：在条件中调用
if (isLoggedIn) {
  _______(user);
}
// ✅ 正确做法：总是顶层调用`,
    missingParts: ['useContext'],
    validationLogic: '每一个 Hook 在每次渲染时的执行顺序必须完全一致。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `useContext`。它代表了跨越组件树层级获取全局上下文信息的动作。',
      deepDive: '【底层逻辑】：React 内部使用【单向链表】顺序存储 Hooks。如果 `isLoggedIn` 为 false 导致跳过 Hook，指针就会错位，导致第 3 个 Hook 误领第 2 个 Hook 的状态。这会引发不可预知的 UI 崩溃。\n【设计初衷】：极致的性能与确定性。React 不需要像 Vue 这样通过 Proxy 建立昂贵的双向订阅树，只要保证执行顺序，它就能以极低成本找回状态。\n【与 Vue 不同】：Vue 的组合式函数可以稍微自由一些（如在循环内），因为 Vue 能够识别响应式对象的本体。React 则必须依赖“位置”来识别。\n【实战频率】：高（80%）。不仅是 useContext，还包括所有以 use 开头的函数。\n【常用范式】：所有的 Hooks 必须且只能写在组件的最顶部。',
      conclusion: '顺序就是生命线，顶层调用是铁律。',
    },
  },
  {
    id: 5,
    level: 'Level 5',
    title: '性能的权杖 (Memo vs Computed)',
    concept: 'React 默认是全量重新渲染。防止昂贵的计算需要手动启用“备忘录”。',
    vueAnalogy: {
      vueFeature: 'computed (计算属性)',
      reactDifference: 'Vue 自动执行计算属性缓存；React 必须开发者手动声明 useMemo。',
      tips: '只有真的有计算压力（如处理上万条数据）时才用，不要随处乱用。',
    },
    codeTemplate: `const list = _______(() => {
  return data.filter(item => item.active);
}, [_______]);`,
    missingParts: ['useMemo', 'data'],
    validationLogic: '只有当数据源 data 真正变化时，才会重新运行过滤逻辑。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `useMemo` 和 `data`。它代表了“记忆化”包装和其触发重新计算的依赖键。',
      deepDive: '【底层逻辑】：React 将计算结果存储在 Fiber 节点的 `memoizedState` 中。如果 `Object.is` 对比依赖项发现一致，则直接跳过函数执行。这在重渲染频率极高的 React 应用中非常有效。\n【设计初衷】：控制权转让。React 认为复杂的计算开销应该由开发者主动感知并治理，而不是由引擎尝试黑盒猜测。\n【与 Vue 不同】：Vue 基于响应式依赖追踪实现自动缓存，这非常智能；React 开发者则需要显式声明，这虽然增加了代码量，但使性能分析（Profiler）变得极度清晰。\n【实战频率】：中等（50%）。常用于大数据过滤、格式转换或为了保持引用相等（以便传给 React.memo 子组件）。\n【常用范式】：针对计算量 > 1ms 或涉及复杂引用对比的场景使用。',
      conclusion: '缓存是空间换时间的交易，只应在性能瓶颈上挥动权杖。',
    },
  },
];
