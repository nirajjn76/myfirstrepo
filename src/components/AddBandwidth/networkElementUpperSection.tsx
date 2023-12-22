import React from 'react';
import { Tooltip } from '@material-ui/core';
import FormFieldBox from '../DesignSystem/formFieldBox';
import Dropdown from '../DesignSystem/dropdown';
import Textarea from '../DesignSystem/textarea';
import InfoIcon from '../../assets/images/info-icon.svg';

interface NetworkElementUpperSectionProps {
  type: 'ne' | 'fe';
  networkElementOptions: any[];
  selectedNetworkElement: any;
  portDescription: string;
  onNetworkElementChange: (value: any) => void;
  onPortDescriptionChange: (_: any) => void;
  onKeypress: (_: any) => void;
}

const NetworkElementUpperSection: React.FC<NetworkElementUpperSectionProps> = ({
  type, networkElementOptions, selectedNetworkElement, portDescription, onNetworkElementChange, onPortDescriptionChange, onKeypress,
}) => {
  return (
    <div className="upper-section-root">
      <div>
        <FormFieldBox excludeMarginTop>
          <label>
            Select Element
            <span className="astrisk">*</span>
          </label>
          <Dropdown className="ne-select" value={selectedNetworkElement.id} valueKey="id" icon="icon" textKey="ne_name" options={networkElementOptions} onChange={onNetworkElementChange} />
        </FormFieldBox>
      </div>
      <div>
        <FormFieldBox excludeMarginTop>
          <div className="text-area-root">
            <div>
              <label>
                Port Description
                <span className="astrisk">*</span>
              </label>
              <Tooltip
                classes={{
                  tooltip: 'tooltip',
                }}
                title="Enter a description which applies to all of the ports being added. Example: “My Core Router”"
                arrow
                placement="top"
              >
                <img src={InfoIcon} alt="Info" />
              </Tooltip>
            </div>
            <div>
              <Textarea value={portDescription} className="port-description" name={`port-description-${type}`} onChange={onPortDescriptionChange} onKeypress={onKeypress} />
            </div>
          </div>
        </FormFieldBox>
      </div>
    </div>
  );
};

export default NetworkElementUpperSection;
