import React from 'react';
import {
  TableCell, TableRow, Tooltip,
} from '@material-ui/core';
import Button from '../DesignSystem/button';
import TitleSubtitle from '../DesignSystem/Table/Cells/TitleSubtitle';
import ElipsisCell from '../DesignSystem/Table/Cells/ElipsisTextCell';
import { HeadCellType, YearDaysForCalculation, PURCHASE_PORT_CHARGE_PER_MONTH } from '../../utils/appConstants';
import DollarIcon from '../../assets/images/dollar.svg';

export const headCells: HeadCellType[] = [

  {
    id: 'nne_name',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Nearend Network Elements',
    searchEnabled: true,
    width: '20%',
  },
  {
    id: 'fne_name',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    searchEnabled: true,
    label: 'Farend Network Elements',
    width: '20%',
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
    id: 'service_description',
    align: 'left',
    disablePadding: false,
    sortEnabled: true,
    label: 'Service Description',
    width: '15%',
  },
  {
    id: 'on_contract_price',
    align: 'right',
    disablePadding: false,
    sortEnabled: true,
    label: 'On Contract Price',
    width: '10%',
  },
  {
    id: 'on_demand_price',
    align: 'right',
    disablePadding: false,
    sortEnabled: true,
    label: 'On Demand Price',
    width: '10%',
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

interface TableDataProps {
    bandwidthPort : any;
    handlePurchaseOpen: () => void;
}
const TableData: React.FC<TableDataProps> = ({ bandwidthPort, handlePurchaseOpen }) => {
  const onContractPrice = (
    <div className="price-title">
      { bandwidthPort.on_contract_price === 0 ? '-' : (
        <>
          {' '}
          <img src={DollarIcon} alt="Dollar" />
          <label>{(bandwidthPort.on_contract_price + (PURCHASE_PORT_CHARGE_PER_MONTH * 2)).toFixed(2)}</label>
        </>
      )}
    </div>
  );

  const onDemandPerMonth = bandwidthPort.on_demand_price ? ((parseFloat(bandwidthPort.on_demand_price) / 100) * ((60 * 24 * YearDaysForCalculation) / 12) + (PURCHASE_PORT_CHARGE_PER_MONTH * 2)).toFixed(2) : 0;
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

  return (
    <TableRow>
      <TitleSubtitle width="20%" maxWidth="15vw" align="left" title={bandwidthPort.near_network_element} subTitle={bandwidthPort.near_node_street ? `(${bandwidthPort.near_node_street})` : '-'} boldTitle isSwipeIcon />
      <TitleSubtitle width="20%" maxWidth="15vw" align="left" title={bandwidthPort.far_network_element} subTitle={bandwidthPort.far_node_street ? `(${bandwidthPort.far_node_street})` : '-'} boldTitle />
      <ElipsisCell width="10%" align="left" text={bandwidthPort.organization_name} />
      <ElipsisCell align="left" width="15%" text={bandwidthPort.service_description} />
      <TitleSubtitle width="10%" maxWidth="15vw" align="right" titleNode={onContractPrice} title="" subTitle={bandwidthPort.on_contract_price === 0 ? '' : 'Per month'} boldTitle />
      <TitleSubtitle width="10%" maxWidth="15vw" align="right" titleNode={onDemandPrice} title="" subTitle={onDemandPerMonth === 0 ? '' : 'Per month'} boldTitle />
      <TableCell align="left" width="15%">
        <Tooltip
          placement="left"
          title={bandwidthPort.isDisable
            ? (
              <div>
                <div>This Bandwidth is put for sale by your organization.</div>
              </div>
            )

            : ''}
          classes={{
            tooltip: 'tooltip',
          }}
          arrow
        >
          <div>
            <Button disabled={bandwidthPort.isDisable} className="btn-purchase" variant="success" text="Terms of Service" onClick={handlePurchaseOpen} />
          </div>
        </Tooltip>

      </TableCell>

    </TableRow>
  );
};

export default TableData;
