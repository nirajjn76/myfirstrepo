import React from 'react';
import clsx from 'clsx';
import Expanded from './expanded';
import Collapsed from './collapsed';

interface SidebarProps {
  expanded: boolean;
  onSidebarMouseOver: () => void;
  onSidebarMouseOut: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded, onSidebarMouseOver, onSidebarMouseOut }) => {
  return (
    <div className={clsx('sidebar-root', expanded && 'expanded')} onMouseEnter={onSidebarMouseOver} onMouseLeave={onSidebarMouseOut} data-testid="sidebar-main">
      {expanded ? <Expanded /> : <Collapsed />}
    </div>
  );
};

export default Sidebar;
