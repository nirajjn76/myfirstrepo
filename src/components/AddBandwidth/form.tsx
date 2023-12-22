import React from 'react';
import { Tooltip } from '@material-ui/core';
import BandwidthBox from './bandwidthBox';
import NetworkElementBox from './networkElementBox';
import SwipeIcon from '../../assets/images/swipe-icon.svg';

interface AddBandwidthFormProps {
  bandwidthDescription: string;
  fePortDescription: string;
  nePortDescription: string;
  noOfLinksError: string;
  noOfLinksApiError: string;
  noOfLinksToAdd: number | string;
  neNetworkElementOptions: any[];
  feNetworkElementOptions: any[];
  selectedNeNetworkElement: any;
  selectedFeNetworkElement: any;
  portTypeOptions: any[];
  nePortsInfo: any[];
  fePortsInfo: any[];
  onFeNetworkElementChange: (value: any) => void;
  onNeNetworkElementChange: (value: any) => void;
  onBandwidthDescriptionChange: (_: any) => void;
  onFePortDescriptionChange: (_: any) => void;
  onNePortDescriptionChange: (_: any) => void;
  onNePortTypeChange: (portTempId: number, portTypeId: number) => void;
  onFePortTypeChange: (portTempId: number, portTypeId: number) => void;
  onNePortNameChange: (portTempId: number, portName: string) => void;
  onFePortNameChange: (portTempId: number, portName: string) => void;
  onNoOfLinksChange: (_: any) => void;
  onKeypress: (_: any) => void;
  onSwipeClick: () => void;
}

const AddBandwidthForm: React.FC<AddBandwidthFormProps> = ({
  bandwidthDescription, fePortDescription, nePortDescription, noOfLinksError, noOfLinksApiError, noOfLinksToAdd, neNetworkElementOptions, feNetworkElementOptions, selectedNeNetworkElement, selectedFeNetworkElement, portTypeOptions, nePortsInfo, fePortsInfo, onBandwidthDescriptionChange, onFePortDescriptionChange, onNePortDescriptionChange, onNoOfLinksChange, onNePortTypeChange, onFePortTypeChange, onFePortNameChange, onNePortNameChange, onKeypress, onNeNetworkElementChange, onFeNetworkElementChange, onSwipeClick,
}) => {
  return (
    <div className="form-section-root">
      <div className="bandwidth-info-box-root">
        <BandwidthBox bandwidthDescription={bandwidthDescription} linksError={noOfLinksApiError || noOfLinksError} noOfLinksToAdd={noOfLinksToAdd} onBandwidthDescriptionChange={onBandwidthDescriptionChange} onNoOfLinksChange={onNoOfLinksChange} onKeypress={onKeypress} />
      </div>
      <div className="network-elements-info-box-root">
        <div className="near-end-ne">
          <NetworkElementBox title="Nearend Network Element" onNetworkElementChange={onNeNetworkElementChange} onPortTypeChange={onNePortTypeChange} onPortNameChange={onNePortNameChange} onKeypress={onKeypress} onPortDescriptionChange={onNePortDescriptionChange} portDescription={nePortDescription} networkElementOptions={neNetworkElementOptions} selectedNetworkElement={selectedNeNetworkElement} portTypeOptions={portTypeOptions} portsInfo={nePortsInfo} />
        </div>
        <div className="swap">
          <Tooltip
            classes={{
              tooltip: 'tooltip',
            }}
            title="Swipe Information"
            arrow
          >
            <img src={SwipeIcon} alt="Swipe" onClick={onSwipeClick} data-testid="swipe-icon" />
          </Tooltip>
        </div>
        <div className="far-end-ne">
          <NetworkElementBox title="Farend Network Element" onNetworkElementChange={onFeNetworkElementChange} onPortTypeChange={onFePortTypeChange} onPortNameChange={onFePortNameChange} onKeypress={onKeypress} onPortDescriptionChange={onFePortDescriptionChange} portDescription={fePortDescription} networkElementOptions={feNetworkElementOptions} selectedNetworkElement={selectedFeNetworkElement} portTypeOptions={portTypeOptions} portsInfo={fePortsInfo} />
        </div>
      </div>
    </div>
  );
};

export default AddBandwidthForm;
