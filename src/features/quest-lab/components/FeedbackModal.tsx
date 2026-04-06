import { Modal, Typography, Space, Divider, Alert, Badge, Tag } from 'antd';
import { RocketOutlined, AuditOutlined, CompassOutlined } from '@ant-design/icons';
import type { Quest } from '../types';

const { Title, Paragraph, Text } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
  isCorrect: boolean | null;
  isSecretMode?: boolean;
  quest: Quest;
  onNext: () => void;
}

/**
 * 破阵复盘弹窗 (Feedback & Deep Dive)
 * 无论对错都会弹出，因为学习底层原理比对错更重要
 */
export const FeedbackModal: React.FC<Props> = ({ open, onClose, isCorrect, isSecretMode, quest, onNext }) => {
  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
      style={{ top: 20 }}
      maskClosable={false}
      className={`quest-feedback-modal ${isSecretMode ? 'secret' : isCorrect ? 'correct' : 'incorrect'}`}
    >
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>
          {isSecretMode ? '📜' : isCorrect ? '🎉 战法圆满' : '⚠️ 气机不顺'}
        </div>
        <Title level={3} style={{ marginTop: 0 }}>
          {isSecretMode ? '武林秘籍：破阵锦囊' : isCorrect ? '破阵成功！' : '再思破阵之法'}
        </Title>
        <Paragraph type="secondary">
          {isSecretMode 
            ? '此处记载了此阵法的破解之钥，详读可助你登峰造极' 
            : isCorrect ? `恭喜你解开了【${quest.title}】的奥秘` : '没关系，React 的世界中，失败是认知的良药'}
        </Paragraph>
      </div>

      {isSecretMode && (
        <div style={{ padding: '16px', background: 'rgba(255, 215, 0, 0.1)', borderRadius: 12, border: '1px solid #ffd700', marginBottom: 24 }}>
          <Text strong style={{ color: '#d4af37', display: 'block', marginBottom: 8 }}>正确真气运行路径 (正确答案)：</Text>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {quest.missingParts.map((part, idx) => (
              <Tag key={idx} color="gold" style={{ fontSize: 14, fontWeight: 'bold' }}>{part}</Tag>
            ))}
          </div>
        </div>
      )}

      <Divider style={{ margin: '16px 0' }} />

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 1. 逻辑解析 (How it works) */}
        <div>
          <Title level={5}>
            <AuditOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            战后复盘 (Code Analysis)
          </Title>
          <div style={{ padding: '12px 16px', borderRadius: 8, background: 'rgba(24, 144, 255, 0.05)', marginTop: 8 }}>
            <Paragraph style={{ marginBottom: 0, fontSize: 13, lineHeight: 1.7 }}>
              {quest.explanation.howItWorks}
            </Paragraph>
          </div>
        </div>

        {/* 2. 深度原理解析 (Principle Deep Dive) */}
        <div>
          <Title level={5}>
            <RocketOutlined style={{ marginRight: 8, color: '#6366f1' }} />
            原理破壁 (Deep Principle)
          </Title>
          <Alert 
            message="底层原理剖析"
            description={
              <Text style={{ fontSize: 13, lineHeight: 1.8 }}>
                {quest.explanation.deepDive}
              </Text>
            }
            type="info"
            showIcon
            icon={<RocketOutlined />}
            style={{ borderRadius: 12, border: '1px solid rgba(99, 102, 241, 0.2)' }}
          />
        </div>

        {/* 3. 悟道总结 */}
        <div>
          <Title level={5}>
            <CompassOutlined style={{ marginRight: 8, color: '#52c41a' }} />
            悟道总结
          </Title>
          <Badge.Ribbon text="悟" color="green">
            <div style={{ padding: '20px', borderRadius: 12, border: '1px dashed #52c41a', background: 'rgba(82, 196, 26, 0.02)' }}>
              <Paragraph strong style={{ marginBottom: 0, textAlign: 'center', fontSize: 16, fontStyle: 'italic', color: '#52c41a' }}>
                “ {quest.explanation.conclusion} ”
              </Paragraph>
            </div>
          </Badge.Ribbon>
        </div>
      </Space>

      <div style={{ marginTop: 32, textAlign: 'right' }}>
        <button 
          className="btn-primary" 
          onClick={isCorrect ? onNext : onClose}
          style={{ width: '100%', height: 44, fontSize: 15 }}
        >
          {isCorrect ? '开启下一道关卡 ➡️' : '我再想想'}
        </button>
      </div>
    </Modal>
  );
};
