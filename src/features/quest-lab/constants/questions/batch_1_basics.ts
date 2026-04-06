import type { Quest } from '../../types';

export const batch1Basics: Quest[] = [
  {
    id: 6,
    level: 'Level 1',
    title: '冠名权的争夺 (class vs className)',
    concept: '在 JSX 中，class 是 JavaScript 保留关键字，必须改名。',
    vueAnalogy: {
      vueFeature: 'class="box"',
      reactDifference: 'Vue 的模板是类 HTML 的，可以直接写 class；JSX 底层是 JS，为了避开 ES6 的 class 关键字，要求写 className。',
      tips: '如果你习惯了直接粘贴 HTML 代码到 React 里，第一件事就是把所有 class 替换掉！',
    },
    codeTemplate: `// 挑战：为一个纯 HTML 的 div 加上类名 "container"
function App() {
  return <div _______="container">Hello</div>;
}`,
    missingParts: ['className'],
    validationLogic: '驼峰命名在 React DOM 属性中是强制性要求。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `className`。为了避免与 JS 原生的 class 发生词法冲突而被转译引擎误解。',
      deepDive: '【底层逻辑】：Babel/SWC 会将 JSX `<div className="container" />` 编译为 `React.createElement("div", { className: "container" })`。在 React DOM (v15 以前) 的底层源码中，需要将大批的属性直连到原生的 DOM Node API 上如 `node.className = ...`。\n【设计初衷】：保持 JSX 和 JavaScript 语义边界的清晰。尽管 React 16+ 已经松绑了部分自定义属性，但对 class 的禁飞区依然严防死守。\n【与 Vue 不同】：Vue 的 `.vue` 文件分 `<template>` 和 `<script>` 两个宇宙，在模板宇宙里你可以尽情使用 HTML 的语法特性。JSX 只有一个 JS 宇宙。\n【实战频率】：100%。\n【常用范式】：习惯于按 `Ctrl + F` 批量替换 HTML 到 JSX。',
      conclusion: '语言的设计总是伴随着妥协，记住 className 是跨入 React 世界拿的第一张名片。',
    },
  },
  {
    id: 7,
    level: 'Level 1',
    title: '变量的口袋 (花括号的奥秘)',
    concept: 'JSX 只认单大括号作为嵌入 JavaScript 表达式的入口。',
    vueAnalogy: {
      vueFeature: '{{ message }} (胡子语法)',
      reactDifference: 'Vue 用双大括号包裹变量；React 用单大括号。如果是在 React 看到双大括号 {{}}，那其实是单大括号里装了一个对象字面量！',
      tips: 'Vue 开发者刚来 React 极其容易多写一个大括号导致报错。',
    },
    codeTemplate: `function Profile({ name }) {
  // 挑战：在标题里渲染局部变量 name
  return <h1>Hello, _______name_______</h1>;
}`,
    missingParts: ['{', '}'],
    validationLogic: '正确开启 JavaScript 计算求值域。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `{` 和 `}`。在 JSX 文本节点里，单大括号代表着“切出到 JS 环境进行求值”。',
      deepDive: '【底层逻辑】：JSX 本质是函数调用树，当解析器遇到 `<` 认为进入 XML 域，当遇到 `{` 则暂停 XML 编译，切回 JS 编译域，求值后再接回去。\n【设计初衷】：最简抽象。既然已经是在 JS 内写 UI，无需创造新的胡子引擎，一套大括号足以表意。\n【与 Vue 不同】：Vue 的双大括号被专门设计用于模板文本插值，是独立编译器解析的结果。而 React 仅仅是对语法的降级切换。\n【实战频率】：100%。\n【常用范式】：不仅用于渲染文本 `{name}`，也用于传递属性 `id={dynamicId}`。',
      conclusion: '单大括号是一把钥匙，随时帮你打开从视图世界进入逻辑世界的大门。',
    },
  },
  {
    id: 8,
    level: 'Level 1',
    title: '数据的使者 (Props 与解构)',
    concept: '父组件给子组件传的值全都在第一参数对象 props 里。',
    vueAnalogy: {
      vueFeature: 'defineProps(["title", "count"])',
      reactDifference: 'Vue 中用宏定义接取；React 组件只是一个普通函数，参数就是传入的属性包，因此天然支持 ES6 对象解构。',
      tips: '不要忘记大括号！如果在函数参数里直接写 (title) 会报错，因为你拿到的是个 props 对象。',
    },
    codeTemplate: `// 挑战：使用 ES6 直接解构出传入的 title
function Header(_______ title _______) {
  return <h1>{title}</h1>;
}
<Header title="欢迎" />`,
    missingParts: ['{', '}'],
    validationLogic: '必须解构第一个参数对象。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `{` 和 `}`。形成完整的 `{ title }` 解构语法。',
      deepDive: '【底层逻辑】：React 渲染 `<Header title="欢迎" />` 时，底层其实是通过 `Header({ title: "欢迎" })` 直接执行了这个函数。如果不用解构，参数就是普通的 `props`，需要通过 `props.title` 访问。\n【设计初衷】：Just JavaScript（只是纯 JS）。没有任何魔法框架方法，函数怎么接参数，组件就怎么接属性。\n【与 Vue 不同】：Vue 的模板编译需要提取 props 作为依赖图的监听入口，因此强依赖宏。React 没有这些条条框框。\n【实战频率】：极高（95%）。\n【常用范式】：带上默认值解构 `({ title = "默认值" })` 是最流行的写法。',
      conclusion: '剥去框架的伪装，它就是一个朴实无华的纯函数。',
    },
  },
  {
    id: 9,
    level: 'Level 2',
    title: '肚皮里的乾坤 (Children vs slots)',
    concept: '在开闭标签之间传入的内容，会被挂载到 props.children 上。',
    vueAnalogy: {
      vueFeature: '<slot></slot>',
      reactDifference: 'Vue 有命名插槽、作用域插槽等复杂机制；React 所有放在标签里的东西就是 children，是一个普通的 prop。',
      tips: '别到处找 <slot> 标签了，在 React 里你直接把 props.children 像普通变量那样拿出来渲染就行。',
    },
    codeTemplate: `function Card({ title, _______ }) {
  // 挑战：渲染这个组件包裹的内部元素
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">{_______}</div>
    </div>
  );
}`,
    missingParts: ['children', 'children'],
    validationLogic: '必须能够接取并渲染出 React 原生的 children 属性。',
    explanation: {
      howItWorks: '【答案解析】：两处都是 `children`。在参数里接收入参并在内部 JSX 渲染。',
      deepDive: '【底层逻辑】：Babel 在转换 `<Card><span>你好</span></Card>` 时，会将内部的 Node 挂载为 `createElement(Card, null, createElement("span", null, "你好"))`，而 React 会统一把除了前两个属性外的参数全部塞进 `props.children` 里传进去。\n【设计初衷】：第一公民。无论是文本、组件还是数组，在 React 看来都可以被作为 JS 数据传来传去。\n【与 Vue 不同】：Vue 插槽有一套特定模板微语法，React 直接粗暴地将插槽当成 "Children" 这个保留词的数据进行传递。\n【实战频率】：极高（80%）。用于布局组件和高阶容器。\n【常用范式】：如果有多个“具名插槽”需求，React 的做法是直接传多个 ReactNode 的 props 比如 `<Layout header={<Header/>} />`。',
      conclusion: '万物皆是属性，嵌套的结构不过是名为 children 的数组。',
    },
  },
  {
    id: 10,
    level: 'Level 2',
    title: '消失的 v-if (逻辑与陷阱)',
    concept: 'React 不提供特定指令，条件渲染完全使用原生 JS 里的 && 或者三元表达式。',
    vueAnalogy: {
      vueFeature: 'v-if / v-else',
      reactDifference: 'Vue 把指令挂在标签上；React 需要用大括号切到 JS 域用逻辑运算符处理。',
      tips: '小心 0 的陷阱！如果数字 count 是 0，`count && <div/>` 会把光秃秃的 0 渲染在页面上！',
    },
    codeTemplate: `function Alert({ showMode }) {
  // 挑战：使用三元表达式判断，当 showMode 为 true 时显示 A，否则显示 B。
  return (
    <div>
      {showMode _______ <span>A</span> _______ <span>B</span>}
    </div>
  );
}`,
    missingParts: ['?', ':'],
    validationLogic: '原生的三元运算符，是实现条件分发最可靠的方式。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `?` 和 `:`，组成三元表达式。',
      deepDive: '【底层逻辑】：如果在 JSX 中返回 `undefined`, `null`, `true`, `false`，React 在提交到实体 DOM 时会直接跳过不渲染。但是数字 `0` 和 `NaN` 是例外，它们被视为合法的文本节点会被直接打印。\n【设计初衷】：遵循极简与原生表达。你掌握 JS 逻辑怎么分叉，你就在 UI 世界怎么分叉。\n【与 Vue 不同】：Vue 在编译期解析 `v-if`，能对指令后面的内容做特定的剪枝优化。而在 React 里你手写的三元表达式会在每次 render 期间直接被引擎执行出结果然后对比。\n【实战频率】：100%。\n【常用范式】：复杂逻辑通常建议直接封装提早 `return` 或拆分为独立小组件解决。',
      conclusion: '这里没有魔改的指令糖，有的只是原汁原味的布尔逻辑。',
    },
  },
  {
    id: 11,
    level: 'Level 2',
    title: '循环的指明灯 (key 的奥义)',
    concept: '在列表渲染中，key 不能用数组的 index（除非这个列表只用来纯展示永不重排）。',
    vueAnalogy: {
      vueFeature: 'v-for="item in list" :key="item.id"',
      reactDifference: 'Vue 指令会自动推导；React 则是通过 Array.map 实现列表，且强制警告添加 key。',
      tips: '当你在数组中间删掉一项发现下面的项的内部输入框内容乱套了，说明你可能手滑写了 `key={index}`！',
    },
    codeTemplate: `function List({ items }) {
  // 挑战：为 map 生成的每一个 li 元素带上正确的身份证 id
  return (
    <ul>
      {items.map(item => (
        <li _______={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`,
    missingParts: ['key'],
    validationLogic: '列表中每个独立实体都必须持有唯一的 key。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `key`。这是告诉引擎进行高效比对的重要指纹。',
      deepDive: '【底层逻辑】：在进行 Reconciliation（协调算法）时，对于平级的数组，React 默认不会做深度比较而是直接比对类型，用 key 进行 Hash 查找复用。如果不写 key 默认退化用 index。一旦用 index，当首部插入元素时，原本在 index为0 上的元素被迫变为 index为1，React 会认为所有元素属性全变了，并且它挂载在旧的 index0 上的 `State` 就会错误地留给新的长子。\n【设计初衷】：通过赋予唯一标识，以 O(n) 的速度实现本来需要 O(n^3) 才能算出来的最小复用路径。\n【与 Vue 不同】：Vue3 对 `v-for` 的 diff 算法（快速 Diff）有所不同，但相同点是不用正确 `key` 都会死得很惨。\n【实战频率】：极高（95%）。\n【常用范式】：总是从后端数据库拿来作为唯一 `key`，实在没有可以用 `crypto.randomUUID()` 预挂载。',
      conclusion: '不要让索引掩盖了真实实体的身份，无相变幻中只有唯一标识可寻。',
    },
  },
  {
    id: 12,
    level: 'Level 2',
    title: '阻断的壁垒 (阻止默认事件)',
    concept: '在 React 中，你不能通过返回 false 来阻止默认行为。必须显式调用 preventDefault。',
    vueAnalogy: {
      vueFeature: '@submit.prevent="check"',
      reactDifference: 'Vue 有一大堆极其好用的事件修饰符；但在 React 里，没有这些语法糖，一切回归老旧的 DOM API。',
      tips: '习惯了 Vue 的 `.prevent` 之后，写 React 提交表单时页面经常会出乎意料地刷新！',
    },
    codeTemplate: `function Form() {
  const handleSubmit = (e) => {
    // 挑战：使用原生方法阻止浏览器默认提交表单的刷新行为
    e._______();
    console.log("提交数据");
  };

  return <form onSubmit={handleSubmit}><button>提交</button></form>;
}`,
    missingParts: ['preventDefault'],
    validationLogic: '必须强制性打断浏览器的默认动作链。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `preventDefault`。调用事件对象的这个方法来抑制它的本能。',
      deepDive: '【底层逻辑】：React 为所有的事件统一封装了一层 `SyntheticEvent`。它跨浏览器磨平了接口差异，底层它采用了根节点事件委托（React 17 改为挂钩在 Root Container 上）。虽然是虚拟事件对象，但它的 `preventDefault` 原理与原生一模一样。\n【设计初衷】：反对语法黑盒。强制使用者直接面对并掌控底层接口行为。\n【与 Vue 不同】：Vue 提供 `.stop`, `.prevent`, `.self` 大大解放了生产力。但在 React 这边，需要你手动在回调里一行行地书写这些意图判定。\n【实战频率】：高（70%）。主要集中在 `a` 标签重写和 `form` 提交拦截上。\n【常用范式】：有时为了代码整洁，会封装类似 `const withPrevent = (fn) => (e) => { e.preventDefault(); fn(); }` 这样的高阶包裹。',
      conclusion: '在失去魔术棒的地方修心，手动阻挡每一次不请自来的暴走。',
    },
  },
  {
    id: 13,
    level: 'Level 3',
    title: '内联的红妆 (Style 的解法)',
    concept: 'React 中的内联样式不是字符串，而是一个具有驼峰命名的 JS 对象！',
    vueAnalogy: {
      vueFeature: 'style="color: red; font-size: 14px"',
      reactDifference: 'Vue 兼容字符串拼接或者对象语法；React 完全砍掉了字符串样式写法，强制要求使用驼峰语法的对象字面量。',
      tips: '注意有两层花括号：外层代表进入 JS 环境，内层代表这是一个对象！',
    },
    codeTemplate: `function Banner() {
  // 挑战：设置红色背景色 (backgroundColor: red) 和白色字体 (color: white)
  return (
    <div style={_______ backgroundColor: 'red', color: 'white' _______}>
      警告
    </div>
  );
}`,
    missingParts: ['{', '}'],
    validationLogic: '外挂对象字面量的语法格式必须成对闭合。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `{` 和 `}`。形成完整的 `style={{ ... }}`。',
      deepDive: '【底层逻辑】：之所以使用对象，是为了防止在 SSR（服务端渲染）和前端处理时候遭受 XSS CSS 注入攻击。如果是字符串，React 需要重新去做复杂的词法拆解；如果是对象，React 可以简单循环键值对，并通过内置规则自动补充在数值后面增加 `px` 等单位。\n【设计初衷】：彻底在 JSX 清除各种 CSS 分号字符串的手动拼凑导致的灾难级代码。\n【与 Vue 不同】：Vue 可以写 `style="color: red"` 因为编译器会帮你拆解，而 JSX 的编译不会干预这部分运行时层面的推导。\n【实战频率】：偶尔（30%）。一般用 Tailwind, CSS-in-JS 或原生 class 代替了。\n【常用范式】：需要使用 JS 变量动态计算 `height`，`width` 时常常用到内联，例如 `{{ height: `${h}px` }}`。',
      conclusion: '一切最终归于对象：双生大括号内藏着严谨的设计考量。',
    },
  },
  {
    id: 14,
    level: 'Level 3',
    title: '幽灵的披风 (Fragment 碎片)',
    concept: 'React 强制要求一段 JSX 只能返回单一根节点。但可以用 Fragment 消除无意义包裹容器。',
    vueAnalogy: {
      vueFeature: '多根节点支持 (Vue 3)',
      reactDifference: 'Vue 3 在同层自然支持返回多个标签；React 至今（因为 return 无法返回多个平级对象）依然需要用空标签包裹，但不占用真实 DOM。',
      tips: '不想因为多加了个 div 打破 Flex 布局？用 `<></>` 包起来即可。',
    },
    codeTemplate: `function Dialog() {
  // 挑战：如何用短语法返回平级的 h3 和 p，不增加冗余 div？
  return (
    _______
      <h3>提示</h3>
      <p>操作成功！</p>
    _______
  );
}`,
    missingParts: ['<>', '</>'],
    validationLogic: '必须填入片段语法的起止符号。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `<>` 和 `</>`。这是 `React.Fragment` 的极致语法缩写。',
      deepDive: '【底层逻辑】：由于 `return` 只能抛出一个对象（createElement 的根结果），多个同级的对象必须要被放入一个数组中或者打包。Fragment 就是这个官方的隐形包裹带，React 遇到它就会把它的 children 取出并平摊挂载到父节点上，完全不会有实体外壳。\n【设计初衷】：拯救那些严格的 Table, Flex, Grid 结构，使其免遭无用嵌套层级 `div地狱` 的毒手。\n【与 Vue 不同】：Vue 3 底层的编译会自动帮你处理虚拟 Fragment 并挂载多个平级根元素。React 利用这种特殊标签显得更有表现力且好理解控制范围。\n【实战频率】：极高（95%）。\n【常用范式】：唯一要注意的是，只有全拼写法 `<Fragment key={id}>` 可以在列表循环里加 key。',
      conclusion: '如幽灵般穿梭组合组件结构，不留下一丝 DOM 身影。',
    },
  },
  {
    id: 15,
    level: 'Level 3',
    title: '双调的警钟 (Strict Mode 的双倍调用)',
    concept: '开发模式下，React 会故意将你的组件函数跑两次！用来抓出有副作用的“不纯”函数。',
    vueAnalogy: {
      vueFeature: '无对应现象概念',
      reactDifference: 'Vue 生命周期就是稳定跑一次；React 开发环境下，如果你写了全局变异或者错误的突变，两次调用就会让它直接暴露。',
      tips: '别被两次 console.log 吓到，到了生产环境它会自动变回一次。只有当你修改了外部变量（不纯）才要命！',
    },
    codeTemplate: `// ❌ 错误示范：突变了外部变量（被调用两次会被迫自增2）
let guest = 0;
function Cup() { 
  guest++; return <div>客人: {guest}</div>; 
}

// ✅ 挑战：如何依靠 React 本地机制来保证纯粹的调用渲染？(即把计算放在 useState 等地方或变成纯粹公式)
function Cup({ guest }) {
  // 纯粹的渲染：给什么出什么，不能污染外部
  // 此时无论跑多少次，它就是它。
  _______ <div>客人: {guest}</div>;
}`,
    missingParts: ['return'],
    validationLogic: '必须正确输出 UI 而不是执行突变。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `return`。仅仅通过接收参数和输出 UI 声明完成它的任务。',
      deepDive: '【底层逻辑】：函数式编程的基石在于“纯函数（Pure Function）”——在相同输入下必须返回相同输出，且不能改变函数外部的状态。为了验证你的组件满足这个法则，React 的 `<StrictMode>` 机制在开发时故意以 (Render -> Destroy) -> Render 的双重轨迹调用你的逻辑。\n【设计初衷】：为了未来即将实装的 Concurrent（并发渲染），React 需要能够在后台自由丢弃、重试、暂停某些组件的渲染工作，如果你的组件“不纯洁”，比如会在后台偷偷计数自增，一旦重试机制触发就会产生海量 Bug。\n【与 Vue 不同】：Vue 利用可变状态响应式更新视图，本身就接纳局部的直接突变。React 需要你像一个数学家写出 `y = f(x)` 的冰冷公式。\n【实战频率】：日常遇到的恐慌（初学者 100% 疑惑区）。\n【常用范式】：这告诫我们：网络请求不准放挂载体里（必须去 useEffect），外界变量不准直接改，永远保持组件像一块干净的模具。',
      conclusion: '钟声被敲响两次，不仅是为了发现瑕疵，更是为了迎接并发时代的加冕。',
    },
  },
];
