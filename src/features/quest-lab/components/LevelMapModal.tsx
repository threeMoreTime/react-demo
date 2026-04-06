import React, { useState, useEffect } from 'react';
import { Modal, Tabs, Tooltip } from 'antd';
import type { Quest } from '../types';
import './LevelMapModal.css';

interface LevelMapModalProps {
  open: boolean;
  onClose: () => void;
  quests: Quest[];
  currentLevelId: number;
  completedLevelIds: number[];
  onSelectLevel: (id: number) => void;
}

export const LevelMapModal: React.FC<LevelMapModalProps> = ({
  open,
  onClose,
  quests,
  currentLevelId,
  completedLevelIds,
  onSelectLevel
}) => {
  // 我们根据题库数量，切割出批次，比如每 10 题一个 Tab
  // 计算总页数
  const batchSize = 10;
  const totalBatches = Math.ceil(quests.length / batchSize);
  
  // 算出目前所处第几大关并自动切过去
  const defaultActiveBatch = Math.ceil(currentLevelId / batchSize).toString();
  const [activeTab, setActiveTab] = useState(defaultActiveBatch);

  // 当弹窗打开或者当前关卡变动时，把视口追随到所在的批次
  useEffect(() => {
    if (open) {
      setActiveTab(Math.ceil(currentLevelId / batchSize).toString() || '1');
    }
  }, [open, currentLevelId]);

  const handleSelect = (id: number) => {
    onSelectLevel(id);
    onClose();
  };

  // 构造 Tabs 数组序列点
  const tabItems = Array.from({ length: totalBatches }).map((_, idx) => {
    const batchNum = idx + 1;
    // 切割这 10 个数据
    const batchData = quests.slice(idx * batchSize, batchNum * batchSize);
    
    // 生成网格 UI
    const gridContent = (
      <div className="quest-grid-container">
        {batchData.map(q => {
          const isCompleted = completedLevelIds.includes(q.id);
          const isCurrent = currentLevelId === q.id;

          let nodeClass = "quest-node";
          if (isCurrent) nodeClass += " status-current";
          else if (isCompleted) nodeClass += " status-completed";

          return (
            <Tooltip 
              key={q.id} 
              title={q.title} 
              mouseEnterDelay={0.2}
              placement="top"
              color={isCompleted ? '#10b981' : (isCurrent ? '#f59e0b' : '#334155')}
            >
              <div className={nodeClass} onClick={() => handleSelect(q.id)}>
                {isCurrent && <div className="quest-node-current-pin">⚡</div>}
                <div className="quest-node-id">{q.id}</div>
                <div className="quest-node-tag">{q.level}</div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    );

    let tabLabel = `批次 ${batchNum}`;
    if (batchNum === 1) tabLabel = '始源滩涂 (1)';
    if (batchNum === 2) tabLabel = '状态深谷 (2)';
    if (batchNum === 3) tabLabel = '事件熔炉 (3)';
    if (batchNum === 4) tabLabel = '钩子长城 (4)';
    if (batchNum === 5) tabLabel = '架构法阵 (5)';
    if (batchNum === 6) tabLabel = '进阶并发 (6)';
    if (batchNum === 7) tabLabel = '优化界桥 (7)';
    if (batchNum === 8) tabLabel = '陷阱虚空 (8)';
    if (batchNum === 9) tabLabel = '万灵生态 (9)';
    if (batchNum === 10) tabLabel = '源码神脊 (10)';

    return {
      key: batchNum.toString(),
      label: tabLabel,
      children: gridContent
    };
  });

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1000} /* 给一个巨大宽广的底座展示 */
      centered /* 让它像浮岛一样居中 */
      className="quest-map-modal"
      closable={true}
      title={null}
    >
      <div className="quest-map-title-bar">
        <h2 className="quest-map-title">✨ React 星海全息图册</h2>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
          已破阵: <span style={{ color: '#10b981', fontWeight: 'bold' }}>{completedLevelIds.length}</span> / {quests.length}
        </div>
      </div>
      
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab} 
        items={tabItems} 
        tabPosition="top"
        animated={{ inkBar: true, tabPane: true }}
      />
    </Modal>
  );
};
