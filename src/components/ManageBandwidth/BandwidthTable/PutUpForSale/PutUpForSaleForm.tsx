import React, { useMemo } from 'react';
import { Checkbox, Radio, Tooltip } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Button from '../../../DesignSystem/button';
import Input from '../../../DesignSystem/input';
import Textarea from '../../../DesignSystem/textarea';
import FormFieldBox from '../../../DesignSystem/formFieldBox';
import GreenCheckMark from '../../../../assets/images/right-green-check-mark.svg';
import InfoIcon from '../../../../assets/images/info-icon.svg';
import BlueCheckMark from '../../../../assets/images/ic-agreement.svg';
import DollarIcon from '../../../../assets/images/dollar.svg';
import CentIcon from '../../../../assets/images/cent.svg';
import { ArrayOfCharactersNotAllowedInNumericFloatField, YearDaysForCalculation } from '../../../../utils/appConstants';
import SwipeIcon from '../../../../assets/images/swipe-icon.svg';
import GroupIconGlobe from '../../../../assets/images/group-icon-globe.svg';
import GroupIconCloud from '../../../../assets/images/group-icon-cloud.svg';
import ElipsisText from '../../../DesignSystem/Table/Cells/ElipsisText';

interface PutUpForSaleFormProps {
  edit: boolean;
  selectedRowSale: any;
  serviceDescription: string;
  onContractSelected: boolean;
  onDemandSelected: boolean;
  onContractPrice: string;
  onDemandPrice: string;
  disabled: boolean;
  loading: boolean;
  type: string;
  aggrementAccepted: {
    on_contract: boolean,
    on_demand: boolean
  };
  isDBPrice: {
    onDemand: boolean,
    onContract: boolean
  }
  onAcceptAggrement: () => void;
  onAggredTermsClick: (_: string) => void;
  handlePutupForSaleClick: () => void;
  handleServiceDescription: (e: any) => void;
  handleOnContractPriceChange: (e: any) => void;
  handleOnDemandPriceChange: (e: any) => void;
  handleOnContractSelected: (e: any) => void;
  handleOnDemandSelected: (e: any) => void;
  onClose: () => void;
}

const PutUpForSaleForm: React.FC<PutUpForSaleFormProps> = ({
  onClose, type, edit, selectedRowSale, serviceDescription, onContractSelected, isDBPrice, onDemandSelected, onContractPrice, onDemandPrice, disabled, loading, handlePutupForSaleClick, handleServiceDescription, handleOnContractPriceChange, handleOnDemandPriceChange, handleOnContractSelected, handleOnDemandSelected, aggrementAccepted, onAggredTermsClick, onAcceptAggrement,
}) => {
  const TypeIcon = useMemo(() => {
    if (type === 'internet') {
      return GroupIconGlobe;
    } if (type === 'cloud') {
      return GroupIconCloud;
    } if (type === 'bandwidth') {
      return GroupIconCloud;
    } if (type === 'network-services') {
      return GroupIconCloud;
    }
    return GroupIconCloud;
  }, [type]);
  const onContractPerMinute = onContractPrice ? ((parseFloat(onContractPrice) * 100 * 12) / (YearDaysForCalculation * 24 * 60)).toFixed(2) : 0;
  const onDemandPerMonth = onDemandPrice ? ((parseFloat(onDemandPrice) / 100) * ((60 * 24 * YearDaysForCalculation) / 12)).toFixed(2) : 0;
  const onDemandPerDay = onDemandPrice ? ((parseFloat(onDemandPrice) * 60 * 24) / 100).toFixed(2) : 0;
  return (
    <div className="putup-forsale-form">
      <div className="add-group-root">
        <div className="title">
          <label>{edit ? 'Edit Bandwidth Put up for Sale' : 'Bandwidth Putup For Sale'}</label>
        </div>
        <div className="form">
          <div className="port-name">
            <div className="nearend-port">
              <label><ElipsisText text={selectedRowSale?.nne_name} width="170px" /></label>
              <span><ElipsisText text={selectedRowSale?.nearend_port_description} width="170px" /></span>
            </div>
            <span className="swipe-icon"><img src={SwipeIcon} alt="Swipe" data-testid="swipe-icon" /></span>
            <div className="farend-port">
              <label><ElipsisText text={selectedRowSale?.fne_name} width="170px" /></label>
              <span><ElipsisText text={selectedRowSale?.farend_port_description} width="170px" /></span>
            </div>

          </div>
          <FormFieldBox>
            <label>
              Service Description
              <span className="astrisk">*</span>
            </label>
            <Textarea value={serviceDescription} onChange={handleServiceDescription} className="group-description" name="bandwidth-description" />
          </FormFieldBox>

          {/* <FormFieldBox>
            <div className="type-selection">
              <div>
                <label>
                  Select Type
                  <span className="astrisk">*</span>
                </label>
              </div>
              <div>
                <div>
                  <Dropdown className="ne-select" value={type} valueKey="value" textKey="label" options={iconTypes} onChange={onTypeChange} />
                </div>
                <div>
                  <img src={TypeIcon} alt="Type Icon" />
                </div>
              </div>
            </div>
          </FormFieldBox> */}

          <div className="price">
            <div className="price-box-main">
              <div className="left">
                {/* <Radio classes={{ root: 'radio' }} checked={onContractSelected} onChange={handleOnContractSelected} checkedIcon={<img className="checked-icon" src={GreenCheckMark} alt="radio" />} /> */}
                <Checkbox
                  classes={{
                    root: 'radio',
                  }}
                  color="default"
                  checked={onContractSelected}
                  onChange={handleOnContractSelected}
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
                      <Input variant="input-pre-icon" tooltipTitle="Dollar" disabled={!onContractSelected} type="number" min={1} icon={DollarIcon} name="price" value={onContractPrice} onChange={handleOnContractPriceChange} className="price-on-contract" onWheel={(e) => e.target.blur()} onKeyDown={(e) => ArrayOfCharactersNotAllowedInNumericFloatField.includes(e.key) && e.preventDefault()} />
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
                  checked={!!((edit && isDBPrice.onContract) || (aggrementAccepted.on_contract))}
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
          <div className="price">
            <div className="price-box-main">
              <div className="left">
                {/* <Radio classes={{ root: 'radio' }} checked={onDemandSelected} onChange={handleOnDemandSelected} checkedIcon={<img className="checked-icon" src={GreenCheckMark} alt="radio" />} /> */}
                <Checkbox
                  classes={{
                    root: 'radio',
                  }}
                  color="default"
                  checked={onDemandSelected}
                  onChange={handleOnDemandSelected}
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
                      <Input variant="input-post-icon" tooltipTitle="Cent" type="number" disabled={!onDemandSelected} min={1} icon={CentIcon} name="price" value={onDemandPrice} onChange={handleOnDemandPriceChange} onWheel={(e) => e.target.blur()} className="price-on-contract" onKeyDown={(e) => ArrayOfCharactersNotAllowedInNumericFloatField.includes(e.key) && e.preventDefault()} />
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
                  checked={!!((edit && isDBPrice.onDemand) || (aggrementAccepted.on_demand))}
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
        </div>
        <div className="buttons">
          <Button variant="greyed" className="btn cancel-btn" text="Cancel" onClick={onClose} />
          <Button variant="primary" className="btn" text={edit ? 'Save' : 'Put Up For Sale'} disabled={disabled} onClick={handlePutupForSaleClick} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default PutUpForSaleForm;
