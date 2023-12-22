import React, { useMemo, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import Draggable from 'react-draggable';
import PortGreen from '../../../assets/images/port-green.svg';
import PortGrey from '../../../assets/images/port-grey.svg';
import PortRed from '../../../assets/images/port-red.svg';
import PortYellow from '../../../assets/images/port-yellow.svg';
import UnGroupIcon from '../../../assets/images/ungroup-canvas.svg';
import PortWhite from '../../../assets/images/port-white.svg';
import { STATUS_TYPE } from '../../../utils/appConstants';

interface PortProps {
  port: any;
  engine?: DiagramEngine;
  portModel?: any;
  groupSceen?: boolean;
  groupExpandedSceen?: boolean;
  handleSelectedNrs: (portId?: any, purchasePortId?: any) => void;
  onUngroupClick?: (portId?: any, purchasePortId?: any) => void;
  selected: boolean;
  draggable?: 'not-allowed';
  bound?: string;
  reSizeNode?: any;
}

const Port: React.FC<PortProps> = ({
  port, engine, portModel, groupSceen, groupExpandedSceen, selected, handleSelectedNrs, onUngroupClick, draggable, bound, reSizeNode,
}) => {
  const [isMoving, setIsMoving] = useState(false);
  const organizationId = parseInt((localStorage.getItem('org_id') && localStorage.getItem('org_id')) || '0');
  // const { options } = portModel;
  // const { extras } = options;
  const PortIcon = useMemo(() => {
    if ((port.status === STATUS_TYPE.FOR_SALE_PORT || port.status === STATUS_TYPE.FOR_SALE_BW) && port.organizationId !== organizationId) {
      return PortWhite;
    } if (port.status === STATUS_TYPE.FOR_SALE_PORT || port.status === STATUS_TYPE.FOR_SALE_BW) {
      return PortYellow;
    } if ((port.status === STATUS_TYPE.BOUGHT_PORT && !port.purchasePortId)
      || (port.status === STATUS_TYPE.BOUGHT_BW && port.current_owner_organization_id !== organizationId)) {
      return PortRed;
    } if ((port.status === STATUS_TYPE.BOUGHT_PORT || port.status === STATUS_TYPE.BOUGHT_BW) && port.purchasePortId) {
      return PortGreen;
    } if (!port.verified) {
      return PortGrey;
    }
    return PortGreen;
  }, [port]);

  const handleDragStart = (e: any) => {
    e.stopPropagation(); // To prevent drag effect on canvas so X,Y not move
    setIsMoving(true);
  };

  const updateCoords = () => {
    try {
      portModel.updateCoords(engine?.getPortCoords(portModel));
    } catch (ex) {
      // console.log("updateCoords port.tsx");
    }
  };

  const handleDrag = (e: any) => {
    e.stopPropagation(); // To prevent drag effect
    updateCoords();
  };

  const handleDragStop = (e: any, position: any) => {
    port.x = position.x;
    port.y = position.y;
    e.stopPropagation(); // To prevent drag effect
    updateCoords();
    engine?.fireEvent({}, 'dragEnd');
    reSizeNode && reSizeNode();
    setIsMoving(false);
  };

  let portContent;
  // const handleSelectPort = (e : any) => {
  //   e.preventDefault();
  //   console.log("Test")
  //   if((port.organizationId == organizationId)){
  //     handleSelectedNrs(port.portId, port.purchasePortId)
  //   }
  // }

  const tooltipTitle = (
    <div>
      <div>
        <span>{port.port_description}</span>
      </div>
      <div>
        <span>{port.port_name}</span>
      </div>
    </div>
  );

  if (groupSceen) {
    portContent = (
      <div className={clsx(groupSceen && 'group-screen', selected && 'selected')} onClick={() => handleSelectedNrs(port.portId, port.purchasePortId)}>
        <Tooltip
          classes={{
            tooltip: 'tooltip',
          }}
          title={tooltipTitle}
          arrow
          placement="bottom"
        >
          <div>
            <img src={PortIcon} alt="Port" />
            <div className="overlay" />
          </div>
        </Tooltip>
      </div>
    );
  } else if (groupExpandedSceen) {
    portContent = (
      <div>
        <Tooltip
          classes={{
            tooltip: 'tooltip',
          }}
          title="Ungroup Port"
          arrow
          placement="bottom"
        >
          <img src={UnGroupIcon} alt="Port" className="ungroup-icon" onClick={() => onUngroupClick && onUngroupClick(port.portId, port.purchasePortId)} />
        </Tooltip>
        <Tooltip
          classes={{
            tooltip: 'tooltip',
          }}
          title={tooltipTitle}
          arrow
          placement="bottom"
        >
          <div className="port-item">
            <img src={PortIcon} alt="Port" />
            {engine && portModel && <PortWidget className="no-cursor" engine={engine} port={portModel} />}
          </div>
        </Tooltip>
      </div>
    );
  } else {
    portContent = (
      <Tooltip
        classes={{
          tooltip: 'tooltip',
        }}
        title={tooltipTitle}
        arrow
        placement="bottom"
      >
        <div className="port-item">
          <img src={PortIcon} alt="Port" />
          {engine && portModel && <PortWidget className="no-cursor" engine={engine} port={portModel} />}
        </div>
      </Tooltip>
    );
  }
  if (groupSceen || groupExpandedSceen || draggable === 'not-allowed') {
    portContent = (
      <div className="port-root">
        {portContent}
      </div>
    );
  } else {
    portContent = (
      <Draggable
        defaultPosition={{ x: port.x || 0, y: port.y || 0 }}
        cancel=".no-cursor"
        bounds={bound || 'parent'}
        onStart={handleDragStart}
        onDrag={handleDrag}
        onStop={handleDragStop}
      >
        <div className={`port-root ${isMoving ? 'port-zindex' : ''}`}>
          {portContent}
        </div>
      </Draggable>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{portContent}</>;
};

export default Port;
