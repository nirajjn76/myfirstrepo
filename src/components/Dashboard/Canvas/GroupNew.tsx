import React, {
  useState, useMemo, useCallback, useEffect,
} from 'react';
import Draggable from 'react-draggable';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import * as _ from 'lodash';
import clsx from 'clsx';
import { Tooltip } from '@material-ui/core';
import PanToolIcon from '@material-ui/icons/PanTool';
import Port from './Port';
import { getPortName } from '../../../utils/methods';
import { NENodeModel } from './CustomNode/NENodeModel';
import GlobeIcon from '../../../assets/images/ic-router_big.svg';
import RouterIcon from '../../../assets/images/ic-internet_big.svg';
import CloudIcon from '../../../assets/images/ic-cloud_big.svg';
import NoIcon from '../../../assets/images/ic-default-big.svg';
import addbandWidth from '../../../assets/images/add-port.svg';
import ShowDetailsIcon from '../../../assets/images/group-show-details.svg';
import GroupCollapseIcon from '../../../assets/images/group-collapse.svg';
import BandwidthGroupIcon from '../../../assets/images/bandwidth-group-small.svg';

// import Tooltip from '@mui/material/Tooltip';

interface GroupProps {
  engine: DiagramEngine;
  node: NENodeModel;
  group: any;
  onUngroupClick: (_: any) => void;
  onEditClick: (_: any) => void;
  onGroupExpandCollapse?: (_: any) => void;
  onGroupClose: () => void;
  reSizeNode: any;
  groupModel?: any;
  bandwidth?: boolean;
  bound?: string;
}

const Group1: React.FC<GroupProps> = ({
  engine, node, group, onUngroupClick, onEditClick, onGroupClose, reSizeNode, groupModel, bandwidth, bound, onGroupExpandCollapse,
}) => {
  const [isExpanded, setExpanded] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  useEffect(() => {
    const expandedIds = JSON.parse(localStorage.getItem('expandedGroupIds') || '[]');
    if (expandedIds.includes(group.groupId)) {
      setExpanded(true);
    }
  }, [group, setExpanded]);

  const expandCollapse = () => {
    setExpanded((prevExpanded) => !prevExpanded);
    reSizeNode();
    if (onGroupExpandCollapse) {
      onGroupExpandCollapse({ groupId: group.groupId, action: isExpanded ? 'remove' : 'add' });
    }
  };

  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, [setShowTooltip]);

  const groupIcon = useMemo(() => {
    if (bandwidth) {
      return BandwidthGroupIcon;
    }
    if (group.icon === 'globe') {
      return GlobeIcon;
    } if (group.icon === 'router') {
      return RouterIcon;
    } if (group.icon === 'cloud') {
      return CloudIcon;
    }

    return NoIcon;
  }, [group.icon, bandwidth]);

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
          <img src={ShowDetailsIcon} alt="Expand" onClick={expandCollapse} />
          <span>Expand</span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    let content;
    if (group && group.ports) {
      let portIndex = 0;
      content = (
        group.ports && group.ports.map((port: any, index: number) => {
          const name = getPortName(
            port.portId,
            port.purchasePortId,
          );
          const portDetails = node.getPort(name);
          portIndex++;
          const portContent = (
            <li key={portIndex} className={isExpanded || portIndex == 1 ? '' : 'nested'}>
              <Port
                key={index}
                port={port}
                engine={engine}
                groupSceen={false}
                selected={false}
                handleSelectedNrs={() => { }}
                portModel={portDetails}
                draggable="not-allowed"
              />
            </li>
          );
          return portContent;
        })
      );
    }
    return content;
  };

  const handleDragStart = (e: any) => {
    e.stopPropagation(); // To prevent drag effect on canvas so X,Y not move
    setIsMoving(true);
  };

  const handleDrag = (e: any) => {
    e.stopPropagation(); // To prevent drag effect
  };

  const handleDragStop = (e: any, position: any) => {
    group.x = position.x;
    group.y = position.y;
    e.stopPropagation(); // To prevent drag effect
    reSizeNode();
    engine.fireEvent({}, 'dragEnd');
    setIsMoving(false);
  };

  return (
    <Draggable
      defaultPosition={{ x: group.x || 0, y: group.y || 0 }}
      cancel=".no-cursor-group"
      bounds={bound || 'parent'}
      handle={isExpanded && !bandwidth ? '.dragIcon' : '.group-container'}
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
    >
      <div className={clsx('group-container', !isExpanded && 'hide', isMoving && 'port-zindex', !bandwidth && isExpanded && 'internal-expanded', bandwidth && 'no-margin')}>
        {/* <Tooltip
          classes={{
            tooltip: 'tooltip',
          }}
          title={isExpanded ? "Collapse" : "Expand"}
          arrow
          placement="top"
        >
          <div className="group-action">
              {isExpanded && <img src={GroupCollapseIcon} className="collapse" alt="Collapse" onClick={expandCollapse} />}
              {!isExpanded && <img src={ShowDetailsIcon} className="expand" alt="Expand" onClick={expandCollapse} />}
          </div>
        </Tooltip> */}
        {isExpanded
          && (
            <Tooltip
              classes={{
                tooltip: 'tooltip',
              }}
              title="Collapse"
              arrow
              placement="top"
            >
              <img src={GroupCollapseIcon} className="collapse" alt="Collapse" onClick={expandCollapse} />
            </Tooltip>
          )}

        {isExpanded && !bandwidth
          && (
            <Tooltip
              classes={{
                tooltip: 'tooltip',
              }}
              title="Drag Group"
              arrow
              placement="top"
            >
              <PanToolIcon className="collapse dragIcon" />
            </Tooltip>
          )}

        <ul className={clsx('group-port', !isExpanded && 'hide')}>
          <ul className="group-port">
            <div className="ports-root">
              {renderContent()}
            </div>
          </ul>
        </ul>

        {
          !isExpanded && (
            <Tooltip
              classes={{
                popper: 'tooltip-popper',
                tooltip: 'tooltip',
              }}
              title={tooltip}
              arrow
              placement="bottom"
              interactive
            >
              <div className={clsx('grp-icon', bandwidth && 'bandwidth')}>
                <img src={groupIcon} alt="Group of Nr" className={clsx('group-icon', bandwidth && 'bandwidth')} />
              </div>
            </Tooltip>
          )
        }
      </div>
    </Draggable>
  );
};

export default Group1;
