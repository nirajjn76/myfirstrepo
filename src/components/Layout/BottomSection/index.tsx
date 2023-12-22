import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import Content from './Content';

const BottomSection: React.FC = ({ children }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleSidebarMouseOver = useCallback(() => {
    setExpanded(true);
  }, [setExpanded]);

  const handleSidebarMouseOut = useCallback(() => {
    setExpanded(false);
  }, [setExpanded]);

  return (
    <div className="bottom-section" data-testid="bottom-main">
      <Sidebar expanded={expanded} onSidebarMouseOver={handleSidebarMouseOver} onSidebarMouseOut={handleSidebarMouseOut} />
      <Content expanded={expanded}>{children}</Content>
    </div>
  );
};

export default BottomSection;
