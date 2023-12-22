import React, { useCallback } from 'react';
import { TableBody } from '@material-ui/core';
import Table from '../../DesignSystem/Table';
import { SortOrder } from '../../../enums';
import { TableConstants } from '../../../utils/appConstants';
import LoadingRow from '../../DesignSystem/Table/Rows/LoadingRow';
import EmptyRow from '../../DesignSystem/Table/Rows/EmptyRow';
import NotverifiedBandwidthsRow, { headCells as NotverifiedBandwidthsRowHeadCells } from './NotverifiedBandwidthsRow';
import VerifiedBandwidthsPortRow, { headCells as VerifiedBandwidthsPortRowHeadCells } from './VerifiedBandwidthsPortRow';

export interface BandwidthsPortsListProps {
  verified: boolean;
  selected: any[];
  page: number;
  total: number;
  bandwidthPorts: any[];
  loading: boolean;
  verifyLoadingId: string;
  order: SortOrder;
  orderBy: string;
  onPageChange: (page: number) => void;
  onSelectRow: (newSelected: any[]) => void;
  onSelectAll: (_: any) => void;
  onVerifyClick: (id: string) => void;
  onRequestSort: (property: string, nextSortOrder: SortOrder) => void;
}

const BandwidthsPortsList: React.FC<BandwidthsPortsListProps> = ({
  verified, selected, page, total, bandwidthPorts, loading, verifyLoadingId, order, orderBy, onPageChange, onSelectRow, onSelectAll, onVerifyClick, onRequestSort,
}) => {
  let rows;

  const PortRow = verified ? VerifiedBandwidthsPortRow : NotverifiedBandwidthsRow;
  const headCells = verified ? VerifiedBandwidthsPortRowHeadCells : NotverifiedBandwidthsRowHeadCells;
  const totalPages = Math.ceil(total / TableConstants.bandwidthPortsPerPage);

  const handlePageChange = useCallback((event: any, value: number) => {
    onPageChange(value);
  }, [onPageChange]);

  if (loading) {
    rows = <LoadingRow colSpan={headCells.length + 1} />;
  } else if (total === 0) {
    rows = <EmptyRow text={TableConstants.noRecordsFound} colSpan={headCells.length + 1} />;
  } else {
    const bandwidthPortRows = bandwidthPorts.map((bandwidthPort: any, index) => {
      return <PortRow bandwidthPort={bandwidthPort} onVerifyClick={onVerifyClick} verifyLoadingId={verifyLoadingId} key={index} rowSelected={!!(selected.find((item) => (item.id.find((itemId: any) => itemId.n_id === bandwidthPort.n_port_id) || item.id.find((itemId: any) => itemId.f_id === bandwidthPort.f_port_id))))} selected={selected} onSelectRow={onSelectRow} />;
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

export default BandwidthsPortsList;