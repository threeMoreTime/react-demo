import type { Quest } from '../types';
import { batch0Legacy } from './questions/batch_0_legacy';
import { batch1Basics } from './questions/batch_1_basics';
import { batch2State } from './questions/batch_2_state';
import { batch3Forms } from './questions/batch_3_forms';
import { batch4Hooks } from './questions/batch_4_hooks';
import { batch5AdvancedComp } from './questions/batch_5_advanced_comp';
import { batch6AdvancedHooks } from './questions/batch_6_advanced_hooks';
import { batch7Optimization } from './questions/batch_7_optimization';
import { batch8Pitfalls } from './questions/batch_8_pitfalls';
import { batch9Ecosystem } from './questions/batch_9_ecosystem';
import { batch10Summit } from './questions/batch_10_summit';

/**
 * React 闯关关卡全量定义 (100题 扩建版)
 * 专门为有 Vue 背景的开发者设计，采用标准化深度解析模板。
 */
export const QUESTS: Quest[] = [
  ...batch0Legacy,
  ...batch1Basics,
  ...batch2State,
  ...batch3Forms,
  ...batch4Hooks,
  ...batch5AdvancedComp,
  ...batch6AdvancedHooks,
  ...batch7Optimization,
  ...batch8Pitfalls,
  ...batch9Ecosystem,
  ...batch10Summit,
];
