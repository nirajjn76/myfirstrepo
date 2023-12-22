import React from 'react';
import NetworkElementUpperSection from './networkElementUpperSection';
import NetworkElementBottomSection from './networkElementBottomSection';

interface NetworkElementBoxProps {
  title: string;
  networkElementOptions: any[];
  selectedNetworkElement: any;
  portTypeOptions: any[];
  portsInfo: any[];
  portDescription: string;
  onNetworkElementChange: (value: any) => void;
  onPortDescriptionChange: (_: any) => void;
  onPortTypeChange: (portTempId: number, portTypeId: number) => void;
  onPortNameChange: (portTempId: number, portName: string) => void;
  onKeypress: (_: any) => void;
}

const NetworkElementBox: React.FC<NetworkElementBoxProps> = ({
  title, networkElementOptions, selectedNetworkElement, portTypeOptions, portsInfo, portDescription, onPortDescriptionChange, onPortTypeChange, onPortNameChange, onKeypress, onNetworkElementChange,
}) => {
  return (
    <div className="ne-box-root">
      <h3>{title}</h3>
      <div className="box network-element">
        <NetworkElementUpperSection type={title.includes('Nearend') ? 'ne' : 'fe'} onNetworkElementChange={onNetworkElementChange} onKeypress={onKeypress} onPortDescriptionChange={onPortDescriptionChange} portDescription={portDescription} networkElementOptions={networkElementOptions} selectedNetworkElement={selectedNetworkElement} />
        <NetworkElementBottomSection portTypeOptions={portTypeOptions} portsInfo={portsInfo} onPortTypeChange={onPortTypeChange} onPortNameChange={onPortNameChange} onKeypress={onKeypress} />
      </div>
    </div>
  );
};

export default NetworkElementBox;
