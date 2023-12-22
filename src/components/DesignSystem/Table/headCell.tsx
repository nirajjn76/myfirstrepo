import React, { useCallback, useState } from 'react';
import { TableCell, TableSortLabel, Tooltip } from '@material-ui/core';
import SortAsc from '@material-ui/icons/ArrowDownward';
import SortDesc from '@material-ui/icons/ArrowUpward';
import clsx from 'clsx';
import { SortOrder } from '../../../enums';
import { HeadCellType } from '../../../utils/appConstants';
import InfoIcon from '../../../assets/images/info-icon.svg';
import searchIcon from '../../../assets/images/search-icon.svg';
import closeIcon from '../../../assets/images/ic-close search.svg';
import Input from '../input';

interface HeadCellProps {
  cell: HeadCellType;
  order?: SortOrder;
  orderBy?: string;
  onSortClick: (property: string, nextSortOrder: SortOrder) => void;
  onSearchClick: (property: string) => void
  onSearchClose: (property: string) => void;
}

const HeadCell: React.FC<HeadCellProps> = ({
  cell, order, orderBy, onSortClick, onSearchClick, onSearchClose,
}) => {
  const [isSearchInput, setIsSearchInput] = useState<boolean>(false);

  const handleSortClick = useCallback(() => {
    let nextSortOrder: SortOrder = SortOrder.asc;
    if (orderBy === cell.id) {
      if (order === SortOrder.asc) {
        nextSortOrder = SortOrder.desc;
      } else {
        nextSortOrder = SortOrder.asc;
      }
    }

    onSortClick(cell.id, nextSortOrder);
  }, [onSortClick, cell, orderBy]);

  const handleSearchClick = useCallback((e : any) => {
    e.stopPropagation();
    setIsSearchInput(true);
  }, [setIsSearchInput]);

  const handleCloseClick = useCallback(
    (e : any) => {
      setIsSearchInput(false);

      onSearchClose && onSearchClose(cell.id);
    },
    [setIsSearchInput, onSearchClose, cell.id],
  );
  const getSortIcon = useCallback(() => {
    if (orderBy === cell.id && order === SortOrder.asc) {
      return SortAsc;
    } if (orderBy === cell.id && order === SortOrder.desc) {
      return SortDesc;
    }
    return SortAsc;
  }, [order, orderBy, cell.id]);

  let content;
  if (isSearchInput && cell.searchEnabled) {
    content = (
      <div className="head-search">
        <Input autofocus onChange={onSearchClick} variant="input" name={cell.id} className="table-search-input" />
        <img className="close-icon-img" id={cell.id} onClick={handleCloseClick} src={closeIcon} alt="Info" />

      </div>

    );
  } else if (cell.searchEnabled && cell.sortEnabled) {
    content = (
      <TableSortLabel
        active
        onClick={handleSortClick}
        IconComponent={getSortIcon()}
        classes={{
          root: clsx('sort-label', orderBy === cell.id && 'selected'),
          icon: clsx('sort-icon', orderBy === cell.id && 'selected'),
        }}
        data-testid={order === SortOrder.desc && orderBy === cell.id ? 'sort-desc-label' : 'sort-asc-label'}
      >
        <span>
          {cell.label}

          {
            cell.tooltipTitle && (
              <Tooltip
                classes={{
                  tooltip: 'tooltip',
                }}
                title={cell.tooltipTitle}
                arrow
                placement={cell.tooltipPlacement || 'top'}
              >
                <img src={InfoIcon} alt="Info" />
              </Tooltip>
            )
          }

          {cell.searchEnabled
           && <img onClick={handleSearchClick} src={searchIcon} alt="Info" /> }

        </span>

      </TableSortLabel>
    );
  } else if (cell.sortEnabled) {
    content = (
      <TableSortLabel
        active
        onClick={handleSortClick}
        IconComponent={getSortIcon()}
        classes={{
          root: clsx('sort-label', orderBy === cell.id && 'selected'),
          icon: clsx('sort-icon', orderBy === cell.id && 'selected'),
        }}
        data-testid={order === SortOrder.desc && orderBy === cell.id ? 'sort-desc-label' : 'sort-asc-label'}
      >
        <span>
          {cell.label}
          {
            cell.tooltipTitle && (
              <Tooltip
                classes={{
                  tooltip: 'tooltip',
                }}
                title={cell.tooltipTitle}
                arrow
                placement={cell.tooltipPlacement || 'top'}
              >
                <img src={InfoIcon} alt="Info" />
              </Tooltip>
            )
          }
        </span>
      </TableSortLabel>
    );
  } else {
    content = (
      <span className="sort-label">
        {cell.label}
        {
          cell.tooltipTitle && (
            <Tooltip
              classes={{
                tooltip: 'tooltip',
              }}
              title={cell.tooltipTitle}
              arrow
              placement={cell.tooltipPlacement || 'top'}
            >
              <img src={InfoIcon} alt="Info" />
            </Tooltip>
          )
        }
      </span>
    );
  }

  return (
    <TableCell
      align={cell.align}
      padding={cell.disablePadding ? 'none' : 'normal'}
      sortDirection={orderBy === cell.id ? order : false}
      style={{ width: cell.width }}
    >
      {content}
    </TableCell>
  );
};

export default HeadCell;
