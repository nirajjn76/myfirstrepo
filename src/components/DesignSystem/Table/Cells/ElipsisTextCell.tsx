import React, { useRef, useEffect, useState } from 'react';
import { TableCell, Tooltip } from '@material-ui/core';
import clsx from 'clsx';

export interface ElipsisTextProps {
  text: string;
  align: 'left' | 'center' | 'right';
  width: string;
  node?: React.ReactNode;
  className?: string;
}

const ElipsisText: React.FC<ElipsisTextProps> = ({
  node, text, align, width, className,
}) => {
  const textElementRef = useRef(null);
  const [hoverStatus, setHover] = useState(false);

  const compareSize = () => {
    // @ts-ignore
    const compare = textElementRef.current.scrollWidth > textElementRef.current.clientWidth;
    setHover(compare);
  };

  useEffect(() => {
    compareSize();
  }, [text]);

  return (
    <TableCell align={align} style={{ width }}>
      <Tooltip
        title={text}
        arrow
        disableHoverListener={!hoverStatus}
        classes={{
          tooltip: 'tooltip',
        }}
      >
        <div className={clsx('elipsis', className && className)} ref={textElementRef} style={{ maxWidth: width.replace('%', 'vw') }}>
          {node || text}
        </div>
      </Tooltip>
    </TableCell>
  );
};

export default ElipsisText;
