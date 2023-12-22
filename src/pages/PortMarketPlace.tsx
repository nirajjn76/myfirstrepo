import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import ValidationLayout from '../components/AdminValidations';
import Ports from '../components/MarketPlacePorts';
import PurchasePortDrawer from '../components/MarketPlacePorts/PurchasePort';
import PdfViewer from '../components/PdfViewer';
import MarketPlacePortsService from '../services/ports.marketplace.service';
import SuccessInfoIcon from '../assets/images/success-toast-checkmark-icon.svg';
import ErrorInfoIcon from '../assets/images/error-info-icon.svg';
import { SortOrder } from '../enums';
import {
  TableConstants, PURCHASE_PORT_CHARGE_PER_MONTH, YearDaysForCalculation, priceFilterDropdown,
} from '../utils/appConstants';
import {
  ErrorCodeMessageMapping, ErrorCodesMapping, MY_SELLER_BUCKET_PRE_URL, SuccessMessage, TERMS_DEFAULT_FILE,
} from '../utils/apiConstants';

const PortVerification: React.FC = () => {
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [ports, setPorts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<SortOrder>(SortOrder.asc);
  const [orderBy, setOrderBy] = useState<string>('ne_name');
  const [portOnContractPrice, setPortOnContractPrice] = useState<string>('0');
  const [portOnDemandPrice, setPortOnDemandPrice] = useState<string>('0');
  const [open, setOpen] = useState<boolean>(false);
  const [saleLoading, setSaleLoading] = useState<boolean>(false);
  const [salePortName, setSalePortName] = useState<string>('');
  const [salePortDescription, setSalePortDescription] = useState<string>('');
  const [saleSelectedPrice, setSaleSelectedPrice] = useState<string>('');
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
  const [salePortInfo, setSalePortInfo] = useState<any>({});
  const [priceFilterValue, setPriceFilterValue] = useState<string>(priceFilterDropdown[0].value);
  const handlePurchaseDrawerClose = useCallback(() => {
    setOpen(false);
    setSalePortName('');
    setSalePortDescription('');
    setSaleSelectedPrice('');
    setSaleAggrementAccepted({
      on_contract: false,
      on_demand: false,
    });
    setAggrementTypeInfo({
      type: '',
      url: '',
    });
    setSalePortInfo({});
  }, [setOpen, setSalePortName, setSalePortDescription, setSaleSelectedPrice, setSaleAggrementAccepted, setSalePortInfo, setAggrementTypeInfo]);

  const fetchPortsForMarketPlace = useCallback(() => {
    setLoading(true);

    const payload = {
      sortField: orderBy,
      sortDirection: order.toUpperCase(),
      page,
      pageSize: TableConstants.perPage,
      filter: priceFilterValue,
      searchText,
    };

    MarketPlacePortsService.getPortsInMarketPlace(payload)
      .then((response: any) => {
        setLoading(false);
        setPorts(response?.data ?? []);
        setTotal(response?.pagination?.totalRecords ?? 0);
      })
      .catch(() => {
        setLoading(false);
        setPorts([]);
        setTotal(0);
      });
  }, [orderBy, order, page, searchText, priceFilterValue, setLoading, setPorts, setTotal]);

  const handleSearchTextChanged = useCallback((searchText: string) => {
    setSearchText(searchText);
    setPage(1);
  }, [setSearchText, setPage]);

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, [setPage]);

  const handleSalePortNameChanged = useCallback((e: any) => {
    setSalePortName(e.target.value);
  }, [setSalePortName]);

  const handleSalePortDescriptionChanged = useCallback((e: any) => {
    setSalePortDescription(e.target.value);
  }, [setSalePortDescription]);

  const handleSelectedPriceChange = useCallback((selectedPrice: string) => {
    setSaleSelectedPrice((prev: string) => {
      if (prev === selectedPrice) {
        return '';
      }
      return selectedPrice;
    });
    setSaleAggrementAccepted((prev) => {
      return {
        on_demand: false,
        on_contract: false,
      };
    });
  }, [setSaleSelectedPrice, setSaleAggrementAccepted]);

  const handleAcceptAggredTermsClick = useCallback(() => {
    // setSaleAggrementAccepted((prev) => !prev);
  }, [setSaleAggrementAccepted]);

  const handleRequestSort = useCallback(
    (property: string, nextSortOrder: SortOrder) => {
      setOrder(nextSortOrder);
      setOrderBy(property);
    },
    [orderBy, order],
  );

  const handleAggredTermsClick = useCallback((port: any) => {
    // Open drawer
    const onDemandPerMonth = port.on_demand_price ? ((parseFloat(port.on_demand_price) / 100) * ((60 * 24 * YearDaysForCalculation) / 12) + PURCHASE_PORT_CHARGE_PER_MONTH).toFixed(2) : '0';
    const onDemandPerMinute = onDemandPerMonth ? ((parseFloat(onDemandPerMonth) * 100 * 12) / (YearDaysForCalculation * 24 * 60)) : '0';
    setOpen(true);
    setPortOnContractPrice((port.on_contract_price + PURCHASE_PORT_CHARGE_PER_MONTH).toString());
    setPortOnDemandPrice(onDemandPerMinute.toString());
    setSalePortName(port.port_name);
    setSalePortDescription(port.port_description);
    setSalePortInfo(port);
  }, [setOpen, setSalePortName, setSalePortDescription, setSalePortInfo, setPortOnContractPrice, setPortOnDemandPrice]);

  const handleSaleClick = useCallback(() => {
    setSaleLoading(true);

    const payload = {
      vportId: salePortInfo.id,
      portDescription: salePortDescription,
      portName: salePortName,
      price: saleSelectedPrice === 'on_demand' ? portOnDemandPrice : portOnContractPrice,
      priceType: saleSelectedPrice,
      neId: salePortInfo.ne_id,
    };

    MarketPlacePortsService.purchasePort(payload)
      .then((response: any) => {
        setSaleLoading(false);
        handlePurchaseDrawerClose();
        toast.success(SuccessMessage.purchaseSuccess, { icon: <img src={SuccessInfoIcon} alt="Success" /> });

        if (ports.length > 1) {
          fetchPortsForMarketPlace();
        } else if (page !== 1) {
          setPage(1);
        } else {
          fetchPortsForMarketPlace();
        }
      })
      .catch((e) => {
        setSaleLoading(false);
        if (e.errorCode === ErrorCodesMapping[1007]) {
          toast.error(ErrorCodeMessageMapping[1007], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
        }
      });
  }, [setSaleLoading, handlePurchaseDrawerClose, fetchPortsForMarketPlace, ports, page, salePortDescription, salePortName, saleSelectedPrice, salePortInfo, portOnDemandPrice, portOnContractPrice]);

  const handleTermsOpenClick = useCallback((type: string) => {
    setPdfViewerOpen(true);

    const fileName = type === 'on_contract' ? salePortInfo.terms_on_contract_url : salePortInfo.terms_on_demand_url;
    setAggrementTypeInfo((prev) => {
      return {
        type,
        url: fileName ? MY_SELLER_BUCKET_PRE_URL + fileName : MY_SELLER_BUCKET_PRE_URL + TERMS_DEFAULT_FILE,
      };
    });
  }, [setPdfViewerOpen, salePortInfo]);

  const handlePriceFilter = useCallback((value: any) => {
    setPage(1);
    setPriceFilterValue(value);
  }, [setPriceFilterValue, setPage]);

  const handleTermsCloseClick = useCallback((agrred?: boolean, aggrementType?: string) => {
    setPdfViewerOpen(false);
    agrred && aggrementType && setSaleAggrementAccepted((prev) => {
      return {
        ...prev,
        [aggrementType]: agrred,
      };
    });
  }, [setPdfViewerOpen, setSaleAggrementAccepted]);

  useEffect(() => {
    fetchPortsForMarketPlace();
  }, [orderBy, order, page, searchText, priceFilterValue, fetchPortsForMarketPlace]);

  return (
    <>
      <ValidationLayout
        title="Markeplace for All Network Resources"
        table={<Ports page={page} total={total} ports={ports} loading={loading} order={order} orderBy={orderBy} onPageChange={handlePageChange} onAggredTermsClick={handleAggredTermsClick} onRequestSort={handleRequestSort} />}
        onSearchChanges={handleSearchTextChanged}
        onPriceFilterChange={handlePriceFilter}
        priceFilterValue={priceFilterValue}
        ports
        isSearchSection
        isMarketplace
        isPriceFilter
      />
      <PurchasePortDrawer
        open={open}
        loading={saleLoading}
        selectedPrice={saleSelectedPrice}
        portName={salePortName}
        portDescription={salePortDescription}
        aggrementAccepted={saleAggrementAccepted}
        portOnContractPrice={portOnContractPrice}
        portOnDemandPrice={portOnDemandPrice}
        port={salePortInfo}
        onPortNameChange={handleSalePortNameChanged}
        onPortDescriptionChange={handleSalePortDescriptionChanged}
        onSelectedPriceChange={handleSelectedPriceChange}
        onAcceptAggrement={handleAcceptAggredTermsClick}
        onAggredTermsClick={handleTermsOpenClick}
        onClose={handlePurchaseDrawerClose}
        onSaleClick={handleSaleClick}
      />
      <PdfViewer open={pdfViewerOpen} onClose={handleTermsCloseClick} aggrementType={aggrementTypeInfo.type} url={aggrementTypeInfo.url} />
    </>
  );
};

export default PortVerification;
