import React, { useCallback, useState, useEffect } from 'react';
import { TableBody } from '@material-ui/core';
import { toast } from 'react-toastify';
import ValidationLayout from '../AdminValidations';
import { SortOrder } from '../../enums';
import CollapsibleNe from './Collapsible';
import GroupOperation from './GroupOperations';
import AddPortService from '../../services/addPort.service';
import ManagePortsService from '../../services/managePorts.service';
import { TableConstants, HeadCellType } from '../../utils/appConstants';
import manageBandwidthService from '../../services/manageBandwidth.service';
import LoadingRow from '../DesignSystem/Table/Rows/LoadingRow';
import EmptyRow from '../DesignSystem/Table/Rows/EmptyRow';
import BandwidthTable from './BandwidthTable';
import SaleDrawer from './BandwidthTable/PutUpForSale';
import PdfViewer from '../PdfViewer';
import TableData from './TableData';
import ErrorInfoIcon from '../../assets/images/error-info-icon.svg';
import {
  ErrorCodeMessageMapping, ErrorCodesMapping, SuccessMessage, MY_SELLER_BUCKET_PRE_URL, TERMS_DEFAULT_FILE,
} from '../../utils/apiConstants';
import SuccessInfoIcon from '../../assets/images/success-toast-checkmark-icon.svg';

const TypeOption = [{
  label: 'Internet',
  value: 'internet',
}, {
  label: 'Cloud',
  value: 'cloud',
}, {
  label: 'Network Services',
  value: 'network-services',
}];

const ManageBandwidth: React.FC = () => {
  let rows : any;
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<SortOrder>(SortOrder.asc);
  const [orderBy, setOrderBy] = useState<string>('farend_port_description');
  const [page, setPage] = useState<number>(1);
  const [searchTextNeElements, setSearchTextNeElements] = useState<string>('');
  const [searchTextFeElements, setSearchTextFeElements] = useState<string>('');
  const [bandwidthPorts, setBandwidthPorts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [putForSaleOpen, setPutForSaleOpen] = useState<boolean>(false);
  const [selectedRowForSale, setSelectedRowForSale] = useState<any>();
  const [total, setTotal] = useState<number>(0);
  const [verified, setVerified] = useState<boolean>(false);
  const [serviceDescription, setServiceDescription] = useState<string>('');
  const [onContractSelected, setOnContractSelected] = useState<boolean>(false);
  const [onDemandSelected, setOnDemandSelected] = useState<boolean>(false);
  const [onContractPrice, setOnContractPrice] = useState<string>('');
  const [onDemandPrice, setOnDemandPrice] = useState<string>('');
  const [type, setType] = useState<string>(TypeOption[0].value);
  const [saleEdit, setSaleEdit] = useState<boolean>(false);
  const [removeLoadingId, setRemoveLoadingId] = useState<string>('');
  const [saleTouched, setSaleTouched] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [aggrementTypeInfo, setAggrementTypeInfo] = useState<{
    type: string,
    url: string
  }>({
    type: '',
    url: '',
  });
  const [saleAggrementAccepted, setSaleAggrementAccepted] = useState<{
    on_contract: boolean,
    on_demand: boolean
  }>({
    on_contract: false,
    on_demand: false,
  });

  const handleTermsOpenClick = useCallback((type: string) => {
    setPdfViewerOpen(true);
    const fileName = type === 'on_contract' ? selectedRowForSale.terms_on_contract_url : selectedRowForSale.terms_on_demand_url;
    setAggrementTypeInfo((prev) => {
      return {
        type,
        url: fileName ? MY_SELLER_BUCKET_PRE_URL + fileName : MY_SELLER_BUCKET_PRE_URL + TERMS_DEFAULT_FILE,
      };
    });
  }, [setPdfViewerOpen, selectedRowForSale]);

  const handleAcceptAggredTermsClick = useCallback(() => {
    // setSaleAggrementAccepted((prev) => !prev);
  }, [setSaleAggrementAccepted]);

  const handleTermsCloseClick = useCallback((agrred?: boolean, aggrementType?: string) => {
    setPdfViewerOpen(false);
    agrred && aggrementType && setSaleAggrementAccepted((prev) => {
      return {
        ...prev,
        [aggrementType]: agrred,
      };
    });
  }, [setPdfViewerOpen, setSaleAggrementAccepted]);

  const [networkElements, setNetworkElements] = useState<any[]>([]);
  const [expandedNeId, setExpandedNeId] = useState<string>('');
  const [portsInNe, setPortsInNe] = useState<any[]>([]);
  const [groupsInNe, setGroupsInNe] = useState<any[]>([]);
  const [portsGroupsLoading, setPortsGroupsLoading] = useState<boolean>(false);
  const [selectedUnGroupId, setSelectedUnGroupId] = useState<string>('');
  const [groupedSelected, setGroupSelected] = useState<any[]>([]);
  const [unGroupedSelected, setUnGroupSelected] = useState<any[]>([]);
  const [expandedGroupIds, setExpandedGroupIds] = useState<string[]>([]);
  const [editGroupOpen, setEditGroupOpen] = useState<boolean>(false);
  const [unGroupLoading, setUnGroupLoading] = useState<boolean>(false);
  const [groupLoading, setGroupLoading] = useState<boolean>(false);
  const [addGroupOpen, setAddGroupOpen] = useState<boolean>(false);
  const [ports, setPorts] = useState<any[]>([]);
  const [cancelSubLoading, setCancelSubLoading] = useState<string>('');
  const [existingGroupOptions, setExistingGroupOptions] = useState<any[]>([]);
  const [editGroupDetails, setEditGroupDetails] = useState<{
    name: string,
    description: string,
    icon: string,
    id: string;
  }>({
    name: '',
    description: '',
    icon: '',
    id: '',
  });
  const [isDBPrice, setDBPrice] = useState<{
    onDemand: boolean,
    onContract: boolean
  }>({
    onDemand: false,
    onContract: false,
  });

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, [setPage]);

  const handleServiceDescription = useCallback((e) => {
    setServiceDescription(e.target.value);
    setSaleTouched(true);
  }, [setServiceDescription, setSaleTouched]);

  const handleRequestSort = useCallback(
    (property: string, nextSortOrder: SortOrder) => {
      setOrder(nextSortOrder);
      setOrderBy(property);
    },
    [orderBy, order],
  );

  const fetchNetworkElements = useCallback(() => {
    AddPortService.getNetworkElements()
      .then((response: any) => {
        setNetworkElements(response.data || []);
      })
      .catch(() => {
        setNetworkElements([]);
      });
  }, [setNetworkElements]);

  const fetchPortsAndGroups = useCallback(() => {
    if (expandedNeId) {
      setPortsGroupsLoading(true);
      manageBandwidthService.getPortsAndGroups(expandedNeId, searchText)
        .then((response: any) => {
          setPortsInNe(response.data[0].ports || []);
          setGroupsInNe(response.data[0].groups || []);
          setExpandedGroupIds(response.data[0].groups && response.data[0].groups.map((group: any) => group.groupId));
          setPortsGroupsLoading(false);

          const existedGroups = (response?.data[0]?.groups || []).map((group: any) => {
            return {
              id: group.groupId,
              name: group.groupName,
            };
          });
          setExistingGroupOptions(existedGroups || []);
        })
        .catch(() => {
          setPortsGroupsLoading(false);
          setPortsInNe([]);
          setGroupsInNe([]);
        });
    }
  }, [expandedNeId, searchText, order, orderBy, setPortsGroupsLoading, setPortsInNe, setGroupsInNe, setExistingGroupOptions]);

  const fetchBandwidthPorts = useCallback(() => {
    setLoading(true);

    const payload = {
      sortField: orderBy,
      sortDirection: order.toUpperCase(),
      page,
      pageSize: TableConstants.perPage,
      searchNneName: searchTextNeElements,
      searchFneName: searchTextFeElements,
      searchText,
    };

    manageBandwidthService.getManageBandwidthPorts(payload)
      .then((response: any) => {
        setLoading(false);
        setBandwidthPorts(response?.data ?? []);
        setTotal(response?.pagination?.totalRecords ?? 0);
      })
      .catch(() => {
        setLoading(false);
        setBandwidthPorts([]);
        setTotal(0);
      });
  }, [setLoading, setBandwidthPorts, setTotal, total, orderBy, order, page, searchTextNeElements, searchTextFeElements, searchText]);

  // useEffect(() => {
  //   fetchNetworkElements();
  // }, [fetchNetworkElements]);

  const handleOnContractPriceChange = useCallback((e) => {
    if (e.target.value < 0) {
      return;
    }
    const split = e.target.value.split('.');
    if (split[1]) {
      if (split[1].length <= 2) {
        setOnContractPrice(e.target.value);
      }
    } else {
      setOnContractPrice(e.target.value);
    }
    setSaleTouched(true);
  }, [setOnContractPrice, setSaleTouched]);

  const handleClosePutupForSale = useCallback(() => {
    setServiceDescription('');
    setPutForSaleOpen(false);
    setOnContractSelected(false);
    setOnDemandSelected(false);
    setSaleEdit(false);
    setOnDemandPrice('');
    setOnContractPrice('');
    setSaleTouched(false);
    setSaleAggrementAccepted({
      on_contract: false,
      on_demand: false,
    });
    setAggrementTypeInfo({
      type: '',
      url: '',
    });
    setDBPrice({
      onDemand: false,
      onContract: false,
    });
  }, [setSaleEdit, setSaleTouched, setServiceDescription, setPutForSaleOpen, setDBPrice, setOnContractSelected, setOnDemandSelected, setOnDemandPrice, setOnContractPrice, setSaleAggrementAccepted, setAggrementTypeInfo]);

  const handleSaleEdit = useCallback((port: any) => {
    setSelectedRowForSale(port);
    setPutForSaleOpen(true);
    setServiceDescription(port.service_description);
    setOnContractSelected(!!port.on_contract_price);
    setOnDemandSelected(!!port.on_demand_price);
    setOnDemandPrice(port.on_demand_price);
    setOnContractPrice(port.on_contract_price);
    // setType(port.type);
    setSaleEdit(true);
    setSaleAggrementAccepted({
      on_contract: !!port.on_contract_price,
      on_demand: !!port.on_demand_price,
    });
    setDBPrice({
      onContract: !!port.on_contract_price,
      onDemand: !!port.on_demand_price,
    });
  }, [type, setPutForSaleOpen, setSelectedRowForSale, setServiceDescription, setDBPrice, setSaleAggrementAccepted, setOnContractSelected, setOnDemandSelected, setOnDemandPrice, setOnContractPrice, setType, setSaleEdit]);

  const handlePortViewChange = useCallback((checked: boolean) => {
    setVerified(checked);
    setOrderBy('created_at');
    setPage(1);
    setPorts([]);
    setTotal(0);
    setSearchTextNeElements('');
    setSearchTextFeElements('');
  }, [setVerified, setOrderBy, setPage, setPorts, setTotal, setSearchTextNeElements, setSearchTextFeElements]);

  const handleOnDemandPriceChange = useCallback((e) => {
    if (e.target.value < 0) {
      return;
    }
    const split = e.target.value.split('.');
    if (split[1]) {
      if (split[1].length <= 2) {
        setOnDemandPrice(e.target.value);
      }
    } else {
      setOnDemandPrice(e.target.value);
    }
    setSaleTouched(true);
  }, [setOnDemandPrice, setSaleTouched]);

  const handleOnContractSelected = useCallback((e) => {
    let prevVal = null;
    setOnContractSelected((prev) => {
      prevVal = prev;
      return !prev;
    });
    setSaleTouched(true);
    if (prevVal) {
      setDBPrice((prev) => {
        return {
          ...prev,
          onContract: false,
        };
      });
      setSaleAggrementAccepted((prev) => {
        return {
          ...prev,
          on_contract: false,
        };
      });
    }
  }, [setOnContractSelected, setSaleTouched, setDBPrice, setSaleAggrementAccepted]);

  const handleOnDemandSelected = useCallback((e) => {
    let prevVal = null;
    setOnDemandSelected((prev) => {
      prevVal = prev;
      return !prev;
    });
    setSaleTouched(true);
    if (prevVal) {
      setDBPrice((prev) => {
        return {
          ...prev,
          onDemand: false,
        };
      });
      setSaleAggrementAccepted((prev) => {
        return {
          ...prev,
          on_demand: false,
        };
      });
    }
  }, [setOnDemandSelected, setSaleTouched, setDBPrice, setSaleAggrementAccepted]);

  const handleCollapsibleNEClose = useCallback(() => {
    setExpandedNeId('');
  }, [setExpandedNeId]);

  const handleCollapsibleNEOpen = useCallback((neId: string) => {
    setExpandedNeId(neId);
    setGroupSelected([]);
    setUnGroupSelected([]);
    setSelectedUnGroupId('');
    setOrder(SortOrder.asc);
    setOrderBy('description');
    setExpandedGroupIds([]);
  }, [setExpandedNeId, setGroupSelected, setUnGroupSelected, setSelectedUnGroupId, setOrderBy, setOrder, setExpandedGroupIds]);

  const handleRowSelect = useCallback((newSelected: any[]) => {
    setGroupSelected(newSelected);
  }, [setGroupSelected]);

  useEffect(() => {
    fetchPortsAndGroups();
    fetchBandwidthPorts();
  }, [expandedNeId, searchText, order, orderBy, page, total, orderBy, verified, order, searchTextNeElements, searchTextFeElements, searchText, fetchBandwidthPorts, fetchPortsAndGroups]);

  const handleGroupRowSelect = useCallback((newSelected: any[], groupId: string) => {
    setSelectedUnGroupId(groupId);
    setUnGroupSelected(newSelected);
  }, [setUnGroupSelected, setSelectedUnGroupId]);

  const handleCollapsibleGroupOpen = useCallback((groupId: string) => {
    setExpandedGroupIds(Array.from(new Set([...expandedGroupIds, groupId])));
  }, [setExpandedGroupIds, expandedGroupIds]);

  const handleCollapsibleGroupClose = useCallback((groupId: string) => {
    const newIds = expandedGroupIds.filter((item) => item !== groupId);
    setExpandedGroupIds(Array.from(new Set([...newIds])));
  }, [setExpandedGroupIds, expandedGroupIds]);

  const handleGroupClick = useCallback(() => {
    setAddGroupOpen(true);
  }, [setAddGroupOpen]);

  const hanldeGroupClose = useCallback((operation?: boolean) => {
    setEditGroupOpen(false);
    setAddGroupOpen(false);
    setPutForSaleOpen(false);
    handleClosePutupForSale();
    setEditGroupDetails({
      name: '',
      description: '',
      icon: '',
      id: '',
    });
    setGroupSelected([]);
    setUnGroupSelected([]);
    setSelectedUnGroupId('');
    if (operation) {
      fetchPortsAndGroups();
    }
  }, [setEditGroupOpen, setEditGroupDetails, setAddGroupOpen, setGroupSelected, setUnGroupSelected, setSelectedUnGroupId, fetchPortsAndGroups]);

  const handleUnGroupClick = useCallback(() => {
    setUnGroupLoading(true);
    const payload = {
      groupId: selectedUnGroupId,
      nrIds: unGroupedSelected.filter((item) => item.nrId !== -1).map((item) => item.nrId),
      purchasePortIds: unGroupedSelected.filter((item) => item.purchasePortId !== -1).map((item) => item.purchasePortId),
    };
    manageBandwidthService.unGroupNrs(payload)
      .then((response: any) => {
        toast.success(SuccessMessage.unGroupedSuccess, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
        setUnGroupLoading(false);
        setGroupSelected([]);
        setUnGroupSelected([]);
        setSelectedUnGroupId('');
        fetchPortsAndGroups();
      })
      .catch(() => {
        setUnGroupLoading(false);
      });
  }, [setUnGroupLoading, setGroupSelected, setUnGroupSelected, setSelectedUnGroupId, selectedUnGroupId, unGroupedSelected]);

  const hanldeEditGroupClick = useCallback((group: any) => {
    setEditGroupOpen(true);
    setEditGroupDetails({
      name: group.groupName,
      description: group.description,
      icon: group.icon,
      id: group.groupId,
    });
  }, [setEditGroupOpen, setEditGroupDetails]);

  const handlePutupForSaleClick = useCallback(() => {
    setLoading(true);
    if (saleEdit) {
      const payload: any = {
        serviceDescription,
        onContractPrice: onContractPrice && onContractSelected ? parseFloat(onContractPrice) : 0,
        onDemandPrice: onDemandSelected && onDemandPrice ? parseFloat(onDemandPrice) : 0,
      };

      manageBandwidthService.editSaleDetails(payload, selectedRowForSale.bandwidth_detail_id)
        .then(() => {
          setLoading(false);
          handleClosePutupForSale();
          const message = SuccessMessage.putForSaleEditSuccessForBandwidth;
          toast.success(message, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          fetchBandwidthPorts();
        })
        .catch((e: any) => {
          setLoading(false);
          if (e.errorCode === ErrorCodesMapping[1010]) {
            toast.error(ErrorCodeMessageMapping[1010], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
            fetchBandwidthPorts();
            handleClosePutupForSale();
          }
        });
    } else {
      const payload: any = {
        bdId: selectedRowForSale?.bandwidth_detail_id,
        serviceDescription,
        onContractPrice: onContractPrice && onContractSelected ? parseFloat(onContractPrice) : 0,
        onDemandPrice: onDemandSelected && onDemandPrice ? parseFloat(onDemandPrice) : 0,
      };

      manageBandwidthService.putUpBandwidthForSale(payload)
        .then(() => {
          setLoading(false);
          handleClosePutupForSale();
          const message = SuccessMessage.putBandwidthForSaleSuccess;
          toast.success(message, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          fetchBandwidthPorts();
        })
        .catch((e: any) => {
          setLoading(false);
        });
    }
  }, [serviceDescription, onDemandSelected, onContractSelected, onContractPrice, onDemandPrice, selectedRowForSale?.bandwidth_detail_id, setLoading, handleClosePutupForSale, fetchBandwidthPorts]);

  const handleSearchTextChanged = useCallback((searchText: string) => {
    setSearchText(searchText);
    setPage(1);
  }, [setSearchText, searchText, setPage]);

  const handlePutForSaleOpen = useCallback((port: any) => {
    setServiceDescription(port.bandwidth_description);
    setSelectedRowForSale(port);
    setPutForSaleOpen(true);
  }, [setPutForSaleOpen, setServiceDescription, setSelectedRowForSale, serviceDescription]);

  const headCellsData: HeadCellType[] = [

    {
      id: 'nne_name',
      align: 'left',
      disablePadding: false,
      sortEnabled: true,
      label: 'Nearend Network Elements',
      searchEnabled: true,
      width: '25%',
    },
    {
      id: 'nearend_port_description',
      align: 'left',
      disablePadding: false,
      sortEnabled: false,
      label: 'Nearend Port',
      width: '10%',
    },
    {
      id: 'bandwidth_description',
      align: 'left',
      disablePadding: false,
      sortEnabled: false,
      label: 'Bandwidth Description',
      width: '20%',
    },
    {
      id: 'fne_name',
      align: 'left',
      disablePadding: false,
      sortEnabled: true,
      searchEnabled: true,
      label: 'Farend Network Elements',
      width: '25%',
    },
    {
      id: 'farend_port_description',
      align: 'left',
      disablePadding: false,
      sortEnabled: false,
      label: 'Farend Port',
      width: '10%',
    },
    {
      id: 'action',
      align: 'left',
      disablePadding: false,
      sortEnabled: false,
      label: 'Action',
      width: '15%',
    },
  ];
  // useEffect(() => {
  //   fetchBandwidthPorts();
  // }, [page, total, orderBy, verified, order, searchTextNeElements, searchTextFeElements, searchText, fetchBandwidthPorts]);
  useEffect(() => {
    if (!verified) {
      fetchBandwidthPorts();
    }
  }, [verified]);

  useEffect(() => {
    if (verified) {
      fetchNetworkElements();
    }
  }, [verified]);

  const handleCancelSubscription = useCallback(
    (port: any) => {
      setCancelSubLoading(port.purchase_id);
      const payload : any = {
        purchaseId: port.purchase_id,
      };

      manageBandwidthService.cancelSubscription(payload)
        .then((response: any) => {
          toast.success(SuccessMessage.cancelSubscription, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          fetchBandwidthPorts();
          setCancelSubLoading('');
        })
        .catch((e: any) => {
          setCancelSubLoading('');
          if (e.errorCode === ErrorCodesMapping[1013]) {
            toast.error(ErrorCodeMessageMapping[1013], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
            fetchBandwidthPorts();
          }
        });
    },
    [setCancelSubLoading, fetchBandwidthPorts],
  );

  const handleRemoveClick = useCallback((port: any) => {
    setRemoveLoadingId(port.bandwidth_detail_id);

    const payload = {
      bdId: port.bandwidth_detail_id,
    };
    manageBandwidthService.removeFromMarketPlace(payload)
      .then((response: any) => {
        toast.success(SuccessMessage.removeFromMarketPlaceSuccessForBandwidth, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
        setRemoveLoadingId('');
        fetchBandwidthPorts();
      })
      .catch((e: any) => {
        setRemoveLoadingId('');
        if (e.errorCode === ErrorCodesMapping[1010]) {
          toast.error(ErrorCodeMessageMapping[1010], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
          fetchBandwidthPorts();
        }
      });
  }, [setRemoveLoadingId, fetchBandwidthPorts]);

  const handleSearchClose = useCallback((id: any) => {
    if (id === 'nne_name') {
      setSearchTextNeElements('');
    } else {
      setSearchTextFeElements('');
    }
  }, [setSearchTextNeElements, setSearchTextFeElements]);

  const handleRequestSearch = useCallback((e: any) => {
    if (e.target.name === 'nne_name') {
      setPage(1);
      setSearchTextNeElements(e.target.value);
    } else {
      setPage(1);
      setSearchTextFeElements(e.target.value);
    }
  }, [setSearchTextNeElements, setSearchTextFeElements]);

  if (loading) {
    rows = <LoadingRow colSpan={headCellsData.length + 1} />;
  } else if (total === 0) {
    rows = <EmptyRow text={TableConstants.noRecordsFound} colSpan={headCellsData.length + 1} />;
  } else {
    const bandwidthPortRows = bandwidthPorts.map((bandwidthPort: any, index) => {
      return (<TableData onCancelSubscription={handleCancelSubscription} cancelSubLoading={cancelSubLoading} onSaleEdit={handleSaleEdit} onRemoveClick={handleRemoveClick} removeLoadingId={removeLoadingId} key={bandwidthPort.bandwidth_detail_id} handlePutForSaleOpen={() => handlePutForSaleOpen(bandwidthPort)} bandwidthPort={bandwidthPort} />
      );
    });
    rows = <TableBody>{bandwidthPortRows}</TableBody>;
  }

  const totalPages = Math.ceil(total / TableConstants.perPage);

  const collapsibleContent = networkElements.map((ne: any, index: number) => {
    return <CollapsibleNe onSaleClick={handlePutForSaleOpen} onSaleEdit={handleSaleEdit} onRemoveClick={handleRemoveClick} removeLoadingId={removeLoadingId} key={index} open={!!(expandedNeId == ne.id)} ports={portsInNe} groups={groupsInNe} loading={portsGroupsLoading} selectedUnGroupId={selectedUnGroupId} order={order} orderBy={orderBy} selected={groupedSelected} unGroupedSelected={unGroupedSelected} id={ne.id} text={ne.ne_name} expandedGroupIds={expandedGroupIds} onCollapsibleNEClose={handleCollapsibleNEClose} onCollapsibleNEOpen={handleCollapsibleNEOpen} onRequestSort={handleRequestSort} onSelectRow={handleRowSelect} onGroupRowSelect={handleGroupRowSelect} onCollapsibleGroupOpen={handleCollapsibleGroupOpen} onCollapsibleGroupClose={handleCollapsibleGroupClose} onEditGroupClick={hanldeEditGroupClick} />;
  });

  return (
    <>
      {
        !verified
          ? (
            <ValidationLayout
              title="Manage Bandwidth"
              table={(
                <BandwidthTable
                  bandwidthPorts={bandwidthPorts}
                  onRequestSort={handleRequestSort}
                  onRequestSearch={handleRequestSearch}
                  onSearchClose={handleSearchClose}
                  rows={rows}
                  totalPages={totalPages}
                  selected={selected}
                  headCellsData={headCellsData}
                  page={page}
                  order={order}
                  orderBy={orderBy}
                  onPageChange={handlePageChange}
                />
              )}
              isPortView
              verified={verified}
              onPortViewChange={handlePortViewChange}
              isSearchSection
              onSearchChanges={handleSearchTextChanged}
            />
          )
          : (
            <ValidationLayout
              title="Manage Bandwidth"
              table={collapsibleContent}
              isPortView
              verified={verified}
              onSearchChanges={handleSearchTextChanged}
              onPortViewChange={handlePortViewChange}
              isSearchSection
              unGroupLoading={unGroupLoading}
              unGroupedSelected={unGroupedSelected}
              groupLoading={groupLoading}
              groupedSelected={groupedSelected}
              onGroupClick={handleGroupClick}
              onUnGroupClick={handleUnGroupClick}
            />
          )
      }
      <GroupOperation open={addGroupOpen || editGroupOpen} existingGroupOptions={existingGroupOptions} expandedNeId={expandedNeId} groupedSelected={groupedSelected} onClose={hanldeGroupClose} edit={editGroupOpen} groupId={editGroupDetails.id} name={editGroupDetails.name} description={editGroupDetails.description} icon={editGroupDetails.icon} />

      <SaleDrawer
        saleTouched={saleTouched}
        aggrementAccepted={saleAggrementAccepted}
        onAcceptAggrement={handleAcceptAggredTermsClick}
        onAggredTermsClick={handleTermsOpenClick}
        edit={saleEdit}
        type={type}
        isDBPrice={isDBPrice}
        loading={loading}
        selectedRowSale={selectedRowForSale}
        open={putForSaleOpen}
        onClose={handleClosePutupForSale}
        onContractSelected={onContractSelected}
        onDemandSelected={onDemandSelected}
        onContractPrice={onContractPrice}
        onDemandPrice={onDemandPrice}
        serviceDescription={serviceDescription}
        handleServiceDescription={handleServiceDescription}
        handleOnContractPriceChange={handleOnContractPriceChange}
        handleOnDemandPriceChange={handleOnDemandPriceChange}
        handlePutupForSaleClick={handlePutupForSaleClick}
        handleOnContractSelected={handleOnContractSelected}
        handleOnDemandSelected={handleOnDemandSelected}
      />
      <PdfViewer open={pdfViewerOpen} onClose={handleTermsCloseClick} aggrementType={aggrementTypeInfo.type} url={aggrementTypeInfo.url} />
    </>
  );
};

export default ManageBandwidth;
