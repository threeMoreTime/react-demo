import type { Quest } from '../../types';

export const batch5AdvancedComp: Quest[] = [
  {
    id: 46,
    level: 'Level 8',
    title: '传送魔法阵 (React Portals)',
    concept: '当你想渲染一个全屏的 Modal 弹窗时，为了防止被父级的 CSS `overflow: hidden` 截断，你必须把它传送到最外层的 DOM 节点上去。',
    vueAnalogy: {
      vueFeature: '<Teleport to="body">',
      reactDifference: 'Vue3 也内置了几乎同名的传送门。在 React 里它不是一个普通标签，也是通过 ReactDOM 这个专门用于 Web 的渲染器提供的一种指令方法 API。',
      tips: '极度推荐用来处理 `z-index` 层叠上下文破损的绝望抓包情况。',
    },
    codeTemplate: `import { createPortal } from 'react-dom';

function Modal({ children }) {
  // 挑战：将这块 UI 传送到页面尽头的 body 元素下
  return _______(
    <div className="modal">{children}</div>,
    document._______
  );
}`,
    missingParts: ['createPortal', 'body'],
    validationLogic: '必须能掌握调用由 DOM 渲染器层发出的特殊逃生舱调用。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `createPortal` 与 `body`。',
      deepDive: '【底层逻辑】：`createPortal` 产生的对象依然完全在 React 虚拟光树的管理之下！这意味着即使这块 DOM 实际上被瞬间移动到了千里之外的 `body` 标签下，它的事件冒泡依然能够传导回原本这棵 React 树所在的祖宗节点内，并且上级的 Context 全都可以完好无损地渗透。它是真正的维度传送魔法。\n【设计初衷】：用于那些在 CSS 布局上必须脱离常规文档流，但在业务状态和事件响应上又必须和源组件保持同步血脉（受控）的极端场景（气泡，弹窗，右键菜单）。\n【与 Vue 不同】：Vue 提供的是语义化的组件标签，而 React 坚持认为把东西塞进 DOM 这是不跨端的特定操作，所以放在了 `react-dom` 包下。\n【实战频率】：高（如果在做通用组件或中后台弹窗体系）。',
      conclusion: '肉体被流放至天涯海角，但灵魂仍紧密维系在于本源的羁绊。',
    },
  },
  {
    id: 47,
    level: 'Level 8',
    title: '不落的防线 (Error Boundary)',
    concept: '组件里报错如果不接住，会把整个前端页面搞白屏！这就要派上兜底防线。',
    vueAnalogy: {
      vueFeature: 'onErrorCaptured 生命周期',
      reactDifference: 'Vue 把这个当做系统周期的一环；而 React 不允许你用 Hook 或者普通组件实现它！目前整个 React 唯二只能用老旧的 Class Component 语法写的功能就是 Error Boundary（另一处是 getSnapshotBeforeUpdate）。',
      tips: '如果你的项目突然白屏，那就是某个偏远的子组件没有处理数组为空的情况抛了错，而外层没有套 Boundary！',
    },
    codeTemplate: `// 这是一个典型的容错拦截守卫器设计（目前必须用 class）
class ErrorBoundary extends React.Component {
  // 挑战：识别下面哪个特定的静态生命周期能截获下一代报出的错误？
  static _______(error) {
    // 根据错误准备下一次返回渲染的状态降级UI
    return { hasError: true };
  }
}`,
    missingParts: ['getDerivedStateFromError'],
    validationLogic: '在浩如烟海的历史遗留中找出专门抓取错误信息的核心魔法方法。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `getDerivedStateFromError`。',
      deepDive: '【底层逻辑】：React 在进行协调比对渲染下属层级时（Render Phase），如果检测到了由 JS 层抛出的任何 Error，它会直接打断整个渲染管线并将错误沿虚 DOM 冒泡！一旦遇到实现了这个方法的父边界组件，它就会向其喂入 Error，并将截获的备用 State 返回以便能够在此次打断后立刻降级绘制出一张比如“服务器开小差”的错误图纸。\n【设计初衷】：坚决抵制带着被破坏、污损的状态强行渲染，如果出了错，宁可白屏也绝不要显示不确切的数据。\n【与 Vue 不同】：在 Vue 里大家习惯挂载个全局捕捉或者甚至不鸟他，由于视图和响应式各自独立有时报错也还能用。而在 React 报错意味着整个渲染执行链崩盘。\n【实战频率】：中低（只需在全局写一个，再也用不到第二次。大多用第三方库 react-error-boundary）。',
      conclusion: '牺牲局部的溃烂以阻断蔓延的毒火，它是镇守边疆的最后执念。',
    },
  },
  {
    id: 48,
    level: 'Level 8',
    title: '穿越的面纱 (Render Props 模式)',
    concept: '想要复用逻辑，除了自定义 Hook 还怎么搞？直接把带逻辑状态的对象扔进父组件给的函数的肚子里！',
    vueAnalogy: {
      vueFeature: '作用域插槽 (Scoped Slots) <slot :user="user">',
      reactDifference: '这正是对应的高级进阶语法！在 Vue 是特定的插槽传值机制；在 React 这只是极其朴素的高阶函数思想：子组件渲染时去主动呼叫一次从外边拿来的 Render Props 方法。',
      tips: '它是非常经典的复用模式，常用于渲染各种携带数据翻转变幻的动画表单包装。',
    },
    codeTemplate: `function MouseTracker({ render }) {
  const [pos, setPos] = useState({x: 0, y: 0});
  // ...监听鼠标的极繁琐逻辑...
  // 挑战：如何利用这些底层坐标抛给外面由他们决定画什么？
  return _______(pos);
}

// 外面使用：<MouseTracker render={({x,y}) => <img x={x}/> } />`,
    missingParts: ['render'],
    validationLogic: '理解从外部接受函数并通过内部实参将权力转交。',
    explanation: {
      howItWorks: '【答案解析】：填写传入的 `render`。并且把参数加进去调用。',
      deepDive: '【底层逻辑】：这是一种【反转控制 (Inversion of Control)】。平时我们是父级拿到数据往下丢，在这里是子级掌握了密级数据的生杀大权（鼠标坐标），但是它不知道自己长啥样，于是它强制要求父级传入一个画图机器（函数回调），然后在底层强行驱动渲染并回传数据。\n【设计初衷】：在没有用 Hooks 前的混沌时代拯救那些不知道该如何抽取局部复用生命周期组件的人。\n【与 Vue 不同】：作用域插槽是非常难以弄懂的模板语法门槛，而 Render Props 就是最直白的一句话：“请给我一个具有绘制能力的带参闭包函数”。\n【实战频率】：偶尔用到（60% 被 Custom Hook 的优良风气卷没了，剩下 40% 用于复杂渲染列表项定制）。',
      conclusion: '将我的血肉躯干作为染料供你提取，你才是真正执笔绘世的画师。',
    },
  },
  {
    id: 49,
    level: 'Level 9',
    title: '权柄的移交 (forwardRef 透传)',
    concept: '刚才我们讲了如何操作组件直接拿到 Ref。糟糕的是，如果你用的不是原生 div，自己封装了一个 MyInput 小组件，默认从外面挂的 Ref 根本落不到底下的实体里！。',
    vueAnalogy: {
      vueFeature: 'defineExpose',
      reactDifference: 'Vue 3 在 Setup 语法中完全封装黑盒，只通过抛口暴露特定的引用方法；React 默认不穿透 Ref 防止内部重构时外面乱调，需要专门动用代理高阶 API 把请求引线硬塞进去。',
      tips: '当你试图用 ref 调你自己组件的一个暴露动作却报不可用错时，必定是少了它！',
    },
    codeTemplate: `// 挑战：包裹下面这个组件使得它有了接驳引线的资质口！
const MyInput = React._______((props, ref) => {
  return <input {...props} ref={_______} />;
});`,
    missingParts: ['forwardRef', 'ref'],
    validationLogic: '必须记住如何开辟破壁传输的高阶组件通道。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `forwardRef` 及其参数 `ref`。',
      deepDive: '【底层逻辑】：React 规定 `ref` 和 `key` 一样是无法直接进入 `props` 成为组件入参的魔力保留字。既然拿不到就没办法挂载！所以 `forwardRef` 这层外骨骼的作用就是在渲染接驳时强制拦截到外面的引用凭证，并且以破天荒的【第二个独立参数】投递进了你的常规小组件中。\n【设计初衷】：组件应该是完全解耦的实现封装（信息隐藏）。除非极度清晰地表示“我愿意公开我的内部腹地并承受风险”，否则 React 会将这种霸王硬上弓的操作毫不留情地拦截在外。\n【与 Vue 不同】：心智一致。为了防止外面滥用你导致你组件以后根本不敢改底层，双方都选用了刻意声明公开才允许暴露的模式。\n【实战频率】：极高（封装全宇宙任何 UI 组件库只要有输入框弹窗必备）。',
      conclusion: '开启这一道不可逆的法门，将所有的柔软内脏公之于众受人指点。',
    },
  },
  {
    id: 50,
    level: 'Level 9',
    title: '剪切的王冠 (useImperativeHandle)',
    concept: '上一关你通过 forwardRef 把里面的物理长枪全盘暴露给了前线，可是，这样就没有安全控制权了！万一调用方乱操作咋办？',
    vueAnalogy: {
      vueFeature: 'defineExpose 传递对象',
      reactDifference: '如果说上一个是把所有的控制权都交出，那这个钩子就是精确制导：我只把那些我觉得能公之于众的方法（比如 focus）传出去，别的什么换颜色、改底层数据死也不从。',
      tips: '这也就是常常配合上面的 forwardRef 打掩护的一等密级杀手。',
    },
    codeTemplate: `const MagicBox = forwardRef((props, ref) => {
  const internalRef = useRef();

  // 挑战：仅向外界授予打开箱子这个受限的能力
  _______(ref, () => {
    return {
      open: () => internalRef.current.style.display = 'block'
    };
  }, []);

  return <div ref={internalRef} style={{display: 'none'}}>金条</div>;
});`,
    missingParts: ['useImperativeHandle'],
    validationLogic: '运用最长最拗口（帝王级命令控制句）去裁剪 Ref 接口表。',
    explanation: {
      howItWorks: '【答案解析】：答案是极其拗口的 `useImperativeHandle`。',
      deepDive: '【底层逻辑】：将原有的由外层传入并且本身只是用于容纳 DOM 节点的 Ref 对象强行截留，不再将底层实体现行塞给它！而是将经过这段 Hook 自定义的、拥有特殊定制方法（如 open、close）包裹的模拟实例映射挂载回引用池中。也就是，别人拿到的已经是你重新伪造过的代理替身。\n【设计初衷】：为了贯彻“命令式（Imperative）”调用是罪恶的主旨，这个 API 取这个巨长的名字就是告诉你非迫不得已千万别拿它去封装。\n【与 Vue 不同】：在 Vue 里 `defineExpose({ open })` 就是这玩意，简直短且香。React 这里纯纯为了警告不提倡设计。\n【实战频率】：一般（20% 做极高层级抽象封装的组件如 Video 播放器库必须使用）。',
      conclusion: '帝国的权杖就算交出，也必是带上了沉重的锁链和精心编制的伪装。',
    },
  },
  {
    id: 51,
    level: 'Level 5',
    title: '启航的站台 (React Router - 插槽挂载)',
    concept: '开始进入生态。如何在匹配到了不同 URL 时直接将需要渲染的核心视图挂在指定地点？',
    vueAnalogy: {
      vueFeature: '<router-view />',
      reactDifference: '几乎同源同宗。你在应用最高处包好了体系规划后，必须在下层提供一个专门迎接动态装载的大洞。',
      tips: '在 React Router v6 里，它叫这个名字。如果你升级后原视图不见了，那肯定是你用错标签漏插了。',
    },
    codeTemplate: `import { _______ } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav>导航栏恒定</nav>
      {/* 挑战：为所有经过路由匹配派生下来的子级组件预留出展示港湾 */}
      <_______ />
    </div>
  );
}`,
    missingParts: ['Outlet', 'Outlet'],
    validationLogic: '必须是代表出水口和嵌套层出口的保留字标签',
    explanation: {
      howItWorks: '【答案解析】：答案是 `Outlet`。',
      deepDive: '【底层逻辑】：React Router v6 基于极度优化的底层嵌套路由（Nested Routes）算法构建。当最上面的 `RouterProvider` 解析了比如 `/home/settings` 这个地址时并且发现在 `HomeLayout` 这一层有个 `Outlet`，它就会像插入洋葱芯一样把内部对应的组件顺延放进入这个挖好的空间。\n【设计初衷】：嵌套复用体系使得路由配置像画树状图一样简单。\n【与 Vue 不同】：完全抄袭或者可以说与 Vue Router / Angular Router 的演进路线达成了空前的共识，也就是路由视图投射（Router View）。\n【实战频率】：极高（只要用单页面应用 SPA 的都是必经之路）。',
      conclusion: '这是通往内部所有千层世界的唯一深渊洞穴出口。',
    },
  },
  {
    id: 52,
    level: 'Level 5',
    title: '飞驰的车辙 (useNavigate 改辙换轨)',
    concept: '以前大家通过 history 库进行跳转，现在都被强制洗盘换成了超级直观的导航函数！',
    vueAnalogy: {
      vueFeature: 'useRouter().push()',
      reactDifference: '在 React Router 里，为了贴近浏览器原生的 pushState，直接在调出来的函数上传目标字符串即可发车。',
      tips: '不要再在旧项目里找 match.props.history 这种上古化石了。',
    },
    codeTemplate: `import { _______ } from 'react-router-dom';

function Button() {
  const navigate = _______();

  return (
    // 挑战：点击以后马上跳到 "/login" 并且要求不能有后退记录（替换当前页）
    <button onClick={() => navigate('/login', { _______: true })}>
      立刻登出
    </button>
  );
}`,
    missingParts: ['useNavigate', 'useNavigate', 'replace'],
    validationLogic: '全面运用目前占据最主流的编程式导航操作。',
    explanation: {
      howItWorks: '【答案解析】：答案是导入的 `useNavigate` ，并在底层替换中使用 `{ replace: true }`。',
      deepDive: '【底层逻辑】：拿到并调用这个钩子，它去联系隐匿在上空的路由中转核心（Context 仓库），下发一道指令，引发整体的全局大刷新。而带上 `replace: true` 是底层调用了 `window.history.replaceState` 防止将这次后腿操作强压进执行栈而使得用户在登录和首页之间死循环无法后退脱困。\n【设计初衷】：拥抱 Hooks 化，去掉繁重的 withRouter 高阶复用层，这使得页面干净且具有直接调用权。\n【与 Vue 不同】：在使用感觉上一样，只不过 Vue 分为了 Router（拿配置发车权）与 Route（看当前信息的仪盘表），React 则是直接派出一个司机 `navigate` 带着你跑。\n【实战频率】：100%。',
      conclusion: '手握方向盘直接决定通往深渊还是坦途的单向列车。',
    },
  },
  {
    id: 53,
    level: 'Level 6',
    title: '搜查官的网兜 (useParams 切割)',
    concept: '如何获取路由定义 `/user/:userId` 时用户传进而来的那些奇形怪状的参数？',
    vueAnalogy: {
      vueFeature: 'useRoute().params',
      reactDifference: 'Vue 里所有的当前信息全部塞在了一个超大对象里供你随便查；React Router 选择打散它们，获取专门的 params 请调专门的钩子。',
      tips: '不要和 query search 乱组，这一定是冒号 `:` 后面的那种长尾内容。',
    },
    codeTemplate: `import { _______ } from 'react-router-dom';

function UserDetail() {
  // 挑战：因为外部路由配的是 path="/users/:userId"
  // 这里请直接把它解构抓拿出来
  const { _______ } = _______();
  
  return <div>你正在偷窥的用户 ID： {userId}</div>;
}`,
    missingParts: ['useParams', 'userId', 'useParams'],
    validationLogic: '熟练从匹配分段式路由地址的末尾解析器拿到参数。',
    explanation: {
      howItWorks: '【答案解析】：填写导入调用 `useParams` 并且解构出我们要抓的 `userId`。',
      deepDive: '【底层逻辑】：当 URL 从 `https://.../users/580` 刷入时，路由匹配树会在比对模式字串 `/users/:userId` 期间做正则拆解。切开的内容被妥投到了这一层的 Context 中。使用 useParams 时就是将这部分专属的、与上一层路由节点发生反应断臂的碎块直接奉献给你。\n【设计初衷】：精准打击与拆解获取。它极大鼓励你按照资源模型 (RESTful) 的思考来构建所有的页面。\n【与 Vue 不同】：无差别级心智，都遵循相同的前端路由发展共鸣。\n【实战频率】：极高（只要带有动态匹配加载单项页面 100%）。',
      conclusion: '顺藤摸瓜，不管怎么变幻隐匿都从那切碎的信息流里一把将其攥出。',
    },
  },
  {
    id: 54,
    level: 'Level 9',
    title: '进化的减法 (Zustand 的觉醒)',
    concept: '如果 Redux 是臃肿的庞然巨兽，每次更新还要写 Action, Type, Dispatchers；那么 Zustand 无疑就是最锋利简洁的武士刀。这也是当今 React 中小生态不可不学的显学！',
    vueAnalogy: {
      vueFeature: 'Pinia',
      reactDifference: '两者极度相似。Pinia 洗刷了老旧 Vuex 的繁杂，而 Zustand 杀死了 Redux 的啰嗦，直接开创了通过创造极简 Hook 就打通全局的可怕境界。',
      tips: '没有 Provider，不需要你在外层包圈圈！哪里想用，就直接用它的 Hook！',
    },
    codeTemplate: `import { _______ } from 'zustand';

// 挑战：使用最新最狂热的大杀器去构建一个没有枷锁的神仙级全局仓库
const useBearStore = _______((set) => ({
  bears: 0,
  increase: () => _______(state => ({ bears: state.bears + 1 }))
}));

// 组件内： const bears = useBearStore(state => state.bears);`,
    missingParts: ['create', 'create', 'set'],
    validationLogic: '拥抱目前全世界最流行的轻量级全局状态管辖工具的基本骨架构建范式。',
    explanation: {
      howItWorks: '【答案解析】：答案是导入并调用 `create` 创造中心。用内置 `set` 去发号施令改变状态本身。',
      deepDive: '【底层逻辑】：Zustand 极具颠覆性的没有借用 React 的 Context！（这会导致海量重渲染问题而且嵌套无底洞）它的底层是在内存建立了一个发布订阅（Pub/Sub）的主闭包区域，并在每个组件获取并解构出值的时候（`selector` 模式）通过在组件层面打入专门的更新机制，借此只在有变化时以最高效的细粒度引发组件定点单独刷新（利用 useSyncExternalStore 控制引擎）。\n【设计初衷】：不要高射炮打蚊子（Redux），也不要因为极度耦合的 Provider 陷入卡顿。要最轻、最爽的极客手感。\n【与 Vue 不同】：这正是 Pinia 打碎 Vuex 枷锁时的感受。Zustand 是 React 开发世界一次华丽的反叛。\n【实战频率】：不断攀升极高（甚至已经取代 Redux 登顶中小型项目的霸主）。',
      conclusion: '大道至简，打破神庙上盘根错节的虚假繁荣偶像，回归原始却最直接致命的一击。',
    },
  },
  {
    id: 55,
    level: 'Level 6',
    title: '组件的隐形面具 (HOC 高阶组件)',
    concept: '当有三个页面都要加访问鉴权，你会怎么办？你可以用一个函数把它吃进去，再吐出一个检查过权限的新页面。',
    vueAnalogy: {
      vueFeature: 'Mixins（被抛弃） / Vue 组件的高阶包装 (相对更少用因为有指令可以做到)',
      reactDifference: '在 React 里没有这种所谓的权限系统与鉴权守卫钩子，所有的切面功能都是利用把组件当做普通变量进行拼合重造生成的黑科技。',
      tips: '它的名字首字母大写，接收一个组件变量，同时一定要把自己接收到的 props 原样展开给被包的孩儿们！',
    },
    codeTemplate: `// 挑战：创建一个能强制阻断、进行鉴权的防护衣
function withAuth(_______) {
  return function ProtectedPage(props) {
    if (!GlobalAuthToken) return <Login />;
    // 必须要将这件盔甲穿到原有的人身上，别漏了传下属于他的刀剑。
    return <_______ {..._______} />;
  }
}`,
    missingParts: ['Component', 'Component', 'props'],
    validationLogic: '必须能运用 HOC 高阶包裹的进阶抽象，并且不漏解构最底层入参数据链。',
    explanation: {
      howItWorks: '【答案解析】：填写用于接受被包本体的代理变量 `Component` 和原封包装的属性群 `props`（配合 `...` 完成透穿）。',
      deepDive: '【底层逻辑】：函数即一切，那么组件既然是个函数，它就可以作为参数发进另一个函数深造并重构。这正是纯正数学意义上的高阶函数！外层的工厂组件被 React 进行调度时承担了第一线的安全或者日志等拦截截断，只要外挂校验不发下挂载指令，那么底下的本体组件连生成被提交的可能性甚至都化为了泡影。\n【设计初衷】：最复古但生命力极其恐怖的增强性模式（在 Redux 连接的 connect 中发扬光大）。\n【与 Vue 不同】：被 Vue 指令、Mixin、Provider各种特性打散了使用范围。但在极其遵循原教旨主义的 React 世界中它始终是不可置灭的设计模式天花板之一。\n【实战频率】：随心而动（渐渐被 Custom Hooks 取代拦截了部分用武之地）。',
      conclusion: '吞噬旧的星辰，用冰冷的黑洞重塑其运行的法则，最后引下全新的黎明。',
    },
  },
];
