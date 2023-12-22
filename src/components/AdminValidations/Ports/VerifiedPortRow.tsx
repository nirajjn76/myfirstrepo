import React from 'react';
import {
  TableRow,
} from '@material-ui/core';
import { HeadCellType } from '../../../utils/appConstants';
import ElipsisCell from '../../DesignSystem/Table/Cells/ElipsisTextCell';
import TitleSubtitle from '../../DesignSystem/Table/Cells/TitleSubtitle';
import { getTimeInMediumFormat, getDateInMediumFormat } from '../../../utils/methods';

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
    width: '10%',
  },
  {
    id: 'port_name',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Port Name',
    width: '15%',
  },
  {
    id: 'description',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Port Description',
    width: '15%',
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

interface VerifiedPortRowProps {
  port: any;
}

const VerifiedPortRow: React.FC<VerifiedPortRowProps> = ({
  port,
}) => {
  const date = getDateInMediumFormat(port.created_at);
  const time = getTimeInMediumFormat(port.created_at);
  const verifiedByDate = getDateInMediumFormat(port.verified_on);
  const verifiedByTime = getTimeInMediumFormat(port.verified_on);

  return (
    <TableRow>
      <ElipsisCell width="10%" align="left" className="bold-font" text={port.id} />
      <TitleSubtitle width="10%" maxWidth="10vw" align="left" title={port.ne_name} subTitle={port.position_in_ne ? `(${port.position_in_ne})` : '-'} boldTitle />
      <ElipsisCell width="15%" align="left" text={port.port_name} />
      <ElipsisCell width="15%" align="left" text={port.port_description || '-'} />
      <ElipsisCell width="10%" align="left" text={port.organization_name} />
      <ElipsisCell width="10%" align="left" text={`${port.first_name} ${port.last_name}`} />
      <TitleSubtitle width="10%" maxWidth="10vw" align="left" title={date} subTitle={time} />
      <TitleSubtitle width="10%" maxWidth="10vw" align="left" title={port.verified_on ? verifiedByDate : '-'} subTitle={port.verified_on ? verifiedByTime : ''} />
      <ElipsisCell width="10%" align="left" text={port.verified_by || '-'} />
    </TableRow>
  );
};

export default VerifiedPortRow;
