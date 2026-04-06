# LevelMapModal (星海全息地图)

## 一、功能说明
`LevelMapModal` 是 React 闯关实验室的导航枢纽。它将 100 道题库通过全息图表的形式展示出来。
- **批次分级**: 将 100 题目自动切分为 10 个批次导航。
- **状态追踪**: 标记已通关与当前正在挑战的关卡位置。

## 二、API 表格 (Props)

| 参数 (Prop) | 类型 (Type) | 默认值 (Default) | 说明 (Description) |
| :--- | :--- | :--- | :--- |
| **open** | `boolean` | `false` | 控制 modal 的显示与隐藏。 |
| **onClose** | `() => void` | (Required) | 关闭 modal 的回调。 |
| **quests** | `Quest[]` | (Required) | 全量题库数据数组。 |
| **currentLevelId** | `number` | (Required) | 当前玩家所在的关卡 ID。 |
| **completedLevelIds**| `number[]` | (Required) | 玩家已破阵的关卡 ID 数组。 |
| **onSelectLevel** | `(id: number) => void`| (Required) | 在星图点击某个节点进行传送的回调。 |

## 三、使用示例

### 基础用法
```tsx
const [isMapOpen, setIsMapOpen] = useState(false);

<LevelMapModal 
  open={isMapOpen}
  onClose={() => setIsMapOpen(false)}
  quests={QUESTS}
  currentLevelId={42}
  completedLevelIds={[1, 2, 3]}
  onSelectLevel={(id) => jumpTo(id)}
/>
```

## 四、注意事项
- **内部逻辑**: 由于涉及到 `activeTab` 同步，在 `open` 时会触发一次 `useEffect` 状态提升。
- **交互限制**: 节点仅支持点击跳转，不支持拖拽重排（目前）。
- **动效**: 内置 `pulse-border` (呼吸灯) 与 `hover-lift` (浮游) CSS 增强动画。

---

> [!CAUTION]
> **性能预警**: 随着题库数量大幅增加，请确保 Modal 开启时不会因为大基数循环导致渲染卡顿；目前 100~500 题均处于极佳性能区间。
