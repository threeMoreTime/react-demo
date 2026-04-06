# Questions Library (题库管理规约)

## 一、功能说明
`src/features/quest-lab/constants/questions/` 目录是项目的知识命脉。它存储了 100 道 (及更多) 的 React 对比实验题目。
- **批次分片 (Batches)**: 采用 `batch_x_*.ts` 的命名规则进行物理隔离。
- **进阶阶梯**: 难度从 Level 1 到 Level 10 阶序渐进。

## 二、API 表格 (Data Schema)

| 字段 (Key) | 类型 (Type) | 必填 (Req) | 说明 (Description) |
| :--- | :--- | :--- | :--- |
| **id** | `number` | ✅ | 全局唯一 ID。 |
| **level** | `QuestLevel` | ✅ | 难度分级 (`Level 1` - `Level 10`)。 |
| **title** | `string` | ✅ | 题目名称。 |
| **concept** | `string` | ✅ | 核心概念痛点说明。 |
| **vueAnalogy** | `VueAnalogy` | ✅ | 跨框架对比逻辑对象。 |
| **codeTemplate**| `string` | ✅ | 代码样板 (使用 `_______` 作为占位符)。 |
| **missingParts**| `string[]` | ✅ | 填空答案数组。 |
| **explanation** | `Explanation`| ✅ | 破阵后的深度解析与底层原理解析。 |

## 三、扩展示例 (如何新增一关)

### 1. 新增一个 `batch_11_next.ts`
```tsx
import type { Quest } from '../../types';

export const batch11Next: Quest[] = [{
  id: 101,
  level: 'Level 10',
  title: '幻像的终焉 (Final Vision)',
  // ... 其他必填字段
}];
```

### 2. 在 `quests.ts` 中解构导入
```tsx
import { batch11Next } from './questions/batch_11_next';

export const QUESTS: Quest[] = [
  // ...
  ...batch11Next,
];
```

## 四、注意事项
- **严格性**: 必须要涵盖 `deepDive` (底层原理)，这是区别于普通刷题平台的灵魂。
- **一致性**: 确保 `id` 全局自增不重叠。
- **校验**: 在将代码填入 `codeTemplate` 时，请务必在 IDE 中测试一遍该代码是否通过 Babel/TS 编译。

---

> [!IMPORTANT]
> **AI 建议**: 当要求 AI 生成新的 100 题时，请指示其严格参照此目录下的 Batch 结构，确保数据格式的鲁棒性。
