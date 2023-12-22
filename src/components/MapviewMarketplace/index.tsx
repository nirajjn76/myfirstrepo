import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import ValidationLayout from '../AdminValidations/index';
import MapRoot from './MapRoot';
import Drawer from './Drawer';
import { PURCHASE_PORT_CHARGE_PER_MONTH, YearDaysForCalculation } from '../../utils/appConstants';
import {
  SuccessMessage, ErrorCodeMessageMapping, ErrorCodesMapping, MY_SELLER_BUCKET_PRE_URL, TERMS_DEFAULT_FILE,
} from '../../utils/apiConstants';
import PdfViewer from '../PdfViewer';
import PurchaseBandwidthDrawer from '../BandwidthMarketplace/PurchaseBandwidth';
import bandwidthMarketplaceService from '../../services/bandwidthMarketplace.service';
import AddPortService from '../../services/addPort.service';
import SuccessInfoIcon from '../../assets/images/success-toast-checkmark-icon.svg';
import ErrorInfoIcon from '../../assets/images/error-info-icon.svg';
import { SortOrder } from '../../enums';

const listFilterOptions = [{ label: 'Both', value: 'both' }, { label: 'On Contract', value: 'onContract' }, { label: 'On Demand', value: 'onDemand' }];

const MapViewMarketPlace: React.FC = () => {
  const [drawerContent, setDrawerContent] = useState<'list' | 'purchase' | ''>('');
  const [networkElements, setNetworkElements] = useState<any[]>([]);
  const [search, setSearch] = useState<{
    feText: string,
    neText: string,
    listSearchText: string;
  }>({
    feText: '',
    neText: '',
    listSearchText: '',
  });
  const [values, setValues] = useState<any>({});
  const [selectedRowForPurchase, setSelectedRowForPurchase] = useState<any>();
  const [onContractPrice, setOnContractPrice] = useState<string>('');
  const [onDemandPrice, setOnDemandPrice] = useState<string>('');
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [onContractSelected, setOnContractSelected] = useState<boolean>(false);
  const [aggrementTypeInfo, setAggrementTypeInfo] = useState<{
    type: string,
    url: string
  }>({
    type: '',
    url: '',
  });
  const [agreementSelected, setAgreementSelected] = useState<{
    on_contract: boolean,
    on_demand: boolean
  }>({
    on_contract: false,
    on_demand: false,
  });
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [listFilter, setListFilter] = useState<string>('both');
  const [onDemandSelected, setOnDemandSelected] = useState<boolean>(false);
  const [bandwidthPorts, setBandwidthPorts] = useState<any[]>([]);
  const [nodeIds, setNodeIds] = useState<any[]>([]);
  const [neNames, setNeNames] = useState<{
    nneName: string,
    fneName: string
  }>({
    nneName: '',
    fneName: '',
  });
  const [data, setData] = useState<any[]>([]);

  const onFilterChange = useCallback((value: string) => {
    setListFilter(value);
  }, [setListFilter]);

  const fetchBandwidthForMarketPlace = useCallback(() => {
    const payload = {
      mapView: true,
      searchNneName: search.neText,
      searchFneName: search.feText,
      sortField: 'service_description',
      sortDirection: SortOrder.asc.toUpperCase(),
      page: 1,
      pageSize: 10,
    };

    bandwidthMarketplaceService.getAllbandwidthMarketplace(payload)
      .then((response: any) => {
        setBandwidthPorts(response?.data ?? []);
      })
      .catch(() => {
        setBandwidthPorts([]);
      });
  }, [setLoading, setBandwidthPorts, search.neText, search.feText]);

  const getBandwidthListForMap = useCallback(() => {
    setLoading(true);
    const payload = {
      nodeIds,
      searchText: search.listSearchText,
      filter: listFilter,
    };

    bandwidthMarketplaceService.getBandwidthListForMap(payload)
      .then((response: any) => {
        setLoading(false);
        setData(response?.data ?? []);
      })
      .catch(() => {
        setLoading(false);
        setData([]);
      });
  }, [listFilter, nodeIds, search.listSearchText, setLoading]);

  useEffect(() => {
    getBandwidthListForMap();
  }, [listFilter, nodeIds, search.listSearchText]);

  const fetchNetworkElements = useCallback(() => {
    AddPortService.getNetworkElements()
      .then((response: any) => {
        setNetworkElements(response.data || []);
        fetchBandwidthForMarketPlace();
      })
      .catch(() => {
        setNetworkElements([]);
      });
  }, [setNetworkElements, search.neText, search.feText]);

  useEffect(() => {
    fetchNetworkElements();
  }, [fetchNetworkElements]);

  useEffect(() => {
    fetchNetworkElements();
  }, [search.neText, search.feText]);

  const onBandwidthClick = useCallback((neId: string, feId: string) => {
    setDrawerContent('list');
    setNodeIds([neId, feId]);
    const nne = networkElements.find((item) => item.id === neId);
    const fne = networkElements.find((item) => item.id === feId);
    setNeNames({
      nneName: nne.ne_name,
      fneName: fne.ne_name,
    });
  }, [setDrawerContent, setNodeIds, getBandwidthListForMap, networkElements]);

  const onBandwidthListClose = useCallback(() => {
    setDrawerContent('');
    setListFilter('both');
    setSearch((prev) => {
      return {
        ...prev,
        listSearchText: '',
      };
    });
    setValues({});
    setOnContractSelected(false);
    setSelectedPrice('');
    setAgreementSelected({
      on_contract: false,
      on_demand: false,
    });
    setAggrementTypeInfo({
      type: '',
      url: '',
    });
    setOnDemandSelected(false);
    setOnDemandPrice('');
    setOnContractPrice('');
  }, [setDrawerContent, setValues, values, setListFilter, setSelectedPrice, setSearch, setOnContractSelected, setAgreementSelected, setAggrementTypeInfo, setOnDemandSelected, setOnDemandPrice, setOnContractPrice]);

  const setInitVals = useCallback(
    (port : any) => {
      setValues({
        nePortName: port.near_port_name,
        neServiceDescription: port.near_port_description,
        fePortName: port.far_port_name,
        feServiceDescription: port.far_port_description,
        organization: port.organization_name,
        bandwidthDescription: port.service_description,
      });
    },
    [setValues, values],
  );

  const handlePurchaseOpen = useCallback((port: any) => {
    setInitVals(port);
    const onDemandPerMonth = port.on_demand_price ? ((parseFloat(port.on_demand_price) / 100) * ((60 * 24 * YearDaysForCalculation) / 12) + (PURCHASE_PORT_CHARGE_PER_MONTH * 2)).toFixed(2) : '0';
    const onDemandPerMinute = onDemandPerMonth ? ((parseFloat(onDemandPerMonth) * 100 * 12) / (YearDaysForCalculation * 24 * 60)).toFixed(2) : '0';

    setOnContractPrice((port.on_contract_price + (PURCHASE_PORT_CHARGE_PER_MONTH * 2)).toString());
    setOnDemandPrice(onDemandPerMinute);
    setSelectedRowForPurchase(port);
    setDrawerContent('purchase');
  }, [setDrawerContent, setOnContractPrice, setOnDemandPrice, setSelectedRowForPurchase]);

  const onDrawerContentChange = useCallback((content: 'list' | 'purchase', bandwidth?: any) => {
    setDrawerContent(content);
    if (content === 'purchase') {
      handlePurchaseOpen(bandwidth);
    }
    setSelectedPrice('');
    setOnContractSelected(false);
    setOnDemandSelected(false);
    setAgreementSelected({
      on_contract: false,
      on_demand: false,
    });
  }, [setDrawerContent, handlePurchaseOpen, setSelectedPrice, setOnContractSelected, setOnDemandSelected, setAgreementSelected]);

  const handleSearchChanges = useCallback((field: 'fe' | 'ne', e: any) => {
    if (field === 'fe') {
      setSearch((prev) => {
        return {
          ...prev,
          feText: e.target.value.trim(),
        };
      });
    } else if (field === 'ne') {
      setSearch((prev) => {
        return {
          ...prev,
          neText: e.target.value.trim(),
        };
      });
    }
  }, [setSearch]);

  const handleListSearchChanges = useCallback((e: any) => {
    setSearch((prev) => {
      return {
        ...prev,
        listSearchText: e.target.value.trim(),
      };
    });
  }, [setSearch, nodeIds]);

  const handleSelectedPriceChange = useCallback((selectedPrice: string) => {
    setSelectedPrice((prev: string) => {
      if (prev === selectedPrice) {
        return '';
      }
      return selectedPrice;
    });
    setAgreementSelected((prev) => {
      return {
        on_demand: false,
        on_contract: false,
      };
    });
  }, [setSelectedPrice, setAgreementSelected]);

  const handleTermsOpenClick = useCallback((type: string) => {
    setPdfViewerOpen(true);

    const fileName = type === 'on_contract' ? selectedRowForPurchase.terms_on_contract_url : selectedRowForPurchase.terms_on_demand_url;
    setAggrementTypeInfo((prev) => {
      return {
        type,
        url: fileName ? MY_SELLER_BUCKET_PRE_URL + fileName : MY_SELLER_BUCKET_PRE_URL + TERMS_DEFAULT_FILE,
      };
    });
  }, [setPdfViewerOpen, setAggrementTypeInfo, selectedRowForPurchase]);

  const handleTermsCloseClick = useCallback((agrred?: boolean, aggrementType?: string) => {
    setPdfViewerOpen(false);
    agrred && aggrementType && setAgreementSelected((prev) => {
      return {
        ...prev,
        [aggrementType]: agrred,
      };
    });
  }, [setPdfViewerOpen, setAgreementSelected]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }, [setValues, values]);

  const handlePurchaseClick = useCallback(() => {
    setLoading(true);
    const payload: any = {
      bandwidthDetailId: selectedRowForPurchase?.id,
      nneId: selectedRowForPurchase?.nne_id,
      nearPortName: values.nePortName,
      nearPortDescription: values.neServiceDescription,
      fneId: selectedRowForPurchase?.fne_id,
      farPortName: values.fePortName,
      farPortDescription: values.feServiceDescription,
      price: selectedPrice === 'on_demand' ? onDemandPrice : onContractPrice,
      priceType: selectedPrice,
      serviceDescription: values.bandwidthDescription,

    };
    bandwidthMarketplaceService.purchaseBandwidth(payload)
      .then(() => {
        setLoading(false);
        onBandwidthListClose();
        const message = SuccessMessage.purchaseBandwidthSuccess;
        toast.success(message, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
        fetchNetworkElements();
      })
      .catch((e: any) => {
        setLoading(false);
        if (e.errorCode === ErrorCodesMapping[1007]) {
          toast.error(ErrorCodeMessageMapping[1007], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
        }
      });
  }, [values, selectedPrice, onDemandSelected, onContractSelected, agreementSelected, onContractPrice, onDemandPrice, selectedRowForPurchase?.bandwidth_detail_id, setLoading, onBandwidthListClose, fetchNetworkElements]);

  const handleAgreementSelected = useCallback(
    () => {
      // setAgreementSelected((prev) => !prev);
    },
    [setAgreementSelected],
  );

  return (
    <div>
      <ValidationLayout
        title="Mapview Marketplace"
        table={(
          <MapRoot onBandwidthClick={onBandwidthClick} onSearchChange={handleSearchChanges} networkElements={networkElements} bandwidthPorts={bandwidthPorts} nodeIds={nodeIds} />
        )}
        isMarketplace
        isMapview
        onSearchChanges={() => { }}
      />
      <Drawer
        open={drawerContent === 'list'}
        onClose={onBandwidthListClose}
        data={data}
        onFilterChange={onFilterChange}
        listOptions={listFilterOptions}
        filter={listFilter}
        drawerContent={drawerContent}
        onDrawerContentChange={onDrawerContentChange}
        onSearchChange={handleListSearchChanges}
        searchText={search.listSearchText}
        neNames={neNames}
        loading={loading}
      />
      <PurchaseBandwidthDrawer
        loading={loading}
        mapView
        onBackToListClick={() => onDrawerContentChange('list')}
        selectedRowForPurchase={selectedRowForPurchase}
        open={drawerContent === 'purchase'}
        onClose={onBandwidthListClose}
        agreementSelected={agreementSelected}
        onContractSelected={onContractSelected}
        onDemandSelected={onDemandSelected}
        onContractPrice={onContractPrice}
        onDemandPrice={onDemandPrice}
        values={values}
        selectedPrice={selectedPrice}
        onSelectedPriceChange={handleSelectedPriceChange}
        onAggredTermsClick={handleTermsOpenClick}
        handleInputChange={handleInputChange}
        handlePurchaseClick={handlePurchaseClick}
        handleAgreementSelected={handleAgreementSelected}
      />
      <PdfViewer open={pdfViewerOpen} onClose={handleTermsCloseClick} aggrementType={aggrementTypeInfo.type} url={aggrementTypeInfo.url} />
    </div>
  );
};

export default MapViewMarketPlace;
