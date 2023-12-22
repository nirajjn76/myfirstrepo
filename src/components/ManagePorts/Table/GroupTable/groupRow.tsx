import React, { useCallback } from 'react';
import {
  TableRow, TableCell, Checkbox, Tooltip,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { confirmAlert } from 'react-confirm-alert';
import ElipsisCell from '../../../DesignSystem/Table/Cells/ElipsisTextCell';
import Button from '../../../DesignSystem/button';
import CheckboxIcon from '../../../../assets/images/checkbox-unchecked.svg';
import CheckboxCheckedIcon from '../../../../assets/images/checkbox-checked.svg';
import SoldIcon from '../../../../assets/images/sold-icon.svg';
import EditIcon from '../../../../assets/images/edit-icon.svg';
import InUseIcon from '../../../../assets/images/in-use-icon.svg';
import WarningInfoIcon from '../../../../assets/images/warn-toast-icon.svg';

interface GroupsPortRowProps {
  port: any;
  rowSelected: boolean;
  selected: any[];
  groupId: string;
  selectedUnGroupId: string;
  removeLoadingId: string;
  cancelSubLoading: string;
  onSelectRow: (newSelected: any[]) => void;
  onSaleClick: (port: any) => void;
  onSaleEdit: (port: any) => void;
  onRemoveClick: (port: any) => void;
  onCancelSubscription: (port : any) => void;
}

const GroupsPortRow: React.FC<GroupsPortRowProps> = ({
  port, groupId, selectedUnGroupId, rowSelected, selected, cancelSubLoading, removeLoadingId, onCancelSubscription, onSelectRow, onSaleClick, onSaleEdit, onRemoveClick,
}) => {
  const handleSelectRow = useCallback(() => {
    const selectedIndex = selected.findIndex((item) => (item.nrId == port.nr_id) || (item.purchasePortId == port.purchasePortId));
    let newSelected: any = [];

    if (groupId !== selectedUnGroupId) {
      newSelected = [{ nrId: port.nr_id || -1, purchasePortId: port.purchasePortId || -1 }];
    } else if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, [{ nrId: port.nr_id || -1, purchasePortId: port.purchasePortId || -1 }]);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    onSelectRow(newSelected);
  }, [port.nr_id, port.purchasePortId, selected, onSelectRow, groupId, selectedUnGroupId]);

  const handleSale = useCallback(
    () => {
      onSaleClick(port);
    },
    [onSaleClick, port],
  );

  const handleEdit = useCallback(
    () => {
      onSaleEdit(port);
    },
    [onSaleEdit, port],
  );

  const handleRemove = useCallback(
    () => {
      onRemoveClick(port);
    },
    [onRemoveClick, port],
  );

  const handleCancel = useCallback(() => {
    return confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui-alert">
            <CloseIcon
              className="close-icon-popup"
              onClick={() => {
                onClose();
              }}
            />
            <div>
              <img src={WarningInfoIcon} alt="Warning" />
              <label>Are you sure to cancel this subscription?</label>

            </div>
            <div />
            <div className="buttons">
              <Button
                onClick={() => {
                  onClose();
                }}
                text="No"
                variant="greyed"
                className="cancel"
              />
              <Button
                onClick={() => {
                  onCancelSubscription(port);
                  onClose();
                }}
                text="Yes"
                variant="primary"
              />
            </div>
          </div>
        );
      },
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  }, [port, onCancelSubscription]);

  let button;
  if (port.crossConnectPortId && !(port.status === 'bought_port' && !port.purchasePortId)) {
    button = <img src={InUseIcon} alt="In Use" />;
  } else if (!port.status) {
    button = <Button disabled={!port.verified} className="btn-sale" variant="success" text="Sale" onClick={handleSale} />;
  } else if (port.status === 'port_put_up_for_sale') {
    button = (
      <>
        <Button className="btn-remove-from-market-place" variant="success" text="Remove" loading={!!(removeLoadingId === port.vportId)} onClick={handleRemove} />
        <Tooltip
          placement="right"
          title="Edit Sale Details"
          classes={{
            tooltip: 'tooltip',
          }}
          arrow
        >
          <img className="edit-icon" src={EditIcon} alt="Edit" onClick={handleEdit} />
        </Tooltip>
      </>
    );
  } else if (port.status === 'bought_port' && port.purchasePortId) {
    button = <Button className="btn-cancel-subscription" variant="success" onClick={handleCancel} loading={!!(cancelSubLoading === port.pportId)} text="Cancel" />;
  } else if (port.status === 'bought_port' && !port.purchasePortId) {
    button = <img src={SoldIcon} alt="Sold" />;
  }

  return (
    <TableRow>
      <TableCell className="group-inner-row" width="3%">
        <Checkbox
          classes={{
            root: 'selection-checkbox',
          }}
          color="default"
          checked={rowSelected}
          onChange={handleSelectRow}
          icon={<img src={CheckboxIcon} alt="Checkbox" className="checkbox-icon" />}
          checkedIcon={<img src={CheckboxCheckedIcon} alt="Checkbox Checked" className="checkbox-checked-icon" />}
          inputProps={{
            // @ts-ignore
            'data-testid': 'checkbox-input',
          }}
          data-testid="checkbox"
        />
      </TableCell>
      <ElipsisCell width="30%" align="left" text={port.port_description || '-'} />
      <ElipsisCell width="20%" align="left" text={port.port_name} />
      <ElipsisCell width="30%" align="left" text={port.service_description || '-'} />
      <TableCell align="left" className="group-inner-cell-action" width="17%">
        <Tooltip
          placement="left"
          title={!port.verified && !port.status && !port.crossConnectPortId
            ? (
              <div>
                <div>The port is not verified.</div>
                <div>Please contact Wavexchange Administrator.</div>
              </div>
            )

            : ''}
          classes={{
            tooltip: 'tooltip',
          }}
          arrow
        >
          <div className="group-port-manage-actions">
            {button}
          </div>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default GroupsPortRow;
