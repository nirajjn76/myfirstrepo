import React, { useCallback } from 'react';
import Table from '../../DesignSystem/Table';
import { SortOrder } from '../../../enums';

interface BandwidthTableProps {
  selected: any[];
  rows: any;
  totalPages: number;
  headCellsData: any[];
  page: number;
  bandwidthPorts: any[];
  order: SortOrder;
  orderBy: string;
  onPageChange: (page: number) => void;
  onRequestSort: (property: string, nextSortOrder: SortOrder) => void;
  onRequestSearch: (property: string) => void;
  onSearchClose: (property: string) => void;
}

const BandwidthTable: React.FC<BandwidthTableProps> = ({
  bandwidthPorts, headCellsData, rows, selected, page, totalPages, order, orderBy, onSearchClose, onRequestSort, onRequestSearch, onPageChange,
}) => {
  const handlePageChange = useCallback((event: any, value: number) => {
    onPageChange(value);
  }, [onPageChange]);

  return (
    <Table
      order={order}
      orderBy={orderBy}
      rowCount={bandwidthPorts.length}
      headCells={headCellsData}
      onRequestSort={onRequestSort}
      onRequestSearch={onRequestSearch}
      onSearchClose={onSearchClose}
      rowSelectionAvailable={false}
      numSelected={selected.length}
      rows={rows}
      totalPages={totalPages}
      page={page}
      onPageChange={handlePageChange}
    />
  );
};

export default BandwidthTable;
