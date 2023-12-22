import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import ServiceProviderViewIcon from '../../../assets/images/service-provider.svg';
// import ServiceProviderViewSelectedIcon from "../../../assets/images/service-provider-selected.svg";
import CanvasViewIcon from '../../../assets/images/canvas-view.svg';
import CanvasViewSelectedIcon from '../../../assets/images/canvas-view-selected.svg';
import MapViewIcon from '../../../assets/images/map-view.svg';
import MapViewSelectedIcon from '../../../assets/images/map-view-selected.svg';
import { AuthRoutes } from '../../../enums';

const RightSection: React.FC = () => {
  const path = window.location.pathname;

  return (
    <div className="root">
      <div className={clsx(path === AuthRoutes.dashboard && 'cursor-pointer')}>
        <Tooltip
          classes={{
            tooltip: 'tooltip',
          }}
          title="Service Provider View"
          arrow
          placement="bottom"
        >
          <img src={ServiceProviderViewIcon} alt="Service Provider View" />
        </Tooltip>
      </div>
      <div className={clsx(path !== AuthRoutes.dashboard && 'cursor-pointer')}>
        <Tooltip
          classes={{
            tooltip: 'tooltip',
          }}
          title={path === AuthRoutes.dashboard ? '' : 'Canvas View'}
          arrow
          placement="bottom"
        >
          <Link to={AuthRoutes.dashboard} className="cancel-btn-link"><img src={path === AuthRoutes.dashboard ? CanvasViewSelectedIcon : CanvasViewIcon} alt="Canvas View" /></Link>
        </Tooltip>
      </div>
      <div className={clsx(path !== AuthRoutes.myNetworkMapView && 'cursor-pointer')}>
        <Tooltip
          classes={{
            tooltip: 'tooltip',
          }}
          title={(
            <div>
              <div>My Network</div>
              <div>(Map View)</div>
            </div>
          )}
          arrow
          placement="bottom"
        >
          <Link to={AuthRoutes.myNetworkMapView} className="cancel-btn-link"><img src={path === AuthRoutes.myNetworkMapView ? MapViewSelectedIcon : MapViewIcon} alt="My Network (Map View)" /></Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default RightSection;
