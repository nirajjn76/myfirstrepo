/* eslint-disable no-else-return */
import React, {
  useEffect, useState, useCallback, useRef,
} from 'react';
import createEngine, {
  DiagramModel, DefaultPortModel, DefaultDiagramState, DefaultLinkModel, DefaultNodeModel,
} from '@projectstorm/react-diagrams';
import CloseIcon from '@material-ui/icons/Close';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { forEach, debounce } from 'lodash';
import { emitCustomEvent } from 'react-custom-events';
import * as _ from 'lodash';
import DashboardService from '../../../services/dashboard.service';
import Spinner from '../../DesignSystem/spinner';
import Button from '../../DesignSystem/button';
import CanvasBoard from './CanvasBoard';
import SelectNodeModel from './CustomNode/SelectNodeModel';
import SelectNodeFactory from './CustomNode/SelectNodeFactory';
import CustomDeleteItemsAction from './CustomNode/CustomDeleteItemsAction';
import { NENodeModel } from './CustomNode/NENodeModel';
import NENodeFactory from './CustomNode/NENodeFactory';
import { getPortIdFromName, getPortName, getGroupPortName } from '../../../utils/methods';
import { STATUS_TYPE, STATUS_COLOR } from '../../../utils/appConstants';
import ErrorInfoIcon from '../../../assets/images/error-info-icon.svg';
import WarningInfoIcon from '../../../assets/images/warn-toast-icon.svg';

interface CanvasProps {
  scale: any;
  ports: any;
  canvasData?: any;
  portsLoading: boolean;
  onNeOpen: () => void;
  onAddNROpen: (_: any) => void;
  onAddBandwidthOpen: (_: any) => void;
  onDeleteClick: (_: any) => void;
  onRefetch: () => void;
  dirtyData: {
    create: any[],
    update: any[],
    delete: any[],
  };
  setDirtyData: (_: any) => void;
  crossConnectedPortIdsDB: any[];
  parentExpandedGroupIds: any[];
  setParentExpandedGroupIds: (_: any[]) => void;
  setCrossConnectedPortIdsDB: (_: any) => void;
}
// create an engine without registering DeleteItemsAction
const engine = createEngine({ registerDefaultDeleteItemsAction: false });
const state = engine.getStateMachine().getCurrentState();
if (state instanceof DefaultDiagramState) {
  state.dragNewLink.config.allowLooseLinks = false;
}
// register an DeleteItemsAction with custom keyCodes (in this case, only Delete key)
engine.getActionEventBus().registerAction(new CustomDeleteItemsAction());
engine.getNodeFactories().registerFactory(new SelectNodeFactory());
engine.getNodeFactories().registerFactory(new NENodeFactory());
const model = new DiagramModel();
let setUpdateUnSavedData: any = () => { }; let
  currentSelectedLink: any;
// Register the model event
model.registerListener({
  linksUpdated: (e: any) => {
    if (e.isCreated) {
      e.link.registerListener({
        targetPortChanged: (e: any) => {
          e.entity.getOptions().isDashed = true;
          e.entity.getOptions().selected = false;
          setUpdateUnSavedData('create', 'link', _.cloneDeep(e.entity));
        },
      });
      e.link.registerListener({
        entityRemoved: (e: any) => {
          setUpdateUnSavedData('delete', 'link', _.cloneDeep(e.entity));
        },
      });
      e.link.registerListener({
        selectionChanged: (e: any) => {
          currentSelectedLink = _.cloneDeep(e.entity);
        },
      });
    }
  },
});

const Canvas: React.FC<CanvasProps> = ({
  scale, canvasData, ports, portsLoading, parentExpandedGroupIds, setParentExpandedGroupIds, onRefetch, onNeOpen, onAddNROpen, onAddBandwidthOpen, onDeleteClick, dirtyData, setDirtyData, crossConnectedPortIdsDB, setCrossConnectedPortIdsDB,
}) => {
  const [expandedGroupIds, setExpandedGroupIds] = useState<any[]>([]);

  useEffect(() => {
    if (parentExpandedGroupIds.length === 0) {
      setExpandedGroupIds([]);
      localStorage.setItem('expandedGroupIds', JSON.stringify([]));
    }
  }, [parentExpandedGroupIds]);

  const ref = useRef(null as HTMLDivElement | null);
  const updateCanvasDataToAPI = () => {
    const zoomLevel = model.getZoomLevel() || 80;
    const offsetLevelX = model.getOffsetX();
    const offsetLevelY = model.getOffsetY();
    const nodeList: any[] = [];
    forEach(model.getNodes(), (node: any) => {
      const {
        selectedNe, portsList, portsUsed, groups, groupsUsed,
      } = node;
      const portList: any[] = [];
      if (portsList) {
        portsList.forEach((port: any) => {
          const portItem = {
            portId: port.portId,
            purchasePortId: port.purchasePortId,
            x: port.x || 0,
            y: port.y || 0,
          };
          portList.push(portItem);
        });
      }
      const portsUsedList: any[] = [];
      if (portsUsed && portsUsed.all) {
        portsUsed.all.forEach((port: any) => {
          const portItem = {
            portId: port.portId,
            purchasePortId: port.purchasePortId,
            x: port.x || 0,
            y: port.y || 0,
          };
          portsUsedList.push(portItem);
        });
      }
      const grpList: any[] = [];
      if (groups) {
        groups.forEach((grp: any) => {
          const grpItem = {
            groupId: grp.groupId,
            groupName: grp.groupName,
            x: grp.x || 0,
            y: grp.y || 0,
          };
          grpList.push(grpItem);
        });
      }
      const grpUsedList: any[] = [];
      if (groupsUsed && groupsUsed.all) {
        groupsUsed.all.forEach((grp: any) => {
          const grpItem = {
            groupId: grp.groupId,
            x: grp.x || 0,
            y: grp.y || 0,
          };
          grpUsedList.push(grpItem);
        });
      }
      if (selectedNe) {
        const nodeItem = {
          id: selectedNe.id,
          node_id: selectedNe.node_id,
          city: selectedNe.city,
          ne_name: selectedNe.ne_name,
          position: node.position,
          width: node.width,
          height: node.height,
          portList,
          portsUsedList,
          grpList,
          grpUsedList,
        };
        nodeList.push(nodeItem);
      }
    });

    const jsonData = {
      zoom: zoomLevel,
      offsetX: offsetLevelX,
      offsetY: offsetLevelY,
      nodes: nodeList,
    };
    DashboardService.putCanvasData(jsonData)
      .then((response: any) => {
        // we are making API call to put canvas data once user do some activity
      })
      .catch((e: any) => {
        // eslint-disable-next-line no-console
        console.error('error===', e.errorCode);
      });
  };

  const isPortInBandwidth = (portId: string) => {
    let isInBandwidth = false;
    if (ports && ports.nodes) {
      ports.nodes.forEach((node: any) => {
        if (!isInBandwidth) {
          const bandWidthPorts = node.bandwidth_ports_used;
          if (bandWidthPorts) {
            const list = bandWidthPorts.find((p: any) => p.portId == portId);
            if (list) {
              isInBandwidth = true;
            }
          }
          const bandWidthGrpPorts = node.bandwidth_groups_used;
          if (bandWidthGrpPorts) {
            bandWidthGrpPorts.forEach((item: any) => {
              const list = item.ports.find((p: any) => p.portId == portId);
              if (list) {
                isInBandwidth = true;
              }
            });
          }
        }
      });
    }
    return isInBandwidth;
  };

  // const isPortInBandwidth = (portId: string) => {
  //   let isInBandwidth = false;
  //   if (ports && ports.nodes) {
  //     ports.nodes.forEach((node: any) => {
  //       if (!isInBandwidth) {
  //         const bandWidthPorts = node.bandwidth_ports_used;
  //         if (node && node.bandwidth_groups_used) {
  //           node.bandwidth_groups_used.forEach((item: any) => {
  //             item.ports.forEach((port: any) => {
  //               const isNeedToAdd = bandWidthPorts.find((p: any) => p === port);
  //               if (isNeedToAdd === undefined) {
  //                 bandWidthPorts.push(port);
  //               }
  //             });
  //           });
  //         }
  //         if (bandWidthPorts) {
  //           bandWidthPorts.forEach((port: any) => {
  //             if (portId == port.portId) {
  //               isInBandwidth = true;
  //             }
  //           });
  //         }
  //       }
  //     });
  //   }
  //   // console.log('isInBandwidth',isInBandwidth);
  //   return isInBandwidth;
  // };

  const isValidLinkCreation = useCallback((link: any) => {
    const sourcePort = link.getSourcePort() as DefaultPortModel;
    const targetPort = link.getTargetPort() as DefaultPortModel;
    let dirtyDataPortIds: any[] = []; let
      dirtyDataPortIdsDelete: any[] = [];

    dirtyData.create.forEach((element: any) => {
      const link1 = element.data as DefaultLinkModel;
      const sourcePort = link1.getSourcePort();
      const targetPort = link1.getTargetPort();
      if (sourcePort && targetPort) {
        dirtyDataPortIds = [...dirtyDataPortIds, sourcePort.getOptions().name, targetPort.getOptions().name];
      }
    });

    dirtyData.delete.forEach((element: any) => {
      const link1 = element.data as DefaultLinkModel;
      if (link1) {
        const sourcePort = link1.getSourcePort();
        const targetPort = link1.getTargetPort();
        if (sourcePort && targetPort) {
          dirtyDataPortIdsDelete = [...dirtyDataPortIdsDelete, sourcePort.getOptions().name, targetPort.getOptions().name];
        }
      }
    });

    let validSourcePort = false; let validTargetPort = false; let confirmBox = false; let
      toaster = '';

    if (sourcePort) {
      const portData = sourcePort.getOptions().extras;
      const port = portData.data || {};

      const organizationId = parseInt((localStorage.getItem('org_id') && localStorage.getItem('org_id')) || '0');
      if ((port.status === STATUS_TYPE.FOR_SALE_PORT || port.status === STATUS_TYPE.FOR_SALE_BW) && port.organizationId !== organizationId) {
        validSourcePort = false;
        toaster = 'white';
      } else if ((port.status === STATUS_TYPE.BOUGHT_PORT && !port.purchasePortId) || (port.status === STATUS_TYPE.BOUGHT_BW && port.current_owner_organization_id !== organizationId)) {
        validSourcePort = false;
        toaster = 'red';
      } else if (port.status === STATUS_TYPE.FOR_SALE_PORT || port.status === STATUS_TYPE.FOR_SALE_BW) {
        confirmBox = true;
      } else if ((port.status === STATUS_TYPE.BOUGHT_PORT || port.status === STATUS_TYPE.BOUGHT_BW) && port.purchasePortId) {
        validSourcePort = true;
      } else if (!port.verified) {
        validSourcePort = true;
        toaster = toaster || 'grey';
      } else {
        validSourcePort = true;
      }
    }

    if (targetPort) {
      const portData = targetPort.getOptions().extras;
      const port = portData.data || {};

      const organizationId = parseInt((localStorage.getItem('org_id') && localStorage.getItem('org_id')) || '0');
      if ((port.status === STATUS_TYPE.FOR_SALE_PORT || port.status === STATUS_TYPE.FOR_SALE_BW) && port.organizationId !== organizationId) {
        validTargetPort = false;
        toaster = 'white';
      } else if ((port.status === STATUS_TYPE.BOUGHT_PORT && !port.purchasePortId) || (port.status === STATUS_TYPE.BOUGHT_BW && port.current_owner_organization_id !== organizationId)) {
        validTargetPort = false;
        toaster = 'red';
      } else if (port.status === STATUS_TYPE.FOR_SALE_PORT || port.status === STATUS_TYPE.FOR_SALE_BW) {
        confirmBox = true;
      } else if ((port.status === STATUS_TYPE.BOUGHT_PORT || port.status === STATUS_TYPE.BOUGHT_BW) && port.purchasePortId) {
        validTargetPort = true;
      } else if (!port.verified) {
        validTargetPort = true;
        toaster = toaster || 'grey';
      } else {
        validTargetPort = true;
      }
    }

    if (sourcePort || targetPort) {
      if (targetPort) {
        const portData = targetPort.getOptions().extras;
        const port = portData.data || {};
        // if ((dirtyDataPortIds.includes(targetPort.getOptions().name) || (crossConnectedPortIdsDB.includes(targetPort.getOptions().name))) && !dirtyDataPortIdsDelete.includes(targetPort.getOptions().name)) {

        if ((dirtyDataPortIds.includes(targetPort.getOptions().name) || (port.crossConnectPortId) || (crossConnectedPortIdsDB.includes(targetPort.getOptions().name))) && !dirtyDataPortIdsDelete.includes(targetPort.getOptions().name)) {
          validSourcePort = false;
          validTargetPort = false;
          toaster == 'red' ? toaster : toaster = '';
          confirmBox = false;
        }
      }

      if (sourcePort) {
        const portData = sourcePort.getOptions().extras;
        const port = portData.data || {};
        // if ((dirtyDataPortIds.includes(sourcePort.getOptions().name) || (crossConnectedPortIdsDB.includes(sourcePort.getOptions().name))) && !dirtyDataPortIdsDelete.includes(sourcePort.getOptions().name)) {
        if ((dirtyDataPortIds.includes(sourcePort.getOptions().name) || (port.crossConnectPortId) || (crossConnectedPortIdsDB.includes(sourcePort.getOptions().name))) && !dirtyDataPortIdsDelete.includes(sourcePort.getOptions().name)) {
          validSourcePort = false;
          validTargetPort = false;
          toaster == 'red' ? toaster : toaster = '';
          confirmBox = false;
        }
      }
    }

    if (sourcePort && targetPort) {
      const sourcePortData = sourcePort.getOptions().extras;
      const tempSourcePort = (sourcePortData && sourcePortData.data) || {};
      const targetPortData = targetPort.getOptions().extras;
      const tempTargetPort = (targetPortData && targetPortData.data) || {};

      const sourcePortId = getPortIdFromName(sourcePort.getOptions().name);
      const targetPortId = getPortIdFromName(targetPort.getOptions().name);

      // if ((tempSourcePort.nodeId !== tempTargetPort.nodeId) || (isPortInBandwidth(sourcePortId) && isPortInBandwidth(targetPortId))) {
      if (tempSourcePort.nodeId !== tempTargetPort.nodeId) {
        validSourcePort = false;
        validTargetPort = false;
        toaster = '';
        confirmBox = false;

        return {
          validSourcePort,
          validTargetPort,
          confirmBox,
          toaster,
        };
      }
    }

    if (sourcePort || targetPort) {
      if (targetPort) {
        const portData = targetPort.getOptions().extras;
        const port = portData.data || {};
        if (port.crossConnectPortId && !(crossConnectedPortIdsDB.includes(targetPort.getOptions().name))) {
          toaster != 'red' ? toaster = 'different_node_connection' : toaster = 'red';
          // toaster = 'different_node_connection';
        }
      }

      if (sourcePort) {
        const portData = sourcePort.getOptions().extras;
        const port = portData.data || {};
        if (port.crossConnectPortId && !(crossConnectedPortIdsDB.includes(sourcePort.getOptions().name))) {
          // toaster = 'different_node_connection';
          toaster != 'red' ? toaster = 'different_node_connection' : toaster = 'red';
        }
      }
    }

    return {
      validSourcePort,
      validTargetPort,
      confirmBox,
      toaster,
    };
  }, [dirtyData, crossConnectedPortIdsDB]);

  const rectifyDirtyDataForCreate = useCallback((data: any) => {
    let index = 0;
    let isFound = false;
    let foundIndex = 0;
    const link = data as DefaultLinkModel;
    if (!link) {
      return;
    }
    const sourcePort = link.getSourcePort();
    const targetPort = link.getTargetPort();
    if (!sourcePort || !targetPort) {
      return;
    }
    if (dirtyData.delete) {
      dirtyData.delete.forEach((element: any) => {
        const link1 = element.data as DefaultLinkModel;

        if (link1) {
          const sourcePort1 = link1.getSourcePort();
          const targetPort1 = link1.getTargetPort();

          if (sourcePort1 && targetPort1) {
            if (
              (sourcePort.getOptions().id == sourcePort1.getOptions().id
                || sourcePort.getOptions().id == targetPort1.getOptions().id
              ) && (targetPort.getOptions().id == sourcePort1.getOptions().id
                || targetPort.getOptions().id == targetPort1.getOptions().id
              )
            ) {
              isFound = true;
              foundIndex = index;
            }
          }
        }
        index++;
      });
      if (isFound && foundIndex >= 0) {
        const dirtyDataCopy = { ...dirtyData };
        dirtyDataCopy.delete.splice(foundIndex, 1);
        setDirtyData(dirtyDataCopy);
      }
    }
  }, [dirtyData, setDirtyData]);

  const rectifyDirtyDataForDelete = useCallback((data: any) => {
    let index = 0;
    let isFound = false;
    let foundIndex = 0;
    const link = data as DefaultLinkModel;
    const newLinkId = link.getOptions().id;
    dirtyData.create.forEach((element: any) => {
      const link1 = element.data as DefaultLinkModel;
      const linkId = link1.getOptions().id;
      if (newLinkId == linkId) {
        isFound = true;
        foundIndex = index;
      }
      index++;
    });
    if (isFound && foundIndex >= 0) {
      const dirtyDataCopy = { ...dirtyData };
      dirtyDataCopy.create.splice(foundIndex, 1);
      setDirtyData(dirtyDataCopy);
    }
  }, [dirtyData, setDirtyData]);

  const rectifyDirtyData = useCallback((operation: string, data: any) => {
    if (operation == 'create') {
      rectifyDirtyDataForCreate(data);
    } else if (operation == 'delete') {
      rectifyDirtyDataForDelete(data);
    }
  }, [rectifyDirtyDataForCreate, rectifyDirtyDataForDelete]);

  setUpdateUnSavedData = useCallback((operation: string, datatype: string, data: any) => {
    let isValidData = true && datatype == 'link';
    let confirmBox = false;
    const link = data as DefaultLinkModel;
    const sourcePort = link.getSourcePort();
    const targetPort = link.getTargetPort();
    const validatedData = isValidLinkCreation(link);
    if (datatype == 'link' && operation == 'create') {
      if (!sourcePort || !targetPort) {
        isValidData = false;
      } else if ((validatedData.confirmBox && !validatedData.toaster) || (validatedData.confirmBox && validatedData.toaster === 'grey')) {
        confirmBox = true;
        confirmAlert({
          customUI: ({ onClose }) => {
            const updateRectifyData = () => {
              rectifyDirtyData(operation, data);
              const dirtyDataCopy = { ...dirtyData };
              dirtyDataCopy.create.push({
                operation,
                datatype,
                data,
              });
              setDirtyData(dirtyDataCopy);
              emitCustomEvent('canvas-isdiry', {
                isdirty: true,
                // dirtyData,
              });
            };
            return (
              <div className="custom-ui-alert">
                <CloseIcon
                  onClick={() => {
                    link.remove();
                    onClose();
                  }}
                />
                <div>
                  <img src={WarningInfoIcon} alt="Warning" />
                  <label>You are CrossConnecting a port that is placed on Marketplace.</label>
                </div>
                <div>
                  <label>Would you like to remove it from Marketplace?</label>
                </div>
                {
                  validatedData.toaster && validatedData.toaster === 'grey'
                  && (
                    <div>
                      <label>Also, The not verified ports gone throught the verification process.</label>
                    </div>
                  )
                }
                <div className="buttons">
                  <Button
                    onClick={() => {
                      link.remove();
                      onClose();
                    }}
                    text="Cancel"
                    variant="greyed"
                    className="cancel"
                  />
                  <Button
                    onClick={() => {
                      updateRectifyData();
                      onClose();
                    }}
                    text="Ok"
                    variant="primary"
                  />
                </div>
              </div>
            );
          },
          closeOnEscape: true,
          closeOnClickOutside: true,
        });
      } else if (validatedData.toaster) {
        if (validatedData.toaster === 'red') {
          toast.error('The selected bandwidth is not available to connect', { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
          isValidData = false;
        } else if (validatedData.toaster === 'white') {
          toast.error('The selected bandwidth is not available to connect', { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
          isValidData = false;
        } else if (validatedData.toaster === 'grey') {
          toast.warn('The not verified ports gone throught the verification process', { icon: <img src={WarningInfoIcon} alt="Error" className="error-icon" /> });
          isValidData = true;
        } else if (validatedData.toaster === 'different_node_connection') {
          toast.error('This port is already in a connection with other port which may not be in the canvas', { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
          isValidData = false;
        }
      } else {
        isValidData = validatedData.validSourcePort && validatedData.validTargetPort;
      }
    }
    if (datatype == 'link' && operation == 'delete') {
      if (sourcePort === null || targetPort === null) {
        isValidData = false;
      }
      if (currentSelectedLink && link && (currentSelectedLink.getOptions().id !== link.getOptions().id)) {
        isValidData = false;
      }
    }
    if (isValidData && !confirmBox) {
      rectifyDirtyData(operation, data);
      if (operation == 'delete') {
        const dirtyDataCopy = { ...dirtyData };
        dirtyDataCopy.delete.push({
          operation,
          datatype,
          data: currentSelectedLink || data,
        });
        setDirtyData(dirtyDataCopy);
        currentSelectedLink = null;
      }
      if (operation == 'create') {
        const dirtyDataCopy = { ...dirtyData };
        dirtyDataCopy.create.push({
          operation,
          datatype,
          data,
        });
        setDirtyData(dirtyDataCopy);
      }

      // if (operation !== 'delete') {
      emitCustomEvent('canvas-isdiry', {
        isdirty: true,
      });
      // }
    } else if (!isValidData && !confirmBox) {
      if (operation !== 'delete') {
        link.remove();
      }
    }
    currentSelectedLink = null;
  }, [dirtyData, isValidLinkCreation, rectifyDirtyData, setDirtyData]);

  const [showData, setShowData] = useState(false);
  const [addNodeListner, setAddNodeListner] = useState<any>();
  const [resizeListner, setResizeListner] = useState<any>();
  const [dragListner, setDragListner] = useState<any>();
  const [offsetListner, setOffsetListner] = useState<any>();
  const [deleteNodeListner, setDeleteNodeListner] = useState<any>();
  const [refetchListner, setRefetchListner] = useState<any>();
  const [addNRListner, setAddNRListner] = useState<any>();
  const [bandwidthDrawerListner, setBandwidthDrawerListner] = useState<any>();
  const [expandedGroupIdListner, setExpandedGroupIdListner] = useState<any>();

  const getBandWidthForNodePort = (node: any, port: any) => {
    let bandWidthData: any = {};
    let isBandWidthFound = false;
    ports.bandwidths.forEach((bandWidth: any) => {
      if (!isBandWidthFound) {
        if (node.id == bandWidth.nne_id) {
          if (port.portId == bandWidth.nne_portId) {
            bandWidthData = bandWidth;
            isBandWidthFound = true;
          }
        } else if (node.id == bandWidth.fne_id) {
          if (port.portId == bandWidth.fne_portId) {
            bandWidthData = bandWidth;
            isBandWidthFound = true;
          }
        }
      }
    });
    return bandWidthData;
  };

  const getNodeById = (id: string, nodeData: any) => {
    let node;
    if (nodeData && id) {
      nodeData.forEach((element: any) => {
        if (element.selectedNe.id == id) {
          node = element;
        }
      });
    }
    return node;
  };

  const getPortPosition = (nodeData: any, node: any, port: any) => {
    let position = 'right';
    if (nodeData && node && ports.bandwidths) {
      const bandWidth = getBandWidthForNodePort(node.selectedNe, port);
      let targetNodeId;
      if (bandWidth) {
        if (bandWidth.nne_id == node.selectedNe.id) {
          targetNodeId = bandWidth.fne_id;
        } else if (bandWidth.fne_id == node.selectedNe.id) {
          targetNodeId = bandWidth.nne_id;
        }
      }
      const targetNode = getNodeById(targetNodeId, nodeData);
      if (targetNode) {
        const targetX = (targetNode as DefaultNodeModel).getPosition().x;
        const sourceX = (node as DefaultNodeModel).getPosition().x;
        if (targetX > sourceX) {
          position = 'right';
        } else {
          position = 'left';
        }
      }
    }
    return position;
  };

  const getLinkedPort = (nodeId: any, portId: any, purchasePortId: any) => {
    const model = engine.getModel();
    const portName = getPortName(portId, purchasePortId);
    let resultPort;
    forEach(model.getNodes(), (node: any) => {
      const { selectedNe } = node;
      if (selectedNe && selectedNe.id == nodeId) {
        forEach(node.getPorts(), (port: any) => {
          if (port && port.getOptions().name == portName) {
            resultPort = port;
          }
        });
      }
    });
    return resultPort;
  };

  const getLinkColor = (bandWidth: any, organizationId: number) => {
    if (bandWidth.status === STATUS_TYPE.FOR_SALE_BW && (bandWidth.organization_id != organizationId)) {
      return STATUS_COLOR.FOR_SELL_OTHERS;
    } if (bandWidth.status === STATUS_TYPE.FOR_SALE_BW) {
      return STATUS_COLOR.FOR_SELL;
    } if (bandWidth.status === STATUS_TYPE.BOUGHT_BW && bandWidth.current_owner_organization_id != organizationId) {
      return STATUS_COLOR.SOLD;
    } if (!bandWidth.bandwidth_verified) {
      return STATUS_COLOR.UN_VERIFY;
    }
    return STATUS_COLOR.VERIFY;
  };

  const removeExistingLinks = () => {
    if (engine && engine.getModel()) {
      forEach(engine.getModel().getLinks(), (link) => {
        engine.getModel().removeLink(link);
      });
    }
  };

  const updateLinkUI = () => {
    if (engine && engine.getModel()) {
      forEach(engine.getModel().getLinks(), (link) => {
        const sourcePort = link.getSourcePort() as DefaultPortModel;
        const targetPort = link.getTargetPort() as DefaultPortModel;
        try {
          sourcePort.updateCoords(engine.getPortCoords(sourcePort));
          targetPort.updateCoords(engine.getPortCoords(targetPort));
        } catch (ex) {
          // console.log("updateLinkUI canvas.tsx");
        }
      });
    }
  };
  const resizeDone = () => {
    setTimeout(() => {
      updateLinkUI();
      engine.repaintCanvas();
      updateCanvasDataToAPI();
    }, 600);
  };
  const setPortUsedPosition = (nodeData: any) => {
    if (ports && nodeData) {
      nodeData.forEach((node: any) => {
        if (node && node.portsUsed && node.portsUsed.all) {
          node.portsUsed.all.forEach((port: any) => {
            const position = getPortPosition(nodeData, node, port);
            if (position == 'left') {
              node.portsUsed.left.push(port);
            } else {
              node.portsUsed.right.push(port);
            }
          });
        }
        if (node && node.groupsUsed && node.groupsUsed.all) {
          node.groupsUsed.all.forEach((group: any) => {
            const portsData = group.ports || [];
            if (portsData && portsData.length > 0) {
              const firstPort = portsData[0];
              const position = getPortPosition(nodeData, node, firstPort);
              if (position == 'left') {
                node.groupsUsed.left.push(group);
              } else {
                node.groupsUsed.right.push(group);
              }
            }
          });
        }
      });
    }
  };

  const isBandwidthPortUsedInGroup = (port: any, bandWidth: any) => {
    const nodeId = port.portId == bandWidth.nne_portId ? bandWidth.nne_id : bandWidth.fne_id;
    const nodeData = engine.getModel().getNodes();
    let fetchedNode: any = {};
    forEach(nodeData, (node: any) => {
      if (node.selectedNe.id == nodeId) {
        fetchedNode = node;
      }
    });

    if (fetchedNode) {
      const found = !!(fetchedNode.portsUsed.all.find((singlePortInBandwidth: any) => singlePortInBandwidth.portId === port.portId && singlePortInBandwidth.purchasePortId === port.purchasePortId));

      if (found) {
        return false;
      }
      return true;
    }
  };

  const setPortLinks = useCallback((defaultExpanded?: any[]) => {
    const calculatedExpandedGroupIds: any[] = defaultExpanded || expandedGroupIds;
    removeExistingLinks();
    let tempCrossConnectedPortIdsDB: any = [];
    const organizationId = parseInt((localStorage.getItem('org_id') && localStorage.getItem('org_id')) || '0');
    if (ports && ports.bandwidths) {
      ports.bandwidths.forEach((bandWidth: any) => {
        const sourcePort = getLinkedPort(bandWidth.nne_id, bandWidth.nne_portId, bandWidth.nne_purchasePortId);
        const targetPort = getLinkedPort(bandWidth.fne_id, bandWidth.fne_portId, bandWidth.fne_purchasePortId);
        if (sourcePort && targetPort) {
          const link = new DefaultLinkModel();
          link.setSourcePort(sourcePort);
          link.setTargetPort(targetPort);
          link.getOptions().extras = { isBandwidthLink: true };

          const sourcePortObj = link.getSourcePort() as DefaultPortModel;
          const targetPortObj = link.getTargetPort() as DefaultPortModel;
          const sourcePortData = sourcePortObj.getOptions().extras;
          const tempSourcePort = (sourcePortData && sourcePortData.data) || {};
          const targetPortData = targetPortObj.getOptions().extras;
          const tempTargetPort = (targetPortData && targetPortData.data) || {};
          let desc = bandWidth.description;
          if (bandWidth.purchasePortId && bandWidth.organization_id != organizationId) {
            desc = bandWidth.purchaseDescription;
          } else if (bandWidth.status === 'put_up_for_sale_bandwidth' && bandWidth.serviceDescription) {
            desc = bandWidth.serviceDescription;
          } else {
            desc = bandWidth.description;
          }

          if (isBandwidthPortUsedInGroup(tempSourcePort, bandWidth) && isBandwidthPortUsedInGroup(tempTargetPort, bandWidth)) {
            if (calculatedExpandedGroupIds.includes(tempSourcePort.purchasePortId && tempSourcePort.organizationId != organizationId ? tempSourcePort.purchaseGroupId : tempSourcePort.groupId) || calculatedExpandedGroupIds.includes(tempTargetPort.purchasePortId && tempTargetPort.organizationId != organizationId ? tempTargetPort.purchaseGroupId : tempTargetPort.groupId)) {
              link.getOptions().tooltipItem = (
                <div className="bandwidth-tooltip">
                  {desc}
                </div>
              );
              link.setColor(getLinkColor(bandWidth, organizationId));
            } else {
              link.setColor(STATUS_COLOR.VERIFY);
            }
          } else {
            link.getOptions().tooltipItem = (
              <div className="bandwidth-tooltip">
                {desc}
              </div>
            );
            link.setColor(getLinkColor(bandWidth, organizationId));
          }

          engine.getModel().addLink(link);
        }
      });
    }
    // to show cross-connect lines.
    if (ports && ports.nodes) {
      ports.nodes.forEach((nd: any) => {
        // for individual ports with cross connect
        if ((nd.ports && nd.ports.length > 0) || (nd.bandwidth_ports_used && nd.bandwidth_ports_used.length > 0)) {
          let crossConnectPorts: any = [];
          if (nd.ports && nd.ports.length) {
            crossConnectPorts = [...crossConnectPorts, ...nd.ports[0].filter((port: any) => { return (port.crossConnectPortId && !(port.status === 'bought_port' && !port.purchasePortId)); })];
          }
          crossConnectPorts = [...crossConnectPorts, (nd.bandwidth_ports_used || []).filter((port: any) => { return (port.crossConnectPortId && !(port.status === STATUS_TYPE.BOUGHT_BW && !port.purchasePortId)); })];
          const crossConnections: any[] = [];
          const crossConnectionsIDs: any[] = [];
          crossConnectPorts.forEach((port: any) => {
            crossConnectionsIDs.push(port.crossConnectPortId);
            if (!crossConnectionsIDs.includes(port.portId || port.purchasePortId)) {
              const isNeedToAdd = crossConnections.find((p: any) => p.portId == port.portId && p.purchasePortId == port.purchasePortId);
              if (isNeedToAdd === undefined) {
                crossConnections.push({
                  ...port,
                  nodeId: nd.id,
                });
              }
            }
          });
          crossConnections.forEach((port: any) => {
            const sourcePort = getLinkedPort(port.nodeId, port.portId, port.purchasePortId);
            let targetPort = getLinkedPort(port.nodeId, port.crossConnectPortId, port.purchasePortId);
            if (!targetPort) {
              // this is for purchased port id as target port. As it doesn't have port id and instead have purchase port id
              targetPort = getLinkedPort(port.nodeId, undefined, port.crossConnectPortId);
            }

            if (sourcePort && targetPort) {
              const link = new DefaultLinkModel();
              link.setSourcePort(sourcePort);
              link.setTargetPort(targetPort);

              const sourcePortObj = link.getSourcePort() as DefaultPortModel;
              const targetPortObj = link.getTargetPort() as DefaultPortModel;
              const sourceId = sourcePortObj.getOptions().name;
              const targetId = targetPortObj.getOptions().name;
              tempCrossConnectedPortIdsDB = [...tempCrossConnectedPortIdsDB, sourceId, targetId];

              const sourcePortData = sourcePortObj.getOptions().extras;
              const tempSourcePort = (sourcePortData && sourcePortData.data) || {};
              const targetPortData = targetPortObj.getOptions().extras;
              const tempTargetPort = (targetPortData && targetPortData.data) || {};

              const isSourceVerified = tempSourcePort.initialStatus && (((tempSourcePort.status === STATUS_TYPE.BOUGHT_PORT || tempSourcePort.status === STATUS_TYPE.BOUGHT_BW) && tempSourcePort.purchasePortId) || tempSourcePort.verified);
              const isTargetVerified = tempTargetPort.initialStatus && (((tempTargetPort.status === STATUS_TYPE.BOUGHT_PORT || tempTargetPort.status === STATUS_TYPE.BOUGHT_BW) && tempTargetPort.purchasePortId) || tempTargetPort.verified);
              if (tempSourcePort.crossConnectVerified === 0 || tempTargetPort.crossConnectVerified === 0) {
                link.getOptions().isDashed = true;
              }
              const linkColor = parseInt(port.crossConnectVerified) === 1 && isSourceVerified && isTargetVerified ? STATUS_COLOR.VERIFY : STATUS_COLOR.UN_VERIFY;
              link.setColor(linkColor);

              link.getOptions().extras = { isBandwidthLink: false, uniqueId: `S${sourceId}T${targetId}` };
              engine.getModel().addLink(link);
            }
          });
        }

        // for group ports with cross connect
        if (nd && (nd.groups || nd.bandwidth_groups_used)) {
          let crossConnectPorts: any[] = [];
          if (nd.groups) {
            nd.groups.forEach((group: any) => {
              crossConnectPorts = [...crossConnectPorts, ...group.ports.filter((port: any) => {
                if (port.crossConnectPortId && !(port.status === 'bought_port' && !port.purchasePortId)) {
                  if (!calculatedExpandedGroupIds.includes(group.groupId)) {
                    const isSameGroupPort = group.ports.find((pItem: any) => (pItem.portId === port.crossConnectPortId) || (pItem.purchasePortId === port.crossConnectPortId));
                    if (isSameGroupPort) {
                      return false;
                    }
                    return true;
                  }
                  return true;
                }
                return false;
              })];
            });
          }
          if (nd.bandwidth_groups_used) {
            nd.bandwidth_groups_used.forEach((group: any) => {
              crossConnectPorts = [...crossConnectPorts, ...group.ports.filter((port: any) => {
                if (port.crossConnectPortId && !(port.status === STATUS_TYPE.BOUGHT_BW && !port.purchasePortId)) {
                  if (!calculatedExpandedGroupIds.includes(group.groupId)) {
                    const isSameGroupPort = group.ports.find((pItem: any) => (pItem.portId === port.crossConnectPortId) || (pItem.purchasePortId === port.crossConnectPortId));
                    if (isSameGroupPort) {
                      return false;
                    }
                    return true;
                  }
                  return true;
                }
                return false;
              })];
            });
          }

          const crossConnections: any[] = [];
          const crossConnectionsIDs: any[] = [];
          crossConnectPorts.forEach((port: any) => {
            crossConnectionsIDs.push(port.crossConnectPortId);
            if (!crossConnectionsIDs.includes(port.portId)) {
              const isNeedToAdd = crossConnections.find((p: any) => p.portId == port.portId && p.purchasePortId == port.purchasePortId);
              if (isNeedToAdd === undefined) {
                crossConnections.push({
                  ...port,
                  nodeId: nd.id,
                });
              }
            }
          });
          crossConnections.forEach((port: any) => {
            const sourcePort = getLinkedPort(port.nodeId, port.portId, port.purchasePortId);
            let targetPort = getLinkedPort(port.nodeId, port.crossConnectPortId, port.purchasePortId);
            if (!targetPort) {
              // this is for purchased port id as target port. As it doesn't have port id and instead have purchase port id
              targetPort = getLinkedPort(port.nodeId, undefined, port.crossConnectPortId);
            }

            if (sourcePort && targetPort) {
              const link = new DefaultLinkModel();
              link.setSourcePort(sourcePort);
              link.setTargetPort(targetPort);
              // link.getOptions().extras = { isBandwidthLink: false };
              // engine.getModel().addLink(link);

              const sourcePortObj = link.getSourcePort() as DefaultPortModel;
              const targetPortObj = link.getTargetPort() as DefaultPortModel;
              const sourceId = sourcePortObj.getOptions().name;
              const targetId = targetPortObj.getOptions().name;
              tempCrossConnectedPortIdsDB = [...tempCrossConnectedPortIdsDB, sourceId, targetId];

              const sourcePortData = sourcePortObj.getOptions().extras;
              const tempSourcePort = (sourcePortData && sourcePortData.data) || {};
              const targetPortData = targetPortObj.getOptions().extras;
              const tempTargetPort = (targetPortData && targetPortData.data) || {};

              const isSourceVerified = tempSourcePort.initialStatus && (((tempSourcePort.status === STATUS_TYPE.BOUGHT_PORT || tempSourcePort.status === STATUS_TYPE.BOUGHT_BW) && tempSourcePort.purchasePortId) || tempSourcePort.verified);
              const isTargetVerified = tempTargetPort.initialStatus && (((tempTargetPort.status === STATUS_TYPE.BOUGHT_PORT || tempTargetPort.status === STATUS_TYPE.BOUGHT_BW) && tempTargetPort.purchasePortId) || tempTargetPort.verified);
              if (tempSourcePort.crossConnectVerified === 0 || tempTargetPort.crossConnectVerified === 0) {
                link.getOptions().isDashed = true;
              }
              const linkColor = parseInt(port.crossConnectVerified) === 1 && isSourceVerified && isTargetVerified ? STATUS_COLOR.VERIFY : STATUS_COLOR.UN_VERIFY;
              link.setColor(linkColor);

              link.getOptions().extras = { isBandwidthLink: false, uniqueId: `S${sourceId}T${targetId}` };
              engine.getModel().addLink(link);
            }
          });
        }
      });
    }
    setCrossConnectedPortIdsDB(tempCrossConnectedPortIdsDB);
    dirtyData.create.forEach((createLink: any) => {
      engine.getModel().addLink(createLink.data);
    });
    dirtyData.delete.forEach((deleteLink: any) => {
      const link = deleteLink.data as DefaultLinkModel;
      const linkUniqueId = link.getOptions().extras;

      if (engine && engine.getModel()) {
        forEach(engine.getModel().getLinks(), (link1) => {
          const link1UniqueId = link1.getOptions().extras;
          if (linkUniqueId && link1UniqueId && (linkUniqueId.uniqueId === link1UniqueId.uniqueId)) {
            engine.getModel().removeLink(link1);
          }
        });
      }
    });
  }, [setCrossConnectedPortIdsDB, expandedGroupIds, ports, removeExistingLinks, getLinkedPort, getLinkColor, dirtyData]);

  const onGroupAction = useCallback((event: any) => {
    const { action, groupId } = event;
    let tempGroupIds: any[] = [];
    if (action === 'remove') {
      setExpandedGroupIds((existing: any[]) => {
        tempGroupIds = existing.filter((item) => item !== groupId);
        return existing.filter((item) => item !== groupId);
      });
    } else {
      setExpandedGroupIds((existing: any[]) => {
        tempGroupIds = [...existing, groupId];
        return [...existing, groupId];
      });
    }
    setParentExpandedGroupIds(tempGroupIds);
    localStorage.setItem('expandedGroupIds', JSON.stringify(tempGroupIds));
  }, [setExpandedGroupIds, setParentExpandedGroupIds]);

  useEffect(() => {
    setPortLinks();
    engine.repaintCanvas();
  }, [expandedGroupIds]);

  const onNodeDrag = useCallback(() => {
    const nodeData = engine.getModel().getNodes();
    forEach(nodeData, (node: any) => {
      if (node && node.groupsUsed && node.groupsUsed.all) {
        node.groupsUsed.bottom = [];
        node.groupsUsed.left = [];
        node.groupsUsed.right = [];
        node.groupsUsed.top = [];
      }
      if (node && node.portsUsed && node.portsUsed.all) {
        node.portsUsed.bottom = [];
        node.portsUsed.left = [];
        node.portsUsed.right = [];
        node.portsUsed.top = [];
      }
    });

    setPortUsedPosition(nodeData);
    setTimeout(() => {
      let tempExpandedGroups: any = [];
      setExpandedGroupIds((existing: any[]) => {
        tempExpandedGroups = existing;
        return existing;
      });
      setPortLinks(tempExpandedGroups);
      updateLinkUI();
      engine.repaintCanvas();
    }, 0);
    setTimeout(() => {
      updateCanvasDataToAPI();
    }, 500);
  }, [setPortUsedPosition, setPortLinks, updateLinkUI, engine, updateCanvasDataToAPI, setExpandedGroupIds]);

  const removeAllNodes = () => {
    if (engine && engine.getModel() && engine.getModel().getNodes().length) {
      const currentNodes = engine.getModel().getNodes();
      currentNodes.forEach((nodeItem: any) => {
        engine.getModel().removeNode(nodeItem);
      });
    }
  };
  const removeListners = () => {
    engine.deregisterListener(addNodeListner);
    engine.deregisterListener(deleteNodeListner);
    engine.deregisterListener(refetchListner);
    engine.deregisterListener(addNRListner);
    engine.deregisterListener(bandwidthDrawerListner);
    engine.deregisterListener(resizeListner);
    engine.deregisterListener(dragListner);
    engine.deregisterListener(expandedGroupIdListner);
    engine.getModel().getNodes().forEach((item) => {
      item.clearListeners();
    });
    engine.getModel().deregisterListener(offsetListner);
  };

  const updateZindexNode = (e: any, isAdd: boolean) => {
    if (ref.current && e.entity && e.entity.selectedNe) {
      const classname = `.parent-node-${e.entity.selectedNe.id}`;
      const ele = ref.current.querySelector(classname);
      if (ele) {
        isAdd ? ele.classList.add('node-zindex') : ele.classList.remove('node-zindex');
      }
    }
  };

  const intersectRect = (r1: any, r2: any) => {
    return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
  };

  const isIntersect = (draggedNodeRect: any, nodeList: any) => {
    const flagList: any[] = [];
    forEach(nodeList, (node: any) => {
      const { width, height, position } = node;
      const nodeRect = {
        left: position.x,
        top: position.y,
        right: position.x + width,
        bottom: position.y + height,
      };
      const result = intersectRect(draggedNodeRect, nodeRect);
      let newRect = {};
      if (result) {
        newRect = {
          left: position.x - (draggedNodeRect.width + 25),
          top: position.y,
          right: position.x - 1,
          bottom: position.y + draggedNodeRect.height,
          width: draggedNodeRect.width,
          height: draggedNodeRect.height,
        };
      }
      flagList.push({
        newRect,
        result,
      });
    });
    return flagList;
  };

  const checkPositionAvailablity = (draggedNodeRect: any, nodeList: any): any => {
    const flagList = isIntersect(draggedNodeRect, nodeList);
    const intersected = flagList.filter((f: any) => f.result === true);
    if (intersected.length > 0) {
      const result = intersected.reduce((res: any, obj: any) => {
        return (obj.newRect.left < res.newRect.left) ? obj : res;
      });
      return checkPositionAvailablity(result.newRect, nodeList);
    } else {
      return draggedNodeRect;
    }
  };
  const updateNodePostion = (e: any) => {
    const draggedNode = e.entity;
    const nodeData = engine.getModel().getNodes().filter((ne) => ne !== draggedNode);
    const draggedNodeRect = {
      left: draggedNode.position.x,
      top: draggedNode.position.y,
      right: draggedNode.position.x + draggedNode.width,
      bottom: draggedNode.position.y + draggedNode.height,
      width: draggedNode.width,
      height: draggedNode.height,
    };
    const position = checkPositionAvailablity(draggedNodeRect, nodeData);
    if (position.left !== draggedNodeRect.left) {
      draggedNode.setPosition(position.left, position.top);
      engine.repaintCanvas();
    }
  };

  const debouncedUpdate = debounce((e) => {
    // to block the link updatation while in-progress of link addtion/deletion.
    if (dirtyData.create.length === 0 && dirtyData.update.length === 0 && dirtyData.delete.length === 0) {
      updateZindexNode(e, false);
      updateNodePostion(e);
      onNodeDrag();
    }
    resizeDone();
  }, 500);

  const onUpdatePostion = (e: any) => {
    updateZindexNode(e, true);
    debouncedUpdate(e);
  };

  const debouncedOffsetUpdate = debounce(() => {
    if (canvasData === null || canvasData.offsetX !== model.getOffsetX() || canvasData.offsetY !== model.getOffsetY()) {
      updateCanvasDataToAPI();
    }
  }, 500);

  const onUpdateOffset = () => {
    debouncedOffsetUpdate();
  };

  const debouncedPortPosition = debounce(() => {
    updateCanvasDataToAPI();
  }, 2000);

  const onUpdatePortPosition = () => {
    debouncedPortPosition();
  };

  const addListners = () => {
    if (engine) {
      removeListners();
      const addNewNodeListner = engine.registerListener({
        onAddNewNodeClick: (event) => onNeOpen(),
      });
      setAddNodeListner(addNewNodeListner);
      const deleteListner = engine.registerListener({
        onDeleteClick: (event) => onDeleteClick(event),
      });
      setDeleteNodeListner(deleteListner);
      const fetchListner = engine.registerListener({
        onRefetchClick: (event) => onRefetch(),
      });
      setRefetchListner(fetchListner);
      const AddNROpenListner = engine.registerListener({
        onAddNROpenClick: (event) => onAddNROpen(event),
      });
      setAddNRListner(AddNROpenListner);
      const bandwidthListner = engine.registerListener({
        onAddBandwidthOpenClick: (event) => onAddBandwidthOpen(event),
      });
      setBandwidthDrawerListner(bandwidthListner);
      engine.getModel().getNodes().forEach((item) => {
        item.registerListener({
          positionChanged: onUpdatePostion,
        });
      });
      const reSizeListner = engine.registerListener({
        resizeEnd: () => resizeDone(),
      });
      setResizeListner(reSizeListner);
      const drgListner = engine.registerListener({
        dragEnd: () => onUpdatePortPosition(),
      });
      setDragListner(drgListner);
      const offsetListner = engine.getModel().registerListener({
        offsetUpdated: () => onUpdateOffset(),
      });
      setOffsetListner(offsetListner);
      const expandedGroupIdListner = engine.registerListener({
        onGroupAction: (event) => onGroupAction(event),
      });
      setExpandedGroupIdListner(expandedGroupIdListner);
    }
  };

  useEffect(() => {
    model.setZoomLevel(scale);
    engine.repaintCanvas();
  }, [scale]);

  useEffect(() => {
    if (ports) {
      removeAllNodes();
      if (ports.nodes.length === 0) {
        const node1 = new SelectNodeModel();
        node1.setPosition(50, 130);
        model.addAll(node1);
      } else {
        const nodeData: any = [];
        let newlyAddedNodeCount = 0;
        const NODE_IN_EACH_ROW = 4;
        ports.nodes.forEach((node: any, index: number) => {
          if (node && node.ports) {
            const nodeItem = canvasData && canvasData.nodes ? canvasData.nodes.find((n: any) => n.id === node.id) : null;
            const portList = node.ports.length ? node.ports[0] : [];
            const portUsedAll = node.bandwidth_ports_used || [];
            const groupList = node.groups || [];
            const groupUsedAll = node.bandwidth_groups_used || [];
            if (canvasData) {
              const storedData = canvasData.nodes.find((el: any) => el.id === node.id);
              if (storedData && storedData.portList) {
                portList.forEach((element: any) => {
                  let item = storedData.portList.find((el: any) => el.portId === element.portId);
                  if (!item) {
                    item = storedData.portList.find((el: any) => el.purchasePortId === element.purchasePortId);
                  }
                  if (item) {
                    element.x = item.x || 0;
                    element.y = item.y || 0;
                  }
                });
              }
              if (storedData && storedData.portsUsedList) {
                portUsedAll.forEach((element: any) => {
                  let item = storedData.portsUsedList.find((el: any) => el.portId === element.portId);
                  if (!item) {
                    item = storedData.portsUsedList.find((el: any) => el.purchasePortId === element.purchasePortId);
                  }
                  if (item) {
                    element.x = item.x || 0;
                    element.y = item.y || 0;
                  }
                });
              }
              if (storedData && storedData.grpList) {
                groupList.forEach((element: any) => {
                  const item = storedData.grpList.find((el: any) => el.groupId === element.groupId);
                  if (item) {
                    element.x = item.x || 0;
                    element.y = item.y || 0;
                  }
                });
              }
              if (storedData && storedData.grpUsedList) {
                groupUsedAll.forEach((element: any) => {
                  const item = storedData.grpUsedList.find((el: any) => el.groupId === element.groupId);
                  if (item) {
                    element.x = item.x || 0;
                    element.y = item.y || 0;
                  }
                });
              }
            }
            const node1 = new NENodeModel({
              portsList: portList,
              groups: groupList,
              selectedNe: node,
              portsUsed: {
                all: portUsedAll,
                left: [],
                right: [],
                bottom: [],
                top: [],
              },
              groupsUsed: {
                all: groupUsedAll,
                left: [],
                right: [],
                bottom: [],
                top: [],
              },
              bandwidths: ports.bandwidths || [],
              nodeDataCanvas: nodeItem,
            });
            if (canvasData) {
              if (nodeItem) {
                const { position } = nodeItem;
                node1.setPosition(position.x, position.y);
              } else {
                // this node is newly added, show it on top, left corner
                // do - canvasData.offsetX to put at proper location
                node1.setPosition(((newlyAddedNodeCount + 1) * 45 + 5) - canvasData.offsetX, ((newlyAddedNodeCount + 1) * 85 - 5) - canvasData.offsetY);
                newlyAddedNodeCount++;
              }
            } else {
              const rowNo = Math.floor(index / NODE_IN_EACH_ROW);
              node1.setPosition((((index + 1) * 450) + 50) - (rowNo * (NODE_IN_EACH_ROW * 450)), (rowNo * 660) + 130);
            }
            nodeData.push(node1);
          }
        });
        setPortUsedPosition(nodeData);
        nodeData.forEach((element: any) => {
          model.addNode(element);
        });
      }
      addListners();
      model.setZoomLevel(scale);
      if (canvasData) {
        model.setOffset(canvasData.offsetX, canvasData.offsetY);
      }
    } else {
      setShowData(true);
    }
    if (!engine.getModel()) {
      engine.maxNumberPointsPerLink = 0;
      engine.setModel(model);
      engine.repaintCanvas();
    } else {
      setPortLinks();

      setTimeout(() => {
        updateLinkUI();
        engine.repaintCanvas();
      }, 1200);
    }
  }, [ports, canvasData]);

  return (
    <div className="canvas-root">
      <div className="canvas-with-spinner" ref={ref}>
        {showData && <CanvasBoard engine={engine} />}
        {portsLoading && <Spinner className="loading-spinner" size={30} />}
      </div>
    </div>
  );
};

export default Canvas;
