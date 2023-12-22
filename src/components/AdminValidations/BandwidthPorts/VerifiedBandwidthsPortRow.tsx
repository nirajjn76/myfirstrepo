import React from 'react';
import {
  TableRow, TableCell,
} from '@material-ui/core';
import clsx from 'clsx';
import { HeadCellType } from '../../../utils/appConstants';
import ElipsisCell from '../../DesignSystem/Table/Cells/ElipsisTextCell';
import TitleSubtitle from '../../DesignSystem/Table/Cells/TitleSubtitle';
import { getTimeInMediumFormat, getDateInMediumFormat } from '../../../utils/methods';

export const headCells: HeadCellType[] = [
  {
    id: 'blank',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: '',
    width: '1%',
  },
  {
    id: 'portId',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Port ID',
    width: '5%',
  },
  {
    id: 'neName',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Network Element (ID)',
    width: '14%',
  },
  {
    id: 'portName',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Port Name',
    width: '15%',
    tooltipTitle: 'Port Name',
  },
  {
    id: 'portDescription',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
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
    sortEnabled: false,
    label: 'Verified Date',
    width: '10%',
  },
  {
    id: 'verified_by',
    align: 'left',
    disablePadding: false,
    sortEnabled: false,
    label: 'Verified By',
    width: '10%',
  },
];

interface VerifiedBandwidthRowProps {
  bandwidthPort: any;
}

const VerifiedBandwidthsPortRow: React.FC<VerifiedBandwidthRowProps> = ({
  bandwidthPort,
}) => {
  const date = getDateInMediumFormat(bandwidthPort.created_at);
  const time = getTimeInMediumFormat(bandwidthPort.created_at);
  const nVerifiedByDate = getDateInMediumFormat(bandwidthPort.nverified_on);
  const nVerifiedByTime = getTimeInMediumFormat(bandwidthPort.nverified_on);
  const fVerifiedByDate = getDateInMediumFormat(bandwidthPort.fverified_on);
  const fVerifiedByTime = getTimeInMediumFormat(bandwidthPort.fverified_on);

  return (
    <>
      <TableRow>
        <TableCell rowSpan={3} width="1%" />
      </TableRow>
      <TableRow className={clsx(!bandwidthPort.nverified && 'grey-text')}>
        <ElipsisCell width="5%" align="left" className="bold-font" text={bandwidthPort.n_port_id} />
        <TitleSubtitle width="14%" maxWidth="15vw" align="left" title={bandwidthPort.nne_name} subTitle={bandwidthPort.nposition_in ? `(${bandwidthPort.nposition_in})` : '-'} boldTitle />
        <ElipsisCell width="15%" align="left" text={bandwidthPort.nport_name} />
        <ElipsisCell width="15%" align="left" text={bandwidthPort.ndescription || '-'} />
        <ElipsisCell width="10%" align="left" text={bandwidthPort.organization_name} />
        <ElipsisCell width="10%" align="left" text={`${bandwidthPort.first_name} ${bandwidthPort.last_name}`} />
        <TitleSubtitle width="10%" maxWidth="10vw" align="left" title={date} subTitle={time} />
        <TitleSubtitle width="10%" maxWidth="10vw" align="left" title={bandwidthPort.nverified_on ? nVerifiedByDate : '-'} subTitle={bandwidthPort.nverified_on ? nVerifiedByTime : ''} />
        <ElipsisCell width="10%" align="left" text={bandwidthPort.nverified_by || '-'} />
      </TableRow>
      <TableRow className={clsx(!bandwidthPort.fverified && 'grey-text')}>
        <ElipsisCell width="5%" align="left" className="bold-font" text={bandwidthPort.f_port_id} />
        <TitleSubtitle width="14%" maxWidth="15vw" align="left" title={bandwidthPort.fne_name} subTitle={bandwidthPort.fpostion_in ? `(${bandwidthPort.fpostion_in})` : '-'} boldTitle />
        <ElipsisCell width="15%" align="left" text={bandwidthPort.fport_name} />
        <ElipsisCell width="15%" align="left" text={bandwidthPort.fdescription || '-'} />
        <ElipsisCell width="10%" align="left" text={bandwidthPort.organization_name} />
        <ElipsisCell width="10%" align="left" text={`${bandwidthPort.first_name} ${bandwidthPort.last_name}`} />
        <TitleSubtitle width="10%" maxWidth="10vw" align="left" title={date} subTitle={time} />
        <TitleSubtitle width="10%" maxWidth="10vw" align="left" title={bandwidthPort.fverified_on ? fVerifiedByDate : '-'} subTitle={bandwidthPort.fverified_on ? fVerifiedByTime : ''} />
        <ElipsisCell width="10%" align="left" text={bandwidthPort.fverified_by || '-'} />
      </TableRow>
    </>
  );
};

export default VerifiedBandwidthsPortRow;
