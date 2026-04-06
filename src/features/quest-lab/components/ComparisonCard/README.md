# ComparisonCard (跨框架对比卡片)

## 一、功能说明
`ComparisonCard` 是 React 闯关实验室的核心教学组件。它负责将当前关卡的 React 知识点与 Vue 的对标特性进行视觉对撞，帮助开发者通过类比快速建立认知。

## 二、API 表格 (Props)

| 参数 (Prop) | 类型 (Type) | 默认值 (Default) | 说明 (Description) |
| :--- | :--- | :--- | :--- |
| **analogy** | `VueAnalogy` | (Required) | 包含 `vueFeature`, `reactDifference`, `tips` 的结构对象。 |

### 内部结构详解 (VueAnalogy Interface)
- `vueFeature`: (string) Vue 中的对标功能名。
- `reactDifference`: (string) React 在该点上的设计哲学差异。
- `tips`: (string) 避坑指南或进阶建议。

## 三、使用示例

### 基础用法
```tsx
import { ComparisonCard } from '../components/ComparisonCard';

const analogy = {
  vueFeature: 'Computed',
  reactDifference: '使用 useMemo 进行值缓存。',
  tips: '不要过度使用，仅在重计算时开启。'
}

<ComparisonCard analogy={analogy} />
```

## 四、注意事项
- **依赖性**: 该组件目前耦合了 `antd/Card` 样式。
- **兼容性**: 完美适配暗色主题，在亮色主题下字体阴影可能需要调整。
- **性能**: 纯展示组件，具有极高的渲染性能。

---

> [!TIP]
> **AI 建议**: 在扩充题库时，请确保 `analogy` 里的文本具有极强的启发性，它是“对比教学法”的灵魂。
