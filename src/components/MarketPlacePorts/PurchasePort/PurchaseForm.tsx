import React from 'react';
import { Checkbox, Tooltip } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ElipsisText from '../../DesignSystem/Table/Cells/ElipsisText';
import Button from '../../DesignSystem/button';
import Input from '../../DesignSystem/input';
import Textarea from '../../DesignSystem/textarea';
import FormFieldBox from '../../DesignSystem/formFieldBox';
import GreenCheckMark from '../../../assets/images/right-green-check-mark.svg';
import BlueCheckMark from '../../../assets/images/ic-agreement.svg';
import DollarIcon from '../../../assets/images/dollar.svg';
import CentIcon from '../../../assets/images/cent.svg';
import { YearDaysForCalculation } from '../../../utils/appConstants';

interface PutUpForSaleFormProps {
  loading: boolean;
  disabled: boolean;
  selectedPrice: string;
  portName: string;
  portDescription: string;
  portOnContractPrice: string;
  portOnDemandPrice: string;
  aggrementAccepted: {
    on_contract: boolean,
    on_demand: boolean
  };
  port: any;
  onPortNameChange: (e: any) => void;
  onPortDescriptionChange: (e: any) => void;
  onSelectedPriceChange: (_: string) => void;
  onAcceptAggrement: () => void;
  onAggredTermsClick: (_: string) => void;
  onClose: () => void;
  onSaleClick: () => void;
}

const PutUpForSaleForm: React.FC<PutUpForSaleFormProps> = ({
  disabled, loading, port, portOnContractPrice, portOnDemandPrice, selectedPrice, portName, portDescription, aggrementAccepted, onPortNameChange, onPortDescriptionChange, onSelectedPriceChange, onAggredTermsClick, onAcceptAggrement, onClose, onSaleClick,
}) => {
  const onContractPerMinute = portOnContractPrice ? ((parseFloat(portOnContractPrice) * 100 * 12) / (YearDaysForCalculation * 24 * 60)).toFixed(2) : 0;
  const onDemandPerMonth = portOnDemandPrice ? ((parseFloat(portOnDemandPrice) / 100) * ((60 * 24 * YearDaysForCalculation) / 12)).toFixed(2) : 0;
  const onDemandPerDay = portOnDemandPrice ? ((parseFloat(portOnDemandPrice) * 60 * 24) / 100).toFixed(2) : 0;

  return (
    <div className="purchase-nr-form">
      <div className="purchase-root">
        <div className="title">
          <label>Purchase Network Resource</label>
        </div>
        <div className="form">
          <div className="source-seller-info">
            <div>
              <label>Source</label>
              <span><ElipsisText text={port.ne_name} width="120" /></span>
            </div>
            <div>
              <div>
                <label>Seller</label>
                <span><ElipsisText text={port.organization_name} width="40" /></span>
              </div>
              <div>
                <label>Type</label>
                <span><ElipsisText text={port.type} width="40" /></span>
              </div>
            </div>
          </div>
          <div className="port-name-qty-info">
            <div>
              <FormFieldBox excludeMarginTop excludeMarginBottom>
                <label>
                  Port Name
                  <span className="astrisk">*</span>
                </label>
                <Input variant="input" type="text" min={1} icon={DollarIcon} name="port-name" value={portName} onChange={onPortNameChange} className="port-name" />
              </FormFieldBox>
            </div>
            <div>
              <FormFieldBox excludeMarginTop excludeMarginBottom>
                <label>
                  Qty.
                  <span className="astrisk" style={{ visibility: 'hidden' }}>*</span>
                </label>
                <Input variant="input" value="1" disabled type="text" name="quantity" />
              </FormFieldBox>
            </div>
          </div>
          <div className="port-description-info">
            <FormFieldBox excludeMarginTop excludeMarginBottom>
              <label>
                Port Description
                <span className="astrisk">*</span>
              </label>
              <Textarea value={portDescription} onChange={onPortDescriptionChange} className="port-description" name="port-description" />
            </FormFieldBox>
          </div>

          {port.on_contract_price
            ? (
              <div className="price">
                <div className="price-box-main">
                  <div className="left">
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
                        </label>
                        <div className="input-main">
                          <div className="price-info">
                            <img src={DollarIcon} alt="Dollar" />
                            <label>{portOnContractPrice}</label>
                          </div>
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
                      disabled={!aggrementAccepted.on_contract}
                      checked={aggrementAccepted.on_contract && selectedPrice === 'on_contract'}
                      onChange={onAcceptAggrement}
                      icon={<RadioButtonUncheckedIcon style={{ display: 'none' }} />}
                      checkedIcon={<img className="checked-icon" src={BlueCheckMark} alt="radio" />}
                    />
                  </div>
                  <div className="right">
                    <label>Agreement</label>
                    <p>
                      Please
                      {' '}
                      <span onClick={() => onAggredTermsClick('on_contract')}>click here</span>
                      {' '}
                      to accept terms of services
                    </p>
                  </div>
                </div>
              </div>
            ) : ''}
          {port.on_demand_price
            ? (
              <div className="price">
                <div className="price-box-main">
                  <div className="left">
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
                        </label>
                        <div className="input-main">
                          <div className="price-info">
                            <label>{parseFloat(portOnDemandPrice).toFixed(2)}</label>
                            <img src={CentIcon} alt="Cent" />
                          </div>
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
                      disabled={!aggrementAccepted.on_demand}
                      checked={aggrementAccepted.on_demand && selectedPrice === 'on_demand'}
                      onChange={onAcceptAggrement}
                      icon={<RadioButtonUncheckedIcon style={{ display: 'none' }} />}
                      checkedIcon={<img className="checked-icon" src={BlueCheckMark} alt="radio" />}
                    />
                  </div>
                  <div className="right">
                    <label>Agreement</label>
                    <p>
                      Please
                      {' '}
                      <span onClick={() => onAggredTermsClick('on_demand')}>click here</span>
                      {' '}
                      to accept terms of services
                    </p>
                  </div>
                </div>
              </div>
            ) : ''}

        </div>
        <div className="buttons">
          <Button variant="greyed" className="btn cancel-btn" text="Cancel" onClick={onClose} />
          <Button variant="primary" className="btn" text="Purchase Resource" disabled={disabled} onClick={onSaleClick} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default PutUpForSaleForm;
