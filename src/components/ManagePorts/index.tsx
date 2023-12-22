import React, { useCallback, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ValidationLayout from '../AdminValidations';
import CollapsibleNe from './Collapsible';
import AddPortService from '../../services/addPort.service';
import ManagePortsService from '../../services/managePorts.service';
import { SortOrder } from '../../enums';
import GroupOperation from './GroupOperations';
import SuccessInfoIcon from '../../assets/images/success-toast-checkmark-icon.svg';
import GroupIconGlobe from '../../assets/images/group-icon-globe.svg';
import GroupIconCloud from '../../assets/images/group-icon-cloud.svg';
import TypeNetworkServicesIcon from '../../assets/images/type-icon-network-services.svg';
import ErrorInfoIcon from '../../assets/images/error-info-icon.svg';
import {
  ErrorCodeMessageMapping, ErrorCodesMapping, MY_SELLER_BUCKET_PRE_URL, SuccessMessage, TERMS_DEFAULT_FILE,
} from '../../utils/apiConstants';
import SaleDrawer from './Table/PutUpForSale';
import PdfViewer from '../PdfViewer';

const TypeOption = [{
  label: 'Internet',
  value: 'Internet',
  icon: GroupIconGlobe,
}, {
  label: 'Cloud',
  value: 'Cloud',
  icon: GroupIconCloud,
}, {
  label: 'Network Services',
  value: 'Network Services',
  icon: TypeNetworkServicesIcon,
}];

const ManagePorts: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [removeLoadingId, setRemoveLoadingId] = useState<string>('');
  const [networkElements, setNetworkElements] = useState<any[]>([]);
  const [existingGroupOptions, setExistingGroupOptions] = useState<any[]>([]);
  const [groupedSelected, setGroupSelected] = useState<any[]>([]);
  const [unGroupedSelected, setUnGroupSelected] = useState<any[]>([]);
  const [selectedUnGroupId, setSelectedUnGroupId] = useState<string>('');
  const [order, setOrder] = useState<SortOrder>(SortOrder.asc);
  const [orderBy, setOrderBy] = useState<string>('description');
  const [expandedNeId, setExpandedNeId] = useState<string>('');
  const [portsGroupsLoading, setPortsGroupsLoading] = useState<boolean>(false);
  const [groupLoading, setGroupLoading] = useState<boolean>(false);
  const [unGroupLoading, setUnGroupLoading] = useState<boolean>(false);
  const [portsInNe, setPortsInNe] = useState<any[]>([]);
  const [groupsInNe, setGroupsInNe] = useState<any[]>([]);
  const [expandedGroupIds, setExpandedGroupIds] = useState<string[]>([]);
  const [addGroupOpen, setAddGroupOpen] = useState<boolean>(false);
  const [putForSaleOpen, setPutForSaleOpen] = useState<boolean>(false);
  const [selectedRowForSale, setSelectedRowForSale] = useState<any>();
  const [editGroupOpen, setEditGroupOpen] = useState<boolean>(false);
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
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelSubLoading, setCancelSubLoading] = useState<string>('');
  const [serviceDescription, setServiceDescription] = useState<string>('');
  const [onContractSelected, setOnContractSelected] = useState<boolean>(false);
  const [onDemandSelected, setOnDemandSelected] = useState<boolean>(false);
  const [onContractPrice, setOnContractPrice] = useState<string>('');
  const [onDemandPrice, setOnDemandPrice] = useState<string>('');
  const [isDBPrice, setDBPrice] = useState<{
    onDemand: boolean,
    onContract: boolean
  }>({
    onDemand: false,
    onContract: false,
  });
  const [type, setType] = useState<string>(TypeOption[0].value);
  const [saleEdit, setSaleEdit] = useState<boolean>(false);
  const [saleTouched, setSaleTouched] = useState<boolean>(false);
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

  const handleServiceDescription = useCallback((e) => {
    setServiceDescription(e.target.value);
    setSaleTouched(true);
  }, [setServiceDescription, setSaleTouched]);

  const handleTypeChange = useCallback((value: any) => {
    setType(value);
    setSaleTouched(true);
  }, [setType, setSaleTouched]);

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

  const handleClosePutupForSale = useCallback(() => {
    setServiceDescription('');
    setPutForSaleOpen(false);
    setOnContractSelected(false);
    setOnDemandSelected(false);
    setOnDemandPrice('');
    setDBPrice({
      onDemand: false,
      onContract: false,
    });
    setOnContractPrice('');
    setType(TypeOption[0].value);
    setSaleEdit(false);
    setSaleTouched(false);
    setSaleAggrementAccepted({
      on_contract: false,
      on_demand: false,
    });
    setAggrementTypeInfo({
      type: '',
      url: '',
    });
  }, [setServiceDescription, setPutForSaleOpen, setOnContractSelected, setOnDemandSelected, setOnDemandPrice, setDBPrice, setOnContractPrice, setType, setSaleEdit, setSaleTouched, setSaleAggrementAccepted, setAggrementTypeInfo]);

  const hanldeEditGroupClick = useCallback((group: any) => {
    setEditGroupOpen(true);
    setEditGroupDetails({
      name: group.groupName,
      description: group.description,
      icon: group.icon,
      id: group.groupId,
    });
  }, [setEditGroupOpen, setEditGroupDetails]);

  const handleCollapsibleGroupOpen = useCallback((groupId: string) => {
    setExpandedGroupIds(Array.from(new Set([...expandedGroupIds, groupId])));
  }, [setExpandedGroupIds, expandedGroupIds]);

  const handleCollapsibleGroupClose = useCallback((groupId: string) => {
    const newIds = expandedGroupIds.filter((item) => item !== groupId);
    setExpandedGroupIds(Array.from(new Set([...newIds])));
  }, [setExpandedGroupIds, expandedGroupIds]);

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
      ManagePortsService.getPortsAndGroups(expandedNeId, searchText, orderBy, order.toUpperCase())
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

      // ManagePortsService.getAllGroupsByNEid(expandedNeId)
      //   .then((response: any) => {
      //     setExistingGroupOptions(response.data || []);
      //   })
      //   .catch(() => {
      //     setExistingGroupOptions([]);
      //   });
    }
  }, [expandedNeId, searchText, order, orderBy, setPortsGroupsLoading, setPortsInNe, setGroupsInNe, setExistingGroupOptions]);

  const handlePutupForSaleClick = useCallback(() => {
    setLoading(true);
    if (saleEdit) {
      const payload: any = {
        serviceDescription,
        onContractPrice: onContractPrice && onContractSelected ? parseFloat(onContractPrice) : 0,
        onDemandPrice: onDemandSelected && onDemandPrice ? parseFloat(onDemandPrice) : 0,
        type,
      };

      ManagePortsService.editSaleDetails(payload, selectedRowForSale.vportId)
        .then(() => {
          setLoading(false);
          handleClosePutupForSale();
          const message = SuccessMessage.putForSaleEditSuccess.replace('PORTNAME', selectedRowForSale.port_name);
          toast.success(message, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          fetchPortsAndGroups();
        })
        .catch((e: any) => {
          setLoading(false);
          if (e.errorCode === ErrorCodesMapping[1010]) {
            toast.error(ErrorCodeMessageMapping[1010], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
            fetchPortsAndGroups();
            handleClosePutupForSale();
          }
        });
    } else {
      const payload: any = {
        neId: parseInt(expandedNeId),
        serviceDescription,
        physicalPortIds: [selectedRowForSale?.nr_id],
        onContractPrice: onContractPrice && onContractSelected ? parseFloat(onContractPrice) : 0,
        onDemandPrice: onDemandSelected && onDemandPrice ? parseFloat(onDemandPrice) : 0,
        type,
      };

      ManagePortsService.putUpForSale(payload)
        .then(() => {
          setLoading(false);
          handleClosePutupForSale();
          const message = SuccessMessage.putForSaleSingleSuccess;
          toast.success(message, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          fetchPortsAndGroups();
        })
        .catch((e: any) => {
          setLoading(false);
          if (e.errorCode === ErrorCodesMapping[1014]) {
            toast.error(ErrorCodeMessageMapping[1014], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
            fetchPortsAndGroups();
            handleClosePutupForSale();
          }
        });
    }
  }, [saleEdit, serviceDescription, onDemandSelected, onContractSelected, onContractPrice, onDemandPrice, selectedRowForSale?.nr_id, expandedNeId, type, setLoading, handleClosePutupForSale, fetchPortsAndGroups]);

  useEffect(() => {
    fetchNetworkElements();
  }, [fetchNetworkElements]);

  useEffect(() => {
    fetchPortsAndGroups();
  }, [expandedNeId, searchText, order, orderBy]);

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
  }, [setEditGroupOpen, setEditGroupDetails, setAddGroupOpen, fetchPortsAndGroups, setGroupSelected, setUnGroupSelected, setSelectedUnGroupId]);

  const handleSearchTextChanged = useCallback((searchText: string) => {
    setSearchText(searchText);
  }, [setSearchText]);

  const handleCollapsibleNEOpen = useCallback((neId: string) => {
    setExpandedNeId(neId);
    setGroupSelected([]);
    setUnGroupSelected([]);
    setSelectedUnGroupId('');
    setOrder(SortOrder.asc);
    setOrderBy('description');
    setExpandedGroupIds([]);
  }, [setExpandedNeId, setGroupSelected, setUnGroupSelected, setSelectedUnGroupId, setOrderBy, setOrder, setExpandedGroupIds]);

  const handleCollapsibleNEClose = useCallback(() => {
    setExpandedNeId('');
  }, [setExpandedNeId]);

  const handleRequestSort = useCallback(
    (property: string, nextSortOrder: SortOrder) => {
      setOrder(nextSortOrder);
      setOrderBy(property);
    },
    [orderBy, order],
  );

  const handlePutForSaleOpen = useCallback((port: any) => {
    setSelectedRowForSale(port);
    setPutForSaleOpen(true);
  }, [setPutForSaleOpen]);

  const handleCancelSubscription = useCallback(
    (port: any) => {
      setCancelSubLoading(port.pportId);
      const payload : any = {
        pportId: port.pportId,
      };

      ManagePortsService.cancelSubscription(payload)
        .then((response: any) => {
          toast.success(SuccessMessage.cancelSubscription, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          fetchPortsAndGroups();
          setCancelSubLoading('');
        })
        .catch((e: any) => {
          setCancelSubLoading('');
          if (e.errorCode === ErrorCodesMapping[1012]) {
            toast.error(ErrorCodeMessageMapping[1012], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
            fetchPortsAndGroups();
          }
        });
    },
    [setCancelSubLoading, fetchPortsAndGroups],
  );

  const handleSaleEdit = useCallback((port: any) => {
    setSelectedRowForSale(port);
    setPutForSaleOpen(true);
    setServiceDescription(port.service_description);
    setOnContractSelected(!!port.onContractPrice);
    setOnDemandSelected(!!port.onDemandPrice);
    setOnDemandPrice(port.onDemandPrice);
    setDBPrice({
      onContract: !!port.onContractPrice,
      onDemand: !!port.onDemandPrice,
    });
    setSaleAggrementAccepted({
      on_contract: !!port.onContractPrice,
      on_demand: !!port.onDemandPrice,
    });
    setOnContractPrice(port.onContractPrice);
    setType(port.type);
    setSaleEdit(true);
  }, [type, setPutForSaleOpen, setSelectedRowForSale, setServiceDescription, setSaleAggrementAccepted, setOnContractSelected, setOnDemandSelected, setDBPrice, setOnDemandPrice, setOnContractPrice, setType, setSaleEdit]);

  const handleRowSelect = useCallback((newSelected: any[]) => {
    setGroupSelected(newSelected);
  }, [setGroupSelected]);

  const handleGroupRowSelect = useCallback((newSelected: any[], groupId: string) => {
    setSelectedUnGroupId(groupId);
    setUnGroupSelected(newSelected);
  }, [setUnGroupSelected, setSelectedUnGroupId]);

  const handleGroupClick = useCallback(() => {
    setAddGroupOpen(true);
  }, [setAddGroupOpen]);

  const handleUnGroupClick = useCallback(() => {
    setUnGroupLoading(true);

    const payload = {
      groupId: selectedUnGroupId,
      nrIds: unGroupedSelected.filter((item) => item.nrId !== -1).map((item) => item.nrId),
      purchasePortIds: unGroupedSelected.filter((item) => item.purchasePortId !== -1).map((item) => item.purchasePortId),
    };
    ManagePortsService.unGroupNrs(payload)
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
  }, [setUnGroupLoading, fetchPortsAndGroups, setGroupSelected, setUnGroupSelected, setSelectedUnGroupId, selectedUnGroupId, unGroupedSelected]);

  const handleRemoveClick = useCallback((port: any) => {
    setRemoveLoadingId(port.vportId);

    const payload = {
      nrId: port.vportId,
    };
    ManagePortsService.removeFromMarketPlace(payload)
      .then((response: any) => {
        toast.success(SuccessMessage.removeFromMarketPlaceSuccess, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
        setRemoveLoadingId('');
        fetchPortsAndGroups();
      })
      .catch((e: any) => {
        setRemoveLoadingId('');
        if (e.errorCode === ErrorCodesMapping[1010]) {
          toast.error(ErrorCodeMessageMapping[1010], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
          fetchPortsAndGroups();
        }
      });
  }, [setRemoveLoadingId, fetchPortsAndGroups]);

  const collapsibleContent = networkElements.map((ne: any, index: number) => {
    return <CollapsibleNe onCancelSubscription={handleCancelSubscription} onSaleClick={handlePutForSaleOpen} onSaleEdit={handleSaleEdit} onRemoveClick={handleRemoveClick} cancelSubLoading={cancelSubLoading} removeLoadingId={removeLoadingId} key={index} open={!!(expandedNeId == ne.id)} ports={portsInNe} groups={groupsInNe} loading={portsGroupsLoading} selectedUnGroupId={selectedUnGroupId} order={order} orderBy={orderBy} selected={groupedSelected} unGroupedSelected={unGroupedSelected} id={ne.id} text={ne.ne_name} expandedGroupIds={expandedGroupIds} onCollapsibleNEClose={handleCollapsibleNEClose} onCollapsibleNEOpen={handleCollapsibleNEOpen} onRequestSort={handleRequestSort} onSelectRow={handleRowSelect} onGroupRowSelect={handleGroupRowSelect} onCollapsibleGroupOpen={handleCollapsibleGroupOpen} onCollapsibleGroupClose={handleCollapsibleGroupClose} onEditGroupClick={hanldeEditGroupClick} />;
  });

  return (
    <>
      <ValidationLayout
        title="Manage Ports"
        table={collapsibleContent}
        onSearchChanges={handleSearchTextChanged}
        isGroupedSection
        isSearchSection
        unGroupLoading={unGroupLoading}
        unGroupedSelected={unGroupedSelected}
        groupLoading={groupLoading}
        groupedSelected={groupedSelected}
        onGroupClick={handleGroupClick}
        onUnGroupClick={handleUnGroupClick}
      />
      <GroupOperation open={addGroupOpen || editGroupOpen} existingGroupOptions={existingGroupOptions} expandedNeId={expandedNeId} groupedSelected={groupedSelected} onClose={hanldeGroupClose} edit={editGroupOpen} groupId={editGroupDetails.id} name={editGroupDetails.name} description={editGroupDetails.description} icon={editGroupDetails.icon} />
      <SaleDrawer
        edit={saleEdit}
        isDBPrice={isDBPrice}
        saleTouched={saleTouched}
        typeOptions={TypeOption}
        type={type}
        aggrementAccepted={saleAggrementAccepted}
        onAcceptAggrement={handleAcceptAggredTermsClick}
        onAggredTermsClick={handleTermsOpenClick}
        onTypeChange={handleTypeChange}
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

export default ManagePorts;
