import React, { useCallback } from 'react';
import { TableBody } from '@material-ui/core';
import TableComponent from '../../DesignSystem/Table';
import { SortOrder } from '../../../enums';
import { TableConstants } from '../../../utils/appConstants';
import LoadingRow from '../../DesignSystem/Table/Rows/LoadingRow';
import EmptyRow from '../../DesignSystem/Table/Rows/EmptyRow';
import FeeRow, { headCells } from './row';

interface TableProps {
  fees: any[];
  total: number;
  loading: boolean;
  page: number;
  order: SortOrder;
  orderBy: string;
  onRequestSort: (property: string, nextSortOrder: SortOrder) => void;
  onPageChange: (page: number) => void;
}

const Table: React.FC<TableProps> = ({
  fees, total, loading, page, order, orderBy, onRequestSort, onPageChange,
}) => {
  const totalPages = Math.ceil(total / TableConstants.wxPayPerPage);

  const handlePageChange = useCallback((event: any, value: number) => {
    onPageChange(value);
  }, [onPageChange]);

  let rows;

  if (loading) {
    rows = <LoadingRow colSpan={headCells.length + 1} />;
  } else if (fees.length === 0) {
    rows = <EmptyRow text={TableConstants.noRecordsFound} colSpan={headCells.length + 1} />;
  } else {
    const feesRows = fees.map((fee: any, index) => {
      return <FeeRow fee={fee} key={index} />;
    });
    rows = (
      <TableBody>
        {feesRows}
      </TableBody>
    );
  }

  return (
    <TableComponent
      onRequestSort={onRequestSort}
      order={order}
      orderBy={orderBy}
      rowCount={fees.length}
      headCells={headCells}
      rowSelectionAvailable={false}
      numSelected={0}
      rows={rows}
      totalPages={totalPages}
      page={page}
      onPageChange={handlePageChange}
    />
  );
};

export default Table;
