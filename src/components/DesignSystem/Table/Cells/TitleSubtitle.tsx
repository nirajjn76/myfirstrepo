import React from 'react';
import { TableCell } from '@material-ui/core';
import clsx from 'clsx';
import ElipsisText from './ElipsisText';
import SwipeIcon from '../../../../assets/images/swipe-icon.svg';

export interface TitleSubtitleProps {
  title: string | number;
  titleNode?: React.ReactNode;
  subTitle?: string | number;
  align: 'left' | 'center' | 'right';
  width: string;
  maxWidth: string;
  boldTitle?: boolean;
  boldSubtitle?: boolean;
  isSwipeIcon?: boolean;
}

const TitleSubtitle: React.FC<TitleSubtitleProps> = ({
  title, subTitle, align, width, titleNode, maxWidth, boldTitle, boldSubtitle, isSwipeIcon,
}) => {
  return (
    <TableCell align={align} width={width}>

      <div className={clsx(boldTitle && 'bold-font')} data-testid="title">
        <ElipsisText node={titleNode} text={title ? title.toString() : ''} width={maxWidth} />
      </div>
      {subTitle && (
        <div className={clsx('subtitle', boldSubtitle && 'bold-font')} data-testid="sub-title">
          <ElipsisText text={subTitle.toString()} width={maxWidth} />
          {isSwipeIcon && <span className={clsx(SwipeIcon && 'swipe-icon-table')}><img src={SwipeIcon} alt="Swipe" data-testid="swipe-icon" /></span>}
        </div>
      )}

    </TableCell>
  );
};

export default TitleSubtitle;
