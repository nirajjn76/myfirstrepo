import React from 'react';
import Collapsible from 'react-collapsible';
import AddIcon from '@material-ui/icons/Add';
import PortsTable from './Table';
import { SortOrder } from '../../enums';
import CollapseIcon from '../../assets/images/collapse-collapsible.svg';

interface CollapsibleNEProps {
  id: string;
  text: string;
  open: boolean;
  ports: any[];
  groups: any[];
  loading: boolean;
  order: SortOrder;
  orderBy: string;
  selected: any[];
  unGroupedSelected: any[];
  selectedUnGroupId: string;
  expandedGroupIds: string[];
  removeLoadingId: string;
  cancelSubLoading: string;
  onSelectRow: (newSelected: any[]) => void;
  onGroupRowSelect: (newSelected: any[], groupId: string) => void;
  onRequestSort: (property: string, nextSortOrder: SortOrder) => void;
  onCollapsibleNEOpen: (neId: string) => void;
  onCollapsibleNEClose: () => void;
  onCollapsibleGroupOpen: (groupId: string) => void;
  onCollapsibleGroupClose: (groupId: string) => void;
  onEditGroupClick: (group: any) => void;
  onSaleClick: (port: any) => void;
  onSaleEdit: (port: any) => void;
  onRemoveClick: (port: any) => void;
  onCancelSubscription: (port: any) => void;
}

const CollapsibleNE: React.FC<CollapsibleNEProps> = ({
  id, open, text, ports, groups, loading, cancelSubLoading, selectedUnGroupId, order, orderBy, selected, unGroupedSelected, expandedGroupIds, removeLoadingId, onSaleClick, onSaleEdit, onRemoveClick, onCancelSubscription, onSelectRow, onGroupRowSelect, onRequestSort, onCollapsibleNEClose, onCollapsibleNEOpen, onCollapsibleGroupOpen, onCollapsibleGroupClose, onEditGroupClick,
}) => {
  const trigger = (
    <div className="trigger-div">
      <label>{text}</label>
      {open ? <img src={CollapseIcon} alt="Collapse" /> : <AddIcon />}
    </div>
  );

  return (
    <Collapsible open={open} transitionTime={150} transitionCloseTime={150} trigger={trigger} onClosing={() => open && onCollapsibleNEClose()} onOpening={() => !open && onCollapsibleNEOpen(id)}>
      <label>Ports</label>
      <PortsTable cancelSubLoading={cancelSubLoading} onCancelSubscription={onCancelSubscription} onSaleEdit={onSaleEdit} onRemoveClick={onRemoveClick} removeLoadingId={removeLoadingId} onSaleClick={onSaleClick} ports={ports} groups={groups} loading={loading} order={order} orderBy={orderBy} selectedUnGroupId={selectedUnGroupId} selected={selected} unGroupedSelected={unGroupedSelected} expandedGroupIds={expandedGroupIds} onSelectRow={onSelectRow} onGroupRowSelect={onGroupRowSelect} onRequestSort={onRequestSort} onCollapsibleGroupOpen={onCollapsibleGroupOpen} onCollapsibleGroupClose={onCollapsibleGroupClose} onEditGroupClick={onEditGroupClick} />
    </Collapsible>
  );
};

export default CollapsibleNE;
