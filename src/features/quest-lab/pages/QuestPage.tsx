import React, { useState } from 'react';
import { Space, Card, Tag, Typography, Button, Input } from 'antd';
import { CompassOutlined } from '@ant-design/icons';
import { useQuestEngine } from '../hooks/useQuestEngine';
import { ComparisonCard } from '../components/ComparisonCard';
import { FeedbackModal } from '../components/FeedbackModal';
import { LevelMapModal } from '../components/LevelMapModal';
import { QUESTS } from '../constants/quests';
import './QuestPage.css';

const { Title, Paragraph, Text } = Typography;

/**
 * React 闯关实验室 - 主页面
 * 专门为有 Vue 背景的人士定制的交互式 React 学习体验
 */
const QuestPage: React.FC = () => {
  const {
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
  } = useQuestEngine();

  const [isMapOpen, setIsMapOpen] = useState(false);

  // 根据 codeTemplate 进行动态渲染 (将下划线替换为 Input)
  const renderInteractiveCode = () => {
    const parts = currentQuest.codeTemplate.split('_______');
    return (
      <pre className="quest-code-panel">
        <span className="quest-code-panel__watermark" aria-hidden>
          ⚔ React 阵法残卷
        </span>
        {parts.map((p, i) => (
          <span key={i}>
            {p}
            {i < parts.length - 1 && (
              <Input
                className="quest-blank-input"
                placeholder="···"
                size="small"
                value={currentAnswers[i] || ''}
                onChange={(e) => handleAnswerChange(i, e.target.value)}
              />
            )}
          </span>
        ))}
      </pre>
    );
  };

  return (
    <div className="quest-lab-container">
      <header className="quest-page-header">
        <div className="quest-page-header__text">
          <Title level={2} className="quest-page-title">
            React 闯关实验室
          </Title>
          <Paragraph className="quest-page-subtitle">
            从 Vue 迁移到 React：十大核心阵法大通关，穿越底层认知藩篱。
          </Paragraph>
        </div>
        <Button
          type="primary"
          icon={<CompassOutlined />}
          size="large"
          className="quest-map-btn"
          onClick={() => setIsMapOpen(true)}
        >
          全息星图 ({state.currentLevel}/100)
        </Button>
      </header>

      <div className="quest-layout">
        <div className="quest-battleground">
          <Card
            className="quest-main-card"
            title={
              <Space size={10}>
                <Tag color={currentQuest.level.includes('10') ? 'magenta' : 'geekblue'}>{currentQuest.level}</Tag>
                <span style={{ fontWeight: 600, color: 'rgba(241, 245, 249, 0.95)' }}>{currentQuest.title}</span>
              </Space>
            }
            extra={<Text type="secondary">#{String(currentQuest.id).padStart(3, '0')}</Text>}
          >
            <div className="quest-concept-panel">{currentQuest.concept}</div>

            <h3 className="quest-section-label">阵法残片（练习区）</h3>
            {renderInteractiveCode()}

            <div className="quest-actions">
              <Button type="primary" size="large" className="quest-btn-verify" onClick={verifyQuest}>
                破阵 Verify
              </Button>
              <Button size="large" className="quest-btn-secret" onClick={revealSecret}>
                武林秘籍 Solution
              </Button>
            </div>
          </Card>
        </div>

        <aside className="quest-knowledge">
          <ComparisonCard analogy={currentQuest.vueAnalogy} />

          <Card className="quest-stats-card" title="战绩" size="small">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text type="secondary">已破阵法</Text>
              <Text strong style={{ fontSize: 16, fontVariantNumeric: 'tabular-nums' }}>
                {state.completedLevels.length} / {QUESTS.length}
              </Text>
            </div>
          </Card>
        </aside>
      </div>

      <FeedbackModal
        open={showFeedback}
        onClose={() => setShowFeedback(false)}
        isCorrect={isCorrect}
        isSecretMode={isSecretMode}
        quest={currentQuest}
        onNext={nextLevel}
      />

      <LevelMapModal 
        open={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        quests={QUESTS}
        currentLevelId={state.currentLevel}
        completedLevelIds={state.completedLevels}
        onSelectLevel={goToLevel}
      />
    </div>
  );
};

export default QuestPage;
