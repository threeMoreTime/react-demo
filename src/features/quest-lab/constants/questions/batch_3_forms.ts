import type { Quest } from '../../types';

export const batch3Forms: Quest[] = [
  {
    id: 26,
    level: 'Level 2',
    title: '死循环的引线 (立即执行的函数)',
    concept: '如果在 onClick 里直接调用带括号的函数，它会在组件渲染时当场爆炸！',
    vueAnalogy: {
      vueFeature: '@click="handleClick(item)"',
      reactDifference: 'Vue 的模板解析器极其智能，它知道你要传参，所以会自动帮你转成一个闭包；但在 React JSX 这个纯 JS 世界里，写了括号立刻就会被主线程执行！',
      tips: '新手写出死循环的罪魁祸首：在 onClick 里 setState，并且是不带箭头函数的裸调用。',
    },
    codeTemplate: `function BuyButton({ id }) {
  // 挑战：当点击时执行 buy(id)，请补充安全壳
  return (
    <button onClick={_______ => buy(_______)}>
      购买
    </button>
  );
}`,
    missingParts: ['()', 'id'],
    validationLogic: '必须包裹成一个匿名高阶函数，延迟到点击发生时再调用。',
    explanation: {
      howItWorks: '【答案解析】：答案是闭包符号 `()`（或无参数的标识）和实参 `id`。即 `() => buy(id)`。',
      deepDive: '【底层逻辑】：React 渲染阶段（Render phase）本质是在从上往下调用组件树上的函数。当你写 `<button onClick={buy(id)}>` 时，JS 引擎碰到圆括号会【就地求值】，即立刻执行 `buy(id)`。如果 `buy` 里面有 `setState`，状态一更新又会引发重新渲染，重新渲染又遇到 `buy(id)`，不到 3 毫秒内存就会溢爆（Maximum update depth exceeded）。\n【设计初衷】：JS 语法没有任何魔法，大括号里接受的是函数的【引用地址】，而不是函数的【执行结果】。\n【与 Vue 不同】：在 Vue 里你哪怕裸写也是安全的，因为底层的编译器早就帮你生成了箭头函数拦截层。\n【实战频率】：100% 会遇到。',
      conclusion: '交给未来的魔法，要用箭头函数封印起来。',
    },
  },
  {
    id: 27,
    level: 'Level 2',
    title: '表单的双拼 (合成事件值拦截)',
    concept: '受控组件在每一次键盘敲击后都需要把值交给对应的 State 仓库保存。',
    vueAnalogy: {
      vueFeature: 'v-model="text"',
      reactDifference: '由于没有自动生成 v-model，你需要亲手去对象靶心把刚输完的字母取出来塞进 useState。',
      tips: '记住长长的一串 API：e.target.value。',
    },
    codeTemplate: `const [text, setText] = useState("");
return (
  <input 
    type="text" 
    value={text} 
    onChange={(e) => setText(_______)} 
  />
);`,
    missingParts: ['e.target.value'],
    validationLogic: '正确书写标准的 HTML 节点值流转方向。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `e.target.value`。',
      deepDive: '【底层逻辑】：通过获取 `onChange` 的首个参数 `SyntheticEvent` `e` 拿到触发事件的目标元素 `target` 上的实时 `value`。\n【设计初衷】：单向数据流。视图只负责触发通知（onChange），由源头（State）裁决是否改变并顺流而下重塑视图。\n【与 Vue 不同】：Vue 的 v-model 在输入法拼音组合阶段会做出一定的锁定优化（不立刻更新以防切乱拼音），而 React 这需要复杂的自定义 Hook 防抖才能实现。\n【实战频率】：极高（95%）。\n【常用范式】：对于成打的 input，通常我们会用 `{ [e.target.name]: e.target.value }` 一起管理。',
      conclusion: '手握准星，追踪真实事件节点上的微小变动。',
    },
  },
  {
    id: 28,
    level: 'Level 2',
    title: '开关的密语 (Checkbox 状态)',
    concept: '复选框的受控属性不是 value，而是 checked，拦截的也是 e.target.checked。',
    vueAnalogy: {
      vueFeature: '<input type="checkbox" v-model="isChecked">',
      reactDifference: 'Vue 非常好心地为你做了多态分发——看到 type 是 checkbox 就自动用 checked；但在 React，如果是 checkbox 你居然还傻傻的写 value={}，页面一定会卡死或没反应。',
      tips: '只有 input text 用 value，checkbox 和 radio 请只认准 checked！',
    },
    codeTemplate: `const [rememberMe, setRememberMe] = useState(false);
return (
  <input 
    type="checkbox" 
    _______={rememberMe} 
    onChange={(e) => setRememberMe(e.target._______)} 
  />
);`,
    missingParts: ['checked', 'checked'],
    validationLogic: '对于布尔类型的控件，必须调用 checked 指令。',
    explanation: {
      howItWorks: '【答案解析】：答案全都是 `checked`。',
      deepDive: '【底层逻辑】：这其实是 HTML 规范。`<input type="checkbox">` 的开启状态对应的固有属性和特性其实叫 `checked`。React 只是生硬地把这层 HTML 规范直接挪到了 JSX 上没有任何二次包装！\n【设计初衷】：与 DOM 原生规范保持 1:1 的投射映射。\n【与 Vue 不同】：框架帮不帮你的问题。没有了 v-model，我们要了解 DOM 更加多一点。\n【实战频率】：高（80%）。',
      conclusion: '在不同的控件上，找准它们最原本跳动的那根神经。',
    },
  },
  {
    id: 29,
    level: 'Level 2',
    title: '选择的统治 (Select 标签重构)',
    concept: '在传统的 HTML 里，改变 select 一般是在其子标签 option 加 selected 属性；React 直接统辖在父标签 select 上。',
    vueAnalogy: {
      vueFeature: '<select v-model="selected">',
      reactDifference: '这点上 Vue 和 React 很难得地达成了高度一致！由于原生写法太难受，即使极其推崇原生的 React，也为你把 value 控制点接到了外层父级的 <select value={}> 上。',
      tips: '永远不要再写 `<option selected>` 了！',
    },
    codeTemplate: `const [city, setCity] = useState("PEK");
// 挑战：声明并控制 select
return (
  <select _______={city} _______={(e) => setCity(e.target.value)}>
    <option value="PEK">北京</option>
    <option value="PVG">上海</option>
  </select>
);`,
    missingParts: ['value', 'onChange'],
    validationLogic: '必须是 value 和 onChange 进行双向控制',
    explanation: {
      howItWorks: '【答案解析】：答案是 `value` 和 `onChange`，与 input 保持一致。',
      deepDive: '【底层逻辑】：如果在传统的纯 HTML 结构里，要让第二项选中，你必须要在第二个 `option` 上打上 `selected="selected"`。但这非常违背数据流驱动模式。所以 React 官方给 `<select>` 做了一点微小的魔法兼容工作——你可以直接把 value 传给父节点的 select，它底层会自动去寻找匹配的 option 然后挂载 selected。\n【设计初衷】：为所有输入控件建立完全统一的基础受控 API。\n【与 Vue 不同】：无显著差异，都是为了统一表单心智模型。\n【实战频率】：高（80%）。',
      conclusion: '最高效的统治不是下放权力，而是把状态收归唯一的王者接口。',
    },
  },
  {
    id: 30,
    level: 'Level 3',
    title: '阻冒的结界 (StopPropagation)',
    concept: '在 React 事件体系里，子元素触发了点击并需要阻止它往父容器冒泡导致意外操作，必须使用此利器。',
    vueAnalogy: {
      vueFeature: '@click.stop',
      reactDifference: '没有修饰符糖。你必须使用原生的 DOM 知识手搓！',
      tips: '如果不阻断，你点一个按钮，不仅按钮起作用，按钮底部的容器如果在监听着点击事件，一样会被触发。',
    },
    codeTemplate: `function Card({ onCardClick, onDelete }) {
  // 挑战：用户点右上角红叉删除时，不能触发外层卡片的整体点入动作。
  const handleDelete = (e) => {
    e._______();
    onDelete();
  };

  return (
    <div onClick={onCardClick}>
      <button onClick={handleDelete}>删除</button>
    </div>
  );
}`,
    missingParts: ['stopPropagation'],
    validationLogic: '必须正确打断事件冒泡机制',
    explanation: {
      howItWorks: '【答案解析】：答案是 `stopPropagation`。阻断合成事件从子节点顺树而上。',
      deepDive: '【底层逻辑】：React 事件是绑在 Root 上统一管理的。当你点了按钮，React 根据收集好的 VDom 树列出一条冒泡链数组（从底层元素到上层），然后依次执行。如果你在其中一个节点写了 `e.stopPropagation()`，它就会打上阻断标签，React 遍历到这就停止分发上级元素的事件回调了。\n【设计初衷】：遵循 DOM W3C 规范，提供细粒度的事件阻断操作。\n【与 Vue 不同】：没有了 `@click.stop` 这类开发效能奇招，React 需要你老实按规范手写。\n【实战频率】：极高（90%）。多见于【卡片内联外链】或【操作遮罩层】。',
      conclusion: '画定雷池，隔绝那些不该上达天听的低语。',
    },
  },
  {
    id: 31,
    level: 'Level 3',
    title: '狂野的原生 (FormData)',
    concept: '对于重型表单，受控组件（100个 input 绑定 100个 state）开销巨大，而使用浏览器原生的 FormData 则是终极轻量化方案。',
    vueAnalogy: {
      vueFeature: '极少使用（受困于过度舒适的 v-model）',
      reactDifference: 'Vue 开发者重度依赖绑定，几乎不用表单原生。在 React 里如果非即时依赖（无联想验证），大家很提倡直接提交 FormData 取值以避免每次打字全盘重算！',
      tips: '如果表单只是为了点那个“提交按钮”，其实根本不用写 State！',
    },
    codeTemplate: `const handleSubmit = (e) => {
  e.preventDefault();
  // 挑战：获取并打印非受控表单里刚输入的内容
  const form = new _______(e.currentTarget);
  console.log(form._______('username'));
};

return (
  <form onSubmit={handleSubmit}>
    <input name="username" />
    <button type="submit">提交</button>
  </form>
);`,
    missingParts: ['FormData', 'get'],
    validationLogic: '必须知道现代 JS 是如何从 Event 获取巨量未受控值的。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `FormData` 和 `get`。',
      deepDive: '【底层逻辑】：`e.currentTarget` 此时就是那一个 `<form>` DOM 节点。通过将其传入 `new FormData()`，浏览器会自动把包含 `name` 属性且输入了内容的元素直接转化为键值对形式的内部数据对象。这是目前最符合 Server Action / SSR 时代潮流的新锐做法。\n【设计初衷】：摆脱凡事挂载 state 的教条，将提交表单的心智降级回归最基础的 Web Native 协议。\n【与 Vue 不同】：Vue 的强行绑定通常掩盖了这种手段。而 React 新出的 Server Actions 就是完全基于 FormData 的！\n【实战频率】：中等偏上（正在迅速增长，随 React 19 成为主流）。',
      conclusion: '有时最华丽的代码不是堆叠繁复的魔法，而是向世界树回归最原始的祈祷。',
    },
  },
  {
    id: 32,
    level: 'Level 4',
    title: '幻像的面纱 (动态 Class 渲染)',
    concept: '如何组合多个类名，并且带上有条件的动态逻辑？因为不能用对象绑定。',
    vueAnalogy: {
      vueFeature: ':class="{ active: isActive, error: isError }"',
      reactDifference: 'Vue 内部已经把对象和数组解析写到爽了；但在 React 世界，className 只能接收长长的一串完整的字符串。如果需要条件，通常借助三元或第三方奇技淫巧。',
      tips: '你可以用原生的模板字符串强行拼接，但如果业务多，所有人都装一个极小的库叫 clsx。',
    },
    codeTemplate: `// 挑战：用 ES6 最原生的手段，只有当 isActive 为真时，追加一个 "active" 的类名
function Tab({ isActive }) {
  // className 的最终结果必须是 "tab " 或者是 "tab active"
  return <div className={\`tab \${isActive _______ 'active' : ''}\`}>标签</div>;
}`,
    missingParts: ['?'],
    validationLogic: '对于简单的条件类名，熟练使用三元拼接。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `?`。在 `${}` 模板大括号内执行原生 JS 三元运算。',
      deepDive: '【底层逻辑】：JSX 的属性只求值不加糖。引擎不认识所谓的对象语法，它只看到你传过去什么字符串，原样发给 DOM。如果传一个对象，渲染出来可能就是一个恐怖的 "[object Object]" 灾难。\n【设计初衷】：剥离非核心复杂业务逻辑，将这种工具类需求推给社区去自生自灭（然后诞生了 classnames 库）。\n【与 Vue 不同】：可以说极度拉跨，被各种开发者疯狂吐槽，但大家就是默默使用模板字符串或第三方库承受着这一切。\n【实战频率】：极高（100%）。\n【常用范式】：`className={clsx("tab", { "active": isActive })}` 乃当代 React 最强显学。',
      conclusion: '即使没有官方开光的神器，简单的字符串拼接亦可劈开迷雾。',
    },
  },
  {
    id: 33,
    level: 'Level 4',
    title: '连根拔起 (数组 Map 更新之变)',
    concept: '更新一个有状态的对象数组时，不可以用等号去附值！',
    vueAnalogy: {
      vueFeature: 'list[index].name = "new"',
      reactDifference: 'Vue 由于是 Proxy，对于对象深层的变化照单全收；React 因为只进行最外层的内存变动（浅对比）监测，这改法直接白交卷了。',
      tips: '如果你需要更新数组里某个目标的状态，使用 map 去遍历生成新的数组对象引用。',
    },
    codeTemplate: `const toggleTodo = (id) => {
  // 挑战：把符合 ID 任务的 completed 取反！不用 mutable 的写法
  setTodos(prev => prev._______(todo => {
    if (todo.id === id) {
      return { ...todo, completed: _______todo.completed };
    }
    return todo;
  }));
};`,
    missingParts: ['map', '!'],
    validationLogic: '掌握 React 全面数组替换之终极范式。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `map` 和取反用的 `!`。',
      deepDive: '【底层逻辑】：`map` 天然就拥有遍历并返回一个拥有全新底层内存地址数组的能力（无论改没改，大盘数组的新旧必变）。然后在内部碰到目标节点，用 `...todo` 生成子节点的大拷贝。这样不仅最外层变了，修改的部分本身的对象也变了。这也是保持 Immutable 并确保所有子级 PureComponent (以至于 React.memo) 有效刷新之基石。\n【设计初衷】：禁止所有的隐性数据污染。\n【与 Vue 不同】：在性能较差甚至极端情况下，大量的 map 开销比 Vue 定点追踪的效率低下。但这使得 Redux Time Travel 的纯净回溯成为可能。\n【实战频率】：极高（95%）。\n【常用范式】：通常这就是大家引入 Immer (useImmer) 去将变异语法黑手转换为这种产出的直接诱因。',
      conclusion: '要洗净一片有污迹的叶子，你需要重新栽下一片茂密的森林。',
    },
  },
  {
    id: 34,
    level: 'Level 4',
    title: '隐藏的空虚 (空值与未定义之镜)',
    concept: '布尔值（true/false），未定义或空想（null/undefined），在 React 中是被接纳但不绘制的存在。',
    vueAnalogy: {
      vueFeature: '无直接对应（通常也是空）',
      reactDifference: '在 JSX 只要你的渲染结果碰上这些状态游离的游魂，React 会把它静默吞噬，界面什么都不展示。',
      tips: '当你想利用隐身这个特性做条件渲染，一定要防止 0 和 NaN（它们会被打印在屏幕上！）。',
    },
    codeTemplate: `function ResultStatus({ isLoaded, data }) {
  // 挑战：在加载前不想渲染任何内容，如果没给就不渲染
  if (!isLoaded) return _______;

  return <div>{data}</div>;
}`,
    missingParts: ['null'],
    validationLogic: '必须使用合理的空声明来切断渲染流程并得到组件。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `null`（或者 undefined, 都是合法组件抛空）。',
      deepDive: '【底层逻辑】：React 的协调 (Reconciliation) 引擎发现一个组件的 Return 拿到的是 `null`，它在比对下探该 Fiber 时就不会在此处对应生成任何真实 HTML 的 DOM 元素。这就使得它既没有违规，又不占用重绘性能甚至结构。\n【设计初衷】：为高阶组件条件阻隔和早期安全退出提供一条没有负担的地道。\n【与 Vue 不同】：在 Vue 里没有明确的 `return null`。如果是使用 script setup 我们并不书写 Render fn 而是走 HTML 里的 v-if 消失。\n【实战频率】：极高（因为很常用组件直接退出防抖或抛空避免无数据报红错）。',
      conclusion: '有界的世界接纳无相的存在，无即是退离的终极安宁。',
    },
  },
  {
    id: 35,
    level: 'Level 5',
    title: '不属于你的标签 (标签属性的替换)',
    concept: '由于 HTML 有很多和 JS 重叠的古老黑话，React 为了你的安全强行把它们更名换姓了。',
    vueAnalogy: {
      vueFeature: '<label for="name">',
      reactDifference: '因为 for 循环在 JS 里太重要了（for (let i = 0...)），不能把它当作 JS 对象内部的普通键来传给标签解析。',
      tips: '记住它：除了 class -> className，还有 for -> htmlFor，并且所有的 tabindex 要变成 tabIndex。',
    },
    codeTemplate: `function InputGroup() {
  // 挑战：使得点击 Label 时能够触发表单获取焦点（对应 for 属性）
  return (
    <div>
      <label _______="username">姓名</label>
      <input id="username" type="text" />
    </div>
  );
}`,
    missingParts: ['htmlFor'],
    validationLogic: '需要记住这个 React 世界独一份的保留字。',
    explanation: {
      howItWorks: '【答案解析】：答案是 `htmlFor`。',
      deepDive: '【底层逻辑】：JSX 的属性在进入编译器时会被包裹为一个 `{ htmlFor: "username" }` 对象。因为 ES5 时代的古老浏览器解析属性时对于保留字（`class`，`for` 等作为 Object Key 会有解析阻碍异常，甚至会引发严格模式报错。而现在，虽然 ES6 早就彻底放开了保留字做 Key 等，但这种命名法依旧为了平滑前向兼容而长存。\n【设计初衷】：完全抹去了引擎层面对旧 JavaScript 环境规范导致的崩溃。虽然在 16版本后这种机制遭到许多争议要求被放开重归原生，但核心团队并没有大举修改这 20 年的沉淀。\n【与 Vue 不同】：Vue 的模板永远在 XML 世界运转，没有关键字保留带来的后顾之忧。\n【实战频率】：较高（70% 写原生表单控件必用）。',
      conclusion: '时代可以流转进步，但根植在底层的印记依然倔强闪耀着守旧的光芒。',
    },
  },
];
