import React from 'react';
import { Tooltip } from '@material-ui/core';
import FormFieldBox from '../DesignSystem/formFieldBox';
import Input from '../DesignSystem/input';
import Textarea from '../DesignSystem/textarea';
import InfoIcon from '../../assets/images/info-icon.svg';

interface BandwidthBoxProps {
  bandwidthDescription: string;
  linksError: string;
  noOfLinksToAdd: number | string;
  onBandwidthDescriptionChange: (_: any) => void;
  onNoOfLinksChange: (_: any) => void;
  onKeypress: (_: any) => void;
}

const BandwidthBox: React.FC<BandwidthBoxProps> = ({
  bandwidthDescription, linksError, noOfLinksToAdd, onBandwidthDescriptionChange, onNoOfLinksChange, onKeypress,
}) => {
  return (
    <div className="box bandwidth">
      <FormFieldBox excludeMarginTop>
        <div className="text-area-root">
          <div>
            <label>
              Bandwidth Description
              <span className="astrisk">*</span>
            </label>
            <Tooltip
              classes={{
                tooltip: 'tooltip',
              }}
              title="Enter a description which applies to bandwidth being added."
              arrow
              placement="right"
            >
              <img src={InfoIcon} alt="Info" />
            </Tooltip>
          </div>
          <div>
            <Textarea value={bandwidthDescription} className="bandwidth-description" name="bandwidth-description" onChange={onBandwidthDescriptionChange} onKeypress={onKeypress} />
          </div>
        </div>
      </FormFieldBox>
      <FormFieldBox excludeMarginBottom>
        <div className="no-of-links-root">
          <div>
            <label>
              No. of  Links to be added
              <span className="astrisk">*</span>
            </label>
            <Tooltip
              classes={{
                tooltip: 'tooltip',
              }}
              title="Enter the integer number of links to be added which share a common description."
              arrow
              placement="right"
            >
              <img src={InfoIcon} alt="Info" />
            </Tooltip>
          </div>
          <div>
            <Input variant="number" name="no-of-links" min={1} value={noOfLinksToAdd} className="no-of-links-input" errorMessageClass="small-fonts" onChange={onNoOfLinksChange} onKeypress={onKeypress} error={!!linksError} errorMessage={linksError} />
          </div>
        </div>
      </FormFieldBox>
    </div>
  );
};

export default BandwidthBox;
