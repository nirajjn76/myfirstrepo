import React, {
  useState, useRef, useCallback, useEffect, useLayoutEffect,
} from 'react';
import { toast } from 'react-toastify';
import { useCustomEventListener } from 'react-custom-events';
import { DefaultLinkModel } from '@projectstorm/react-diagrams';
import MenuSection from './MenuSection';
// import ZoomControl from './ZoomControl';
import Canvas from './Canvas';
import SelectNEDrawer from './Canvas/SelectNEDrawer';
import AddNrDrawer from './Canvas/AddNetworkResource';
import AddBandwidthDrawer from './Canvas/AddBandwidth';
import AddPortService from '../../services/addPort.service';
import DashboardService from '../../services/dashboard.service';
import CrossConnectService from '../../services/crossConnect.service';
import { DefaultRxTxValue, ErrorMessages, Regex } from '../../utils/appConstants';
import ErrorInfoIcon from '../../assets/images/error-info-icon.svg';
import SuccessInfoIcon from '../../assets/images/success-toast-checkmark-icon.svg';
import { ErrorCodeMessageMapping, ErrorCodesMapping, SuccessMessage } from '../../utils/apiConstants';
import { getPortIdFromName } from '../../utils/methods';

const DefaultScale = 80;

const Dashboard: React.FC = () => {
  const [nodeIds, setNodeIds] = useState<number[]>([]);
  const [selectedNes, setSelectedNes] = useState<any[]>([]);
  const [neSearchText, setNeSearchText] = useState<string>('');
  const [neSearchLoading, setNeSearchLoading] = useState<boolean>(false);
  const [scale, setScale] = useState<any>(null);
  const [selectNEOpen, setSelectNEOpen] = useState(false);
  const [addNrOpen, setAddNrOpen] = useState(false);
  const [addBandwidthOpen, setAddBandwidthOpen] = useState(false);
  const [portTypes, setPortTypes] = useState<any[]>([]);
  const [portsList, setPortsList] = useState<any>(null);
  const [canvasData, setCanvasData] = useState<any>(null);
  const [portsLoading, setPortsLoading] = useState<boolean>(false);
  const [networkElements, setNetworkElements] = useState<any[]>([]);
  const [portsInfo, setPortsInfo] = useState<any[]>([]);
  const [firstPortsInfo, setFirstPortsInfo] = useState<any[]>([]);
  const [secondPortsInfo, setSecondPortsInfo] = useState<any[]>([]);
  const [selectedNe, setSelectedNe] = useState<any>({});
  const [selectedNewNe, setSelectedNewNe] = useState<any>({});
  const [portDescription, setPortDescription] = useState<string>('');
  const [firstPortDescription, setFirstPortDescription] = useState<string>('');
  const [secondPortDescription, setSecondPortDescription] = useState<string>('');
  const [bandwidthDescription, setBandwidthDescription] = useState<string>('');

  const [noOfPortsError, setNoOfPortsError] = useState<string>('');
  const [noOfPortsApiError, setNoOfPortsApiError] = useState<string>('');
  const [noOfPortsToAdd, setNoOfPortsToAdd] = useState<number | string>(1);
  const [expandedGroupIds, setExpandedGroupIds] = useState<any[]>([]);

  const [addPortsLoading, setAddPortsLoading] = useState<boolean>(false); // @ts-ignore
  const [selectNodeContent, setSelectNodeContent] = useState<boolean>(false);
  const [isDirty, setisDirty] = useState<boolean>(false);
  const [dirtyData, setDirtyData] = useState<{
    create: any[],
    update: any[],
    delete: any[],
  }>({
    create: [],
    update: [],
    delete: [],
  });
  const [crossConnectedPortIdsDB, setCrossConnectedPortIdsDB] = useState<any[]>([]);

  const handleExpandedGroupIdsUpdate = useCallback((groupIds: any[]) => {
    setExpandedGroupIds(groupIds);
  }, [setExpandedGroupIds]);

  const updateCrossConnectedPortIdsDB = useCallback((values: any[]) => {
    setCrossConnectedPortIdsDB(values);
  }, [setCrossConnectedPortIdsDB]);

  const isPortInBandwidth = (portId: string) => {
    let isInBandwidth = false;
    if (portsList && portsList.nodes) {
      portsList.nodes.forEach((node: any) => {
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
  //   if (portsList && portsList.nodes) {
  //     portsList.nodes.forEach((node: any) => {
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

  const formatDirtyDataForCreate = (newData: any) => {
    const linkedCreated: any = [];
    if (newData && newData.create) {
      newData.create.forEach((element: any) => {
        const link1 = element.data as DefaultLinkModel;
        const sourcePort = link1.getSourcePort();
        const targetPort = link1.getTargetPort();
        if (sourcePort && targetPort) {
          const sourcePortId = getPortIdFromName(sourcePort.getOptions().name);
          const targetPortId = getPortIdFromName(targetPort.getOptions().name);
          const bandWidth = {
            source_port_id: sourcePortId,
            source_bandwidth_port: isPortInBandwidth(sourcePortId),
            destination_port_id: targetPortId,
            destination_bandwidth_port: isPortInBandwidth(targetPortId),
          };
          linkedCreated.push(bandWidth);
        }
      });
    }
    return linkedCreated;
  };

  const formatDirtyDataForDelete = (newData: any) => {
    const linkedDeleted: any = [];
    if (newData && newData.delete) {
      newData.delete.forEach((element: any) => {
        const link1 = element.data as DefaultLinkModel;
        const sourcePort = link1.getSourcePort();
        const targetPort = link1.getTargetPort();
        if (sourcePort && targetPort) {
          const sourcePortId = getPortIdFromName(sourcePort.getOptions().name);
          const targetPortId = getPortIdFromName(targetPort.getOptions().name);
          const bandWidth = {
            source_port_id: sourcePortId,
            source_bandwidth_port: isPortInBandwidth(sourcePortId),
            destination_port_id: targetPortId,
            destination_bandwidth_port: isPortInBandwidth(targetPortId),
          };
          linkedDeleted.push(bandWidth);
        }
      });
    }
    return linkedDeleted;
  };

  const formatDirtyDataForSave = (newData: any) => {
    const linksCreated = formatDirtyDataForCreate(newData);
    const linksDeleted = formatDirtyDataForDelete(newData);
    const finalData = {
      connect: linksCreated,
      disconnect: linksDeleted,
    };
    // console.log('data for save/update',finalData);
    return finalData;
  };

  const handleSelectNodeContent = useCallback((isSelectNodeContent: boolean) => {
    setSelectNodeContent(isSelectNodeContent);
    setNeSearchText('');
  }, [setSelectNodeContent, setNeSearchText]);

  const handleSelectedNes = useCallback((selecteds: any[]) => {
    setSelectedNes(selecteds);
  }, [setSelectedNes]);

  const handleAddBandwidthClose = useCallback(() => {
    setBandwidthDescription('');
    setSecondPortDescription('');
    setFirstPortDescription('');
    setSecondPortsInfo([]);
    setFirstPortsInfo([]);
    setSelectedNe({});
    setSelectedNewNe({});
    setAddBandwidthOpen(false);
    setSelectNodeContent(false);
    setNeSearchText('');
    setNoOfPortsToAdd(1);
    setNoOfPortsApiError('');
    setNoOfPortsError('');
  }, [setNeSearchText, setNoOfPortsToAdd, setNoOfPortsApiError, setAddBandwidthOpen, setSelectNodeContent, setBandwidthDescription, setFirstPortDescription, setSecondPortDescription, setSecondPortsInfo, setFirstPortsInfo, setSelectedNe, setSelectedNewNe]);

  const fetchPorts = useCallback((nodeIdsToFetch: number[]) => {
    setPortsLoading(true);

    const payload = {
      nodeIds: nodeIdsToFetch,
    };

    DashboardService.getNodeWiseNr(payload)
      .then((response: any) => {
        setPortsLoading(false);

        const portsDetail = {
          nodes: response.data.neResultList || [],
          bandwidths: response.data.bdResultList || [],
        };
        setPortsList(portsDetail);
      })
      .catch(() => {
        setPortsLoading(false);
        setPortsList([]);
      });
  }, [setPortsList, setPortsLoading]);

  const fetchCanvasData = async () => {
    try {
      const response = await DashboardService.getCanvasData();
      if (response.data.canvasPosition) {
        setCanvasData(response.data.canvasPosition);
        setScale(response.data.canvasPosition.zoom);
      } else {
        setScale(DefaultScale);
      }
      return 'success';
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error('error===', e.errorCode);
      return 'fail';
    }
  };

  const fetchNodeIds = useCallback(() => {
    setPortsLoading(true);
    fetchCanvasData();
    DashboardService.getSelectedNodes()
      .then((response: any) => {
        setNodeIds(response.data.selected_node_ids || []);
        setSelectedNes(response.data.selected_node_ids || []);
        fetchPorts(response.data.selected_node_ids || []);
      })
      .catch(() => {
        setNodeIds([]);
        setPortsLoading(false);
      });
  }, [setNodeIds, setSelectedNes, setPortsLoading]);

  const handleDeleteClick = useCallback((selectedNetworkElement: any) => {
    const newSelected = nodeIds.filter((item: number) => item != selectedNetworkElement.id);
    setNodeIds(newSelected);
    setSelectedNes(newSelected);
  }, [setSelectedNes, setNodeIds, nodeIds]);

  const handleSaveReset = (isSaved: boolean) => {
    if (dirtyData) {
      if (isSaved) {
        const dataForSave = formatDirtyDataForSave(dirtyData);
        const payload = {
          connect: dataForSave.connect,
          disconnect: dataForSave.disconnect,
        };

        setPortsLoading(true);
        CrossConnectService.crossConnect(payload)
          .then((response: any) => {
            fetchNodeIds();
            setPortsLoading(false);
            setisDirty(false);
            handleExpandedGroupIdsUpdate([]);
            setDirtyData({
              create: [],
              update: [],
              delete: [],
            });
            toast.success(SuccessMessage.crossConnectBulkSuccess, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          })
          .catch(() => {
            fetchNodeIds();
            setPortsLoading(false);
            setisDirty(false);
            handleExpandedGroupIdsUpdate([]);
            setDirtyData({
              create: [],
              update: [],
              delete: [],
            });
            toast.error(SuccessMessage.crossConnectBulkFailed, { icon: <img src={ErrorInfoIcon} alt="Success" /> });
          });
      } else {
        handleExpandedGroupIdsUpdate([]);
        fetchNodeIds();
        setisDirty(false);
        setDirtyData({
          create: [],
          update: [],
          delete: [],
        });
      }
    }
  };

  useCustomEventListener('canvas-isdiry', (data: any) => {
    const isDirty = data.isdirty;
    setisDirty(isDirty);
  });

  const setDirtyDataFromCanvas = useCallback((data: any) => {
    setDirtyData(data);
  }, [setDirtyData]);

  const handleNeClose = useCallback((updatedNodeIds?: any[]) => {
    setSelectNEOpen(false);
    setAddNrOpen(false);
    handleAddBandwidthClose();
    setNeSearchText('');
    setNoOfPortsToAdd(1);
    setNoOfPortsError('');
    setNoOfPortsApiError('');
    setSelectedNes(updatedNodeIds || nodeIds);
    setNodeIds(updatedNodeIds || nodeIds);
  }, [setSelectNEOpen, handleAddBandwidthClose, setNoOfPortsApiError, setNoOfPortsError, setNoOfPortsToAdd, setAddNrOpen, setNeSearchText, setSelectedNes, setNodeIds, nodeIds]);

  const handleAddNrClose = useCallback(() => {
    setAddNrOpen(false);
    setNoOfPortsToAdd(1);
  }, [setAddNrOpen, setNoOfPortsToAdd]);

  const handlePortDescriptionChange = useCallback((e: any) => {
    setPortDescription(e.target.value || '');
  }, [setPortDescription]);

  const handleFirstPortDescriptionChange = useCallback((e: any) => {
    setFirstPortDescription(e.target.value || '');
  }, [setFirstPortDescription]);

  const handleSecondPortDescriptionChange = useCallback((e: any) => {
    setSecondPortDescription(e.target.value || '');
  }, [setSecondPortDescription]);

  const handleBandwidthDescriptionChange = useCallback((e: any) => {
    setBandwidthDescription(e.target.value || '');
  }, [setBandwidthDescription]);

  const handleNoOfPortsChange = useCallback((e: any) => {
    if (e.target.value.trim() === '') {
      setNoOfPortsToAdd('');
      setNoOfPortsError(ErrorMessages.addPort.noOfPortsRequired);
    } else if (parseInt(e.target.value.trim()) === 0) {
      setNoOfPortsToAdd(e.target.value.trim());
      setNoOfPortsError(ErrorMessages.addPort.noOfPortsMinLimit);
    } else if (Regex.numbers.test(e.target.value.trim())) {
      setNoOfPortsToAdd(parseInt(e.target.value.trim()));
      setNoOfPortsError('');

      const tempPortsInfo = [];
      for (let i = 1; i <= parseInt(e.target.value.trim()); i++) {
        tempPortsInfo.push({
          id: i,
          portName: `${selectedNe.ne_name} Port ${i}`,
          rx: DefaultRxTxValue,
          tx: DefaultRxTxValue,
          portTypeId: portTypes[0].id,
        });
      }
      setPortsInfo(tempPortsInfo);

      const tempFirstPortsInfo = [];
      const tempSecondPortsInfo = [];
      for (let i = 1; i <= parseInt(e.target.value.trim()); i++) {
        tempFirstPortsInfo.push({
          id: i,
          portName: `${selectedNe.ne_name} Port ${i}`,
          rx: DefaultRxTxValue,
          tx: DefaultRxTxValue,
          portTypeId: portTypes[0].id,
        });

        tempSecondPortsInfo.push({
          id: i,
          portName: selectedNewNe.ne_name ? `${selectedNewNe.ne_name} Port ${i}` : '',
          rx: DefaultRxTxValue,
          tx: DefaultRxTxValue,
          portTypeId: portTypes[0].id,
        });
      }
      setFirstPortsInfo(tempFirstPortsInfo);
      setSecondPortsInfo(tempSecondPortsInfo);
    }
  }, [setNoOfPortsToAdd, setNoOfPortsError, setPortsInfo, setFirstPortsInfo, setSecondPortsInfo, selectedNewNe, DefaultRxTxValue, selectedNe, portTypes]);

  const handleAddPortsClick = useCallback(() => {
    setAddPortsLoading(true);

    const payload = {
      neId: selectedNe.id,
      nodeId: selectedNe.node_id,
      portDescription: portDescription.trim(),
      portDetails: portsInfo.map((portInfo) => {
        return {
          ...portInfo,
          portName: portInfo.portName.trim(),
        };
      }),
    };

    AddPortService.addPorts(payload)
      .then(() => {
        setNodeIds(Array.from(new Set([...nodeIds, parseInt(selectedNe.id)])));
        setAddPortsLoading(false);
        setNoOfPortsApiError('');
        toast.success(SuccessMessage.addPort, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
        handleAddNrClose();
      })
      .catch((e: any) => {
        setAddPortsLoading(false);
        if (e.errorCode === ErrorCodesMapping[1006]) {
          setNoOfPortsApiError(ErrorCodeMessageMapping[1006]);
        }
        if (e.errorCode === ErrorCodesMapping[1007]) {
          toast.error(ErrorCodeMessageMapping[1007], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
          setNoOfPortsApiError('');
        }
      });
  }, [selectedNe, portDescription, portsInfo, setAddPortsLoading, setNoOfPortsApiError, handleAddNrClose]);

  const addPortDisabled = !!(noOfPortsError || !portDescription.trim() || portsInfo.find((portInfo) => !portInfo.portName.trim()));

  const handleKeypress = useCallback((e) => {
    if (e.key === 'Enter' && !addPortDisabled) {
      handleAddPortsClick();
    }
  }, [handleAddPortsClick, addPortDisabled]);

  const handleNeOpen = useCallback(() => {
    setSelectNEOpen(true);
  }, [setSelectNEOpen]);

  const handleAddNrOpen = useCallback((selectedNe: any) => {
    setSelectedNe(selectedNe);
    setPortsInfo([{
      id: 1,
      portName: `${selectedNe.ne_name} Port 1`,
      rx: DefaultRxTxValue,
      tx: DefaultRxTxValue,
      portTypeId: portTypes[0]?.id,
    }]);
    setPortDescription('');
    setAddNrOpen(true);
  }, [setAddNrOpen, setSelectedNe, setPortDescription, portTypes]);

  const handleAddBandwidthOpen = useCallback((selectedNe: any) => {
    setSelectedNe(selectedNe);
    const tempFirstPortsInfo = [];
    const tempSecondPortsInfo = [];
    for (let i = 1; i <= noOfPortsToAdd; i++) {
      tempFirstPortsInfo.push({
        id: i,
        portName: `${selectedNe.ne_name} Port ${i}`,
        rx: DefaultRxTxValue,
        tx: DefaultRxTxValue,
        portTypeId: portTypes[0]?.id,
      });

      tempSecondPortsInfo.push({
        id: i,
        portName: '',
        rx: DefaultRxTxValue,
        tx: DefaultRxTxValue,
        portTypeId: portTypes[0]?.id,
      });
    }
    setFirstPortsInfo(tempFirstPortsInfo);
    setSecondPortsInfo(tempSecondPortsInfo);
    setAddBandwidthOpen(true);
  }, [portTypes, setAddBandwidthOpen, setSelectedNe, setSelectedNewNe, setFirstPortsInfo, setSecondPortsInfo]);

  const handleNeSearchChange = useCallback((e: any) => {
    setNeSearchText(e.target.value);
  }, [setNeSearchText]);

  const fetchNetworkElementsAndPortTypes = useCallback(() => {
    AddPortService.getNetworkElements(neSearchText)
      .then((response: any) => {
        setNetworkElements(response.data || []);

        AddPortService.getPortTypes()
          .then((responsePortTypes: any) => {
            setPortTypes(responsePortTypes.data || []);
            setPortsInfo([{
              id: 1,
              portName: `${response.data[0].ne_name} Port 1`,
              rx: DefaultRxTxValue,
              tx: DefaultRxTxValue,
              portTypeId: responsePortTypes.data[0]?.id,
            }]);
          })
          .catch(() => {
            setPortTypes([]);
          });
      })
      .catch(() => {
        setNetworkElements([]);
      });
  }, [setNetworkElements, setPortTypes, neSearchText]);

  const onNetworkElementChange = useCallback((networkElement: any, type: string) => {
    // console.info(type)
    if (type === '2nd') {
      setSelectedNewNe(networkElement);
    } else {
      setSelectedNe(networkElement);
    }

    const tempPortsInfo = [];
    for (let i = 1; i <= noOfPortsToAdd; i++) {
      tempPortsInfo.push({
        id: i,
        portName: `${networkElement.ne_name} Port ${i}`,
        rx: DefaultRxTxValue,
        tx: DefaultRxTxValue,
        portTypeId: portTypes[0].id,
      });
    }
    const tempFirstPortsInfo = [];
    const tempSecondPortsInfo = [];
    for (let i = 1; i <= noOfPortsToAdd; i++) {
      tempFirstPortsInfo.push({
        id: i,
        portName: `${selectedNe.ne_name} Port ${i}`,
        rx: DefaultRxTxValue,
        tx: DefaultRxTxValue,
        portTypeId: portTypes[0].id,
      });

      tempSecondPortsInfo.push({
        id: i,
        portName: networkElement ? `${networkElement.ne_name} Port ${i}` : '',
        rx: DefaultRxTxValue,
        tx: DefaultRxTxValue,
        portTypeId: portTypes[0].id,
      });
    }
    setFirstPortsInfo(tempFirstPortsInfo);
    setSecondPortsInfo(tempSecondPortsInfo);
    setPortsInfo(tempPortsInfo);
  }, [networkElements, portTypes, noOfPortsToAdd, selectedNe]);

  const fetchNetworkElements = useCallback(() => {
    setNeSearchLoading(true);
    AddPortService.getNetworkElements(neSearchText)
      .then((response: any) => {
        setNeSearchLoading(false);
        setNetworkElements(response.data || []);
      })
      .catch(() => {
        setNeSearchLoading(false);
        setNetworkElements([]);
      });
  }, [neSearchText, setNetworkElements]);

  useEffect(() => {
    fetchNetworkElementsAndPortTypes();
  }, [fetchNetworkElementsAndPortTypes]);

  useEffect(() => {
    fetchNetworkElements();
  }, [neSearchText]);

  useEffect(() => {
    fetchCanvasData();
    fetchNodeIds();
  }, [fetchNodeIds]);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    async function fetchDataAPI() {
      await fetchCanvasData();
      fetchPorts(nodeIds);
    }
    fetchDataAPI();
  }, [nodeIds]);

  const handlePortsInfoChanged = useCallback((ports: any[]) => {
    setPortsInfo(ports);
  }, [setPortsInfo]);

  const handleFirstPortsInfoChanged = useCallback((ports: any[]) => {
    setFirstPortsInfo(ports);
  }, [setFirstPortsInfo]);

  const handleSecondPortsInfoChanged = useCallback((ports: any[]) => {
    setSecondPortsInfo(ports);
  }, [setSecondPortsInfo]);

  const handleAddBandwidthClick = useCallback(() => {
    const payload = {
      bandwidthDescription: bandwidthDescription.trim(),
      nePortsInfo: {
        neId: selectedNe.id,
        nodeId: selectedNe.node_id,
        portDescription: firstPortDescription.trim(),
        portDetails: firstPortsInfo.map((portInfo) => {
          return {
            ...portInfo,
            portName: portInfo.portName.trim(),
          };
        }),
      },
      fePortsInfo: {
        neId: selectedNewNe.id,
        nodeId: selectedNewNe.node_id,
        portDescription: secondPortDescription.trim(),
        portDetails: secondPortsInfo.map((portInfo) => {
          return {
            ...portInfo,
            portName: portInfo.portName.trim(),
          };
        }),
      },
    };

    AddPortService.addBandwidth(payload)
      .then(() => {
        setNoOfPortsApiError('');
        let successMessage = SuccessMessage.addBandwidth.replace('NE1', selectedNe.ne_name);
        successMessage = successMessage.replace('NE2', selectedNewNe.ne_name);
        toast.success(successMessage, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
        setNodeIds(Array.from(new Set([...nodeIds, parseInt(selectedNewNe.id), parseInt(selectedNe.id)])));
        handleAddBandwidthClose();
      })
      .catch((e: any) => {
        if (e.errorCode === ErrorCodesMapping[1006]) {
          setNoOfPortsApiError(ErrorCodeMessageMapping[1008]);
        }
        if (e.errorCode === ErrorCodesMapping[1007]) {
          toast.error(ErrorCodeMessageMapping[1009], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
          setNoOfPortsApiError('');
        }
      });
  }, [firstPortDescription, secondPortDescription, firstPortsInfo, secondPortsInfo, selectedNe, selectedNewNe, bandwidthDescription, nodeIds, setNoOfPortsApiError, handleAddBandwidthClose]);

  const addBandwidthDisabled = !!(noOfPortsError || !bandwidthDescription.trim() || !firstPortDescription.trim() || !secondPortDescription.trim() || firstPortsInfo.find((portInfo) => !portInfo.portName.trim()) || secondPortsInfo.find((portInfo) => !portInfo.portName.trim()));
  const handleKeypressBandwidth = useCallback((e) => {
    if (e.key === 'Enter' && !addBandwidthDisabled) {
      handleAddBandwidthClick();
    }
  }, [handleAddBandwidthClick, addBandwidthDisabled]);

  const handleSwipeClick = useCallback(() => {
    setSecondPortDescription(firstPortDescription);
    setFirstPortDescription(secondPortDescription);
    setSecondPortsInfo(firstPortsInfo);
    setFirstPortsInfo(secondPortsInfo);
    setSelectedNe(selectedNewNe);
    setSelectedNewNe(selectedNe);
  }, [firstPortDescription, secondPortDescription, firstPortsInfo, secondPortsInfo, selectedNe, selectedNewNe, setSecondPortDescription, setFirstPortDescription]);

  const updateScale = (e: any) => {
    setScale(e.target.value);
  };

  const handleRefetchNodes = useCallback(() => {
    fetchNodeIds();
  }, [fetchNodeIds]);

  return (
    <>
      <MenuSection
        selectedNes={nodeIds}
        selectNEOpen={selectNEOpen}
        isDirty={!!(formatDirtyDataForSave(dirtyData).connect.length > 0 || formatDirtyDataForSave(dirtyData).disconnect.length > 0)}
        onNeOpen={handleNeOpen}
        handleSaveReset={handleSaveReset}
      />
      <Canvas
        scale={scale}
        ports={portsList}
        canvasData={canvasData}
        portsLoading={portsLoading}
        onRefetch={handleRefetchNodes}
        onNeOpen={handleNeOpen}
        onAddNROpen={handleAddNrOpen}
        onAddBandwidthOpen={handleAddBandwidthOpen}
        onDeleteClick={handleDeleteClick}
        dirtyData={dirtyData}
        setDirtyData={setDirtyDataFromCanvas}
        crossConnectedPortIdsDB={crossConnectedPortIdsDB}
        setCrossConnectedPortIdsDB={updateCrossConnectedPortIdsDB}
        parentExpandedGroupIds={expandedGroupIds}
        setParentExpandedGroupIds={handleExpandedGroupIdsUpdate}
      />
      {/* <ZoomControl scale={scale} onRangeChange={updateScale} /> */}
      <SelectNEDrawer selectedNes={selectedNes} onSelectNes={handleSelectedNes} onNeOpen={handleNeOpen} loading={neSearchLoading} onSelectNodeContent={handleSelectNodeContent} networkElements={networkElements} onNeClose={handleNeClose} open={selectNEOpen} onNeSearchChange={handleNeSearchChange} searchText={neSearchText} />
      <AddNrDrawer onNetworkElementChange={(networkEl) => onNetworkElementChange(networkEl, '1st')} loading={neSearchLoading} networkElements={networkElements} onSelectNodeContent={handleSelectNodeContent} onNeSearchChange={handleNeSearchChange} searchText={neSearchText} onAddNRClose={handleAddNrClose} open={addNrOpen} noOfPortsError={noOfPortsError || noOfPortsApiError} portDescription={portDescription} addPortDisabled={addPortDisabled} noOfPortsToAdd={noOfPortsToAdd} selectedNe={selectedNe} portTypes={portTypes} portsInfo={portsInfo} onNoOfPortsChange={handleNoOfPortsChange} onKeypress={handleKeypress} onPortDescriptionChange={handlePortDescriptionChange} onAddPortsClick={handleAddPortsClick} onPortsInfoChanged={handlePortsInfoChanged} />
      <AddBandwidthDrawer addBandwidthDisabled={addBandwidthDisabled} selectNodeContent={selectNodeContent} onSelectNodeContent={handleSelectNodeContent} onSwipeClick={handleSwipeClick} selectedNewNe={selectedNewNe} onNetworkElementChange={(networkEl) => onNetworkElementChange(networkEl, '2nd')} loading={neSearchLoading} networkElements={networkElements} onNeSearchChange={handleNeSearchChange} searchText={neSearchText} onAddBandwidthClose={handleAddBandwidthClose} open={addBandwidthOpen} selectedNe={selectedNe} noOfPortsError={noOfPortsError || noOfPortsApiError} firstPortDescription={firstPortDescription} secondPortDescription={secondPortDescription} bandwidthDescription={bandwidthDescription} noOfPortsToAdd={noOfPortsToAdd} portTypes={portTypes} firstPortsInfo={firstPortsInfo} secondPortsInfo={secondPortsInfo} onNoOfPortsChange={handleNoOfPortsChange} onKeypress={handleKeypressBandwidth} onBandwidthDescriptionChange={handleBandwidthDescriptionChange} onFirstPortDescriptionChange={handleFirstPortDescriptionChange} onSecondPortDescriptionChange={handleSecondPortDescriptionChange} onAddBandwidthClick={handleAddBandwidthClick} onFirstPortsInfoChanged={handleFirstPortsInfoChanged} onSecondPortsInfoChanged={handleSecondPortsInfoChanged} />
    </>
  );
};

export default Dashboard;
