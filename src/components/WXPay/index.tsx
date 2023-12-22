import React, {
  useState, useCallback, useEffect, useMemo,
} from 'react';
import clsx from 'clsx';
import DatePicker from 'react-date-picker';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import PriceBox from './PriceBox';
import CollapseBox from './CollapseBox';
import Input from '../DesignSystem/input';
import Button from '../DesignSystem/button';
import SearchIcon from '../../assets/images/search-icon.svg';
import CalenderIcon from '../../assets/images/calender-icon.svg';
import FeesTable from './Fees';
import PortsTable from './PortsTable';
import BandwidthsTable from './BandwidthsTable';
import { SortOrder } from '../../enums';
import WXPayService from '../../services/wxPay.service';
import { TableConstants } from '../../utils/appConstants';

const WXPay: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchTextAPI, setSearchTextAPI] = useState<string>('');
  const [bandwidthPortsTotal, setBandwidthPortsTotal] = useState<string>((0).toFixed(2));
  const [feesTotal, setFeesTotal] = useState<string>((0).toFixed(2));
  const [portsTotal, setPortsTotal] = useState<string>((0).toFixed(2));
  const [feesLoading, setFeesLoading] = useState<boolean>(false);
  const [portsLoading, setPortsLoading] = useState<boolean>(false);
  const [bandwidthsLoading, setBandwidthsLoading] = useState<boolean>(false);
  const [activeStartDateStart, setActiveStartDateStart] = useState<Date>();
  const [activeStartDateEnd, setActiveStartDateEnd] = useState<Date>();

  const [filters, setFilters] = useState<{
    isPorts: boolean, isBandwidth: boolean, startDate: Date, endDate: Date
  }>({
    isPorts: true,
    isBandwidth: true,
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().setHours(23, 59, 59, 999)),
  });
  const [collapsibleStates, setCollapsibleStates] = useState<{
    fees: boolean, port: boolean, bandwidth: boolean
  }>({
    port: true,
    bandwidth: false,
    fees: false,
  });
  const [tableData, setTableData] = useState<{
    fees: any[], port: any[], bandwidth: any[]
  }>({
    fees: [],
    port: [],
    bandwidth: [],
  });
  const [order, setOrder] = useState<{
    fees: SortOrder, port: SortOrder, bandwidth: SortOrder
  }>({
    fees: SortOrder.asc,
    port: SortOrder.asc,
    bandwidth: SortOrder.asc,
  });
  const [orderBy, setOrderBy] = useState<{
    fees: string, port: string, bandwidth: string
  }>({
    fees: 'resourceType',
    port: 'resourceType',
    bandwidth: 'resource_type',
  });
  const [page, setPage] = useState<{
    fees: number, port: number, bandwidth: number
  }>({
    fees: 1,
    port: 1,
    bandwidth: 1,
  });
  const [total, setTotal] = useState<{
    fees: number, port: number, bandwidth: number
  }>({
    fees: 0,
    port: 0,
    bandwidth: 0,
  });

  const fetchFees = useCallback(() => {
    setFeesLoading(true);

    const sd = new Date(filters.startDate).toUTCString();
    const ed = new Date(filters.endDate).toUTCString();

    const startDate = Date.parse(sd);
    const endDate = Date.parse(ed);

    const payload = {
      sortField: orderBy.fees,
      sortDirection: order.fees.toUpperCase(),
      page: page.fees,
      pageSize: TableConstants.wxPayPerPage,
      searchText,
      isPorts: filters.isPorts,
      isBandwidth: filters.isBandwidth,
      startDate,
      endDate,
    };

    WXPayService.getFees(payload)
      .then((response: any) => {
        setFeesLoading(false);
        setTableData((prev: any) => {
          return {
            ...prev,
            fees: response?.data?.wxpay ?? [],
          };
        });
        setTotal((prev: any) => {
          return {
            ...prev,
            fees: response?.pagination?.totalRecords ?? 0,
          };
        });
        setFeesTotal((response?.data?.total?.selectedDateTotal ?? 0).toFixed(2));
      })
      .catch(() => {
        setFeesLoading(false);
        setTableData((prev: any) => {
          return {
            ...prev,
            fees: [],
          };
        });
        setTotal((prev: any) => {
          return {
            ...prev,
            fees: 0,
          };
        });
      });
  }, [setFeesLoading, setTableData, setTotal, setFeesTotal, orderBy.fees, order.fees, page.fees, searchTextAPI, filters.isPorts, filters.isBandwidth, filters.startDate, filters.endDate]);

  const fetchPortsData = useCallback(() => {
    setPortsLoading(true);
    const sd = new Date(filters.startDate).toUTCString();
    const ed = new Date(filters.endDate).toUTCString();
    const startDate = Date.parse(sd);
    const endDate = Date.parse(ed);

    const payload = {
      sortField: orderBy.port,
      sortDirection: order.port.toUpperCase(),
      page: page.port,
      pageSize: TableConstants.wxPayPerPage,
      searchText,
      startDate,
      endDate,
    };

    WXPayService.getPortDetails(payload)
      .then((response: any) => {
        setPortsLoading(false);
        setTableData((prev: any) => {
          return {
            ...prev,
            port: response?.data?.wxpay ?? [],
          };
        });
        setTotal((prev: any) => {
          return {
            ...prev,
            port: response?.pagination?.totalRecords ?? 0,
          };
        });
        setPortsTotal((response?.data?.total ?? 0).toFixed(2));
      })
      .catch(() => {
        setPortsLoading(false);
        setTableData((prev: any) => {
          return {
            ...prev,
            port: [],
          };
        });
        setTotal((prev: any) => {
          return {
            ...prev,
            port: 0,
          };
        });
      });
  }, [setPortsLoading, setTableData, setTotal, setPortsTotal, orderBy.port, order.port, page.port, searchTextAPI, filters.isPorts, filters.isBandwidth, filters.startDate, filters.endDate]);

  const fetchBandwidthsData = useCallback(() => {
    setBandwidthsLoading(true);
    const sd = new Date(filters.startDate).toUTCString();
    const ed = new Date(filters.endDate).toUTCString();
    const startDate = Date.parse(sd);
    const endDate = Date.parse(ed);

    const payload = {
      sortField: orderBy.bandwidth,
      sortDirection: order.bandwidth.toUpperCase(),
      page: page.bandwidth,
      pageSize: TableConstants.wxPayPerPage,
      searchText,
      startDate,
      endDate,
    };

    WXPayService.getBandwidthDetails(payload)
      .then((response: any) => {
        setBandwidthsLoading(false);
        setTableData((prev: any) => {
          return {
            ...prev,
            bandwidth: response?.data?.wxpay ?? [],
          };
        });
        setTotal((prev: any) => {
          return {
            ...prev,
            bandwidth: response?.pagination?.totalRecords ?? 0,
          };
        });
        setBandwidthPortsTotal((response?.data?.total ?? 0).toFixed(2));
      })
      .catch(() => {
        setBandwidthsLoading(false);
        setTableData((prev: any) => {
          return {
            ...prev,
            bandwidth: [],
          };
        });
        setTotal((prev: any) => {
          return {
            ...prev,
            bandwidth: 0,
          };
        });
      });
  }, [setPortsLoading, setTableData, setTotal, setBandwidthPortsTotal, orderBy.bandwidth, order.bandwidth, page.bandwidth, searchTextAPI, filters.isPorts, filters.isBandwidth, filters.startDate, filters.endDate]);

  useEffect(() => {
    fetchFees();
  }, [orderBy.fees, order.fees, page.fees, searchTextAPI, fetchFees]);

  useEffect(() => {
    fetchPortsData();
  }, [orderBy.port, order.port, page.port, searchTextAPI, fetchPortsData]);

  useEffect(() => {
    fetchBandwidthsData();
  }, [orderBy.bandwidth, order.bandwidth, page.bandwidth, searchTextAPI, fetchBandwidthsData]);

  const onDateChange = useCallback((isStartDate: boolean, e: any) => {
    const beginOfMonth = new Date(e.getFullYear(), e.getMonth(), 1);
    setPage(() => {
      return {
        fees: 1,
        port: 1,
        bandwidth: 1,
      };
    });
    if (isStartDate) {
      setActiveStartDateStart(beginOfMonth);
      setFilters((prev: any) => {
        return {
          ...prev,
          startDate: new Date(e),
        };
      });
    } else {
      setActiveStartDateEnd(beginOfMonth);
      setFilters((prev: any) => {
        return {
          ...prev,
          endDate: new Date(new Date(e).setHours(23, 59, 59, 999)),
        };
      });
    }
  }, [setFilters]);

  const handleCollapsibleNEClose = useCallback((id: string) => {
    setCollapsibleStates((prev: any) => {
      return {
        ...prev,
        [id]: false,
      };
    });
  }, [setCollapsibleStates]);

  const handleCollapsibleNEOpen = useCallback((id: string) => {
    setCollapsibleStates((prev: any) => {
      return {
        ...prev,
        [id]: true,
      };
    });
  }, [setCollapsibleStates]);

  const handleSearchClicked = useCallback(() => {
    setPage(() => {
      return {
        fees: 1,
        port: 1,
        bandwidth: 1,
      };
    });
    setSearchTextAPI(searchText);
  }, [searchText, setSearchTextAPI, setPage]);

  const handleSearchChange = useCallback((event) => {
    setSearchText(event.target.value.trim());

    if (event.target.value === '') {
      setSearchTextAPI('');
    }
  }, [setSearchText]);

  const handleKeypress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearchClicked();
    }
  }, [handleSearchClicked]);

  const handleFilterClicked = useCallback((isPorts: boolean) => {
    if (isPorts) {
      setFilters((prev: any) => {
        return {
          ...prev,
          isPorts: !prev.isPorts,
        };
      });
    } else {
      setFilters((prev: any) => {
        return {
          ...prev,
          isBandwidth: !prev.isBandwidth,
        };
      });
    }
  }, [setFilters]);

  const handlePageChange = useCallback((page: number, id: string) => {
    setPage((prev) => {
      return {
        ...prev,
        [id]: page,
      };
    });
  }, [setPage]);

  const handleRequestSort = useCallback((property: string, nextSortOrder: SortOrder, id: string) => {
    setOrder((prev) => {
      return {
        ...prev,
        [id]: nextSortOrder,
      };
    });
    setOrderBy((prev) => {
      return {
        ...prev,
        [id]: property,
      };
    });
  }, [setOrder, setOrderBy]);

  const feesTable = <FeesTable loading={feesLoading} page={page.fees} total={total.fees} fees={tableData.fees} order={order.fees} orderBy={orderBy.fees} onRequestSort={(property: string, nextSortOrder: SortOrder) => handleRequestSort(property, nextSortOrder, 'fees')} onPageChange={(page) => handlePageChange(page, 'fees')} />;
  const portsTable = <PortsTable loading={portsLoading} page={page.port} total={total.port} ports={tableData.port} order={order.port} orderBy={orderBy.port} onRequestSort={(property: string, nextSortOrder: SortOrder) => handleRequestSort(property, nextSortOrder, 'port')} onPageChange={(page) => handlePageChange(page, 'port')} />;
  const bandwidthsTable = <BandwidthsTable loading={bandwidthsLoading} page={page.bandwidth} total={total.bandwidth} bandwidthPorts={tableData.bandwidth} order={order.bandwidth} orderBy={orderBy.bandwidth} onRequestSort={(property: string, nextSortOrder: SortOrder) => handleRequestSort(property, nextSortOrder, 'bandwidth')} onPageChange={(page) => handlePageChange(page, 'bandwidth')} />;

  const timeFormat = useCallback(
    (date : any) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = (hours % 12) || 12;
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      const strTime = `${hours}:${minutes}:${seconds} ${ampm}`;
      return strTime;
    },
    [],
  );

  const nowTimeHandler = useCallback(
    () => {
      setFilters((prev: any) => {
        const date = new Date();
        const beginOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        setActiveStartDateEnd(beginOfMonth);
        if (new Date(prev.startDate) > new Date(Date.now())) {
          setActiveStartDateStart(beginOfMonth);
          setActiveStartDateEnd(beginOfMonth);
          return {
            ...prev,
            startDate: new Date(new Date().setHours(0, 0, 0, 0)),
            endDate: new Date(Date.now()),
          };
        }
        return {
          ...prev,
          endDate: new Date(Date.now()),
        };
      });
    },
    [setFilters],
  );

  const selectedDateRangeTotal = useMemo(() => {
    return (parseFloat(portsTotal) + parseFloat(bandwidthPortsTotal)) - parseFloat(feesTotal);
  }, [portsTotal, bandwidthPortsTotal, feesTotal]);

  return (
    <div className="wx-pay-component-root">
      <div className="price-boxes">
        <PriceBox text="Total Balance" amount="0.00" color="green" />
        <PriceBox text="Current Billing Period Estimation" amount="0.00" color="blue" />
        <PriceBox text="Average MRC Estimation" amount="0.00" color="green" />
        {/* <PriceBox text="Selected Date Range Total" amount={selectedDateTotal} color="blue" /> */}
      </div>

      <div className="filter-boxes">
        <div>
          <div className="search-box">
            <div className="search-input-div">
              <Input variant="input-pre-icon" name="user-search" placeholder="Search" icon={SearchIcon} onChange={handleSearchChange} onKeypress={handleKeypress} />
            </div>
            <div className="search-button-div">
              <Button variant="search" text="Search" className="search-btn" disabled={!searchText.trim()} onClick={handleSearchClicked} />
            </div>
          </div>
        </div>

        <div>
          <div className="date-root">
            <label>Start Date </label>
            <DatePicker
              activeStartDate={activeStartDateStart}
              onActiveStartDateChange={(e) => setActiveStartDateStart(e.activeStartDate)}
              onChange={(date: any) => onDateChange(true, date)}
              value={filters.startDate}
              format="MM/dd/yyyy"
              showLeadingZeros
              calendarIcon={<img src={CalenderIcon} alt="Select Date" />}
              clearIcon={null}
              maxDate={filters.endDate}
            />
            <span className="time">{timeFormat(filters.startDate)}</span>
          </div>
          <div className="date-root">
            <label>
              End Date
              <AvTimerIcon className="now-icon" onClick={nowTimeHandler} />
            </label>
            <DatePicker
              activeStartDate={activeStartDateEnd}
              onActiveStartDateChange={(e) => setActiveStartDateEnd(e.activeStartDate)}
              onChange={(date: any) => onDateChange(false, date)}
              value={filters.endDate}
              format="MM/dd/yyyy"
              showLeadingZeros
              calendarIcon={<img src={CalenderIcon} alt="Select Date" />}
              clearIcon={null}
              minDate={filters.startDate}
            />
            <span className="time">{timeFormat(filters.endDate)}</span>
          </div>
        </div>
        <div>
          <div className="vertical-line" />
          <PriceBox text="Selected Date Range Total" amount={selectedDateRangeTotal < 0 ? `(${Math.abs(selectedDateRangeTotal).toFixed(2).toString()})` : selectedDateRangeTotal.toFixed(2).toString()} color="#304052" />
        </div>
      </div>

      <div className="accordians">
        <CollapseBox
          text="Ports"
          id="port"
          open={collapsibleStates.port}
          onCollapsibleNEClose={handleCollapsibleNEClose}
          onCollapsibleNEOpen={handleCollapsibleNEOpen}
          table={portsTable}
        />
        <CollapseBox
          text="Bandwidths"
          id="bandwidth"
          open={collapsibleStates.bandwidth}
          onCollapsibleNEClose={handleCollapsibleNEClose}
          onCollapsibleNEOpen={handleCollapsibleNEOpen}
          table={bandwidthsTable}
        />
        <CollapseBox
          text="Fees"
          id="fees"
          open={collapsibleStates.fees}
          onCollapsibleNEClose={handleCollapsibleNEClose}
          onCollapsibleNEOpen={handleCollapsibleNEOpen}
          table={feesTable}
        />
      </div>
    </div>
  );
};

export default WXPay;
