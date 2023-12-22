import React from 'react';
import {
  TableCell,
  TableRow,
} from '@material-ui/core';
import { HeadCellType } from '../../../utils/appConstants';
import ElipsisCell from '../../DesignSystem/Table/Cells/ElipsisTextCell';

export const headCells: HeadCellType[] = [
  {
    id: 'resourceType',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Service Type',
    width: '15%',
  },
  {
    id: 'feeType',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Node/Route',
    width: '15%',
  },
  {
    id: 'description',
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
  port: any;
}

const PortRow: React.FC<PortsRowProps> = ({
  port,
}) => {
  let serviceType;
  if (port.price_type === 'on_contract') {
    serviceType = 'On Contract';
  } else if (port.price_type === 'on_demand') {
    serviceType = 'On Demand';
  } else {
    serviceType = port.price_type;
  }
  return (
    <TableRow>
      <ElipsisCell width="15%" align="left" text={serviceType} />
      <ElipsisCell width="15%" align="left" text={port.node_name} />
      <ElipsisCell width="25%" align="left" text={port.port_description} />
      <ElipsisCell width="10%" align="left" text={port.provider} />
      <ElipsisCell width="15%" align="left" text={port.payee} />
      {/* <ElipsisCell width="10%" align="right" text={`$${parseFloat(port.avgPerMonth).toFixed(2)}`} /> */}
      <TableCell align="right">{port.transaction_type === 1 || port.transaction_type === 10 ? `($${parseFloat(port.avgPerMonth).toFixed(2)})` : `$${parseFloat(port.avgPerMonth).toFixed(2)}`}</TableCell>
      <ElipsisCell width="10%" align="right" text={port.transaction_type === 1 || port.transaction_type === 10 ? `($${parseFloat(port.total).toFixed(2)})` : `$${parseFloat(port.total).toFixed(2)}`} />
    </TableRow>
  );
};

export default PortRow;
