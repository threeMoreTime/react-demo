import { useState, useEffect } from 'react';
import { QUESTS } from '../constants/quests';
import type { QuestState } from '../types';

/**
 * 闯关实验室逻辑引擎
 * 职责：处理关卡进度、用户输入校验、状态持久化
 */
export const useQuestEngine = () => {
  // 从 LocalStorage 初始化进度
  const [state, setState] = useState<QuestState>(() => {
    const saved = localStorage.getItem('react_quest_progress');
    return saved ? JSON.parse(saved) : {
      currentLevel: 1,
      userAnswers: {},
      completedLevels: [],
    };
  });

  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSecretMode, setIsSecretMode] = useState(false);

  // 核心关卡数据
  const currentQuest = QUESTS.find(q => q.id === state.currentLevel) || QUESTS[0];

  // 持久化保存
  useEffect(() => {
    localStorage.setItem('react_quest_progress', JSON.stringify(state));
  }, [state]);

  // 更新当前输入的答案
  const handleAnswerChange = (index: number, val: string) => {
    const newAnswers = [...currentAnswers];
    // 初始化长度
    if (newAnswers.length < currentQuest.missingParts.length) {
      for (let i = 0; i < currentQuest.missingParts.length; i++) {
        if (newAnswers[i] === undefined) newAnswers[i] = '';
      }
    }
    newAnswers[index] = val;
    setCurrentAnswers(newAnswers);
    setIsCorrect(null); // 重置状态
    setIsSecretMode(false);
  };

  // 开启武林秘籍
  const revealSecret = () => {
    setIsSecretMode(true);
    setShowFeedback(true);
    setIsCorrect(null); // 秘籍模式下不显示对错图标
  };

  // 破阵校验
  const verifyQuest = () => {
    const isAllCorrect = currentQuest.missingParts.every(
      (part, idx) => currentAnswers[idx]?.trim().toLowerCase() === part.toLowerCase()
    );
    
    setIsCorrect(isAllCorrect);
    setIsSecretMode(false);
    setShowFeedback(true); // 无论对错，都显示复盘 Modal

    if (isAllCorrect && !state.completedLevels.includes(state.currentLevel)) {
      setState(prev => ({
        ...prev,
        completedLevels: [...prev.completedLevels, state.currentLevel],
      }));
    }
    return isAllCorrect;
  };

  // 切换关卡
  const goToLevel = (levelId: number) => {
    setState(prev => ({ ...prev, currentLevel: levelId }));
    setCurrentAnswers([]);
    setIsCorrect(null);
    setShowFeedback(false);
  };

  const nextLevel = () => {
    if (state.currentLevel < QUESTS.length) {
      goToLevel(state.currentLevel + 1);
    }
  };

  return {
    state,
    currentQuest,
    currentAnswers,
    isCorrect,
    isSecretMode,
    showFeedback,
    setShowFeedback,
    handleAnswerChange,
    verifyQuest,
    revealSecret,
    nextLevel,
    goToLevel,
  };
};
