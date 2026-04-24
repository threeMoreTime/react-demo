import { Modal, Typography, Space, Divider, Alert, Badge, Tag, Button } from 'antd';
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
      <div className="quest-feedback-modal__hero">
        <div className="quest-feedback-modal__emoji" aria-hidden>
          {isSecretMode ? '📜' : isCorrect ? '✨' : '◇'}
        </div>
        <Title level={3} style={{ marginTop: 0 }}>
          {isSecretMode ? '武林秘籍：破阵锦囊' : isCorrect ? '破阵成功' : '再思破阵之法'}
        </Title>
        <Paragraph type="secondary">
          {isSecretMode
            ? '此处记载了此阵法的破解之钥，详读可助你登峰造极'
            : isCorrect
              ? `你已解开「${quest.title}」的关窍`
              : '在 React 的世界里，走弯路也是加深理解的一部分'}
        </Paragraph>
      </div>

      {isSecretMode && (
        <div className="quest-feedback-modal__secret-box">
          <Text strong className="quest-feedback-modal__secret-label">
            正确答案
          </Text>
          <div className="quest-feedback-modal__tags">
            {quest.missingParts.map((part, idx) => (
              <Tag key={idx} color="gold" style={{ fontSize: 13, fontWeight: 600, padding: '4px 12px' }}>
                {part}
              </Tag>
            ))}
          </div>
        </div>
      )}

      <Divider style={{ margin: '16px 0', borderColor: 'rgba(255,255,255,0.08)' }} />

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={5} className="quest-feedback-modal__section-title">
            <AuditOutlined className="icon-audit" />
            战后复盘
          </Title>
          <div className="quest-feedback-modal__panel">
            <Paragraph className="quest-feedback-modal__panel-text">{quest.explanation.howItWorks}</Paragraph>
          </div>
        </div>

        <div>
          <Title level={5} className="quest-feedback-modal__section-title">
            <RocketOutlined className="icon-rocket" />
            原理破壁
          </Title>
          <Alert
            message="底层原理剖析"
            description={
              <Text style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(226,232,240,0.88)' }}>
                {quest.explanation.deepDive}
              </Text>
            }
            type="info"
            showIcon
            icon={<RocketOutlined className="icon-rocket" />}
          />
        </div>

        <div>
          <Title level={5} className="quest-feedback-modal__section-title">
            <CompassOutlined className="icon-compass" />
            悟道总结
          </Title>
          <Badge.Ribbon text="悟" color="#10b981">
            <div className="quest-feedback-modal__conclusion-wrap">
              <div className="quest-feedback-modal__conclusion">
                <Paragraph strong>「{quest.explanation.conclusion}」</Paragraph>
              </div>
            </div>
          </Badge.Ribbon>
        </div>
      </Space>

      <div className="quest-feedback-modal__footer">
        <Button
          type="primary"
          size="large"
          block
          className="quest-feedback-modal__action"
          onClick={isCorrect ? onNext : onClose}
        >
          {isCorrect ? '开启下一道关卡' : '我再想想'}
        </Button>
      </div>
    </Modal>
  );
};
