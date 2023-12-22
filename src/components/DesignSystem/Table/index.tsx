import React from 'react';
import { TableContainer, Table } from '@material-ui/core';
import TableHeader from './header';
import Pagination from './pagination';
import { SortOrder } from '../../../enums';
import { HeadCellType } from '../../../utils/appConstants';

export interface TableMainProps {
  rows: React.ReactNode;
  onRequestSort?: (property: string, nextSortOrder: SortOrder) => void;
  onRequestSearch?: (property: string) => void;
  order?: SortOrder;
  orderBy?: string;
  rowCount: number;
  headCells: HeadCellType[];
  rowSelectionAvailable: boolean;
  numSelected: number;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalPages: number;
  page: number;
  onPageChange: (event: any, value: number) => void;
  onSearchClose?: (property: string) => void;
  tableLayout?: 'auto' | 'fixed';
}

const TableMain: React.FC<TableMainProps> = ({
  rows,
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
  totalPages,
  page,
  onPageChange,
  tableLayout = 'auto',
}) => {
  return (
    <div className="d-table" data-testid="table">
      <TableContainer>
        <Table style={{ tableLayout }}>
          <TableHeader
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            rowCount={rowCount}
            onRequestSort={onRequestSort}
            onRequestSearch={onRequestSearch}
            onSearchClose={onSearchClose}
            numSelected={numSelected}
            onSelectAllClick={onSelectAllClick}
            rowSelectionAvailable={rowSelectionAvailable}
          />

          {rows}
        </Table>
      </TableContainer>
      {
        totalPages ? (
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={onPageChange}
          />
        ) : ''
      }
    </div>
  );
};

export default TableMain;
