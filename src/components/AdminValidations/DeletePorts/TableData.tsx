import React, { useCallback } from 'react';
import {
  TableRow, TableCell, Checkbox,
} from '@material-ui/core';
import { confirmAlert } from 'react-confirm-alert';
import CloseIcon from '@material-ui/icons/Close';
import { HeadCellType } from '../../../utils/appConstants';
import ElipsisCell from '../../DesignSystem/Table/Cells/ElipsisTextCell';
import Button from '../../DesignSystem/button';
import CheckboxIcon from '../../../assets/images/checkbox-unchecked.svg';
import CheckboxCheckedIcon from '../../../assets/images/checkbox-checked.svg';
import WarningInfoIcon from '../../../assets/images/warn-toast-icon.svg';

export const headCells: HeadCellType[] = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Physical Port ID',
    width: '10%',
  },

  {
    id: 'port_name',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Port Name',
    width: '20%',
  },
  {
    id: 'organization_id',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Owner ID',
    width: '10%',
  },
  {
    id: 'owner',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Owner Name',
    width: '15%',
  },
  {
    id: 'description',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Description ',
    width: '20%',
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Status',
    width: '10%',
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Action',
    width: '10%',
  },
];

interface VerifiedPortRowProps {
    port: any;
    deleteLoadingId: string;
    rowSelected: boolean;
    selected: any[];
    onDeleteClick: (id: string) => void;
    onSelectRow: (newSelected: any[]) => void;
}

const DeletePortsRow: React.FC<VerifiedPortRowProps> = ({
  port, deleteLoadingId, rowSelected, selected, onDeleteClick, onSelectRow,
}) => {
  // const handleDeleteBtnClick = useCallback(() => {
  //   onDeleteClick(port.id);
  // }, [port.id, onDeleteClick]);

  const handleDeleteBtnClick = useCallback(() => {
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
              <label>Do you want to delete this port?</label>

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
                  onDeleteClick && onDeleteClick(port.id);
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
  }, [port.id, onDeleteClick]);

  const handleSelectRow = useCallback(() => {
    const selectedIndex = selected.findIndex((item) => item.id === port.id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, [{ id: port.id }]);
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
  }, [port.id, selected, onSelectRow]);

  return (
    <TableRow>
      <TableCell width="5%">
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
      <ElipsisCell width="10%" align="left" className="bold-font" text={port.id} />
      <ElipsisCell width="15%" align="left" text={port.port_name} />
      <ElipsisCell width="10%" align="left" text={port.organization_id} />
      <ElipsisCell width="15%" align="left" text={port.organization_name} />
      <ElipsisCell width="15%" align="left" text={port.port_description} />
      <ElipsisCell width="10%" align="left" text={port.verified ? 'Verified' : 'Unverified'} />
      <TableCell align="left" width="10%">
        <Button className="btn-remove-from-market-place" variant="success" text="Delete" loading={!!(deleteLoadingId && deleteLoadingId === port.id)} onClick={handleDeleteBtnClick} spinnerSize={20} />
      </TableCell>
    </TableRow>
  );
};

export default DeletePortsRow;
