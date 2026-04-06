import type { Quest } from '../../types';

export const batch2State: Quest[] = [
  {
    id: 16,
    level: 'Level 4',
    title: '异步的幻象 (State 的批处理)',
    concept: 'setState 调用后，紧接着打印 state 是拿不到最新值的，因为它被送入了更新队列。',
    vueAnalogy: {
      vueFeature: 'nextTick ($nextTick)',
      reactDifference: 'Vue 中改了变量虽不能立刻看到 DOM 更新，但变量本身是立刻变了的；React 里调用 setState 后，当前函数上下文的 state 变量完全没变！',
      tips: '如果你需要用更新后的值去做下一步计算，必须在 useEffect 里监听，或者直接用局部变量算好再 setCount。',
    },
    codeTemplate: `const [count, setCount] = useState(0);
const handleClick = () => {
  setCount(count + 1);
  // 挑战：此时如果打印 count，会输出什么？
  console.log(_______); // 填入你认为打印出的数字或变量原来的状态名
};`,
    missingParts: ['count'],
    validationLogic: '正确理解当前闭包中的变量。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `count`，或者说是原来未加 1 的值。',
      deepDive: '【底层逻辑】：React 状态更新是异步批处理（Batching）的。`setCount` 只是向 Fiber 树发出了一个“下次渲染时请把 count 变成 count+1”的安全指令。而且，`const count` 是通过 `const` 声明的闭包常量，在当前这轮运行的函数体内，它的值永远不可能被突变。\n【设计初衷】：保持渲染的一致性和性能。如果每次 setState 都立刻阻塞重绘，UI 将卡顿不堪。\n【与 Vue 不同】：Vue 的响应式变量是可变的（Mutable），`count.value++` 立刻改变了值本身。React 则坚持不可变（Immutable）原则。\n【实战频率】：极高（100% 踩坑）。',
      conclusion: '过去的无法被改变，未来在下一次渲染时才会降临。',
    },
  },
  {
    id: 17,
    level: 'Level 4',
    title: '初生的啼哭 (useEffect 的空依赖)',
    concept: '如果 `useEffect` 第二个参数传一个空数组 `[]`，它就只会在组件首次挂载时跑一次。',
    vueAnalogy: {
      vueFeature: 'onMounted',
      reactDifference: 'Vue 专门为了挂载做了一个生命周期钩子；React 则是在通过副作用同步外部系统的视角下，要求你声明“我不依赖任何状态，所以不需要再同步了”。',
      tips: '最常见的 API 请求发起点。',
    },
    codeTemplate: `// 挑战：补充依赖数组，让获取用户数据的逻辑只在初始进入页面时执行一次
useEffect(() => {
  fetchUserData();
}, _______);`,
    missingParts: ['[]'],
    validationLogic: '必须是空数组，代表没有任何依赖会导致重新执行。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `[]`（空数组）。',
      deepDive: '【底层逻辑】：React 在由于 State 或 Props 改变引发重渲染时，会比对上一次 Effect 的依赖数组。如果是 `[]`，它找不到哪怕一个发生变化的值，于是判定“副作用依然符合当前世界线”，从而跳过执行。\n【设计初衷】：一切都是围绕数据流同步的逻辑推演，并没有特殊创造“生命周期事件”。\n【与 Vue 不同】：Vue 严格区分生命周期（挂载，更新，卸载）。React 认为一切皆为副作用的聚合。\n【实战频率】：极高（95%）。\n【常用范式】：用于拉取首页网络数据，绑定只认一次的全局事件监听。',
      conclusion: '没有羁绊便不会重来，空数组是唯一的一次性契约。',
    },
  },
  {
    id: 18,
    level: 'Level 4',
    title: '离去的背影 (useEffect 的清除函数)',
    concept: '在 Effect 中 `return` 一个函数，会在组件卸载或下一次 Effect 运行前执行。',
    vueAnalogy: {
      vueFeature: 'onBeforeUnmount',
      reactDifference: 'Vue 有专门的销毁钩子；React 直接在 Effect 里返回函数作为扫尾工作，将“订阅与解绑”的逻辑放在了同一个大括号内，极其内聚。',
      tips: '只要有 addEventListener 就肯定要写 removeEventListener！如果忘写，内存爆掉是迟早的事。',
    },
    codeTemplate: `useEffect(() => {
  window.addEventListener('resize', handleResize);
  // 挑战：确保组件消失时也能安全地解绑事件
  _______ () => window.removeEventListener('resize', handleResize);
}, []);`,
    missingParts: ['return'],
    validationLogic: '返回一个函数作为清理钩子。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `return`。',
      deepDive: '【底层逻辑】：React 将每次渲染执行的 Effect 返回的值（如果是一个函数的话）暂存。在下次同样的 Effect 执行前，或者组件彻底从 DOM 树卸载时，它会先呼叫存起来的这个清理函数。如果带依赖项，它在每一次重新绑定前都会先解绑上一次的。\n【设计初衷】：关注点分离 (Separation of Concerns)。不再像 Class 组件那样，在 componentDidMount 绑定，却在远离了一百多行的 componentWillUnmount 里解绑。\n【与 Vue 不同】：Vue3 在 watch 中也引入了类似 `onCleanup` 机制，这受到了 React 非常好的影响。\n【实战频率】：高（70%）。\n【常用范式】：定时器的清除、WebSocket 的主动断开。',
      conclusion: '有始必有终，自己的乱摊子必须在 return 中自己收拾。',
    },
  },
  {
    id: 19,
    level: 'Level 5',
    title: '绝对的领域 (不能被包裹的 Hook)',
    concept: 'Hook 必须在顶层被调用，绝对不能放在 `if`、`for` 里面。',
    vueAnalogy: {
      vueFeature: '无限制',
      reactDifference: 'Vue 的 Setup 里虽然也建议顶层，但其实有些组合式 API 是可以写在条件里的；React 绝对不行，一写就崩溃！',
      tips: '千万别说“只有管理员才去调 useAdminData()”，React 看到代码结构变幻莫测会直接报错。',
    },
    codeTemplate: `// 挑战：修正这个错误！把必须调用的钩子提到最安全的地方。
function App({ isVIP }) {
  _______(isVIP) {
    // 假设本来里面有个 const data = useData(); 
  }
}`,
    missingParts: ['if'],
    validationLogic: '明确识别引发 React 致命错误的条件分支关键词。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `if`。在任何流控制语句中使用 useXxx 都是毁灭性的。',
      deepDive: '【底层逻辑】：我们在第 4 题讲过，Hooks 的身份是靠“顺序索引”辨认的。假设第一次渲染有 1,2,3 号 Hook，如果加了 `if (true)` 跑出个第 4 号 Hook，下次渲染由于 `if (false)` 没跑，React 的内部指针就对应不上了，就会报出恶心的 “Rendered more hooks than during the previous render” 错误。\n【设计初衷】：极致去中心化的代价。用顺序来标识状态是最不需要用户干预也是最快的数据结构机制。\n【与 Vue 不同】：这点上 Vue 的底层响应式显然更加包容与鲁棒。\n【实战频率】：较高（新手极易犯错）。\n【常用范式】：不要尝试去按需加载 Hook。遇到条件分支，可以直接提取为独立的小组件，在独立组件的顶层去调用它！',
      conclusion: '命运的齿轮不能跳过哪怕一环，所有的 Hook 都在队列中等候检阅。',
    },
  },
  {
    id: 20,
    level: 'Level 5',
    title: '对象的传承 (展开运算符)',
    concept: '更新对象类型的状态时，不能只写要改的那个字段，必须把其他的属性全部“抄”过来！',
    vueAnalogy: {
      vueFeature: 'user.age = 20',
      reactDifference: 'Vue 里对象的一个属性改变，响应式系统能感知到；React 你要传一个只含 age 的小对象给 setUser，连 user.name 都会当场消失！',
      tips: '这是新手极容易被惊吓的地方：只改一处，其余全丢。',
    },
    codeTemplate: `const [user, setUser] = useState({ name: 'Alice', age: 19 });
const birthday = () => {
  // 挑战：安全地将岁数加 1，且不能让 name 消失
  setUser(prev => ({ _______prev, age: prev.age + 1 }));
};`,
    missingParts: ['...'],
    validationLogic: '必须熟练掌握 ES6 Spread 展开运算符来合并前置状态。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `...`。也就是展开运算符。',
      deepDive: '【底层逻辑】：React 的 `setState` 是单纯的“整体替换 (Replace)”策略，而不是“深度合并 (Merge)”策略（但在很久以前的 Class 组件里，this.setState 确实是合并的）。为了实现不突变 (Immutable) 的更新，必须使用 `{ ...prev, newField: val }` 创造一个拥有不同内存地址的全新大对象传入。\n【设计初衷】：强制使用者用全新对象打破引用相等（`user === newUser // false`），从而最高效地触发整个子组件树的浅比较更新机制。\n【与 Vue 不同】：这种繁琐的语法就是 React 放弃深层 Getter/Setter 拦截所必须付出的“手写 Immutable 仪式”。\n【实战频率】：极高（100%）。\n【常用范式】：如果不喜欢写 `...`，可以引入 Immutable 库或非常流行的 `Immer.js`。',
      conclusion: '如果你不拥抱全部的过去，你创造的未来也只是个残次品。',
    },
  },
  {
    id: 21,
    level: 'Level 5',
    title: '数组的禁忌 (禁止 push/splice)',
    concept: '不要向状态数组执行 `push`, `pop`, `splice`，因为它们是在原地修改这个数组！',
    vueAnalogy: {
      vueFeature: 'list.push(item)',
      reactDifference: 'Vue 重写了数组的 7 个变异方法，你可以随便 push；React 严格要求你生成并返回一个全新的数组。',
      tips: '在 React 看到有人写 push，你应该立刻制止他！用扩展运算符 `[...list, item]` 才正确！',
    },
    codeTemplate: `const [todos, setTodos] = useState(['学习 React']);
const addTodo = (task) => {
  // 挑战：不用 push，如何在列表末尾添加元素？
  setTodos(_______ => [..._______, task]);
};`,
    missingParts: ['prev', 'prev'],
    validationLogic: '必须获取最新的 prev，并解构。',
    explanation: {
      howItWorks: '【答案解析】：填写 `prev`。结合外层就是 `prev => [...prev, task]`。',
      deepDive: '【底层逻辑】：如果你调用 `list.push(item)` 然后传入 `setTodos(list)`，React 在内部对 `旧list === 新list` 进行比较，发现内存地址一致，它会认为“什么都没变”，从而直接抛弃这次渲染任务，你的页面像死了一样一动不动。\n【设计初衷】：依然是为了通过极低成本的内存地址浅对比（Shallow Compare）来判断树结构是否发生了变化。\n【与 Vue 不同】：Vue 的开发者最初学 React 时最容易掉进这个陷阱，感觉自己怎么写页面都不变。\n【实战频率】：极高（100%）。\n【常用范式】：新增用 `[...prev, new]`，删除用 `prev.filter()`，修改用 `prev.map()`。',
      conclusion: '绝不要触碰事物的原貌，复制它、重塑它、然后取代它。',
    },
  },
  {
    id: 22,
    level: 'Level 6',
    title: '影子特工 (useRef 保存变量)',
    concept: '如果你想存储一个随时可以修改的值，并且不希望它触发重新渲染，请使用 `useRef`。',
    vueAnalogy: {
      vueFeature: '普通 let 变量（不可响应式）或直接附加在 this 上的属性',
      reactDifference: 'React 如果用普通 `let` 变量，每次函数组件渲染都会被重置为初值。要跨越渲染周期偷偷存东西必须装进 ref.current。',
      tips: '存定时器 ID 的极佳场所。',
    },
    codeTemplate: `// 挑战：声明一个不会触发页面抖动的计时器引用
const timerRef = _______(null);
const start = () => {
  timerRef._______ = setInterval(() => console.log('Ticking'), 1000);
};`,
    missingParts: ['useRef', 'current'],
    validationLogic: '理解 useRef 可用来作为内部游离状态的保险柜。',
    explanation: {
      howItWorks: '【答案解析】：填写 `useRef` 和 `current`。这是引用箱子的专用存取路径。',
      deepDive: '【底层逻辑】：`useRef` 在底层其实完全等价于 `useState({ current: initialValue })[0]`。它就是一个永远拥有相同引用地址的 JavaScript 普通对象。改 `current` 就像是在一个固定的内存地址往里塞东西，React 没有去监听它，因此也不会引起重绘。\n【设计初衷】：提供一个逃生舱 (Escape Hatch)。当我们需要和外部原生 API（如计时器、IntersectionObserver）交互时，并不需要驱动 UI 层改变的变量空间。\n【与 Vue 不同】：不可搞混！Vue 里的 `ref()` 是创造【强响应式】核心数据的王者；在 React 里 `useRef()` 恰恰是创造【非响应式】隐藏数据的潜行者！\n【实战频率】：高（70%）。',
      conclusion: '不是所有的数据都需要登台亮相，有的只是在幕后默默掌舵。',
    },
  },
  {
    id: 23,
    level: 'Level 6',
    title: '实体的触手 (useRef 获取 DOM)',
    concept: '当你想直接抓取真实的 DOM 元素或子组件实例，也是把它挂载到标签的 ref 属性上。',
    vueAnalogy: {
      vueFeature: 'ref="myInput" + this.$refs.myInput',
      reactDifference: '在 Vue 是通过字符串获取；React 里需要你先声明一个 useRef，然后再传递给标签当作“容器”。',
      tips: '常用于焦点聚集（focus）、滚动条操作（scrollTop）和集成第三方图表库（ECharts）。',
    },
    codeTemplate: `const inputRef = useRef(null);
// 挑战：将该 input 和刚创建的盒子链接，方便后续调用 inputRef.current.focus()
return <input _______={inputRef} />;`,
    missingParts: ['ref'],
    validationLogic: '知道如何在 JSX 中将 React 引用钩到原生 DOM 上。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `ref`，这是 React 赋予内部引用的特殊保留属性。',
      deepDive: '【底层逻辑】：在提交渲染（Commit Phase）完成后，也就是原生 DOM 节点真正被创建出来的那一刻，React 会将这个真实的 DOM 元素塞进你提供的 `inputRef` 对象的 `.current` 属性中。\n【设计初衷】：保留一条操作真实 DOM 的通道。但官方建议是：尽量声明式地操控 UI，不到万不得已不要命令式地调用原生 API。\n【与 Vue 不同】：用法上非常相似，但 React 你必须显式地预先通过 hook 宣告引用的存在。\n【实战频率】：中等（60%）。\n【常用范式】：通常是在 `useEffect` 中取到它进行初始化比如 `echarts.init(chartRef.current)`。',
      conclusion: '这根细线穿透了虚拟世界的迷雾，真切地锚定了物理世界的原石。',
    },
  },
  {
    id: 24,
    level: 'Level 6',
    title: '同步的幻影 (useLayoutEffect)',
    concept: '想在屏幕画出图像前“拦截”微调样式，要用 useLayoutEffect 防闪烁。',
    vueAnalogy: {
      vueFeature: '无直接对应 (可类比为更早的 updated 之前同步微调)',
      reactDifference: 'useEffect 是在屏幕画出来（Paint）之后才“异步”去执行的；如果不巧你想修改 DOM 长宽，用户就会看到一次闪烁。',
      tips: '绝大部分情况用 useEffect 就够了。除非你发现某些 DOM 操作让屏幕闪闪烁烁晃眼睛。',
    },
    codeTemplate: `// 挑战：使用确保在浏览器绘制前同步执行的副作用神技
_______(() => {
  // 测量弹窗的真实高度并挪动位置，防止弹窗出界
  measureAndMove();
}, []);`,
    missingParts: ['useLayoutEffect'],
    validationLogic: '分清不同运行相位的场景运用。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `useLayoutEffect`。',
      deepDive: '【底层逻辑】：React 在把虚拟 DOM 更新到真实 DOM 树之后，此时浏览器引擎还需要消耗一点点时间去计算样式并真正在屏幕的像素里绘制（Paint）。`useEffect` 是延后在绘制后执行的。而 `useLayoutEffect` 是在修改完 DOM 后、并且【阻塞浏览器绘制】的情况下同步调用的。\n【设计初衷】：给予一次在视觉定稿前调整布局尺寸的补救机会。\n【与 Vue 不同】：Vue 没有把这两块分的这么细。这也是 React 刻薄追求性能后不得已分出来的两口锅。\n【实战频率】：极少（<5%）。几乎只在开发复杂 UI 类库比如自己写个 DatePicker 弹窗的时候用。\n【常用范式】：如果你不知道选哪个，就用 useEffect。',
      conclusion: '在光影定格的那一刹那之前，所有的筹谋都必须同步闭环。',
    },
  },
  {
    id: 25,
    level: 'Level 7',
    title: '模块的炼金术 (自定义 Hook)',
    concept: '如果把一大堆带了状态的逻辑包裹在一个 `use` 开头的普通函数里，你就拥有了可复用的魔法。',
    vueAnalogy: {
      vueFeature: 'Composables (useXxx) 在 Vue3 中极具威名',
      reactDifference: 'Vue3 吸收并发扬了这种理念；React 是首创者，利用“调用同位置等同状态提取”在组件间共享非 UI 逻辑。',
      tips: '如果你觉得一个组件超过 200 行很恶心，第一件事就是把它的 useEffect 拔出去扔进自定义 Hook。',
    },
    codeTemplate: `// 挑战：声明一个必须以 use 开头的标准功能函数，获取窗体大小
function _______WindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => { /* do resizing */ }, []);
  return size;
}

// 在任何组件中直接使用
// const [w, h] = useWindowSize();`,
    missingParts: ['use'],
    validationLogic: '遵守 Linter 强制约定的 Hook 命名规范。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `use`。自定义 Hook 必须且永远以 `use` 作为头前缀。',
      deepDive: '【底层逻辑】：这不仅是代码风格规定，这也是 Linter 强制的规则扫描边界。React 团队开发的 eslint-plugin-react-hooks 会去扫描所有名为 `useXxx` 的函数体内部，以确保里面嵌套调用的 Hooks 也遵守顶层调用、依赖无缺漏的法则！如果你随口起名叫 `getWindowSize`，内部写了 useState 就会直接报错或者静默出 Bug！\n【设计初衷】：剥离业务纯逻辑和组件树描述逻辑。\n【与 Vue 不同】：Vue3 的 composables 不限制非叫 `use` 前缀（虽然共识也是如此），但在 React 这是带了强类型约束色彩的纪律。\n【实战频率】：极高（架构级必需 100%）。\n【常用范式】：典型的有 `useFetch`, `useDebounce`, `useLocalStorage`。甚至催生了 ahaoks, target 等等库。',
      conclusion: '复用的不只是这几行代码，而是复用了整个 React 严密的心智模型。',
    },
  },
];
