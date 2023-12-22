import React, {
  useRef, useEffect, useState, useCallback,
} from 'react';
import { Tooltip } from '@material-ui/core';
import clsx from 'clsx';

export interface ElipsisTextProps {
  text: string;
  node?: React.ReactNode;
  className?: string;
  width: string;
}

const ElipsisText: React.FC<ElipsisTextProps> = ({
  node, text, className, width,
}) => {
  const textElementRef = useRef(null);
  const [hoverStatus, setHover] = useState(false);

  const compareSize = useCallback(() => {
    // @ts-ignore
    const compare = textElementRef.current.scrollWidth > textElementRef.current.clientWidth;
    setHover(compare);
  }, [setHover, textElementRef]);

  useEffect(() => {
    compareSize();
  }, [text]);

  return (
    // <div style={{ width: width || '100%' }}>
    <Tooltip
      title={text}
      arrow
      disableHoverListener={!hoverStatus}
      classes={{
        tooltip: 'tooltip',
      }}
    >
      <div className={clsx('elipsis', className && className)} ref={textElementRef} style={{ maxWidth: width }}>
        {node || text}
      </div>
    </Tooltip>
    // </div>
  );
};

export default ElipsisText;
