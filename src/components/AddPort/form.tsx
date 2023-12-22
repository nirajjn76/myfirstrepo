import React from 'react';
import { Tooltip } from '@material-ui/core';
import FormFieldBox from '../DesignSystem/formFieldBox';
import Input from '../DesignSystem/input';
import Dropdown from '../DesignSystem/dropdown';
import Textarea from '../DesignSystem/textarea';
import InfoIcon from '../../assets/images/info-icon.svg';
import PortInfoForm from './portInfoForm';

interface AddPortFormProps {
  networkElementOptions: any[];
  portTypeOptions: any[];
  selectedNetworkElement: any;
  portDescription: string;
  noOfPortsToAdd: number | string;
  noOfPortsError: string;
  portsInfo: any[];
  onNetworkElementChange: (value: any) => void;
  onPortDescriptionChange: (_: any) => void;
  onNoOfPortsChange: (_: any) => void;
  onKeypress: (_: any) => void;
  onPortTypeChange: (portTempId: number, portTypeId: number) => void;
  onPortNameChange: (portTempId: number, portName: string) => void;
}

const AddPortForm: React.FC<AddPortFormProps> = ({
  networkElementOptions, selectedNetworkElement, portTypeOptions, portsInfo, portDescription, noOfPortsToAdd, noOfPortsError, onKeypress, onNetworkElementChange, onPortDescriptionChange, onNoOfPortsChange, onPortTypeChange, onPortNameChange,
}) => {
  const portInfoContent = portsInfo.map((portInfo: any, index: number) => {
    return <PortInfoForm key={index} portTypeOptions={portTypeOptions} onPortTypeChange={onPortTypeChange} portInfo={portInfo} onPortNameChange={onPortNameChange} onKeypress={onKeypress} />;
  });

  return (
    <div className="form-section-root">
      <div className="upper-section">
        <div className="left-section">
          <FormFieldBox excludeMarginTop>
            <label>
              Select Network Element
              <span className="astrisk">*</span>
            </label>
            <Dropdown className="ne-select" value={selectedNetworkElement.id} valueKey="id" icon="icon" textKey="ne_name" options={networkElementOptions} onChange={onNetworkElementChange} />
          </FormFieldBox>
          <FormFieldBox>
            <div className="text-area-root">
              <div>
                <label>
                  No. of  Port to be added
                  <span className="astrisk">*</span>
                </label>
                <Tooltip
                  classes={{
                    tooltip: 'tooltip',
                  }}
                  title="Enter the integer number of ports to be added which share a common description. When adding more that one port, ports will be automatically grouped on the dashboard page."
                  arrow
                  placement="right-start"
                >
                  <img src={InfoIcon} alt="Info" />
                </Tooltip>
              </div>
              <div>
                <Input variant="number" name="no-of-ports" value={noOfPortsToAdd} min={1} className="no-of-ports-input" errorMessageClass="small-fonts" onChange={onNoOfPortsChange} error={!!noOfPortsError} errorMessage={noOfPortsError} />
              </div>
            </div>
          </FormFieldBox>
        </div>
        <div className="right-section">
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
                  placement="right"
                >
                  <img src={InfoIcon} alt="Info" />
                </Tooltip>
              </div>
              <div>
                <Textarea value={portDescription} className="port-description" name="port-description" onChange={onPortDescriptionChange} onKeypress={onKeypress} />
              </div>
            </div>
          </FormFieldBox>
        </div>
      </div>
      <div className="port-section">
        <div className="left-section">
          <FormFieldBox excludeMarginBottom excludeMarginTop>
            <div className="port-info-titles">
              <div className="left">
                <label>
                  Port Name
                  <span className="astrisk">*</span>
                </label>
                <Tooltip
                  classes={{
                    tooltip: 'tooltip',
                  }}
                  title="Enter a unique identifier for each individual port. Example: “Port #1”"
                  arrow
                  placement="top"
                >
                  <img src={InfoIcon} alt="Info" />
                </Tooltip>
              </div>
              <div className="right">
                <div>
                  <label>
                    Rx
                  </label>
                </div>
                <div>
                  <label>
                    Tx
                  </label>
                </div>
                <div>
                  <label>
                    Port Type
                    <span className="astrisk">*</span>
                  </label>
                  <Tooltip
                    classes={{
                      tooltip: 'tooltip',
                    }}
                    title="Choose the Port Interface Type."
                    arrow
                    placement="top"
                  >
                    <div className="img-div">
                      <img src={InfoIcon} alt="Info" />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </FormFieldBox>
          <FormFieldBox excludeMarginTop className="port-info-section">
            {portInfoContent}
          </FormFieldBox>
        </div>
      </div>

    </div>
  );
};

export default AddPortForm;
