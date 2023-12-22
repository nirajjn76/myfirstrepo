import React from 'react';
import {
  TableCell,
  TableRow,
} from '@material-ui/core';
import { HeadCellType } from '../../../utils/appConstants';
import ElipsisCell from '../../DesignSystem/Table/Cells/ElipsisTextCell';

export const headCells: HeadCellType[] = [
  {
    id: 'resource_type',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Service Type',
    width: '10%',
  },
  {
    id: 'near_node_name',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'NE Name',
    width: '10%',
  },
  {
    id: 'far_node_name',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'FE Name',
    width: '10%',
  },
  {
    id: 'service_description',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Description',
    width: '25%',
  },
  {
    id: 'provider',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Provider',
    width: '10%',
  },
  {
    id: 'payee',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Payer/Payee',
    width: '15%',
  },
  {
    id: 'average',
    align: 'right',
    disablePadding: false,
    sortEnabled: false,
    label: 'Average $ Per Month',
    width: '10%',
  },
  {
    id: 'total',
    align: 'right',
    disablePadding: false,
    sortEnabled: false,
    label: 'Total',
    width: '10%',
  },
];

interface PortsRowProps {
  bandwidthPort: any;
}

const BandwidthPortRow: React.FC<PortsRowProps> = ({
  bandwidthPort,
}) => {
  let serviceType;
  if (bandwidthPort.price_type === 'on_contract') {
    serviceType = 'On Contract';
  } else if (bandwidthPort.price_type === 'on_demand') {
    serviceType = 'On Demand';
  } else {
    serviceType = bandwidthPort.price_type;
  }
  return (
    <TableRow>
      <ElipsisCell width="10%" align="left" text={serviceType} />
      <ElipsisCell width="10%" align="left" text={bandwidthPort.near_ne_name} />
      <ElipsisCell width="10%" align="left" text={bandwidthPort.far_ne_name} />
      <ElipsisCell width="25%" align="left" text={bandwidthPort.service_description} />
      <ElipsisCell width="10%" align="left" text={bandwidthPort.provider} />
      <ElipsisCell width="15%" align="left" text={bandwidthPort.payee} />
      {/* <ElipsisCell width="10%" align="right" text={`$${parseFloat(bandwidthPort.avgPerMonth).toFixed(2)}`} /> */}
      {/* <TableCell align="right">{`$${parseFloat(bandwidthPort.avgPerMonth).toFixed(2)}`}</TableCell>
      <ElipsisCell width="10%" align="right" text={`$${parseFloat(bandwidthPort.total).toFixed(2)}`} /> */}

      <TableCell align="right">{bandwidthPort.transaction_type === 4 || bandwidthPort.transaction_type === 10 ? `($${parseFloat(bandwidthPort.avgPerMonth).toFixed(2)})` : `$${parseFloat(bandwidthPort.avgPerMonth).toFixed(2)}`}</TableCell>
      <ElipsisCell width="10%" align="right" text={bandwidthPort.transaction_type === 4 || bandwidthPort.transaction_type === 10 ? `($${parseFloat(bandwidthPort.total).toFixed(2)})` : `$${parseFloat(bandwidthPort.total).toFixed(2)}`} />
    </TableRow>
  );
};

export default BandwidthPortRow;
