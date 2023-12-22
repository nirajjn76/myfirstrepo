import React, { useCallback } from 'react';
import { TableBody } from '@material-ui/core';
import Table from '../../DesignSystem/Table';
import { SortOrder } from '../../../enums';
import { TableConstants } from '../../../utils/appConstants';
import LoadingRow from '../../DesignSystem/Table/Rows/LoadingRow';
import EmptyRow from '../../DesignSystem/Table/Rows/EmptyRow';
import PortRow, { headCells } from './PortRow';
import GroupRow from './GroupTable';

interface PortsTableProps {
  ports: any[];
  groups: any[];
  loading: boolean;
  order: SortOrder;
  orderBy: string;
  selectedUnGroupId: string;
  selected: any[];
  unGroupedSelected: any[];
  expandedGroupIds: string[];
  removeLoadingId: string;
  cancelSubLoading: string;
  onSelectRow: (newSelected: any[]) => void;
  onGroupRowSelect: (newSelected: any[], groupId: string) => void;
  onRequestSort: (property: string, nextSortOrder: SortOrder) => void;
  onCollapsibleGroupOpen: (groupId: string) => void;
  onCollapsibleGroupClose: (groupId: string) => void;
  onEditGroupClick: (group: any) => void;
  onSaleClick: (port: any) => void;
  onSaleEdit: (port: any) => void;
  onRemoveClick: (port: any) => void;
  onCancelSubscription: (port: any) => void;
}

const PortsTable: React.FC<PortsTableProps> = ({
  ports, groups, loading, order, orderBy, cancelSubLoading, selectedUnGroupId, selected, unGroupedSelected, expandedGroupIds, removeLoadingId, onCancelSubscription, onSaleClick, onRemoveClick, onSaleEdit, onSelectRow, onGroupRowSelect, onRequestSort, onCollapsibleGroupOpen, onCollapsibleGroupClose, onEditGroupClick,
}) => {
  const handlePageChange = useCallback(() => {
    return null;
  }, []);

  let rows;

  if (loading) {
    rows = <LoadingRow colSpan={headCells.length + 1} />;
  } else if (ports.length === 0 && groups.length === 0) {
    rows = <EmptyRow text={TableConstants.noRecordsFound} colSpan={headCells.length + 1} />;
  } else {
    const portRows = ports.map((port: any, index) => {
      return <PortRow cancelSubLoading={cancelSubLoading} onCancelSubscription={onCancelSubscription} onSaleClick={onSaleClick} onSaleEdit={onSaleEdit} onRemoveClick={onRemoveClick} removeLoadingId={removeLoadingId} port={port} key={index} rowSelected={!!(selected.find((item) => (item.nrId == port.nr_id) || (item.purchasePortId == port.purchasePortId)))} selected={selected} onSelectRow={onSelectRow} />;
    });

    const groupRows = groups.map((group: any, index) => {
      return <GroupRow cancelSubLoading={cancelSubLoading} onCancelSubscription={onCancelSubscription} onSaleClick={onSaleClick} onSaleEdit={onSaleEdit} onRemoveClick={onRemoveClick} removeLoadingId={removeLoadingId} open={!!expandedGroupIds.includes(group.groupId)} group={group} selectedUnGroupId={selectedUnGroupId} selected={unGroupedSelected} key={index} colSpan={headCells.length + 1} onCollapsibleGroupClose={onCollapsibleGroupClose} onCollapsibleGroupOpen={onCollapsibleGroupOpen} onGroupRowSelect={onGroupRowSelect} onEditGroupClick={onEditGroupClick} />;
    });
    rows = (
      <TableBody>
        {groupRows}
        <div className="empty-height" />
        {portRows}
      </TableBody>
    );
  }

  return (
    <Table
      tableLayout="fixed"
      onRequestSort={onRequestSort}
      order={order}
      orderBy={orderBy}
      rowCount={0}
      headCells={headCells}
      rowSelectionAvailable={false}
      numSelected={0}
      rows={rows}
      totalPages={0}
      page={0}
      onPageChange={handlePageChange}
    />
  );
};

export default PortsTable;
