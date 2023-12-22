import React, {
  useState, useCallback, useMemo, useEffect, useRef, useLayoutEffect,
} from 'react';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { debounce } from 'lodash';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import { useNavigate } from 'react-router-dom';
import Port from './Port';
import Group from './GroupNew';
import CreateGroupHoverIcon from '../../../assets/images/create-group-over.svg';
import CreateGroupSelectedIcon from '../../../assets/images/create-group-selected.svg';
import CreateGroupIcon from '../../../assets/images/create-group.svg';
import CreateGroupNR from './CreateGroupNR';
import ManagePortsService from '../../../services/managePorts.service';
import { ErrorCodeMessageMapping, ErrorCodesMapping, SuccessMessage } from '../../../utils/apiConstants';
import SuccessInfoIcon from '../../../assets/images/success-toast-checkmark-icon.svg';
import { getPortName, getGroupPortName } from '../../../utils/methods';
import { NENodeModel } from './CustomNode/NENodeModel';

interface NRNodeProps {
  engine: DiagramEngine;
  node: NENodeModel;
  onAddNROpen: (e: any) => void;
  onGroupExpandCollapse?: (e: any) => void;
  onRefetch: any;
  reSizeNode: any;
}

const NRNode: React.FC<NRNodeProps> = ({
  engine, node, onAddNROpen, onRefetch, reSizeNode, onGroupExpandCollapse,
}) => {
  const {
    groups, selectedNe, portsUsed, groupsUsed, portsList: ports,
  } = node;
  const [groupSceen, setGroupScreen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [groupIconHover, setGroupIconHover] = useState<boolean>(false);
  const [screenNum, setScreenNum] = useState<number>(1);
  const [selectedNrs, setSelectedNrs] = useState<any[]>([]);
  const [groupId, setGroupId] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('');
  const [groupDescription, setGroupDescription] = useState<string>('');
  const [groupIcon, setGroupIcon] = useState<string>('noIcon');
  const [groupNameError, setGroupNameError] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);
  const [selectedExistingGroup, setSelectedExistingGroup] = useState<number>(-1);
  const [existingGroupOptions, setExistingGroupOptions] = useState<any[]>([]);

  const ref = useRef<HTMLTableCellElement>(null);
  const [height, setHeight] = useState(0);
  const navigate = useNavigate();
  const debouncedUpdate = debounce(() => {
    if (ref && ref.current) {
      const zoomLevel = engine.getModel().getZoomLevel();
      setHeight((ref.current.getBoundingClientRect().height * 100) / zoomLevel);
    }
  }, 500);

  useLayoutEffect(() => {
    // @ts-ignore
    if (ref && ref.current) {
      setHeight(120);
      debouncedUpdate();
    }
  }, []);
  useEffect(() => {
    if (ref && ref.current) {
      setHeight(120);
      debouncedUpdate();
    }
  }, [node.height]);
  useEffect(() => {
    let isMounted = true;
    ManagePortsService.getAllGroupsByNEid(selectedNe.id)
      .then((response: any) => {
        if (isMounted) setExistingGroupOptions(response.data || []);
      })
      .catch(() => {
        if (isMounted) setExistingGroupOptions([]);
      });
    return () => { isMounted = false; };
  }, [selectedNe]);

  const groupOptions = useMemo(() => {
    let resp = [];
    if (existingGroupOptions && existingGroupOptions.length > 0) {
      resp = [{ id: -1, name: 'Select Group' }, ...existingGroupOptions];
    } else {
      resp = [{ id: -1, name: 'Select Group' }];
    }
    return resp;
  }, [existingGroupOptions]);

  const handleExistingGroupChange = useCallback((value) => {
    if (value === -1) {
      setGroupIcon('noIcon');
    } else {
      setGroupIcon('');
    }
    setSelectedExistingGroup(value);
    setTouched(true);
  }, [setSelectedExistingGroup, setGroupIcon, setTouched]);

  const handleGroupClose = useCallback(() => {
    setGroupScreen((prev) => !prev);
    setScreenNum(1);
    setSelectedNrs([]);
    setGroupName('');
    setGroupDescription('');
    setGroupIcon('noIcon');
    setGroupNameError('');
    setTouched(false);
    setSelectedExistingGroup(-1);
  }, [setGroupScreen, setSelectedNrs, setGroupName, setGroupDescription, setGroupIcon, setGroupNameError, setTouched, setSelectedExistingGroup, groupSceen]);

  const handleSelectedNrs = useCallback((portId, purchasePortId) => {
    const selected = selectedNrs.find((item) => (item.portId == portId) || (item.purchasePortId == purchasePortId));
    if (selected) {
      setSelectedNrs([...selectedNrs.filter((item) => (item.portId !== portId) && (item.purchasePortId !== purchasePortId))]);
    } else {
      setSelectedNrs([...selectedNrs, { portId: portId || -1, purchasePortId: purchasePortId || -1 }]);
    }
  }, [selectedNrs]);

  const handleSaveClick = useCallback(() => {
    if (screenNum === 1) {
      setScreenNum(2);
    } else if (screenNum === 3) {
      const payload = {
        name: groupName,
        description: groupDescription,
        icon: groupIcon,
        groupId,
        neId: selectedNe.id,
      };
      ManagePortsService.updateGroupDetails(payload)
        .then(() => {
          toast.success(SuccessMessage.editGroupSuccess, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          setLoading(false);
          setGroupNameError('');
          onRefetch();
        })
        .catch((e: any) => {
          setLoading(false);
          if (e.errorCode === ErrorCodesMapping[999]) {
            setGroupNameError(ErrorCodeMessageMapping[999]);
          }
        });
    } else if (selectedExistingGroup && selectedExistingGroup !== -1) {
      const payload = {
        nrIds: selectedNrs.filter((item) => item.portId !== -1).map((item) => item.portId),
        purchasePortIds: selectedNrs.filter((item) => item.purchasePortId !== -1).map((item) => item.purchasePortId),
        groupId: selectedExistingGroup,
        neId: selectedNe.id,
      };
      ManagePortsService.addNrsInExistingGroup(payload)
        .then(() => {
          toast.success(SuccessMessage.addGroupSuccess, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          setLoading(false);
          setGroupNameError('');
          onRefetch();
        })
        .catch((e: any) => {
          setLoading(false);
          if (e.errorCode === ErrorCodesMapping[999]) {
            setGroupNameError(ErrorCodeMessageMapping[999]);
          }
        });
    } else {
      setLoading(true);
      const payload = {
        name: groupName,
        description: groupDescription,
        icon: groupIcon,
        nrIds: selectedNrs.filter((item) => item.portId !== -1).map((item) => item.portId),
        purchasePortIds: selectedNrs.filter((item) => item.purchasePortId !== -1).map((item) => item.purchasePortId),
        neId: selectedNe.id,
      };
      ManagePortsService.addGroupDetails(payload)
        .then(() => {
          toast.success(SuccessMessage.addGroupSuccess, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          setLoading(false);
          setGroupNameError('');
          onRefetch();
        })
        .catch((e: any) => {
          setLoading(false);
          if (e.errorCode === ErrorCodesMapping[999]) {
            setGroupNameError(ErrorCodeMessageMapping[999]);
          }
        });
    }
  }, [screenNum, setScreenNum, groupName, groupDescription, groupIcon, selectedNrs, selectedExistingGroup, onRefetch, groupId, selectedNe, setLoading, setGroupNameError]);

  const handleUngroupClick = useCallback((unGroupObj: any) => {
    const payload: any = {
      groupId: unGroupObj.groupId,
      nrIds: [],
      purchasePortIds: [],
    };

    if (unGroupObj.portId) {
      payload.nrIds.push(unGroupObj.portId);
    }

    if (unGroupObj.purchasePortId) {
      payload.purchasePortIds.push(unGroupObj.purchasePortId);
    }

    ManagePortsService.unGroupNrs(payload)
      .then((response: any) => {
        toast.success(SuccessMessage.unGroupedSuccess, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
        onRefetch();
      });
  }, [onRefetch]);

  const handleEditClick = useCallback((group: any) => {
    setGroupId(group.groupId);
    setGroupName(group.groupName);
    setGroupDescription(group.description);
    setGroupIcon(group.icon);
    setScreenNum(3);
    setGroupScreen(true);
  }, [setGroupId, setGroupName, setGroupDescription, setGroupIcon, setScreenNum, setGroupScreen]);

  const handleGroupCollapse = useCallback(() => {
    setGroupName('');
    setGroupDescription('');
    setGroupIcon('noIcon');
  }, [setGroupName, setGroupDescription, setGroupIcon]);

  const handleGroupNameChange = useCallback((e: any) => {
    setGroupName(e.target.value);
    setTouched(true);
  }, [setGroupName, setTouched]);

  const handleKeypress = useCallback((e: any) => {
    const disabled = !groupName || !groupDescription || !groupIcon;
    if (e.key === 'Enter' && !disabled) {
      handleSaveClick();
    }
  }, [handleSaveClick, groupName, groupDescription, groupIcon]);

  const hanndleGroupDescriptionChange = useCallback((e: any) => {
    setGroupDescription(e.target.value);
    setTouched(true);
  }, [setGroupDescription, setTouched]);

  const handleGroupIconChange = useCallback((icon: string) => {
    setGroupIcon(icon);
    setTouched(true);
  }, [setGroupIcon, setTouched]);

  const scrollFromEvent = (e: any) => {
    e.stopPropagation(); // To prevent passing scroll event to parent, so canvas don't zoom in/out
  };

  const renderGroupUsed = (groupData: any) => {
    let content;
    if (groupData) {
      content = (
        groupData && groupData.map((group: any, index: number) => {
          return (
            <Group
              engine={engine}
              node={node}
              group={group}
              key={index}
              onUngroupClick={handleUngroupClick}
              onEditClick={handleEditClick}
              onGroupClose={handleGroupCollapse}
              onGroupExpandCollapse={onGroupExpandCollapse}
              reSizeNode={reSizeNode}
              bandwidth
            />
          );
        })
      );
    }
    return content;
  };

  const renderPortsUsed = (portsData: any) => {
    let content;
    if (portsData) {
      content = (
        portsData && portsData.map((port: any, index: number) => {
          const name = getPortName(port.portId, port.purchasePortId);
          const portDetails = node.getPort(name);
          const key = `r-${index}`;
          const content = (
            <Port
              key={key}
              port={port}
              groupSceen={groupSceen}
              handleSelectedNrs={handleSelectedNrs}
              selected={!!selectedNrs.find((item) => (item.portId == port.portId) || (item.purchasePortId == port.purchasePortId))}
              engine={engine}
              portModel={portDetails}
              reSizeNode={reSizeNode}
            />
          );
          return content;
        })
      );
    }
    return content;
  };

  const renderPortsUsedRight = () => {
    const portsData = portsUsed && portsUsed.right ? portsUsed.right : [];
    const groupData = groupsUsed && groupsUsed.right ? groupsUsed.right : [];

    return (
      <div onWheel={scrollFromEvent} style={{ minHeight: `${height}px` }} className={clsx('ports-root', groupSceen && 'collapse-height')}>
        {renderGroupUsed(groupData)}
        {renderPortsUsed(portsData)}
      </div>
    );
  };

  const renderPortsUsedLeft = () => {
    const portsData = portsUsed && portsUsed.left ? portsUsed.left : [];
    const groupData = groupsUsed && groupsUsed.left ? groupsUsed.left : [];

    return (
      <div onWheel={scrollFromEvent} style={{ minHeight: `${height}px` }} className={clsx('ports-root', groupSceen && 'collapse-height')}>
        {renderGroupUsed(groupData)}
        {renderPortsUsed(portsData)}
      </div>
    );
  };

  const renderPortsUsedTop = () => {
    const portsData = portsUsed && portsUsed.top ? portsUsed.top : [];
    return (
      <>
        {renderPortsUsed(portsData)}
      </>
    );
  };

  const renderPortsUsedBottom = () => {
    const portsData = portsUsed && portsUsed.bottom ? portsUsed.bottom : [];
    return (
      <>
        {renderPortsUsed(portsData)}
      </>
    );
  };

  const GroupIcon = useMemo(() => {
    if (groupSceen) {
      return CreateGroupSelectedIcon;
    } if (groupIconHover) {
      return CreateGroupHoverIcon;
    }
    return CreateGroupIcon;
  }, [groupSceen, groupIconHover]);

  const renderPorts = () => {
    let content;
    if ((!ports || ports.length <= 0) && (!groups || groups.length <= 0)) {
      content = (
        <div className="no-ports" onClick={() => navigate('/add/port', { state: selectedNe })} data-testid="no-ports">
          <div className="text">
            <label>Add an Existing Network Resources</label>
          </div>
          <div className="plus-sign">
            <AddIcon />
          </div>
        </div>
      );
    } else {
      const isShowingPorts = ports && ports.filter((port: any) => (!(port.status === 'port_put_up_for_sale' && port.organizationId != localStorage.getItem('org_id'))));
      const portInnerClass = `ports-inner-${selectedNe.id}`;
      content = (
        <>
          {
            (screenNum !== 2 && screenNum !== 3) && (
              <div onWheel={scrollFromEvent} style={{ minHeight: `${height && height}px` }} className={clsx('ports-root', 'ports-inner', portInnerClass, groupSceen && 'collapse-height')}>
                <div>
                  {
                    !groupSceen && (
                      groups && groups.map((group: any, index: number) => {
                        const name = getGroupPortName(group.groupId);
                        const groupDetails = node.getPort(name);
                        const portInnerClass = `.ports-inner-${selectedNe.id}`;
                        // return <Group key={index} group={group} onUngroupClick={handleUngroupClick} onEditClick={handleEditClick} onGroupClose={handleGroupCollapse} engine={engine} groupModel={groupDetails} node={node} />;
                        return (
                          <Group
                            engine={engine}
                            node={node}
                            group={group}
                            key={index}
                            onUngroupClick={handleUngroupClick}
                            onEditClick={handleEditClick}
                            onGroupClose={handleGroupCollapse}
                            reSizeNode={reSizeNode}
                            onGroupExpandCollapse={onGroupExpandCollapse}
                            bound={portInnerClass}
                          />
                        );
                      })
                    )
                  }
                </div>
                <div>
                  {
                    ports && ports.filter((port: any) => (screenNum === 1 && !groupSceen ? port : !(port.status === 'port_put_up_for_sale' && port.organizationId != localStorage.getItem('org_id')))).map((port: any, index: number) => {
                      const name = getPortName(port.portId, port.purchasePortId);
                      const portDetails = node.getPort(name);
                      const portInnerClass = `.ports-inner-${selectedNe.id}`;
                      const content = <Port key={index} bound={portInnerClass} reSizeNode={reSizeNode} port={port} groupSceen={groupSceen} handleSelectedNrs={handleSelectedNrs} selected={!!selectedNrs.find((item) => (item.portId == port.portId) || (item.purchasePortId == port.purchasePortId))} engine={engine} portModel={portDetails} />;
                      return content;
                    })
                  }
                </div>
              </div>
            )
          }
          {/* {
            (ports && ports.length > 0 && isShowingPorts.length > 0) && (
              <Tooltip
                arrow
                title="Group Ports"
                classes={{
                  tooltip: 'tooltip',
                }}
              >
                <div className="group-ports" onClick={handleGroupClose}>
                  <img src={GroupIcon} alt="Create Group" onMouseLeave={() => setGroupIconHover(false)} onMouseOver={() => setGroupIconHover(true)} />
                </div>
              </Tooltip>
            )
          } */}
          {/* {groupSceen && <CreateGroupNR groupOptions={groupOptions} onExistingGroupChange={handleExistingGroupChange} selectedExistingGroup={selectedExistingGroup} touched={touched} edit={!!(screenNum === 3)} groupNameError={groupNameError} onGroupNameChange={handleGroupNameChange} onKeypress={handleKeypress} onGroupDescriptionChange={hanndleGroupDescriptionChange} onGroupIconChange={handleGroupIconChange} loading={loading} screenNum={screenNum} selectedNrs={selectedNrs} groupName={groupName} groupDescription={groupDescription} groupIcon={groupIcon} onGroupClose={handleGroupClose} onSaveClick={handleSaveClick} />} */}
        </>
      );
    }
    return content;
  };

  let content;
  return (
    <div className="nr-node-root" data-testid="nr-node-root">
      <table className="node-tbl" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr className="tr-first">
            <td className="td-bg" colSpan={3}>
              &nbsp;
            </td>
          </tr>
          <tr className="tr-main">
            <td className="td-align-top td-bg td-first">
              {renderPortsUsedLeft()}
            </td>
            <td className="td-align-top td-main" ref={ref}>
              {renderPorts()}
            </td>
            <td className="td-align-top td-bg td-first">
              {renderPortsUsedRight()}
            </td>
          </tr>
          <tr className="tr-first">
            <td className="td-bg td-last" colSpan={3}>{selectedNe.city}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NRNode;
