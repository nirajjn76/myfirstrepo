import React, { useCallback } from 'react';
import { TableBody } from '@material-ui/core';
import Table from '../DesignSystem/Table';
import { SortOrder } from '../../enums';
import { TableConstants } from '../../utils/appConstants';
import LoadingRow from '../DesignSystem/Table/Rows/LoadingRow';
import EmptyRow from '../DesignSystem/Table/Rows/EmptyRow';
import PortRow, { headCells } from './PortRow';

export interface PortsListProps {
  page: number;
  total: number;
  ports: any[];
  loading: boolean;
  order: SortOrder;
  orderBy: string;
  onPageChange: (page: number) => void;
  onAggredTermsClick: (_: any) => void;
  onRequestSort: (property: string, nextSortOrder: SortOrder) => void;
}

const PortsList: React.FC<PortsListProps> = ({
  page, total, ports, loading, order, orderBy, onPageChange, onAggredTermsClick, onRequestSort,
}) => {
  let rows;
  const totalPages = Math.ceil(total / TableConstants.perPage);

  const handlePageChange = useCallback((event: any, value: number) => {
    onPageChange(value);
  }, [onPageChange]);

  if (loading) {
    rows = <LoadingRow colSpan={headCells.length} />;
  } else if (total === 0) {
    rows = <EmptyRow text={TableConstants.noRecordsFound} colSpan={headCells.length} />;
  } else {
    const portRows = ports.map((port: any, index) => {
      return <PortRow port={port} onAggredTermsClick={onAggredTermsClick} key={index} />;
    });
    rows = <TableBody>{portRows}</TableBody>;
  }

  return (
    <Table
      onRequestSort={onRequestSort}
      order={order}
      orderBy={orderBy}
      rowCount={ports.length}
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

export default PortsList;
