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
      className="comparison-card"
      title={
        <Space>
          <Badge status="processing" color="var(--color-accent)" />
          <span style={{ fontSize: 16 }}>破阵心法：跨框架同步</span>
        </Space>
      }
      style={{ 
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 12,
        marginBottom: 24,
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <Tag color="cyan" style={{ marginBottom: 8 }}>Vue 中的对应物</Tag>
        <Paragraph style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
          {analogy.vueFeature}
        </Paragraph>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Tag color="purple" style={{ marginBottom: 8 }}>React 核心差异</Tag>
        <Paragraph style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          {analogy.reactDifference}
        </Paragraph>
      </div>

      <div style={{ 
        padding: '12px 16px', 
        background: 'rgba(255, 193, 7, 0.05)', 
        borderRadius: 8,
        borderLeft: '4px solid #ffc107'
      }}>
        <Text type="warning" strong style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
          💡 避坑指南 (Vue Developer Tips)
        </Text>
        <Text style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          {analogy.tips}
        </Text>
      </div>
    </Card>
  );
};
