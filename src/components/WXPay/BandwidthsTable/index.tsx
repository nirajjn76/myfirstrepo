import React, { useCallback } from 'react';
import { TableBody } from '@material-ui/core';
import TableComponent from '../../DesignSystem/Table';
import { SortOrder } from '../../../enums';
import { TableConstants } from '../../../utils/appConstants';
import LoadingRow from '../../DesignSystem/Table/Rows/LoadingRow';
import EmptyRow from '../../DesignSystem/Table/Rows/EmptyRow';
import BandwidthPortRow, { headCells } from './row';

interface TableProps {
  bandwidthPorts: any[];
  total: number;
  loading: boolean;
  page: number;
  order: SortOrder;
  orderBy: string;
  onRequestSort: (property: string, nextSortOrder: SortOrder) => void;
  onPageChange: (page: number) => void;
}

const Table: React.FC<TableProps> = ({
  bandwidthPorts, total, loading, page, order, orderBy, onRequestSort, onPageChange,
}) => {
  const totalPages = Math.ceil(total / TableConstants.wxPayPerPage);

  const handlePageChange = useCallback((event: any, value: number) => {
    onPageChange(value);
  }, [onPageChange]);

  let rows;

  if (loading) {
    rows = <LoadingRow colSpan={headCells.length + 1} />;
  } else if (bandwidthPorts.length === 0) {
    rows = <EmptyRow text={TableConstants.noRecordsFound} colSpan={headCells.length + 1} />;
  } else {
    const bandwidthPortRows = bandwidthPorts.map((bandwidthPort: any, index) => {
      return <BandwidthPortRow bandwidthPort={bandwidthPort} key={index} />;
    });
    rows = (
      <TableBody>
        {bandwidthPortRows}
      </TableBody>
    );
  }

  return (
    <TableComponent
      onRequestSort={onRequestSort}
      order={order}
      orderBy={orderBy}
      rowCount={bandwidthPorts.length}
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
