import React from 'react';
import { Checkbox, Tooltip } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Button from '../../DesignSystem/button';
import Input from '../../DesignSystem/input';
import Textarea from '../../DesignSystem/textarea';
import FormFieldBox from '../../DesignSystem/formFieldBox';
import { PURCHASE_PORT_CHARGE_PER_MONTH, YearDaysForCalculation } from '../../../utils/appConstants';
import GreenCheckMark from '../../../assets/images/right-green-check-mark.svg';
import InfoIcon from '../../../assets/images/info-icon.svg';
import DollarIcon from '../../../assets/images/dollar.svg';
import CentIcon from '../../../assets/images/cent.svg';
import SwipeIcon from '../../../assets/images/swipe-icon.svg';
import BlueCheckMark from '../../../assets/images/ic-agreement.svg';

export interface PurchaseBandwidthFormProps {
  selectedRowForPurchase: any;
  values: any;
  onContractSelected: boolean;
  agreementSelected: {
    on_contract: boolean,
    on_demand: boolean
  };
  onDemandSelected: boolean;
  onContractPrice: string;
  onDemandPrice: string;
  disabled: boolean;
  loading: boolean;
  selectedPrice: string;
  mapView?: boolean;
  onBackToListClick?: () => void;
  handlePurchaseClick: () => void;
  handleInputChange: (e: any) => void;
  handleAgreementSelected: (e: any) => void;
  onClose: () => void;
  onAggredTermsClick: (_: string) => void;
  onSelectedPriceChange: (_: string) => void;
}

const PurchaseBandwidthForm: React.FC<PurchaseBandwidthFormProps> = ({
  onClose, onAggredTermsClick, onSelectedPriceChange, selectedPrice, mapView, onBackToListClick, selectedRowForPurchase, values, agreementSelected, onContractSelected, onDemandSelected, onContractPrice, onDemandPrice, disabled, loading, handleAgreementSelected, handlePurchaseClick, handleInputChange,
}) => {
  const onContractPerMinute = onContractPrice ? ((parseFloat(onContractPrice) * 100 * 12) / (YearDaysForCalculation * 24 * 60)).toFixed(2) : 0;
  const onDemandPerMonth = onDemandPrice ? ((parseFloat(onDemandPrice) / 100) * ((60 * 24 * YearDaysForCalculation) / 12) + (PURCHASE_PORT_CHARGE_PER_MONTH * 2)).toFixed(2) : 0;
  const onDemandPerMinute = onDemandPerMonth ? ((parseFloat(onDemandPerMonth) * 100 * 12) / (YearDaysForCalculation * 24 * 60)).toFixed(2) : 0;
  const onDemandPerDay = onDemandPrice ? ((parseFloat(onDemandPrice) * 60 * 24) / 100).toFixed(2) : 0;

  let title;

  if (mapView) {
    title = (
      <div className="title-with-back-icon">
        <div>
          <ArrowBackIcon onClick={onBackToListClick} />
          <label>Purchase Bandwidth</label>
        </div>
        <div>
          <span>{values.organization}</span>
        </div>
      </div>
    );
  } else {
    title = (
      <div className="title">
        <label>Purchase Bandwidth</label>
      </div>
    );
  }

  return (
    <div className="purchase-bandwidth-form">
      <div className="add-group-root">
        {title}
        <div className="form">
          <div className="port-name">
            <div className="nearend-port">
              <label>{selectedRowForPurchase?.near_network_element}</label>
            </div>
            <span className="swipe-icon"><img src={SwipeIcon} alt="Swipe" data-testid="swipe-icon" /></span>
            <div className="farend-port">
              <label>{selectedRowForPurchase?.far_network_element}</label>
            </div>
            <hr style={{ marginTop: '25px', border: '1px solid #4D4D4D' }} />
            <div>
              <div className="bandwidth-desc">
                <FormFieldBox excludeMarginTop excludeMarginBottom>
                  <label>
                    Bandwidth Description
                    <span className="astrisk">*</span>
                  </label>
                  <Textarea value={values.bandwidthDescription} onChange={handleInputChange} className="group-description" name="bandwidthDescription" />
                </FormFieldBox>
              </div>
              <div className="bandwidth-port-detail-form">
                <div style={{ width: '45%' }}>
                  <FormFieldBox>
                    <label>
                      Port Name
                      <span className="astrisk">*</span>
                    </label>
                    <Input variant="input" value={values.nePortName} onChange={handleInputChange} className="port-name-input" name="nePortName" />
                  </FormFieldBox>
                  <FormFieldBox>
                    <label>
                      Port Description
                      <span className="astrisk">*</span>
                    </label>
                    <Textarea rows={3} value={values.neServiceDescription} onChange={handleInputChange} className="port-desc-input" name="neServiceDescription" />
                  </FormFieldBox>
                </div>
                <div style={{ width: '45%' }}>
                  <FormFieldBox>
                    <label>
                      Port Name
                      <span className="astrisk">*</span>
                    </label>
                    <Input variant="input" value={values.fePortName} onChange={handleInputChange} className="port-name-input" name="fePortName" />
                  </FormFieldBox>

                  <FormFieldBox>
                    <label>
                      Port Description
                      <span className="astrisk">*</span>
                    </label>
                    <Textarea rows={3} value={values.feServiceDescription} onChange={handleInputChange} className="port-desc-input" name="feServiceDescription" />
                  </FormFieldBox>
                </div>
              </div>

            </div>
          </div>

          {selectedRowForPurchase?.on_contract_price > 0 && (
            <div className="price">
              <div className="price-box-main">
                <div className="left">
                  {/* <Radio classes={{ root: 'radio' }} checked={onContractSelected} onChange={handleOnContractSelected} checkedIcon={<img className="checked-icon" src={GreenCheckMark} alt="radio" />} /> */}
                  <Checkbox
                    classes={{
                      root: 'radio',
                    }}
                    color="default"
                    checked={selectedPrice === 'on_contract'}
                    onChange={() => onSelectedPriceChange('on_contract')}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<img className="checked-icon" src={GreenCheckMark} alt="radio" />}
                  />
                </div>
                <div className="right">
                  <label>On Contract</label>
                  <div>
                    <FormFieldBox className="form-box-price">
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
                          <label>{onContractPrice}</label>

                        </span>
                        <div className="info-text">
                          <span>Per Month</span>
                          <span>(Calender)</span>
                        </div>
                      </div>
                      <label className="per-month-price">
                        {onContractPerMinute}
                        <span className="cent">
                          <img src={CentIcon} alt="Cent" />
                        </span>
                        {' '}
                        Per Minute (Average)
                      </label>
                    </FormFieldBox>
                  </div>
                </div>

              </div>
              <div className="agreement-info">
                <div className="left">
                  <Checkbox
                    classes={{
                      root: 'radio',
                    }}
                    color="default"
                    disabled={!agreementSelected.on_contract}
                    checked={agreementSelected.on_contract && selectedPrice === 'on_contract'}
                    onChange={handleAgreementSelected}
                    icon={<RadioButtonUncheckedIcon style={{ display: 'none' }} />}
                    checkedIcon={<img className="checked-icon" src={BlueCheckMark} alt="radio" />}
                  />
                </div>
                <div className="right">
                  <label>Agreement</label>
                  <p>
                    Please
                    {' '}
                    <span data-testid="on_contract_terms" onClick={() => onAggredTermsClick('on_contract')}>click here</span>
                    {' '}
                    to accept terms of services
                  </p>
                </div>
              </div>
            </div>
          )}
          {selectedRowForPurchase?.on_demand_price > 0 && (
            <div className="price">
              <div className="price-box-main">
                <div className="left">
                  {/* <Radio classes={{ root: 'radio' }} checked={onDemandSelected} onChange={handleOnDemandSelected} checkedIcon={<img className="checked-icon" src={GreenCheckMark} alt="radio" />} /> */}
                  <Checkbox
                    classes={{
                      root: 'radio',
                    }}
                    color="default"
                    checked={selectedPrice === 'on_demand'}
                    onChange={() => onSelectedPriceChange('on_demand')}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<img className="checked-icon" src={GreenCheckMark} alt="radio" />}
                  />
                </div>
                <div className="right">
                  <label>On Demand</label>
                  <div>
                    <FormFieldBox className="form-box-price">
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
                      <label className="per-month-price">
                        $
                        {onDemandPerMonth}
                        {' '}
                        Per Month (Average), $
                        {onDemandPerDay}
                        {' '}
                        Per Day
                      </label>
                    </FormFieldBox>
                  </div>
                </div>
              </div>
              <div className="agreement-info">
                <div className="left">
                  <Checkbox
                    classes={{
                      root: 'radio',
                    }}
                    color="default"
                    disabled={!agreementSelected.on_demand}
                    checked={agreementSelected.on_demand && selectedPrice === 'on_demand'}
                    onChange={handleAgreementSelected}
                    icon={<RadioButtonUncheckedIcon style={{ display: 'none' }} />}
                    checkedIcon={<img className="checked-icon" src={BlueCheckMark} alt="radio" />}
                  />
                </div>
                <div className="right">
                  <label>Agreement</label>
                  <p>
                    Please
                    {' '}
                    <span data-testid="on_demand_terms" onClick={() => onAggredTermsClick('on_demand')}>click here</span>
                    {' '}
                    to accept terms of services
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="buttons">
          <Button variant="greyed" className="btn cancel-btn" text="Cancel" onClick={onClose} />
          <Button variant="primary" className="btn" text="Purchase Bandwidth" disabled={disabled} onClick={handlePurchaseClick} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default PurchaseBandwidthForm;
