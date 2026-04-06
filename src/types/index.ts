/**
 * 全局类型定义
 */

/** 导航菜单项 */
export interface NavItem {
  key: string;
  label: string;
  icon: string;
  path: string;
  badge?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
}

/** 概念卡片 Props */
export interface ConceptCardProps {
  title: string;
  emoji: string;
  description: string;
  tags?: Array<{ text: string; type: 'core' | 'important' | 'advanced' }>;
  children: React.ReactNode;
}

/** 代码展示块 Props */
export interface CodeBlockProps {
  code: string;
  label?: string;
}

/** 演示区域 Props */
export interface DemoAreaProps {
  title?: string;
  children: React.ReactNode;
}

/** Todo 项目（用于 useReducer 演示） */
export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

/** Todo Action 类型 */
export type TodoAction =
  | { type: 'ADD'; payload: string }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'DELETE'; payload: number };

/** 主题上下文值类型 */
export interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
  primaryColor: string;
}
