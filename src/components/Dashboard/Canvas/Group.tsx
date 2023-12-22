import React, { useState, useCallback, useMemo } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import Draggable from 'react-draggable';
import { Popover } from 'react-tiny-popover';
import NrGroupIcon from '../../../assets/images/group-nr.svg';
import ShowDetailsIcon from '../../../assets/images/group-show-details.svg';
import EditIcon from '../../../assets/images/edit-icon.svg';
import GroupCollapseIcon from '../../../assets/images/group-collapse.svg';
import GlobeIcon from '../../../assets/images/ic-router_big.svg';
import RouterIcon from '../../../assets/images/ic-internet_big.svg';
import CloudIcon from '../../../assets/images/ic-cloud_big.svg';
import NoIcon from '../../../assets/images/ic-default.svg';
import ElipsisText from '../../DesignSystem/Table/Cells/ElipsisText';
import Port from './Port';
import { NENodeModel } from './CustomNode/NENodeModel';
// import { getPortName } from '../../../utils/methods';
interface GroupProps {
  group: any;
  engine?: DiagramEngine;
  node: NENodeModel;
  groupModel?: any;
  onUngroupClick: (_: any) => void;
  onEditClick: (_: any) => void;
  onGroupClose: () => void;
}

const Group: React.FC<GroupProps> = ({
  group, engine, node, groupModel, onUngroupClick, onEditClick, onGroupClose,
}) => {
  const [showGroupOpen, setShowGroupOpen] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, [setShowTooltip]);

  const handleShowDetailsClick = useCallback(() => {
    setShowTooltip(false);
    setShowGroupOpen(true);
  }, [setShowTooltip, setShowGroupOpen]);

  const handleMouseOver = useCallback(() => {
    if (!showGroupOpen) {
      setShowTooltip(true);
    }
  }, [setShowTooltip, showGroupOpen]);

  const handleGroupClose = useCallback(() => {
    setShowGroupOpen(false);
    onGroupClose();
  }, [setShowGroupOpen, onGroupClose]);

  const handleDragStart = (e: any) => {
    e.stopPropagation(); // To prevent drag effect on canvas so X,Y not move
  };

  const updateCoords = () => {
    try {
      groupModel.updateCoords(engine?.getPortCoords(groupModel));
    } catch (ex) {
      // console.log("updateCoords group.tsx");
    }
  };

  const handleDrag = (e: any) => {
    e.stopPropagation(); // To prevent drag effect
    updateCoords();
  };

  const handleDragStop = (e: any) => {
    e.stopPropagation(); // To prevent drag effect
    updateCoords();
  };

  const groupIcon = useMemo(() => {
    if (group.icon === 'globe') {
      return GlobeIcon;
    } if (group.icon === 'router') {
      return RouterIcon;
    } if (group.icon === 'cloud') {
      return CloudIcon;
    }
    return NoIcon;
  }, [group.icon]);

  const tooltip = (
    <div className="group-tooltip-title" onMouseLeave={handleMouseLeave}>
      <div>
        <label>{group.groupName}</label>
      </div>
      <div>
        <label>
          {group.ports.filter((port: any) => port.verified).length}
          {' '}
          of
          {' '}
          {group.ports.length}
          {' '}
          ports available
        </label>
      </div>
      <div>
        <div>
          <img src={ShowDetailsIcon} alt="Expand" onClick={handleShowDetailsClick} />
          <span>Expand</span>
        </div>
      </div>
    </div>
  );

  return (
    <Draggable
      cancel=".no-cursor-group"
      bounds="parent"
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
    >
      <div className="port-root group" onMouseLeave={handleMouseLeave}>
        <Popover
          isOpen={showGroupOpen}
          positions={['bottom']}
          padding={1}
          reposition={false}
          content={() => (
            <div className="group-expanded-main">
              <div className="edit-close">
                <div>
                  <span><ElipsisText width="175px" text={group.groupName} /></span>
                </div>
                <div>
                  {/* <Tooltip
                    classes={{
                      tooltip: 'tooltip',
                    }}
                    title="Edit Group"
                    arrow
                    placement="bottom"
                  >
                    <img src={EditIcon} alt="Edit" onClick={() => onEditClick(group)} />
                  </Tooltip> */}
                  <Tooltip
                    classes={{
                      tooltip: 'tooltip',
                    }}
                    title="Close Group Popup"
                    arrow
                    placement="bottom"
                  >
                    <img src={GroupCollapseIcon} alt="Collapse" onClick={handleGroupClose} />
                  </Tooltip>
                </div>
              </div>
              <div className="ports-root">
                {
                  group.ports.map((port: any, index: number) => {
                    // const name = getPortName(port.portId, port.purchasePortId);
                    // const portDetails = node.getPort(name);
                    return <Port key={index} groupExpandedSceen port={port} handleSelectedNrs={() => { }} selected={false} onUngroupClick={(portId, purchasePortId) => onUngroupClick({ portId, purchasePortId, groupId: group.groupId })} />;
                    // return <Port key={index} groupExpandedSceen port={port} engine={engine} portModel={portDetails} handleSelectedNrs={() => { }} selected={false} onUngroupClick={(portId, purchasePortId) => onUngroupClick({ portId, purchasePortId, groupId: group.groupId })} />;
                  })
                }
              </div>
            </div>
          )}
        >
          <Tooltip
            classes={{
              popper: 'tooltip-popper',
              tooltip: 'tooltip',
            }}
            title={tooltip}
            arrow
            open={showTooltip && !showGroupOpen}
            placement="bottom"
          >
            <div className="port-item group" onMouseOver={handleMouseOver}>
              <img src={groupIcon} alt="Group of Nr" />
              {engine && groupModel && <PortWidget className="no-cursor-group" engine={engine} port={groupModel} />}
            </div>
          </Tooltip>
        </Popover>
      </div>
    </Draggable>
  );
};

export default Group;
