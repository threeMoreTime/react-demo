import type { Quest } from '../../types';

export const batch4Hooks: Quest[] = [
  {
    id: 36,
    level: 'Level 5',
    title: '焦点的指引 (控制 DOM)',
    concept: '如果要调用 input 的原生 .focus()，必须使用 ref 保留引用通道。',
    vueAnalogy: {
      vueFeature: 'this.$refs.myInput.focus()',
      reactDifference: 'Vue 里会自动把写了 ref 属性的组件收拢到 $refs 里，在 React 里，你必须事前先在上方用 useRef() 占配一块专用的引用存储内存。',
      tips: '千万记住：操作真实 DOM，找 useRef 然后获取它的 .current！',
    },
    codeTemplate: `function AutoFocuser() {
  const inputRef = _______(null);

  useEffect(() => {
    // 挑战：在组件挂载后，使挂载的 DOM 自动高亮获得焦点
    inputRef._______.focus();
  }, []);

  return <input ref={inputRef} />;
}`,
    missingParts: ['useRef', 'current'],
    validationLogic: '熟练掌握从声明占用、引线挂载到执行原生的经典三步曲。',
    explanation: {
      howItWorks: '【答案解析】：填写 `useRef` 及底层解包入口 `current`。',
      deepDive: '【底层逻辑】：`ref` 的本质并不仅是 HTML 的标识。在底层 Reconciliation（协调）过程提交（Commit Phase）到原生 DOM 节点那刻，它通过特殊的回调协议，将浏览器的元素本体的指针，静默传导进了该 Hooks 锁定的 `current` 对象内保存起来。\n【设计初衷】：在不破坏函数无副作用以及数据流驱动的前提下，为一些【必需】调用原始系统接口的需求开出的最后一条缝隙。（比如聚焦控制，媒体播放等）\n【与 Vue 不同】：在 Vue setup 语法下你依然使用强烈的解包规则去绑定。但在 React 这里它并不特殊，仅仅是装载了一个对象的普通容器。\n【实战频率】：极高（100% 当需要对视频操作或画布处理）。',
      conclusion: '即使在构建一切美好的梦境中，我们仍需偶尔去触摸一下这颗真实跳动着的心脏。',
    },
  },
  {
    id: 37,
    level: 'Level 5',
    title: '海潮的汇聚 (自动批处理)',
    concept: '在 React 18 里，不管在哪执行的连续多个 setState 都会被合并打包，最后只重新渲染 1 次。',
    vueAnalogy: {
      vueFeature: '所有的响应式更新都是异步队列更新。',
      reactDifference: 'Vue 自古以来都会利用微任务机制做防抖去重。React 以前如果有事件不在 onClick（如 setTimeout 里面连续触发）会重绘多次。自 18 版本全面向 Vue 这个靠谱的设计看齐，所有的更新通通批处理！',
      tips: '不要指望在两个同步的 setCount 下面会引起两次触发！',
    },
    codeTemplate: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // 挑战：这里有两个相同的设置操作，最终 UI 的 count 显示是多少？
    setCount(1);
    setCount(2);

    // 假设渲染会因此阻塞，这里到底画多少次？（写 '一次' 或 '两次'）
    // console.log("画纸更新了", _______); 
  };
}`,
    missingParts: ['一次'],
    validationLogic: '必须理清楚在异步重绘模型下的渲染轮次合并。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `一次`。不论多少个请求堆叠，都被压缩为一次海量重绘作业。',
      deepDive: '【底层逻辑】：React 18 引入的全新主渲染引擎（Concurrent Mode）。无论这些状态派发是在用户点击里、还是定时器或者 Fetch 的 Ajax .then() 结果回调中触发，只要是在一个连续执行周期的（宏任务/微任务中交卷），React 会把他们加入到 Fiber 任务根上的 Queue 连环记录，等调用栈空了再去真正绘制界面。\n【设计初衷】：为了绝不浪费任何多余哪怕一丁点的计算能力（防重绘风暴，防止出现渲染的半成品状态 Tear）。\n【与 Vue 不同】：两者的归属相似了，都利用了事件循环后的清算。\n【实战频率】：极高隐晦（所有的现代调用默认依赖此机制）。',
      conclusion: '在风暴肆虐降下闪电之前，让所有的祈求与宣泄先行在云图深处沉淀汇聚。',
    },
  },
  {
    id: 38,
    level: 'Level 6',
    title: '懒惰的智者 (惰性初始 State)',
    concept: '有极大计算量（如一万次循环）拿到的结果如果要当做初始 State，必须把计算装进函数里传给 useState。',
    vueAnalogy: {
      vueFeature: '无强烈对照（Setup 只执行一次）',
      reactDifference: '最最最容易被忽视的问题！由于 Setup 就是早期的挂载钩子，你在里面写的计算耗时不会再犯。但在 React 每一次组件更新，你的函数就全部被迫再跑一遍。直接塞运算给 useState() 会导致它虽然最后只拿走初次的结果，但每次都还要在参数区傻傻计算千百次！',
      tips: '看到重度计算、或者调用 `localStorage.getItem`，并且丢进了 `useState(...)`里。赶紧改成 `useState(() => ...)`',
    },
    codeTemplate: `// 极度错误的写法：
// const [data, setData] = useState(calcAThousandTimes());

// 挑战：确保即使重绘千遍，只有第一遍走入耗时的初始化逻辑
const [data, setData] = useState(_______ => calcAThousandTimes());`,
    missingParts: ['()'],
    validationLogic: '将庞大的立即求值过程包裹为只初始化执行的回调函数对象。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `()`。构造一个无参箭头函数（懒评估闭包）。',
      deepDive: '【底层逻辑】：当你写 `useState(huge())` 时，`huge()` 在每次执行该大函数去渲染（无论有无状态更新）时都会在解析参数行时强制计算一次，纵使算出来了 React 在引擎发现这早就有了初始状态从而毫不客气地丢进垃圾桶（浪费 CPU/引发卡顿）。加入箭头变成闭包 `() => huge()`，React 只有在找不到初值时才主动敲定执行拿到返回值。\n【设计初衷】：防止那些本意只想要初始化、结果在函数模型重渲染下惨遭无限压榨计算池。\n【与 Vue 不同】：Vue 没有这一烦恼。\n【实战频率】：高（50% 初始化需要从 Cache 取值的）。',
      conclusion: '将开局前才需要筹备的巨大兵权，安插在被封印着的誓约符咒之中。',
    },
  },
  {
    id: 39,
    level: 'Level 6',
    title: '魔鬼的开口 (HTML 转义与注入)',
    concept: '有时候你需要把带有 `<br>` 或者加粗标签的内容挂载给页面，由于安全防注入被阻碍了，这时需要极其极端的写法。',
    vueAnalogy: {
      vueFeature: 'v-html',
      reactDifference: 'Vue 觉得使用这种写法只要你知道危险就可以。React 觉得必须在 API 让你手写极度恶心恶俗的、又长又危险的名字，来强制敲打你：不安全！',
      tips: '由于必须写成双花括号，初看如同诅咒一样恐怖的拼写 `dangerously`。',
    },
    codeTemplate: `// 挑战：我就是想把带标签的一行原样注入，如何绕开封锁？
function Article({ htmlString }) {
  return <div _______={{ __html: htmlString }} />;
}`,
    missingParts: ['dangerouslySetInnerHTML'],
    validationLogic: '全名不落一个字母敲出这个被设计用来吓唬你的魔法属性。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `dangerouslySetInnerHTML`。',
      deepDive: '【底层逻辑】：React 通过防 XSS（跨站脚本攻击）的设计，任何从外部通过 children 或变量传入的字符串在最终编译构建时遇到 `<` 都会被自动安全转义。要打破保护强制执行 innerHTML 操作，必须在 React Element 对象上使用这个暴露在外的特设通道下发带有 `__html` 的内部指令。\n【设计初衷】：用恶心且警报意味极强的冗长命名，来对抗所有由于想省懒事而暴露出的极其严重的 XSS （跨域钓鱼执行渗透）漏洞代码逻辑。\n【与 Vue 不同】：在 Vue 用个 `v-html="htmlString"` 简直爽翻天。这就导致经常有低阶 Vue 开发者被老板痛骂引发安全漏洞。可以说 React 不仅仅是个框架，他这是在变着法教你软件安全。\n【实战频率】：中低（处理富文本编辑器展示必须使用）。',
      conclusion: '越是锋利越是被涂满毒药的词缀，警醒每一个在深渊前随意招手的探路人。',
    },
  },
  {
    id: 40,
    level: 'Level 7',
    title: '权力的交接 (useReducer 引入)',
    concept: '当你有好多 setState 交织在一起，每次加 1 都要同步减 2 还要记录历史时，你需要把它重构给一个“账房管家”。',
    vueAnalogy: {
      vueFeature: 'Pinia / Vuex',
      reactDifference: 'Vue 里面如果逻辑太繁琐直接呼叫生态或者提走就是；在 React，它的原生自带了类似 Redux 的管理中枢：通过 dispatch（发令弹）去启动。',
      tips: 'useReducer 不是全局状态，它是局部代替 useState 的微型管理大脑。',
    },
    codeTemplate: `// 挑战：使用 dispatch 发出有确定动作和载荷的军令
function Counter() {
  const [state, _______] = useReducer(reducer, { count: 0 });
  return (
    <button onClick={() => _______({ type: 'add' })}>加薪</button>
  );
}`,
    missingParts: ['dispatch', 'dispatch'],
    validationLogic: '必须能明白并打通行动派发命令的核心关键字。',
    explanation: {
      howItWorks: '【答案解析】：两处均为 `dispatch`。这是抛出行动描述、触发机制变更的操作柄。',
      deepDive: '【底层逻辑】：通过抽离状态操作行为到外置的一个 `(state, action) => newState` 纯逻辑函数里（也就是 Reducer 本人），组件内不再维护复杂对象拼凑和多次独立触发的 State。只需派发含有业务意图的数据块集合！这也是一切单向复杂状态机（State Machine）框架运转的最源头本质所在。\n【设计初衷】：隔离出“更新发生了什么逻辑”与“组件发生了怎么变动渲染”。实现极高的业务可测试化（只需拿 Reducer 灌参数即可写单测，不需要挂载 React Dom 组件测试！）。\n【与 Vue 不同】：更像是内嵌自带小红书版 Pinia 。只不过它是局部作用域的。\n【实战频率】：高（当 State 是有深层耦合字段的 Object 时）。',
      conclusion: '不事生产的皇令不再指手画脚，只需要让一纸带着行动特征的派发令飞往掌权中枢便可。',
    },
  },
  {
    id: 41,
    level: 'Level 7',
    title: '时间的纽带 (useCallback 的庇护)',
    concept: '如果你给子孙组件传了一个你写的函数方法。为了防止你在自己组件每次渲染时，这把传给别人的方法全部被系统重新生一个然后让子代大面积被迫重刷的惨案，你要对这个方法加缓存。',
    vueAnalogy: {
      vueFeature: '无需处理（函数永远是这个函数）',
      reactDifference: '由于每次渲染整个 JS 都会全部从头重跑一遍，因此定义的函数对象 `() => {}` 在第一遍和第二遍的内存引用不一样。子组件收到了这玩意，发现和上次“不一样”（虽然功能一样，但引用不是同一个地址），于是子组件被迫重开全套工作。',
      tips: '极度容易过早优化被滥用！！不一定要写这玩意，除非你要搭配 React.memo 一起优化重型子组件。',
    },
    codeTemplate: `// 挑战：将这柄名为 handleSubmit 的巨剑包装成有依赖才会重塑的神技
const handleSubmit = _______((data) => {
  api.send(data, userId);
}, [userId]);`,
    missingParts: ['useCallback'],
    validationLogic: '精确运用专门针对函数体进行依赖包裹与引用于缓冲的 API。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `useCallback`。包装之后它只在依赖发生变动才会产生具备新内存地址的新函数。',
      deepDive: '【底层逻辑】：它就是我们在 5 号关卡接触过的 `useMemo` 提供专门用来包函数的变体。可以说：`useCallback(fn, deps)` 其实本质等同于它哥哥 `useMemo(() => fn, deps)`。\n【设计初衷】：为了在父老乡亲大组件在重新执行、重签发方法时，不要祸及子孙——只要没有变量改变，保证抛给下层的事件处理引用的常态稳定。\n【与 Vue 不同】：这是 React 被无情耻笑和唾弃频率最高的一环。Vue 和 Solid.js 以更加聪慧的颗粒绑定避开了这些反人类的人工制导操作。而在 React 你不得不小心翼翼打补丁。\n【实战频率】：中等。经常出现盲目包裹导致反向拖累性能开销的喜剧。',
      conclusion: '在狂风暴雨的重绘中给它罩上一层屏障——只要锚点还在，风帆永不再展！',
    },
  },
  {
    id: 42,
    level: 'Level 7',
    title: '护城河的补给 (Context 的深层灌注)',
    concept: '如果你要把状态像接力水球一样通过层层组件从爷传到重孙（Props Drilling），赶紧拿个地下水管打通（Context）。',
    vueAnalogy: {
      vueFeature: 'provide / inject',
      reactDifference: '完全是镜像级别的复刻，功能同属“依赖反向注射”系统！',
      tips: '包裹的最外层组件叫 Provider，并且接受的特殊名字一定是 value。',
    },
    codeTemplate: `export const ThemeCtx = React.createContext('light');

function App() {
  // 挑战：作为祖宗组件向全家宣布将要使用此通道并且供给为 dark
  return (
    <ThemeCtx._______ value="dark">
      <MainBoard />
    </ThemeCtx._______>
  );
}`,
    missingParts: ['Provider', 'Provider'],
    validationLogic: '需要完整并成对地掌握上下文通道的最重要供给容器。',
    explanation: {
      howItWorks: '【答案解析】：填写 `Provider` 以及结尾对应的标签对闭合点。',
      deepDive: '【底层逻辑】：React 为所创建的每个独立 Context 在全局分配一个特设的虚拟通道。当 `Provider` 随着树挂载且持有了 `value` 参数变化时，它可以不用经过任何多余的跨层比较、直接向整个通道里下面任意远距离只要挂钩订阅了 `useContext` 的所有接点下发直接触达的强制重渲染！\n【设计初衷】：粉碎跨越过千层属性链下派传递时产生的无意义耦合与冗余，使得黑盒复用成为可能。\n【与 Vue 不同】：在语法上和思潮上可以说在伯仲之间，也是现代重型后台必不可少地跨框架基建组件能力。\n【实战频率】：极高（几乎全部用来存储暗黑主题方案与语言切换等全局不变态）。',
      conclusion: '让浩荡深邃的泉水顺着地底的脉络直接送往最需要的荒原。',
    },
  },
  {
    id: 43,
    level: 'Level 7',
    title: '干涸的受体 (useContext 接引)',
    concept: '与上一题呼应！既然上游已经开启下派传输水箱，我们要利用 Hooks 在深层后代这里取出并装满干涸的变量。',
    vueAnalogy: {
      vueFeature: 'inject("ThemeCtx")',
      reactDifference: '依然高度一致，但这里我们导入的不再是字符串，而是真正的跨文件抛出那颗“实例的星核”给 Hook 处理',
      tips: '只要 Provider 那里一旦有变化，无论你是不是纯组件，甚至不管你父组件更没更新！当前组件全都会被当场更新重绘！',
    },
    codeTemplate: `import { ThemeCtx } from './App';

function DeepChild() {
  // 挑战：获取上方遥远的、被我们建立过的 Provider 所供给的值
  const themeMode = _______(ThemeCtx);
  return <div>当前色调: {themeMode}</div>;
}`,
    missingParts: ['useContext'],
    validationLogic: '必须是作为提取数据的该系列专有 hook 来接收。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `useContext`。',
      deepDive: '【底层逻辑】：这就如同在组件体内建立了一个秘密频道的传呼天线。它直接从自身 Fiber 节点上顺着 React 分配的长链（Context Maps）往上追踪找到距自己同频道最近的一个 `Provider`，如果在树上找不到，就读取当时创建 Context 时赋予的缺省默认值。这是一个性能极强的反向追踪网。\n【设计初衷】：消费端的高度内聚与自由。不需要像过去的 Context Hook 一样要在 JSX 套好几重包裹（类似于老旧版的 `<Consumer>` 嵌套地狱）。\n【实战频率】：高（50%）。常常需要与性能治理一同考察防止雪崩级滥用全量组件强制重绘。',
      conclusion: '拔剑向天吸取无边之造化，你永远不知天外天供给着多浩瀚的恩泽。',
    },
  },
  {
    id: 44,
    level: 'Level 8',
    title: '不坏的金身 (React.memo)',
    concept: '想要隔绝这波及无数组件因为他们的顶头上司重新渲染从而波及无故的子组件一并被株连刷新的惨案？使用金刚罩把它封死！',
    vueAnalogy: {
      vueFeature: 'Vue自动优化阻隔机制（深层依赖对比追踪）',
      reactDifference: 'Vue 因为太清醒了，知道这个子组件确实没变所以不会做刷新传导。React 由于太笨，只要父级刷就会导致全部向下子组件被牵连！这个时候它必须得包一层防弹衣进行浅拷贝对抗。',
      tips: '只能阻挡 Props 被变更引起的触发。对于里面的内部 State 以及 Hook (Context等突变)引起的刷新依然是管不了防不住的。',
    },
    codeTemplate: `function HeavyTable(props) { /* 一万行巨大的列渲染 */ }
// 挑战：让其只在所给它的外部 props 存在真实差异变动时才重跑一次内部的复杂巨大逻辑。
export default React._______(HeavyTable);`,
    missingParts: ['memo'],
    validationLogic: '在高频触发且结构笨重的纯净组件（Pure Component）上运用阻断装甲。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `memo`。被它作为高阶函数重重包裹的组件，才拥有真正不崩如山的属性。',
      deepDive: '【底层逻辑】：`memo` 劫持了包裹在其内部的虚拟组件被派生往下协调（Reconciliation）的门禁闸机。每当即将被重新生成 DOM 前夕，防卫队启动 `Object.is` (底层是浅层遍历所有属性字段浅等进行极简速效校验算法)——如果传下的所有 props 内存表现分毫不差，直接原封不动还给你抛出之前保存过的渲染快照作为本次的提交节点。\n【设计初衷】：最极致、最直观的通过拦截比对牺牲一点微量比较损耗、去置换极度昂贵内部组件计算渲染开销的空间转换！\n【与 Vue 不同】：Vue 的模板编译系统自动能对各种插值边界处理得到类似结果，因此用不着这种刻意包装！这也是为什么写烂 React 比写烂 Vue 容易得多的终极原因。\n【实战频率】：中等。常见图表、重型长列表和动画组件边缘封装。',
      conclusion: '在惊涛骇浪无休止向下传导的瀑布洪流中，用金库之锁封闭最静谧悠长深远的宫殿。',
    },
  },
  {
    id: 45,
    level: 'Level 8',
    title: '沉睡的引用 (延迟渲染的闭包与 Refs 重造)',
    concept: '当你在副作用的回调中拿到的不是最新结果？这可能是闭包造成的缓存陷阱，如果你不想被挂起，也可以使用最原始的操作跨过时空通讯。',
    vueAnalogy: {
      vueFeature: '解包或侦听追踪',
      reactDifference: '如果有个防抖或者倒计时的 Hook 引用了旧的值，React 就再也没有途径拿到新内容了，除非使用重新设置整个钩子或者 Refs 大法。',
      tips: '为了能保证随时拿到最外侧随时变更但又不想干扰执行轮次的最新值，要经常写个特权通道获取最新镜像！',
    },
    codeTemplate: `function Msg(props) {
  const latestMessage = useRef(props.msg);

  // 挑战：确保在下面发报前的这几毫秒即使外界属性大改也能永远缓存目前拿到的最新属性
  useEffect(() => {
    latestMessage._______ = props.msg;
  });

  return null;
}`,
    missingParts: ['current'],
    validationLogic: '必须能娴熟运用在无依赖的纯同步或者 Effect 体中向外部传递真实引用快照。',
    explanation: {
      howItWorks: '【答案解析】：填写 `current`。这是为了在每一次任意重入或改变引起该函数经过的时候强制覆盖更新。',
      deepDive: '【底层逻辑】：在没有填入第二个依赖项数组参数下的 `useEffect` 是每一轮渲染循环必会被执行到底的任务触发器。通过这种特质作为桥梁，保证了无论如何渲染引擎发生了多少轮替换交迭，总会有一份被即时塞入进稳定脱离 React 这个生命流转体控制的、永远处于同一块内存原矿指针即（该组件的 `useRef` 保险柜）！这就叫 “最新值镜像追踪 （Latest Ref Pattern）”。\n【设计初衷】：打败为了依赖注入而依赖的魔咒，是高级并发交互、拖拽和超时异步任务必学神技。\n【实战频率】：较高（30% 高阶组件和自定义包制作使用）。',
      conclusion: '你跑得再快又如何？在终点站把最新的那一份永远存入唯一的信箱，你就在任何闭包结界中都能开启全知视界。',
    },
  },
];
