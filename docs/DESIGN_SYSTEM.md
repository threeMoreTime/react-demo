# 设计系统与视觉规范 (Design System & UI Tokens)

本文件定义了 `react-demo` “星图大航海”主题的视觉一致性基准，确保新组件能够完美融入暗核美学。

## 色彩体系 (Color System)

| 名称 (Name) | 色值 (Value) | 作用 (Scope) |
| :--- | :--- | :--- |
| **星夜黑 (Night)** | `#0f1219` | 全局背景、Modal 遮罩。 |
| **紫宸色 (Violet)** | `#a78bfa` | 渐变起点、激活 Tab、星标强调。 |
| **深空蓝 (Cosmo)** | `#3b82f6` | 渐变终点、导航按钮、链接。 |
| **月光灰 (Moon)** | `rgba(255,255,255,0.4)` | 辅助文字、静止节点。 |
| **翠绿破阵 (Emerald)** | `#10b981` | 成功反馈、已通关节点边缘。 |
| **琥珀金 (Amber)** | `#fbbf24` | 警告反馈、当前关卡呼吸灯、秘籍按钮。 |

## 材质与效果 (Material & Effects)

### 1. 毛玻璃 (Glassmorphism)
```css
/* 标准大航海毛玻璃材质 */
background: rgba(15, 18, 25, 0.75);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### 2. 呼吸与悬浮 (Animation)
- **呼吸频率**: `2s` 立法。
- **悬浮位移**: `translateY(-5px)`。
- **阴影扩散**: 所有的浮动按钮必须带有 `0 4px 14px 0` 的色散阴影。

## 交互准则 (Interactions)

- **反馈响应**: 所有的关键点击（如“破阵”）必须有明显的 Loading 或 Modal 反馈，禁止阻塞用户操作且无交互补丁。
- **响应式断点**:
  - `Mobile`: < 768px (Grid 自动降为 2~3 列)
  - `Desktop`: > 1200px (Grid 平铺 8~10 列)

---

> [!TIP]
> **AI 建议**: 当您要求 AI 增加一个统计仪表盘或新的浮动菜单时，请提醒其引用此文档中的 Color Tokens，维持界面的高级感。
