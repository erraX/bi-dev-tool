import React, { Children, useState } from 'react';
import clsx from 'clsx';

const VerticalSplitPanel = ({ children }) => {
  const childrenNum = Children.count(children);
  const isOnlyLeft = childrenNum === 1;
  const hasChildren = childrenNum === 0;

  const leftPanel = isOnlyLeft ? children : children[0];
  const rightPanel = children[1];

  return (
    <div className="vertical-split-panel">
      <leftPanel.type
        {...leftPanel.props}
        className="left"
        style={{ width: '50%' }}
      />
      <rightPanel.type
        {...rightPanel.props}
        className="right"
        style={{ width: '50%' }}
      />
    </div>
  );
};

const Panel = ({ className, children, style }) => (
  <div className={clsx('vertical-split-panel__panel', className)} style={style}>
    {children}
  </div>
);

VerticalSplitPanel.Panel = Panel;

export default VerticalSplitPanel;
