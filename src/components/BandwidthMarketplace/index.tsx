import React, { useCallback } from 'react';
import { TableBody } from '@material-ui/core';
import Table from '../DesignSystem/Table';
import { SortOrder } from '../../enums';
import { TableConstants } from '../../utils/appConstants';
import LoadingRow from '../DesignSystem/Table/Rows/LoadingRow';
import EmptyRow from '../DesignSystem/Table/Rows/EmptyRow';
import TableData, { headCells } from './TableData';

export interface BandwidthListMarketplace {
    page: number;
    total: number;
    bandwidthPorts: any[];
    selected:any[];
    loading: boolean;
    order: SortOrder;
    orderBy: string;
    onPageChange: (page: number) => void;
    handlePurchaseOpen: (port : any) => void;
    onRequestSort: (property: string, nextSortOrder: SortOrder) => void;
    onRequestSearch: (property: string) => void;
    onSearchClose: (property: string) => void;
  }

const BandwidthMarketplace: React.FC<BandwidthListMarketplace> = ({
  order, loading, orderBy, page, bandwidthPorts, total, selected, onSearchClose, onRequestSearch, handlePurchaseOpen, onRequestSort, onPageChange,
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
    const bandwidthPortRows = bandwidthPorts.map((bandwidthPort: any, index) => {
      return (<TableData handlePurchaseOpen={() => handlePurchaseOpen(bandwidthPort)} bandwidthPort={bandwidthPort} />
      );
    });
    rows = <TableBody>{bandwidthPortRows}</TableBody>;
  }

  return (
    <Table
      onRequestSort={onRequestSort}
      order={order}
      orderBy={orderBy}
      rowCount={bandwidthPorts.length}
      headCells={headCells}
      rowSelectionAvailable={false}
      numSelected={selected.length}
      rows={rows}
      totalPages={totalPages}
      page={page}
      onPageChange={handlePageChange}
      onRequestSearch={onRequestSearch}
      onSearchClose={onSearchClose}
    />
  );
};

export default BandwidthMarketplace;
