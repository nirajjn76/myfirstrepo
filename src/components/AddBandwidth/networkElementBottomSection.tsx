import React from 'react';
import { Tooltip } from '@material-ui/core';
import InfoIcon from '../../assets/images/info-icon.svg';
import NetworkElementInputRow from './networkElementInputRow';

interface NetworkElementBottomSectionProps {
  portTypeOptions: any[];
  portsInfo: any;
  onPortTypeChange: (portTempId: number, portTypeId: number) => void;
  onPortNameChange: (portTempId: number, portName: string) => void;
  onKeypress: (_: any) => void;
}

const NetworkElementBottomSection: React.FC<NetworkElementBottomSectionProps> = ({
  portTypeOptions, portsInfo, onPortTypeChange, onPortNameChange, onKeypress,
}) => {
  const networkElementInputRows = portsInfo.map((portInfo: any, index: number) => {
    return <NetworkElementInputRow key={index} portTypeOptions={portTypeOptions} portInfo={portInfo} onPortTypeChange={onPortTypeChange} onPortNameChange={onPortNameChange} onKeypress={onKeypress} />;
  });

  return (
    <div className="bottom-section-root">
      <div className="input-row-titles">
        <div>
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
        <div>
          <div>
            <label>Rx</label>
          </div>
          <div>
            <label>Tx</label>
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
              <img src={InfoIcon} alt="Info" />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="input-row-inputs">
        {networkElementInputRows}
      </div>
    </div>
  );
};

export default NetworkElementBottomSection;
