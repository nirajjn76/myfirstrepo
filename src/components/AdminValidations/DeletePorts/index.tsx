import React, { useCallback } from 'react';
import { TableBody } from '@material-ui/core';
import Table from '../../DesignSystem/Table';
import { SortOrder } from '../../../enums';
import { TableConstants } from '../../../utils/appConstants';
import LoadingRow from '../../DesignSystem/Table/Rows/LoadingRow';
import EmptyRow from '../../DesignSystem/Table/Rows/EmptyRow';
import DeletePortsRow, { headCells } from './TableData';

export interface PortsListProps {
  verified: boolean;
  selected: any[];
  page: number;
  total: number;
  ports: any[];
  loading: boolean;
  deleteLoadingId: string;
  order: SortOrder;
  orderBy: string;
  onPageChange: (page: number) => void;
  onSelectRow: (newSelected: any[]) => void;
  onSelectAll: (_: any) => void;
  onDeleteClick: (id: string) => void;
  onRequestSort: (property: string, nextSortOrder: SortOrder) => void;
}

const DeletePortsList: React.FC<PortsListProps> = ({
  verified, selected, page, total, ports, loading, deleteLoadingId, order, orderBy, onPageChange, onSelectRow, onSelectAll, onDeleteClick, onRequestSort,
}) => {
  let rows;

  const totalPages = Math.ceil(total / TableConstants.perPage);

  const handlePageChange = useCallback((event: any, value: number) => {
    onPageChange(value);
  }, [onPageChange]);

  if (loading) {
    rows = <LoadingRow colSpan={headCells.length + 1} />;
  } else if (total === 0) {
    rows = <EmptyRow text={TableConstants.noRecordsFound} colSpan={headCells.length + 1} />;
  } else {
    const portRows = ports.map((port: any, index) => {
      return <DeletePortsRow port={port} onDeleteClick={onDeleteClick} deleteLoadingId={deleteLoadingId} key={index} rowSelected={!!(selected.find((item) => item.id === port.id))} selected={selected} onSelectRow={onSelectRow} />;
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
      rowSelectionAvailable={!verified}
      numSelected={selected.length}
      onSelectAllClick={onSelectAll}
      rows={rows}
      totalPages={totalPages}
      page={page}
      onPageChange={handlePageChange}
    />
  );
};

export default DeletePortsList;
