import React from 'react';
import { TableRow } from '@material-ui/core';
import { HeadCellType, RolesTextMapping } from '../../../utils/appConstants';
import ElipsisCell from '../../DesignSystem/Table/Cells/ElipsisTextCell';
import TitleSubtitle from '../../DesignSystem/Table/Cells/TitleSubtitle';
import { getTimeInMediumFormat, getDateInMediumFormat } from '../../../utils/methods';

export const headCells: HeadCellType[] = [
  {
    id: 'organization',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Organization',
    width: '15%',
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
    id: 'class',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'User Class',
    width: '10%',
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
    id: 'verified_on',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Verified Date',
    width: '10%',
  },
  {
    id: 'verified_by',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Verified By',
    width: '10%',
  },
];

interface VerifiedUserRowProps {
  user: any;
}

const VerifiedUserRow: React.FC<VerifiedUserRowProps> = ({ user }) => {
  const date = getDateInMediumFormat(user.created_at);
  const time = getTimeInMediumFormat(user.created_at);
  const verifiedByDate = getDateInMediumFormat(user.verified_on);
  const verifiedByTime = getTimeInMediumFormat(user.verified_on);

  return (
    <TableRow>
      <ElipsisCell width="10%" className="bold-font" align="left" text={user.organization_name} />
      <ElipsisCell width="12%" className="bold-font" align="left" text={user.first_name} />
      <ElipsisCell width="13%" className="bold-font" align="left" text={user.last_name} />
      <ElipsisCell width="10%" align="left" text={user.username} />
      <ElipsisCell width="10%" align="left" text={RolesTextMapping[user.role_name]} />
      <ElipsisCell width="15%" align="left" text={user.email} node={<a className="email-link" href={`mailto:${user.email}`}>{user.email}</a>} />
      <TitleSubtitle width="10%" maxWidth="10vw" align="left" title={date} subTitle={time} />
      <TitleSubtitle width="15%" maxWidth="15vw" align="left" title={user.verified_on ? verifiedByDate : '-'} subTitle={user.verified_on ? verifiedByTime : ''} />
      <ElipsisCell width="10%" align="left" text={user.verified_by || '-'} />
    </TableRow>
  );
};

export default VerifiedUserRow;
