import React, { useCallback } from 'react';
import {
  TableRow, TableCell, Checkbox,
} from '@material-ui/core';
import { HeadCellType } from '../../../utils/appConstants';
import ElipsisCell from '../../DesignSystem/Table/Cells/ElipsisTextCell';
import TitleSubtitle from '../../DesignSystem/Table/Cells/TitleSubtitle';
import Button from '../../DesignSystem/button';
import { getTimeInMediumFormat, getDateInMediumFormat, elapsedTimeLogic } from '../../../utils/methods';
import CheckboxIcon from '../../../assets/images/checkbox-unchecked.svg';
import CheckboxCheckedIcon from '../../../assets/images/checkbox-checked.svg';

export const headCells: HeadCellType[] = [
  {
    id: 'port_id',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Port ID',
    width: '15%',
  },
  {
    id: 'cross_connect_port_id',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Cross connect Port ID',
    width: '15%',
  },
  {
    id: 'requested_by',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Requested By',
    width: '15%',
  },
  {
    id: 'created_at',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Connected on',
    width: '15%',
  },
  {
    id: 'elapsed_time',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Elapsed Time',
    width: '15%',
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Action',
    width: '15%',
  },
];

interface VerifiedPortRowProps {
    port: any;
    verifyLoadingId: string;
    rowSelected: boolean;
    selected: any[];
    onVerifyClick: (id: string) => void;
    onSelectRow: (newSelected: any[]) => void;
}

const CrossConnectRow: React.FC<VerifiedPortRowProps> = ({
  port, verifyLoadingId, rowSelected, selected, onVerifyClick, onSelectRow,
}) => {
  const date = getDateInMediumFormat(port.created_at);
  const time = getTimeInMediumFormat(port.created_at);
  const { diffrence, differenceUnit } = elapsedTimeLogic(port.created_at);

  const handleVerifyBtnClick = useCallback(() => {
    onVerifyClick(port.port_id);
  }, [port.port_id, onVerifyClick]);

  const handleSelectRow = useCallback(() => {
    const selectedIndex = selected.findIndex((item) => item.id === port.port_id);
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, [{ id: port.port_id }]);
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
  }, [port.port_id, selected, onSelectRow]);

  return (
    <TableRow>
      <TableCell width="10%">
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
      <ElipsisCell width="15%" align="left" className="bold-font" text={port.port_id} />
      <ElipsisCell width="15%" align="left" className="bold-font" text={port.cross_connect_port_id} />
      <ElipsisCell width="15%" align="left" text={port.requested_by} />
      <TitleSubtitle width="15%" maxWidth="10vw" align="left" title={date} subTitle={time} />
      <ElipsisCell width="15%" align="left" text={`${diffrence} ${differenceUnit}`} />
      <TableCell align="left" width="15%">
        <Button className="btn-verify" variant="success" text="Verify" loading={!!(verifyLoadingId && verifyLoadingId === port.port_id)} onClick={handleVerifyBtnClick} spinnerSize={20} />
      </TableCell>
    </TableRow>
  );
};

export default CrossConnectRow;
