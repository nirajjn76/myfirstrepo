import React from 'react';
import { Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import ShowMoreText from 'react-show-more-text';
import Input from '../../DesignSystem/input';
import Dropdown from '../../DesignSystem/dropdown';
import Spinner from '../../DesignSystem/spinner';
import { PURCHASE_PORT_CHARGE_PER_MONTH, TableConstants, YearDaysForCalculation } from '../../../utils/appConstants';
import DollarIcon from '../../../assets/images/dollar.svg';
import SwipeIcon from '../../../assets/images/swipe-icon.svg';
import SearchIcon from '../../../assets/images/search-icon.svg';
import MapSearchIcon from '../../../assets/images/map-search-icon.svg';

interface BandwidthListProps {
  data: any[];
  onDrawerContentChange: (content: 'list' | 'purchase', bandwidth: any) => void;
  onFilterChange: (filter: string) => void;
  listOptions: any[];
  filter: string;
  searchText: string;
  onSearchChange: (e: any) => void;
  neNames: any;
  loading: boolean;
}

const BandwidthList: React.FC<BandwidthListProps> = ({
  data, onDrawerContentChange, onFilterChange, listOptions, filter, searchText, onSearchChange, neNames, loading,
}) => {
  const neText = neNames.nneName; const
    feText = neNames.fneName;

  let rows;
  if (loading) {
    rows = (
      <div className="loading">
        <Spinner size={30} />
      </div>
    );
  } else if (data.length === 0) {
    rows = (
      <div>
        {TableConstants.noRecordsFound}
      </div>
    );
  } else {
    rows = data.map((item: any, index: number) => {
      const onContractPerMonth = item.on_contract_price ? (parseFloat(item.on_contract_price) + (2 * PURCHASE_PORT_CHARGE_PER_MONTH)).toFixed(2) : 0;
      const onDemandPerMonth = item.on_demand_price ? ((parseFloat(item.on_demand_price) / 100) * ((60 * 24 * YearDaysForCalculation) / 12) + (2 * PURCHASE_PORT_CHARGE_PER_MONTH)).toFixed(2) : 0;
      return (
        <Tooltip
          key={index}
          placement="bottom"
          title={item.isDisable
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
            <div className={clsx('row', item.isDisable && 'disabled')} onClick={() => onDrawerContentChange('purchase', item)}>
              <div className="service-desc-main">
                <label className="service-desc" onClick={(e) => e.stopPropagation()}>
                  <ShowMoreText
                    lines={2}
                    more="More"
                    less="Less"
                    expanded={false}
                    truncatedEndingComponent="..."
                  >
                    {item.service_description}
                  </ShowMoreText>
                </label>

                <label className="organtization">{item.organization_name}</label>
              </div>
              <div>
                {
                  item.on_contract_price ? (
                    <>
                      <div>
                        <img src={DollarIcon} alt="Dollar" />
                        {' '}
                        {onContractPerMonth}
                      </div>
                      <div>
                        Per Month
                      </div>
                    </>
                  ) : '-'
                }
              </div>
              <div>
                {
                  item.on_demand_price ? (
                    <>
                      <div>
                        <img src={DollarIcon} alt="Dollar" />
                        {' '}
                        {onDemandPerMonth}
                      </div>
                      <div>
                        Per Month
                      </div>
                    </>
                  ) : '-'
                }
              </div>
            </div>
          </div>
        </Tooltip>
      );
    });
  }

  return (
    <div className="list-bandwidth-form">
      <div className="list-bandwidth">
        <div className="title">
          <label>
            {data.length}
            {' '}
            Bandwidth/s
          </label>
          <div>
            <div className="fe-text">
              <img src={MapSearchIcon} alt="Swipe" data-testid="swipe-icon" />
              {neText}
            </div>
            <div className="swap">
              <img src={SwipeIcon} alt="Swipe" data-testid="swipe-icon" />
            </div>
            <div className="ne-text">
              {feText}
            </div>
          </div>
        </div>
        <div className="list-root">
          <div className="filter">
            <div>
              <Input variant="input-pre-icon" icon={SearchIcon} placeholder="Search" name="search" value={searchText} onChange={onSearchChange} className="bandwidth-lis-search" />
            </div>
            <div>
              <label>Filter by</label>
              <Dropdown className="ne-select" value={filter} valueKey="value" textKey="label" icon="icon" options={listOptions} onChange={onFilterChange} />
            </div>
          </div>
          <div className="list">
            <div className="header">
              <label>Service Description</label>
              <label>On Contract</label>
              <label>On Demand</label>
            </div>
            <div className="rows">
              {rows}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandwidthList;
