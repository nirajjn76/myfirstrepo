import React, { useCallback } from 'react';
import {
  TableRow, TableCell, Checkbox,
} from '@material-ui/core';
import { HeadCellType, RolesDropdown } from '../../../utils/appConstants';
import ElipsisCell from '../../DesignSystem/Table/Cells/ElipsisTextCell';
import TitleSubtitle from '../../DesignSystem/Table/Cells/TitleSubtitle';
import Button from '../../DesignSystem/button';
import Dropdown from '../../DesignSystem/dropdown';
import { Roles } from '../../../enums';
import { getTimeInMediumFormat, getDateInMediumFormat, elapsedTimeLogic } from '../../../utils/methods';
import CheckboxIcon from '../../../assets/images/checkbox-unchecked.svg';
import CheckboxCheckedIcon from '../../../assets/images/checkbox-checked.svg';

export const headCells: HeadCellType[] = [
  {
    id: 'organization',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Organization',
    width: '10%',
  },
  {
    id: 'first_name',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'First Name',
    width: '10%',
  },
  {
    id: 'last_name',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Last Name',
    width: '10%',
  },
  {
    id: 'username',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Username',
    width: '10%',
  },
  {
    id: 'user_class',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'User Class',
    width: '15%',
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Email Id',
    width: '15%',
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

interface NotVerifiedUserRowProps {
  user: any;
  roles: any[];
  verifyLoadingId: string;
  rowSelected: boolean;
  selected: any[];
  onVerifyClick: (id: string, roleId: string) => void;
  onSelectRow: (newSelected: any[]) => void;
  onRoleChange: (userId: string, roleId: number, roleNName: string) => void;
}

const NotVerifiedUserRow: React.FC<NotVerifiedUserRowProps> = ({
  user, roles, verifyLoadingId, rowSelected, selected, onRoleChange, onVerifyClick, onSelectRow,
}) => {
  const date = getDateInMediumFormat(user.created_at);
  const time = getTimeInMediumFormat(user.created_at);
  const { diffrence, differenceUnit } = elapsedTimeLogic(user.created_at);

  const handleVerifyBtnClick = useCallback(() => {
    const defaultUserRole = roles.find((role) => role.role_name === Roles.user);
    onVerifyClick(user.id, user.roleId || defaultUserRole.id);
  }, [user.id, user.roleId, roles, onVerifyClick]);

  const handleRoleChange = useCallback((value: string) => {
    const role = roles.find((role) => role.role_name === value);
    onRoleChange(user.id, role.id, value || '');
  }, [user.id, roles, onRoleChange]);

  const handleSelectRow = useCallback(() => {
    const defaultUserRole = roles.find((role) => role.role_name === Roles.user);
    const selectedIndex = selected.findIndex((item) => item.id === user.id && item.roleId === (user.roleId || defaultUserRole.id));
    let newSelected: any = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, [{ id: user.id, roleId: user.roleId || defaultUserRole.id }]);
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
  }, [roles, user.roleId, user.id, selected, onSelectRow]);

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
      <ElipsisCell width="10%" align="left" className="bold-font" text={user.organization_name} />
      <ElipsisCell width="12%" align="left" className="bold-font" text={user.first_name} />
      <ElipsisCell width="13%" align="left" className="bold-font" text={user.last_name} />
      <ElipsisCell width="10%" align="left" text={user.username} />
      <TableCell width="15%">
        <Dropdown className="native-select-form-control-root" value={user.role_name} valueKey="value" textKey="text" icon="icon" options={RolesDropdown} onChange={handleRoleChange} />
      </TableCell>
      <ElipsisCell width="15%" align="left" text={user.email} node={<a className="email-link" href={`mailto:${user.email}`}>{user.email}</a>} />
      <TitleSubtitle width="10%" maxWidth="10vw" align="left" title={date} subTitle={time} />
      <ElipsisCell width="10%" align="left" text={`${diffrence} ${differenceUnit}`} />
      <TableCell align="left" width="5%">
        <Button className="btn-verify" variant="success" text="Verify" loading={!!(verifyLoadingId && verifyLoadingId === user.id)} onClick={handleVerifyBtnClick} spinnerSize={20} />
      </TableCell>
    </TableRow>
  );
};

export default NotVerifiedUserRow;
