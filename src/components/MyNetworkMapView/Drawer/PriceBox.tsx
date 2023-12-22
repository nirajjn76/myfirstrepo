import React from 'react';
import clsx from 'clsx';
import { Tooltip } from '@material-ui/core';
import { PURCHASE_PORT_CHARGE_PER_MONTH, YearDaysForCalculation } from '../../../utils/appConstants';
import InfoIcon from '../../../assets/images/info-icon.svg';
import DollarIcon from '../../../assets/images/dollar.svg';
import CentIcon from '../../../assets/images/cent.svg';

interface PriceBoxProps {
  onContractPrice?: string;
  onDemandPrice?: string;
  className?: string;
  isFullDetails?: boolean;
  organizationName?: string;
  date?: string;
  sold?: boolean;
}

const PriceBox: React.FC<PriceBoxProps> = ({
  onContractPrice, onDemandPrice, className, isFullDetails, organizationName, date, sold,
}) => {
  const onContractPerMinute = onContractPrice ? ((parseFloat(onContractPrice) * 100 * 12) / (YearDaysForCalculation * 24 * 60)).toFixed(2) : 0;
  const onDemandPerMonth = onDemandPrice ? ((parseFloat(onDemandPrice) / 100) * ((60 * 24 * YearDaysForCalculation) / 12) + (PURCHASE_PORT_CHARGE_PER_MONTH * 2)).toFixed(2) : 0;
  const onDemandPerMinute = onDemandPerMonth ? ((parseFloat(onDemandPerMonth) * 100 * 12) / (YearDaysForCalculation * 24 * 60)).toFixed(2) : 0;
  const onDemandPerDay = onDemandPrice ? ((parseFloat(onDemandPrice) * 60 * 24) / 100).toFixed(2) : 0;
  let priceContent;

  if (onDemandPrice) {
    priceContent = (
      <>
        <label className="price-label">On Demand</label>
        <label>
          Price
          <Tooltip
            classes={{
              tooltip: 'tooltip',
            }}
            arrow
            placement="right"
            title="On Demand Price"
          >
            <img className="info-icon" src={InfoIcon} alt="radio" />
          </Tooltip>
        </label>
        <div className="input-main">
          <span className="price-info">
            <label>{onDemandPerMinute}</label>
            <img src={CentIcon} alt="Cent" />
          </span>
          <div className="info-text">
            <span>Per Minute</span>
          </div>
        </div>
        <label className={clsx('per-month-price', className)}>
          $
          {onDemandPerMonth}
          {' '}
          Per Month (Average), $
          {onDemandPerDay}
          {' '}
          Per Day
        </label>
      </>
    );
  } else if (onContractPrice) {
    priceContent = (
      <>
        <label className="price-label">On Contract</label>
        <label>
          Price
          <Tooltip
            classes={{
              tooltip: 'tooltip',
            }}
            arrow
            placement="right"
            title="On Contract Price"
          >
            <img className="info-icon" src={InfoIcon} alt="radio" />
          </Tooltip>
        </label>
        <div className="input-main">
          <span className="price-info">
            <img src={DollarIcon} alt="Dollar" />
            <label>{parseFloat(onContractPrice).toFixed(2)}</label>
          </span>
          <div className="info-text">
            <span>Per Month</span>
            <span>(Calender)</span>
          </div>
        </div>
        <label className={clsx('per-month-price', className)}>
          {onContractPerMinute}
          <span className="cent">
            <img src={CentIcon} alt="Cent" />
          </span>
          {' '}
          Per Minute (Average)
        </label>
      </>
    );
  }

  return (
    <div className="details">
      {priceContent || ''}

      {
        isFullDetails && (
          <div className="purchase-date">
            <label>Date & Time</label>
            <div className="date-value">
              {date}
            </div>
          </div>
        )
      }

      {
        isFullDetails && (
          <div className="seller-info">
            <label>{sold ? 'Buyer' : 'Seller'}</label>
            <span>{organizationName}</span>
          </div>
        )
      }
    </div>
  );
};

export default PriceBox;
