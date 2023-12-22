import React, { useMemo } from 'react';
import {
  TableRow, TableCell, Tooltip,
} from '@material-ui/core';
import { HeadCellType, YearDaysForCalculation, PURCHASE_PORT_CHARGE_PER_MONTH } from '../../utils/appConstants';
import ElipsisCell from '../DesignSystem/Table/Cells/ElipsisTextCell';
import TitleSubtitle from '../DesignSystem/Table/Cells/TitleSubtitle';
import Button from '../DesignSystem/button';
import DollarIcon from '../../assets/images/dollar.svg';
import GroupIconGlobe from '../../assets/images/group-icon-globe.svg';
import GroupIconCloud from '../../assets/images/group-icon-cloud.svg';
import GroupIconRouter from '../../assets/images/group-icon-router.svg';
import TypeNetworkServicesIcon from '../../assets/images/type-icon-network-services.svg';

export const headCells: HeadCellType[] = [
  {
    id: 'ne_name',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Source',
    width: '10%',
  },
  {
    id: 'seller',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Seller',
    width: '10%',
  },
  {
    id: 'type',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Type',
    width: '15%',
  },
  {
    id: 'description',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Service Description',
    width: '20%',
  },
  {
    id: 'on_contract_price',
    align: 'right',
    disablePadding: false,
    sortEnabled: true,
    label: 'On Contract Price',
    width: '15%',
  },
  {
    id: 'on_demand_price',
    align: 'right',
    disablePadding: false,
    sortEnabled: true,
    label: 'On Demand Price',
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
  onAggredTermsClick: (_: any) => void;
}
const VerifiedPortRow: React.FC<VerifiedPortRowProps> = ({
  port, onAggredTermsClick,
}) => {
  const onContractPrice = (
    <div className="price-title">
      { port.on_contract_price === 0 ? '-' : (
        <>
          {' '}
          <img src={DollarIcon} alt="Dollar" />
          <label>{(port.on_contract_price + PURCHASE_PORT_CHARGE_PER_MONTH).toFixed(2)}</label>
        </>
      )}
    </div>
  );

  const onDemandPerMonth = port.on_demand_price ? ((parseFloat(port.on_demand_price) / 100) * ((60 * 24 * YearDaysForCalculation) / 12) + PURCHASE_PORT_CHARGE_PER_MONTH).toFixed(2) : 0;
  const onDemandPrice = (
    <div className="price-title">
      { onDemandPerMonth === 0 ? '-' : (
        <>
          <img src={DollarIcon} alt="Dollar" />
          <label>{parseFloat(onDemandPerMonth).toFixed(2)}</label>
        </>
      )}
    </div>
  );

  const TypeIcon = useMemo(() => {
    if (port.type === 'Internet') {
      return GroupIconGlobe;
    } if (port.type === 'Cloud') {
      return GroupIconCloud;
    } if (port.type === 'Network Services') {
      return TypeNetworkServicesIcon;
    }
    return GroupIconRouter;
  }, [port.type]);

  const sourceTitle = (
    <b>{port.ne_name}</b>
  );

  const portType = (
    <div style={{ display: 'flex' }}>
      <img style={{ marginRight: '10px', marginTop: '-1px' }} src={TypeIcon} alt="type" />
      <span>{port.type.charAt(0).toUpperCase() + port.type.slice(1)}</span>
    </div>

  );
  return (
    <TableRow>
      <ElipsisCell width="10%" align="left" text="" node={sourceTitle} />
      <ElipsisCell width="10%" align="left" text={port.organization_name} />
      <ElipsisCell width="15%" align="left" node={portType} text="" />
      <ElipsisCell width="20%" align="left" text={port.service_description || '-'} />
      <TitleSubtitle width="15%" maxWidth="15vw" align="right" titleNode={onContractPrice} title="" subTitle={port.on_contract_price === 0 ? '' : 'Per month'} boldTitle />
      <TitleSubtitle width="15%" maxWidth="15vw" align="right" titleNode={onDemandPrice} title="" subTitle={onDemandPerMonth === 0 ? '' : 'Per month'} boldTitle />
      <TableCell align="left" width="15%">
        <Tooltip
          placement="left"
          title={port.isDisable
            ? (
              <div>
                <div>This Network Resources is put for sale by your organization.</div>
              </div>
            )

            : ''}
          classes={{
            tooltip: 'tooltip',
          }}
          arrow
        >
          <div>
            <Button className="btn-terms-of-service" variant="success" text="Terms of Service" onClick={() => onAggredTermsClick(port)} disabled={port.isDisable} />
          </div>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default VerifiedPortRow;
