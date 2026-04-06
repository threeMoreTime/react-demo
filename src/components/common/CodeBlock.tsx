import type { CodeBlockProps } from '@/types';

/**
 * 代码展示块 - 用于展示示例代码片段
 * 演示知识点：Props 默认值、条件渲染
 */
const CodeBlock: React.FC<CodeBlockProps> = ({ code, label = 'JSX' }) => {
  return (
    <div className="code-block">
      {label && <span className="code-label">{label}</span>}
      <pre>{code}</pre>
    </div>
  );
};

export default CodeBlock;
