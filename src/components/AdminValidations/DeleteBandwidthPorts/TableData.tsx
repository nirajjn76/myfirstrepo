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
    id: 'portId',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Physical Port ID',
    width: '10%',
  },
  {
    id: 'portName',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Port Name',
    width: '20%',
    tooltipTitle: 'Port Name',
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
    id: 'port_description',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Description',
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
    bandwidthPort: any;
    deleteLoading: boolean;
    rowSelected: boolean;
    selected: any[];
    onDeleteClick: (id: string) => void;
    onSelectRow: (newSelected: any[]) => void;
}

const DeleteBandwidthPortsRow: React.FC<VerifiedPortRowProps> = ({
  bandwidthPort, deleteLoading, rowSelected, selected, onDeleteClick, onSelectRow,
}) => {
  // const handleDeleteBtnClick = useCallback((nPortId: string, fPortId: string) => {
  //   let portIds: any = []
  //   portIds.push(nPortId, fPortId)
  //   console.log("Port IDs", portIds)
  //   onDeleteClick(portIds);
  // }, [onDeleteClick]);

  const handleDeleteBtnClick = useCallback(() => {
    const portIds: any = [];
    portIds.push(bandwidthPort.n_port_id, bandwidthPort.f_port_id);
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
              <label>Do you want to delete this bandwidth?</label>

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
                  onDeleteClick && onDeleteClick(portIds);
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
  }, [bandwidthPort.n_port_id, bandwidthPort.f_port_id, onDeleteClick]);

  const handleSelectRow = useCallback(() => {
    const selectedIndex = selected.findIndex((item) => (item.id.find((itemId: any) => itemId.n_id === bandwidthPort.n_port_id) || item.id.find((itemId: any) => itemId.f_id === bandwidthPort.f_port_id)));
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, [{ id: [{ f_id: bandwidthPort.f_port_id }, { n_id: bandwidthPort.n_port_id }] }]);
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
  }, [bandwidthPort.n_port_id, bandwidthPort.f_port_id, selected, onSelectRow]);

  return (
    <>
      <TableRow>
        <TableCell rowSpan={3} width="5%">
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
      </TableRow>
      <TableRow>
        <ElipsisCell width="10%" align="left" className="bold-font" text={bandwidthPort.n_port_id} />
        <ElipsisCell width="15%" align="left" text={bandwidthPort.nport_name} />
        <ElipsisCell width="10%" align="left" className="bold-font" text={bandwidthPort.owner_id} />
        <ElipsisCell width="15%" align="left" text={bandwidthPort.owner_name} />
        <ElipsisCell width="15%" align="left" text={bandwidthPort.ndescription} />
        <ElipsisCell width="10%" align="left" text={bandwidthPort.nverified ? 'Verified' : 'Unverified'} />
        <TableCell align="left" rowSpan={3} width="10%">
          <Button className="btn-remove-from-market-place" variant="success" text="Delete" loading={deleteLoading} onClick={handleDeleteBtnClick} spinnerSize={20} />
        </TableCell>
      </TableRow>
      <TableRow>
        <ElipsisCell width="5%" align="left" className="bold-font" text={bandwidthPort.f_port_id} />
        <ElipsisCell width="15%" align="left" text={bandwidthPort.fport_name} />
        <ElipsisCell width="15%" align="left" className="bold-font" text={bandwidthPort.owner_id} />
        <ElipsisCell width="10%" align="left" text={bandwidthPort.owner_name} />
        <ElipsisCell width="10%" align="left" text={bandwidthPort.fdescription} />
        <ElipsisCell width="10%" align="left" text={bandwidthPort.fverified ? 'Verified' : 'Unverified'} />
      </TableRow>

    </>
  );
};

export default DeleteBandwidthPortsRow;
