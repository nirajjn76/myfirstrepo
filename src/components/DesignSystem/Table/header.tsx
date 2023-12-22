import React, { useCallback } from 'react';
import {
  TableHead, TableRow, TableCell, Checkbox,
} from '@material-ui/core';
import { SortOrder } from '../../../enums';
import { HeadCellType } from '../../../utils/appConstants';
import HeadCell from './headCell';
import CheckboxIcon from '../../../assets/images/checkbox-unchecked.svg';
import CheckboxCheckedIcon from '../../../assets/images/checkbox-checked.svg';
import CheckboxInntermentIcon from '../../../assets/images/checkbox-interment.svg';

interface TableHeaderProps {
  onRequestSort?: (property: string, nextSortOrder: SortOrder) => void;
  onRequestSearch?: (property: string) => void;
  order?: SortOrder;
  orderBy?: string;
  rowCount: number;
  headCells: HeadCellType[];
  rowSelectionAvailable: boolean;
  numSelected: number;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClose?: (property: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  order,
  orderBy,
  rowCount,
  headCells,
  onRequestSort,
  onRequestSearch,
  onSearchClose,
  numSelected,
  onSelectAllClick,
  rowSelectionAvailable,
}) => {
  const handleSortClick = useCallback((property: string, nextSortOrder: SortOrder) => {
    if (onRequestSort) {
      onRequestSort(property, nextSortOrder);
    }
  }, [onRequestSort]);

  const handleSearchClick = useCallback((property: string) => {
    if (onRequestSearch) {
      onRequestSearch(property);
    }
  }, [onRequestSearch]);

  const handleSearchClose = useCallback((property: string) => {
    if (onSearchClose) {
      onSearchClose(property);
    }
  }, [onSearchClose]);

  const cellContent = headCells.map((headCell) => {
    return (
      <HeadCell
        key={headCell.id}
        cell={headCell}
        order={order}
        orderBy={orderBy}
        onSortClick={handleSortClick}
        onSearchClick={handleSearchClick}
        onSearchClose={handleSearchClose}
      />
    );
  });

  return (
    <TableHead>
      <TableRow className="table-head-row">
        {rowSelectionAvailable && (
          <TableCell width="5vw">
            <Checkbox
              classes={{
                root: 'selection-checkbox',
              }}
              color="default"
              indeterminate={rowSelectionAvailable && numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              icon={<img src={CheckboxIcon} alt="Checkbox" className="checkbox-icon" />}
              checkedIcon={<img src={CheckboxCheckedIcon} alt="Checkbox Checked" className="checkbox-checked-icon" />}
              indeterminateIcon={<img src={CheckboxInntermentIcon} alt="Checkbox Interminagte" className="checkbox-interminate-icon" />}
            />
          </TableCell>
        )}
        {cellContent}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
