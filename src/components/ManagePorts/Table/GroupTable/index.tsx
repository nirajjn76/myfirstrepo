import React, { useCallback } from 'react';
import Collapsible from 'react-collapsible';
import {
  Table, TableBody, TableRow, TableCell, TableContainer,
  Tooltip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import GroupPortRow from './groupRow';
import CollapseIcon from '../../../../assets/images/collapse-collapsible.svg';
import EditIcon from '../../../../assets/images/edit-icon.svg';
import GroupIconGlobe from '../../../../assets/images/group-icon-globe.svg';
import GroupIconCloud from '../../../../assets/images/group-icon-cloud.svg';
import GroupIconRouter from '../../../../assets/images/group-icon-router.svg';
import GroupIconDefault from '../../../../assets/images/udpated-ic-default.svg';

import ElipsisText from '../../../DesignSystem/Table/Cells/ElipsisText';

interface GroupTableProps {
  open: boolean;
  group: any;
  colSpan: number;
  selected: any[];
  selectedUnGroupId: string;
  removeLoadingId: string;
  cancelSubLoading: string;
  onCollapsibleGroupClose: (groupId: string) => void;
  onCollapsibleGroupOpen: (groupId: string) => void;
  onGroupRowSelect: (newSelected: any[], groupId: string) => void;
  onEditGroupClick: (group: any) => void;
  onSaleClick: (port: any) => void;
  onSaleEdit: (port: any) => void;
  onRemoveClick: (port: any) => void;
  onCancelSubscription: (port: any) => void;
}

const GroupTable: React.FC<GroupTableProps> = ({
  open, group, colSpan, selected, selectedUnGroupId, removeLoadingId, cancelSubLoading, onCancelSubscription, onSaleClick, onSaleEdit, onRemoveClick, onCollapsibleGroupClose, onCollapsibleGroupOpen, onGroupRowSelect, onEditGroupClick,
}) => {
  const groupPortRows = group.ports.map((port: any, index: number) => {
    return <GroupPortRow cancelSubLoading={cancelSubLoading} onCancelSubscription={onCancelSubscription} onSaleClick={onSaleClick} key={index} port={port} groupId={group.groupId} removeLoadingId={removeLoadingId} onSaleEdit={onSaleEdit} onRemoveClick={onRemoveClick} selectedUnGroupId={selectedUnGroupId} rowSelected={!!(selected.find((item) => (item.nrId == port.nr_id) || (item.purchasePortId == port.purchasePortId)))} selected={selected} onSelectRow={(ports) => onGroupRowSelect(ports, group.groupId)} />;
  });

  const GetGroupIcon = useCallback(() => {
    if (group.icon === 'cloud') {
      return GroupIconCloud;
    } if (group.icon === 'globe') {
      return GroupIconGlobe;
    } if (group.icon === 'router') {
      return GroupIconRouter;
    }
    return GroupIconDefault;
  }, [group.icon]);

  const getGroupIconTitle = useCallback(() => {
    if (group.icon === 'cloud') {
      return 'Cloud';
    } if (group.icon === 'globe') {
      return 'Internet';
    } if (group.icon === 'router') {
      return 'Router';
    }
    return 'Default';
  }, [group.icon]);

  return (
    <TableRow>
      <TableCell className="group-cell" colSpan={colSpan}>
        <Collapsible
          open={open}
          transitionTime={150}
          transitionCloseTime={150}
          trigger={(
            <div className="trigger-root">
              <div className="trigger-main">
                {open ? <img src={CollapseIcon} alt="Collapse" /> : <AddIcon />}
                <div className="icon-btn-root">
                  <div className="buttons">
                    {/* <Button className="btn-verify" variant="success" text="Sale" /> */}
                  </div>
                  <div className="icon">
                    <Tooltip
                      classes={{
                        tooltip: 'tooltip',
                      }}
                      title={getGroupIconTitle()}
                      arrow
                    >
                      <img src={GetGroupIcon()} alt="Group icon" />
                    </Tooltip>
                  </div>
                </div>
                <label className="group-name">
                  <ElipsisText text={group.groupName} width="10vw" className="group-description" />
                  {!open && (
                    <span className="extra-ports">
                      (
                      {group.ports.length}
                      {' '}
                      Port/s)
                    </span>
                  )}
                </label>
                <Tooltip
                  classes={{
                    tooltip: 'tooltip',
                  }}
                  title="Edit Group Details"
                  arrow
                  placement="top"
                >
                  <img src={EditIcon} alt="Edit" onClick={(e) => { e.stopPropagation(); onEditGroupClick(group); }} />
                </Tooltip>
                (
                <ElipsisText text={group.description} width="50vw" className="group-description" />
                )
              </div>
            </div>
          )}
          onClosing={() => open && onCollapsibleGroupClose(group.groupId)}
          onOpening={() => !open && onCollapsibleGroupOpen(group.groupId)}
        >
          <TableContainer>
            <Table style={{ tableLayout: 'fixed' }}>
              <TableBody className="group-inner-body">
                {groupPortRows}
              </TableBody>
            </Table>
          </TableContainer>
        </Collapsible>
      </TableCell>
    </TableRow>
  );
};

export default GroupTable;
