import type { DemoAreaProps } from '@/types';

/**
 * 交互演示区域 - 包裹可运行的示例
 * 演示知识点：children 插槽模式
 */
const DemoArea: React.FC<DemoAreaProps> = ({ title = '实时演示', children }) => {
  return (
    <div className="demo-area">
      <div className="demo-area-title">{title}</div>
      {children}
    </div>
  );
};

export default DemoArea;
