import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import clsx from 'clsx';
import SwipeIcon from '../../../assets/images/swipe-icon.svg';
import MapSearchIcon from '../../../assets/images/map-search-icon.svg';
import PriceBox from './PriceBox';
import { getDateInMediumFormat, getTimeInMediumFormat } from '../../../utils/methods';
import { PURCHASE_PORT_CHARGE_PER_MONTH, YearDaysForCalculation } from '../../../utils/appConstants';

interface BandwidthDetailsProps {
  bandwidth: any;
  onDrawerContentChange: (content: 'list' | 'details') => void;
  isDirect?: boolean;
}

const BandwidthDetails: React.FC<BandwidthDetailsProps> = ({ bandwidth, onDrawerContentChange, isDirect }) => {
  const consumed = !!((bandwidth?.status === 'Cross-Connected (Purchased)' || bandwidth?.status === 'Cross-Connected (Added)') || (bandwidth?.transaction_type === 7 && bandwidth?.status === 'put_up_for_sale_bandwidth'));
  const available = !!(!bandwidth?.transaction_type && bandwidth?.verified) || (!bandwidth?.transaction_type && !bandwidth?.verified) || (bandwidth?.transaction_type === 4 && bandwidth?.current_owner_organization_id == localStorage.getItem('org_id'));
  const sold = !!(bandwidth?.transaction_type === 4 && bandwidth?.organization_id == localStorage.getItem('org_id'));
  let added = false;
  let purchased = false;
  let id = '';
  let labelForId = '';
  let label = '';
  const neText = bandwidth?.near_network_element;
  const feText = bandwidth?.far_network_element;
  const date = `${getDateInMediumFormat(bandwidth?.date)} ${getTimeInMediumFormat(bandwidth?.date)}`;

  if (consumed) {
    id = 'consumed';
    labelForId = 'Consumed';
    label = 'Put  up for Sale';
    if (bandwidth?.status === 'Cross-Connected (Purchased)') {
      label = 'Cross-Connected (Purchased)';
      purchased = true;
      id = 'consumed';
      labelForId = 'Consumed';
    } else if (bandwidth?.status === 'Cross-Connected (Added)') {
      label = 'Cross-Connected (Added)';
      added = true;
      id = 'consumed';
      labelForId = 'Consumed';
    }
  } else if (available) {
    id = 'available';
    labelForId = 'Available';
    if (bandwidth?.status === 'Cross-Connected (Purchased)') {
      label = 'Cross-Connected (Purchased)';
      purchased = true;
      id = 'consumed';
      labelForId = 'Consumed';
    } else if (bandwidth?.status === 'Cross-Connected (Added)') {
      label = 'Cross-Connected (Added)';
      added = true;
      id = 'consumed';
      labelForId = 'Consumed';
    } else if ((!bandwidth?.transaction_type && bandwidth?.verified) || (!bandwidth?.transaction_type && !bandwidth?.verified)) {
      label = 'Added';
      added = true;
    } else if (bandwidth?.transaction_type === 4) {
      label = 'Purchased';
      purchased = true;
    }
  } else if (sold) {
    id = 'sold';
    labelForId = 'Sold';
  }

  return (
    <div className="bandwidth-details-form">
      <div className="title">
        {!isDirect && <ArrowBackIcon onClick={() => onDrawerContentChange('list')} />}
        <label>Bandwidth Details</label>
      </div>

      <div className="title-info">
        <div className="left">
          <div className={clsx('dot', id)} />
          <label className={clsx(id)}>{labelForId}</label>
        </div>
        <div className="right">
          <label>{label}</label>
        </div>
      </div>

      <div className="bandwidth-points">
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

      <div className="form-details">
        <div className="description">
          <label>
            {available ? 'Bandwidth' : 'Service'}
            {' '}
            Description
          </label>
          <div className="description-value">
            <span>{bandwidth?.description || bandwidth?.service_description || '-'}</span>
          </div>
        </div>

        <div className="port-names">
          <div className="port-name">
            <label>Port Name</label>
            <div className="port-name-value">
              <span>{bandwidth?.near_port_name}</span>
            </div>
          </div>
          <div className="port-name">
            <label>Port Name</label>
            <div className="port-name-value">
              <span>{bandwidth?.far_port_name}</span>
            </div>
          </div>
        </div>

        <div className="port-names">
          <div className="port-name">
            <label>Description</label>
            <div className="desc-value">
              <span>{bandwidth?.near_port_description}</span>
            </div>
          </div>
          <div className="port-name">
            <label>Description</label>
            <div className="desc-value">
              <span>{bandwidth?.far_port_description}</span>
            </div>
          </div>
        </div>

        {
          (added || consumed) ? (
            <div className="description date">
              <label>Date & Time</label>
              <div className="date-value">
                {date}
              </div>
            </div>
          ) : ''
        }

        {
          (consumed && bandwidth?.on_contract_price) ? (
            <div className="purchase-details">
              <PriceBox onContractPrice={bandwidth?.on_contract_price && (bandwidth.on_contract_price + (PURCHASE_PORT_CHARGE_PER_MONTH * 2))} />
            </div>
          ) : ''
        }

        {
          (consumed && bandwidth?.on_demand_price) ? (
            <div className="purchase-details">
              <PriceBox onDemandPrice={bandwidth?.on_demand_price} />
            </div>
          ) : ''
        }

        {
          sold ? (
            <div className="purchase-details">
              <label>Sold Details</label>
              <PriceBox className="border-bottom" sold onContractPrice={bandwidth?.price_type === 'on_contract' && bandwidth?.price} onDemandPrice={bandwidth?.price_type === 'on_demand' && bandwidth?.price} date={date} organizationName={bandwidth?.organization_name} isFullDetails />
            </div>
          ) : ''
        }

        {
          purchased ? (
            <div className="purchase-details">
              <label>Purchase Details</label>
              <PriceBox className="border-bottom" onContractPrice={bandwidth?.price_type === 'on_contract' && bandwidth?.price} onDemandPrice={bandwidth?.price_type === 'on_demand' && bandwidth?.price} date={date} organizationName={bandwidth?.seller} isFullDetails />
            </div>
          ) : ''
        }
      </div>
    </div>
  );
};

export default BandwidthDetails;
