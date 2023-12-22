import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import ValidationLayout from '../components/AdminValidations';
import BandwidthMarketplace from '../components/BandwidthMarketplace';
import { SortOrder } from '../enums';
import bandwidthMarketplaceService from '../services/bandwidthMarketplace.service';
import {
  TableConstants, YearDaysForCalculation, PURCHASE_PORT_CHARGE_PER_MONTH, priceFilterDropdown,
} from '../utils/appConstants';
import PurchaseDrawer from '../components/BandwidthMarketplace/PurchaseBandwidth';
import {
  SuccessMessage, ErrorCodeMessageMapping, ErrorCodesMapping, MY_SELLER_BUCKET_PRE_URL, TERMS_DEFAULT_FILE,
} from '../utils/apiConstants';
import PdfViewer from '../components/PdfViewer';
import SuccessInfoIcon from '../assets/images/success-toast-checkmark-icon.svg';
import ErrorInfoIcon from '../assets/images/error-info-icon.svg';

const PortVerification: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<SortOrder>(SortOrder.asc);
  const [orderBy, setOrderBy] = useState<string>('service_description');
  const [page, setPage] = useState<number>(1);
  const [searchTextNeElements, setSearchTextNeElements] = useState<string>('');
  const [searchTextFeElements, setSearchTextFeElements] = useState<string>('');
  const [bandwidthPorts, setBandwidthPorts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [purchaseOpen, setPurchaseOpen] = useState<boolean>(false);
  const [selectedRowForPurchase, setSelectedRowForPurchase] = useState<any>();
  const [total, setTotal] = useState<number>(0);
  const [verified, setVerified] = useState<boolean>(false);
  const [priceFilterValue, setPriceFilterValue] = useState<string>(priceFilterDropdown[0].value);
  const [values, setValues] = useState<any>({});
  // const [nePortName, setNePortName] = useState<string>('');
  // const [neServiceDescription, setNeServiceDescription] = useState<string>('');
  // const [fePortName, setFePortName] = useState<string>('');
  // const [feServiceDescription, setFeServiceDescription] = useState<string>('');

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

  const [onDemandSelected, setOnDemandSelected] = useState<boolean>(false);
  const [onContractPrice, setOnContractPrice] = useState<string>('');
  const [onDemandPrice, setOnDemandPrice] = useState<string>('');

  const fetchBandwidthForMarketPlace = useCallback(() => {
    setLoading(true);

    const payload = {
      sortField: orderBy,
      sortDirection: order.toUpperCase(),
      page,
      pageSize: TableConstants.perPage,
      searchNneName: searchTextNeElements,
      searchFneName: searchTextFeElements,
      filter: priceFilterValue,
      searchText,
    };

    bandwidthMarketplaceService.getAllbandwidthMarketplace(payload)
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
  }, [setLoading, setBandwidthPorts, setTotal, priceFilterValue, orderBy, order, page, searchTextNeElements, searchTextFeElements, searchText]);

  const setInitVals = useCallback(
    (port : any) => {
      setValues({
        nePortName: port.near_port_name,
        neServiceDescription: port.near_port_description,
        fePortName: port.far_port_name,
        feServiceDescription: port.far_port_description,
        bandwidthDescription: port.service_description,
      });
    },
    [setValues, values],
  );

  const handlePurchaseOpen = useCallback((port: any) => {
    setInitVals(port);
    setOnContractPrice((port.on_contract_price + (PURCHASE_PORT_CHARGE_PER_MONTH * 2)).toString());
    setOnDemandPrice(port.on_demand_price);
    setSelectedRowForPurchase(port);
    setPurchaseOpen(true);
  }, [setPurchaseOpen, setOnContractPrice, setOnDemandPrice, setSelectedRowForPurchase]);

  const handleRequestSort = useCallback(
    (property: string, nextSortOrder: SortOrder) => {
      setOrder(nextSortOrder);
      setOrderBy(property);
    },
    [orderBy, order],
  );

  const handleClosePurchaseBandwidth = useCallback(() => {
    setValues({});
    setPurchaseOpen(false);
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
  }, [setValues, values, setSelectedPrice, setPurchaseOpen, setAggrementTypeInfo, setOnContractSelected, setAgreementSelected, setOnDemandSelected, setOnDemandPrice, setOnContractPrice]);

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, [setPage]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }, [setValues, values]);

  const handlePurchaseClick = useCallback(() => {
    setLoading(true);
    const onDemandPerMonth = onDemandPrice ? ((parseFloat(onDemandPrice) / 100) * ((60 * 24 * YearDaysForCalculation) / 12) + (PURCHASE_PORT_CHARGE_PER_MONTH * 2)).toFixed(2) : 0;
    const onDemandPerMinute = onDemandPerMonth ? ((parseFloat(onDemandPerMonth) * 100 * 12) / (YearDaysForCalculation * 24 * 60)) : 0;
    const payload: any = {
      bandwidthDetailId: selectedRowForPurchase?.id,
      nneId: selectedRowForPurchase?.nne_id,
      nearPortName: values.nePortName,
      nearPortDescription: values.neServiceDescription,
      fneId: selectedRowForPurchase?.fne_id,
      farPortName: values.fePortName,
      farPortDescription: values.feServiceDescription,
      price: selectedPrice === 'on_demand' ? onDemandPerMinute : onContractPrice,
      priceType: selectedPrice,
      serviceDescription: values.bandwidthDescription,

    };
    bandwidthMarketplaceService.purchaseBandwidth(payload)
      .then(() => {
        setLoading(false);
        handleClosePurchaseBandwidth();
        const message = SuccessMessage.purchaseBandwidthSuccess;
        toast.success(message, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
        if (bandwidthPorts.length > 1) {
          fetchBandwidthForMarketPlace();
        } else if (page !== 1) {
          setPage(1);
        } else {
          fetchBandwidthForMarketPlace();
        }
      })
      .catch((e: any) => {
        setLoading(false);
        if (e.errorCode === ErrorCodesMapping[1007]) {
          toast.error(ErrorCodeMessageMapping[1007], { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" /> });
        }
      });
  }, [values, selectedPrice, onDemandSelected, onContractSelected, agreementSelected, onContractPrice, onDemandPrice, selectedRowForPurchase?.bandwidth_detail_id, setLoading, handleClosePurchaseBandwidth, fetchBandwidthForMarketPlace]);

  const handleRequestSearch = useCallback((e: any) => {
    if (e.target.name === 'nne_name') {
      setPage(1);
      setSearchTextNeElements(e.target.value);
    } else {
      setPage(1);
      setSearchTextFeElements(e.target.value);
    }
  }, [setSearchTextNeElements, setSearchTextFeElements]);

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

  const handleSearchClose = useCallback((id: any) => {
    if (id === 'nne_name') {
      setSearchTextNeElements('');
    } else {
      setSearchTextFeElements('');
    }
  }, [setSearchTextNeElements, setSearchTextFeElements]);

  const handleAgreementSelected = useCallback(
    () => {
      // setAgreementSelected((prev) => !prev);
    },
    [setAgreementSelected],
  );

  const handlePriceFilter = useCallback((value: any) => {
    setPage(1);
    setPriceFilterValue(value);
  }, [setPriceFilterValue, setPage]);

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

  const handleSearchTextChanged = useCallback((searchText: string) => {
    setSearchText(searchText);
  }, [setSearchText, searchText]);

  useEffect(() => {
    fetchBandwidthForMarketPlace();
  }, [page, orderBy, verified, order, searchTextNeElements, searchTextFeElements, fetchBandwidthForMarketPlace, searchText]);

  return (
    <>
      <ValidationLayout
        title="Marketplace for All Bandwidth"
        table={(
          <BandwidthMarketplace
            page={page}
            selected={selected}
            handlePurchaseOpen={handlePurchaseOpen}
            total={total}
            bandwidthPorts={bandwidthPorts}
            loading={loading}
            order={order}
            orderBy={orderBy}
            onPageChange={handlePageChange}
            onRequestSort={handleRequestSort}
            onRequestSearch={handleRequestSearch}
            onSearchClose={handleSearchClose}
          />
        )}
        onPriceFilterChange={handlePriceFilter}
        priceFilterValue={priceFilterValue}
        isPriceFilter
        onSearchChanges={handleSearchTextChanged}
        bandwidth
        isMarketplace
        isSearchSection
      />

      <PurchaseDrawer
        loading={loading}
        selectedRowForPurchase={selectedRowForPurchase}
        open={purchaseOpen}
        onClose={handleClosePurchaseBandwidth}
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
    </>
  );
};

export default PortVerification;
