import React, { useState } from 'react';
import { Space, Card, Tag, Typography, Button, Input } from 'antd';
import { CompassOutlined } from '@ant-design/icons';
import { useQuestEngine } from '../hooks/useQuestEngine';
import { ComparisonCard } from '../components/ComparisonCard';
import { FeedbackModal } from '../components/FeedbackModal';
import { LevelMapModal } from '../components/LevelMapModal';
import { QUESTS } from '../constants/quests';

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
      <pre 
        style={{ 
          background: '#121214', 
          padding: '24px', 
          borderRadius: 8, 
          border: '1px solid var(--border-subtle)',
          color: '#e6edf3',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          whiteSpace: 'pre-wrap',
          lineHeight: 2.2,
          position: 'relative'
        }}
      >
        {parts.map((p, i) => (
          <span key={i}>
            {p}
            {i < parts.length - 1 && (
              <Input
                style={{ 
                  width: 100, 
                  margin: '0 8px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderBottom: '2px solid var(--color-accent)',
                  border: 'none',
                  color: 'var(--color-accent-light)',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  boxShadow: 'none'
                }}
                placeholder="..."
                size="small"
                value={currentAnswers[i] || ''}
                onChange={(e) => handleAnswerChange(i, e.target.value)}
              />
            )}
          </span>
        ))}
        {/* 背景装饰 */}
        <div style={{ position: 'absolute', top: 12, right: 12, fontSize: 10, color: 'var(--text-muted)', opacity: 0.5 }}>
          ⚔️ React 阵法残卷
        </div>
      </pre>
    );
  };

  return (
    <div className="quest-lab-container">
      <div className="page-header" style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>⚔️ React 闯关实验室</Title>
          <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
            从 Vue 迁移到 React：十大核心阵法大通关，穿越底层认知藩篱。
          </Paragraph>
        </div>
        <Button 
          type="primary" 
          icon={<CompassOutlined />} 
          size="large"
          style={{ 
            background: 'linear-gradient(90deg, #6366f1, #3b82f6)',
            border: 'none',
            borderRadius: 8,
            boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)'
          }}
          onClick={() => setIsMapOpen(true)}
        >
          查看全息星图 ({state.currentLevel}/100)
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* 左侧：题目与交互区 */}
        <div className="quest-battleground">
          <Card 
            title={
              <Space>
                <Tag color={currentQuest.level.includes('10') ? 'red' : 'blue'}>{currentQuest.level}</Tag>
                <span>{currentQuest.title}</span>
              </Space>
            }
            extra={<Text type="secondary">ID: {String(currentQuest.id).padStart(3, '0')}</Text>}
            style={{ borderRadius: 12, border: '1px solid var(--border-subtle)', background: 'transparent' }}
          >
            <Paragraph style={{ marginBottom: 24, padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 8 }}>
              {currentQuest.concept}
            </Paragraph>

            <Title level={5} style={{ marginBottom: 16 }}>阵法残片 (练习区)：</Title>
            {renderInteractiveCode()}

            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <Space size="large">
                <Button 
                  type="primary" 
                  size="large" 
                  onClick={verifyQuest}
                  style={{ width: 200, height: 50, borderRadius: 25, background: 'var(--gradient-primary)', border: 'none' }}
                >
                  破阵 (Verify)
                </Button>
                <Button 
                  size="large" 
                  onClick={revealSecret}
                  style={{ 
                    width: 200, 
                    height: 50, 
                    borderRadius: 25, 
                    borderColor: '#ffd700', 
                    color: '#ffd700',
                    background: 'rgba(255, 215, 0, 0.05)'
                  }}
                >
                  📜 武林秘籍 (Solution)
                </Button>
              </Space>
            </div>
          </Card>
        </div>

        {/* 右侧：跨框架对比 */}
        <div className="quest-knowledge">
          <ComparisonCard analogy={currentQuest.vueAnalogy} />
          
          <Card title="🏆 战绩" size="small" style={{ borderRadius: 12, border: '1px solid var(--border-subtle)', background: 'transparent' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text type="secondary">已破阵法</Text>
              <Text strong>{state.completedLevels.length} / {QUESTS.length}</Text>
            </div>
          </Card>
        </div>
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
