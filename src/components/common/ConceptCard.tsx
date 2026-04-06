import type { ConceptCardProps } from '@/types';

/**
 * 概念卡片 - 用于展示每个 React 核心概念
 * 演示知识点：函数组件、Props、children
 */
const ConceptCard: React.FC<ConceptCardProps> = ({ title, emoji, description, tags, children }) => {
  return (
    <div className="concept-card animate-fade-in-up">
      <h3>
        <span className="card-emoji">{emoji}</span>
        {title}
        {tags?.map((tag) => (
          <span key={tag.text} className={`tip-tag ${tag.type}`}>
            {tag.text}
          </span>
        ))}
      </h3>
      <p className="card-desc">{description}</p>
      {children}
    </div>
  );
};

export default ConceptCard;
