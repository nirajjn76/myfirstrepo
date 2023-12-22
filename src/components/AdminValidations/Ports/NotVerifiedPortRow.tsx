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
    id: 'id',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Port ID',
    width: '10%',
  },
  {
    id: 'ne_name',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Network Element',
    width: '15%',
  },
  {
    id: 'port_name',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Port Name',
    width: '10%',
  },
  {
    id: 'description',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Port Description',
    width: '10%',
  },
  {
    id: 'owner',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Owner',
    width: '10%',
  },
  {
    id: 'request_by',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Requested By',
    width: '10%',
  },
  {
    id: 'created_at',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Added Date',
    width: '10%',
  },
  {
    id: 'elapsed_time',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Elapsed Time',
    width: '10%',
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Action',
    width: '5%',
  },
];

interface NotVerifiedPortRowProps {
  port: any;
  verifyLoadingId: string;
  rowSelected: boolean;
  selected: any[];
  onVerifyClick: (id: string) => void;
  onSelectRow: (newSelected: any[]) => void;
}

const NotVerifiedPortRow: React.FC<NotVerifiedPortRowProps> = ({
  port, verifyLoadingId, rowSelected, selected, onVerifyClick, onSelectRow,
}) => {
  const date = getDateInMediumFormat(port.created_at);
  const time = getTimeInMediumFormat(port.created_at);
  const { diffrence, differenceUnit } = elapsedTimeLogic(port.created_at);

  const handleVerifyBtnClick = useCallback(() => {
    onVerifyClick(port.id);
  }, [port.id, onVerifyClick]);

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
      <TitleSubtitle width="15%" maxWidth="15vw" align="left" title={port.ne_name} subTitle={port.position_in_ne ? `(${port.position_in_ne})` : '-'} boldTitle />
      <ElipsisCell width="10%" align="left" text={port.port_name} />
      <ElipsisCell width="10%" align="left" text={port.port_description || '-'} />
      <ElipsisCell width="10%" align="left" text={port.organization_name} />
      <ElipsisCell width="10%" align="left" text={`${port.first_name} ${port.last_name}`} />
      <TitleSubtitle width="10%" maxWidth="10vw" align="left" title={date} subTitle={time} />
      <ElipsisCell width="10%" align="left" text={`${diffrence} ${differenceUnit}`} />
      <TableCell align="left" width="5%">
        <Button className="btn-verify" variant="success" text="Verify" loading={!!(verifyLoadingId && verifyLoadingId === port.id)} onClick={handleVerifyBtnClick} spinnerSize={20} />
      </TableCell>
    </TableRow>
  );
};

export default NotVerifiedPortRow;
