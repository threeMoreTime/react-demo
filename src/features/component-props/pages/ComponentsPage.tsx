import { useState } from 'react';
import { Button, Space, Avatar, Card, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ConceptCard from '@/components/common/ConceptCard';
import CodeBlock from '@/components/common/CodeBlock';
import DemoArea from '@/components/common/DemoArea';

/**
 * 组件与 Props 页面
 * 核心知识点：函数组件、Props 传值、默认值、children、组件组合
 */

// ===== 1. 基本函数组件与 Props =====

/** 用户信息卡 Props */
interface UserCardProps {
  name: string;
  role?: string; // 可选 Props
  avatarColor?: string;
}

/** 用户信息卡组件 - 演示 Props 传值 */
const UserCard: React.FC<UserCardProps> = ({ name, role = '学员', avatarColor = '#6366f1' }) => {
  return (
    <Card
      size="small"
      style={{
        background: 'rgba(30, 30, 60, 0.6)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 12,
        width: 200,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar size={48} style={{ backgroundColor: avatarColor }} icon={<UserOutlined />} />
        <div style={{ marginTop: 8, color: 'var(--text-primary)', fontWeight: 600, fontSize: 15 }}>
          {name}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{role}</div>
      </div>
    </Card>
  );
};

const PropsDemo: React.FC = () => {
  return (
    <ConceptCard
      title="Props 传值与默认值"
      emoji="📦"
      description="Props 是组件的输入参数，父组件通过属性传递数据给子组件。使用 TypeScript 的 interface 定义 Props 类型，用解构赋值设置默认值。"
      tags={[{ text: '核心', type: 'core' }]}
    >
      <CodeBlock
        label="TSX"
        code={`// 1. 定义 Props 接口
interface UserCardProps {
  name: string;        // 必传
  role?: string;       // 可选（? 标记）
  avatarColor?: string;
}

// 2. 函数组件中解构 Props，并设置默认值
const UserCard: React.FC<UserCardProps> = ({
  name,
  role = '学员',           // 默认值
  avatarColor = '#6366f1',
}) => {
  return <Card>...</Card>;
};

// 3. 使用组件时传入 Props
<UserCard name="张三" />
<UserCard name="李四" role="讲师" avatarColor="#8b5cf6" />`}
      />
      <DemoArea>
        <Space size="middle" wrap>
          <UserCard name="张三" />
          <UserCard name="李四" role="讲师" avatarColor="#8b5cf6" />
          <UserCard name="王五" role="助教" avatarColor="#06b6d4" />
        </Space>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 2. Children 插槽模式 =====

/** 高亮边框 Props */
interface HighlightBoxProps {
  color?: string;
  title: string;
  children: React.ReactNode;
}

/** 高亮容器 - 演示 children 模式 */
const HighlightBox: React.FC<HighlightBoxProps> = ({ color = '#6366f1', title, children }) => {
  return (
    <div
      style={{
        border: `2px solid ${color}`,
        borderRadius: 12,
        padding: 16,
        background: `${color}10`,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 8 }}>{title}</div>
      <div style={{ color: 'var(--text-primary)', fontSize: 14 }}>{children}</div>
    </div>
  );
};

const ChildrenDemo: React.FC = () => {
  return (
    <ConceptCard
      title="Children 插槽模式"
      emoji="🎁"
      description="React.ReactNode 类型的 children 让组件可以嵌套任意内容，类似于 Vue 的 slot。这是实现可复用容器组件的核心模式。"
      tags={[{ text: '核心', type: 'core' }]}
    >
      <CodeBlock
        label="TSX"
        code={`interface HighlightBoxProps {
  color?: string;
  title: string;
  children: React.ReactNode; // 接收嵌套内容
}

const HighlightBox: React.FC<HighlightBoxProps> = ({
  color = '#6366f1',
  title,
  children,  // 嵌套的 JSX 会作为 children 传入
}) => (
  <div style={{ border: \`2px solid \${color}\` }}>
    <div>{title}</div>
    <div>{children}</div>  {/* 渲染嵌套内容 */}
  </div>
);

// 使用时，标签之间的内容自动成为 children
<HighlightBox title="提示" color="#06b6d4">
  <p>这段内容会作为 children 传入组件</p>
</HighlightBox>`}
      />
      <DemoArea>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <HighlightBox title="💡 学习提示" color="#6366f1">
            Props 是<strong>只读的</strong>，子组件不能直接修改父组件传入的 Props。
          </HighlightBox>
          <HighlightBox title="⚠️ 注意事项" color="#f59e0b">
            children 可以是<strong>任何 React 可渲染的内容</strong>：字符串、JSX、组件、甚至函数(Render Props 模式)。
          </HighlightBox>
          <HighlightBox title="✅ 最佳实践" color="#22c55e">
            用 TypeScript 的 <code>React.ReactNode</code> 类型标注 children，确保类型安全。
          </HighlightBox>
        </Space>
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 3. 组件组合 vs 继承 =====
const CompositionDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'composition' | 'vs'>('composition');

  return (
    <ConceptCard
      title="组件组合（推荐模式）"
      emoji="🏗️"
      description="React 推崇组合而非继承。通过 Props 和 Children 将小组件组合成复杂 UI，实现高度可复用和灵活的组件架构。"
      tags={[{ text: '重要', type: 'important' }]}
    >
      <DemoArea title="组合模式演示">
        <Space style={{ marginBottom: 16 }}>
          <Button
            type={activeTab === 'composition' ? 'primary' : 'default'}
            onClick={() => setActiveTab('composition')}
            size="small"
          >
            组合模式
          </Button>
          <Button
            type={activeTab === 'vs' ? 'primary' : 'default'}
            onClick={() => setActiveTab('vs')}
            size="small"
          >
            对比说明
          </Button>
        </Space>

        {activeTab === 'composition' ? (
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12 }}>
              下面的 UserCard 和 HighlightBox 就是通过 Props + Children 组合而成的：
            </p>
            <HighlightBox title="🧩 组合示例" color="#8b5cf6">
              <Space wrap>
                <UserCard name="组合示例" role="嵌套在 HighlightBox 中" avatarColor="#ec4899" />
              </Space>
            </HighlightBox>
          </div>
        ) : (
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 2 }}>
            <p>🔴 <strong>继承</strong>：React 不推荐组件继承，因为会导致紧耦合和脆弱的层级关系。</p>
            <Divider style={{ borderColor: 'var(--border-subtle)', margin: '8px 0' }} />
            <p>🟢 <strong>组合</strong>：通过 Props 和 Children 灵活组装，每个组件保持单一职责。</p>
            <Divider style={{ borderColor: 'var(--border-subtle)', margin: '8px 0' }} />
            <p>🟢 <strong>高阶组件(HOC)</strong>：用函数包装组件，增强功能（如权限控制、日志记录）。</p>
            <Divider style={{ borderColor: 'var(--border-subtle)', margin: '8px 0' }} />
            <p>🟢 <strong>Render Props</strong>：通过函数类型的 Props 共享逻辑（已被 Hooks 大量替代）。</p>
          </div>
        )}
      </DemoArea>
    </ConceptCard>
  );
};

// ===== 页面主体 =====
const ComponentsPage: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <h2>🧩 组件与 Props</h2>
        <p>
          组件是 React 应用的基本构建块。函数组件接收 Props 输入并返回 JSX 视图。
          理解 Props 的单向数据流和 Children 插槽模式是掌握 React 的关键。
        </p>
      </div>

      <PropsDemo />
      <ChildrenDemo />
      <CompositionDemo />
    </div>
  );
};

export default ComponentsPage;
