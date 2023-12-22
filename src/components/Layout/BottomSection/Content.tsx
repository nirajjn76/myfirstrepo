import React from 'react';
import clsx from 'clsx';

interface ContentProps {
  expanded: boolean;
}

const Content: React.FC<ContentProps> = ({ expanded, children }) => {
  return (
    <div className={clsx('content-root', expanded && 'expanded')} data-testid="content-main">{children}</div>
  );
};

export default Content;
