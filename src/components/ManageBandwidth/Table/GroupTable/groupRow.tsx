import React, { useCallback } from 'react';
import {
  TableRow, TableCell, Checkbox, Tooltip,
} from '@material-ui/core';
import ElipsisCell from '../../../DesignSystem/Table/Cells/ElipsisTextCell';
import Button from '../../../DesignSystem/button';
import CheckboxIcon from '../../../../assets/images/checkbox-unchecked.svg';
import CheckboxCheckedIcon from '../../../../assets/images/checkbox-checked.svg';
import SoldIcon from '../../../../assets/images/sold-icon.svg';
import EditIcon from '../../../../assets/images/edit-icon.svg';

interface GroupsPortRowProps {
  port: any;
  rowSelected: boolean;
  selected: any[];
  groupId: string;
  selectedUnGroupId: string;
  removeLoadingId: string;
  onSelectRow: (newSelected: any[]) => void;
  onSaleClick: (port: any) => void;
  onSaleEdit: (port: any) => void;
  onRemoveClick: (port: any) => void;
}

const GroupsPortRow: React.FC<GroupsPortRowProps> = ({
  port, groupId, selectedUnGroupId, rowSelected, selected, removeLoadingId, onSelectRow, onSaleClick, onSaleEdit, onRemoveClick,
}) => {
  const handleSelectRow = useCallback(() => {
    const selectedIndex = selected.findIndex((item) => (item.nrId == port.port_id) || (item.purchasePortId == port.purchasePortId));
    let newSelected: any = [];

    if (groupId !== selectedUnGroupId) {
      newSelected = [{ nrId: port.port_id || -1, purchasePortId: port.purchasePortId || -1 }];
    } else if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, [{ nrId: port.port_id || -1, purchasePortId: port.purchasePortId || -1 }]);
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
  }, [port.port_id, port.purchasePortId, selected, onSelectRow, groupId, selectedUnGroupId]);

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

  let button;
  if (!port.status) {
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
    button = <Button className="btn-cancel-subscription" variant="success" text="Cancel" />;
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
      <ElipsisCell width="30%" align="left" text={port.purchase_port_description || port.port_description || '-'} />
      <ElipsisCell width="30%" align="left" text={port.purchase_port_name || port.port_name} />
      <ElipsisCell width="40%" align="left" text={port.bandwidth_description || '-'} />
    </TableRow>
  );
};

export default GroupsPortRow;
