import React from 'react';
import MapView from './MapView';
import SwipeIcon from '../../assets/images/swipe-icon.svg';
import Input from '../DesignSystem/input';
import MapSearchIcon from '../../assets/images/map-search-icon.svg';

interface MapViewRootProps {
  onBandwidthClick: (neId: string, feId: string) => void;
  onSearchChange: (field: 'fe' | 'ne', e: any) => void;
  networkElements: any[];
  bandwidthPorts: any[];
  nodeIds: any[];
}

const MapViewRoot: React.FC<MapViewRootProps> = ({
  onBandwidthClick, onSearchChange, networkElements, bandwidthPorts, nodeIds,
}) => {
  const neContent = (
    <div className="search-input">
      <Input variant="input-pre-icon" name="ne-search" placeholder="Nearend Destination" icon={MapSearchIcon} onChange={(e) => onSearchChange('fe', e)} onKeypress={() => { }} />
    </div>
  );
  const feContent = (
    <div className="search-input">
      <Input variant="input-pre-icon" name="fe-search" placeholder="Farend Destination" icon={MapSearchIcon} onChange={(e) => onSearchChange('ne', e)} onKeypress={() => { }} />
    </div>
  );

  return (
    <div className="map-root">
      <div className="filters">
        {neContent}
        <div className="swap">
          <img src={SwipeIcon} alt="Swipe" data-testid="swipe-icon" />
        </div>
        {feContent}
      </div>
      <div className="map-view">
        <MapView onBandwidthClick={onBandwidthClick} networkElements={networkElements} bandwidthPorts={bandwidthPorts} nodeIds={nodeIds} />
      </div>
    </div>
  );
};

export default MapViewRoot;
