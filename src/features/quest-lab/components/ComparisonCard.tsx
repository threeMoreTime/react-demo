import { Card, Tag, Space, Typography, Badge } from 'antd';
import type { VueAnalogy } from '../types';

const { Text, Paragraph } = Typography;

interface Props {
  analogy: VueAnalogy;
}

/**
 * 跨框架对比卡片 (Vue vs React)
 * 专门为有 Vue 背景的开发者设计的认知同步工具
 */
export const ComparisonCard: React.FC<Props> = ({ analogy }) => {
  return (
    <Card
      className="comparison-card-shell"
      title={
        <Space size={10}>
          <Badge status="processing" color="#22d3ee" />
          <span className="comparison-card-shell__title">破阵心法 · 跨框架同步</span>
        </Space>
      }
    >
      <div className="comparison-card__block">
        <Tag className="comparison-card__tag comparison-card__tag--vue">Vue 对应</Tag>
        <Paragraph className="comparison-card__lead">{analogy.vueFeature}</Paragraph>
      </div>

      <div className="comparison-card__block">
        <Tag className="comparison-card__tag comparison-card__tag--react">React 差异</Tag>
        <Paragraph className="comparison-card__body">{analogy.reactDifference}</Paragraph>
      </div>

      <div className="comparison-card__tips">
        <Text strong className="comparison-card__tips-label">
          避坑指南 · Vue 开发者提示
        </Text>
        <Text className="comparison-card__tips-body">{analogy.tips}</Text>
      </div>
    </Card>
  );
};
