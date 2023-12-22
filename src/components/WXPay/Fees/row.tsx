import React from 'react';
import {
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
    label: 'Resource Type',
    width: '20%',
  },
  {
    id: 'feeType',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Fee Type',
    width: '20%',
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
    id: 'payee',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Payer/Payee',
    width: '25%',
  },
  {
    id: 'total',
    align: 'right',
    disablePadding: false,
    sortEnabled: true,
    label: 'Total',
    width: '10%',
  },
];

interface FeeRowProps {
  fee: any;
}

const FeeRow: React.FC<FeeRowProps> = ({
  fee,
}) => {
  return (
    <TableRow>
      <ElipsisCell width="20%" align="left" text={fee.nr_type.charAt(0).toUpperCase() + fee.nr_type.slice(1)} />
      <ElipsisCell width="20%" align="left" text={fee.fees_type} />
      <ElipsisCell width="25%" align="left" text={fee.description} />
      <ElipsisCell width="25%" align="left" text={fee.payee} />
      <ElipsisCell width="10%" align="right" text={`$${parseFloat(fee.wx_fees).toFixed(2)}`} />
    </TableRow>
  );
};

export default FeeRow;
