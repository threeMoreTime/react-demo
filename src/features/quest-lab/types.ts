export type QuestLevel = 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | 'Level 5' | 'Level 6' | 'Level 7' | 'Level 8' | 'Level 9' | 'Level 10';

export interface VueAnalogy {
  vueFeature: string;      // Vue 中的对应功能 (如: reactive, ref, computed)
  reactDifference: string; // React 的核心差异解析
  tips: string;            // 给 Vue 开发者的避坑指南
}

export interface Quest {
  id: number;
  level: QuestLevel;
  title: string;           // 关卡标题 (如: 快照的觉醒)
  concept: string;         // 核心心法 (React 概念说明)
  vueAnalogy: VueAnalogy;  // 跨框架对比
  codeTemplate: string;    // 代码模板 (带有填空标记)
  missingParts: string[];  // 缺失的部分 (即正确答案数组)
  validationLogic: string; // 额外的验证说明
  explanation: {
    howItWorks: string;    // 逻辑解析
    deepDive: string;      // 深度原理解析 (底层机制)
    conclusion: string;    // 悟道总结
  };
}

export interface QuestState {
  currentLevel: number;
  userAnswers: Record<number, string[]>;
  completedLevels: number[];
}
