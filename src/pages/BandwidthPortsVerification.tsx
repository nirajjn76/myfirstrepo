import React, { useState, useCallback, useEffect } from 'react';
import ValidationLayout from '../components/AdminValidations';
import BandwidthPorts from '../components/AdminValidations/BandwidthPorts';
import { TableConstants } from '../utils/appConstants';
import { SortOrder } from '../enums';
import ValidationService from '../services/validations.service';

const BandwidthPortsVerification: React.FC = () => {
  const [verified, setVerified] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [selected, setSelected] = useState<any[]>([]);
  const [verifyAllLoading, setVerifyAllLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [ports, setPorts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<SortOrder>(SortOrder.asc);
  const [orderBy, setOrderBy] = useState<string>('created_at');
  const [verifyLoadingId, setVerifyLoadingId] = useState<string>('');

  const fetchBandwidthPorts = useCallback(() => {
    setLoading(true);

    const payload = {
      verified,
      sortField: orderBy,
      sortDirection: order.toUpperCase(),
      page,
      pageSize: TableConstants.bandwidthPortsPerPage,
      searchText,
    };

    ValidationService.getBandwidthPorts(payload)
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
  }, [setLoading, setPorts, setTotal, verified, orderBy, order, page, searchText]);

  const handleRequestSort = useCallback(
    (property: string, nextSortOrder: SortOrder) => {
      setOrder(nextSortOrder);
      setOrderBy(property);
    },
    [orderBy, order],
  );

  const handleSearchTextChanged = useCallback((searchText: string) => {
    setSearchText(searchText);
    setPage(1);
    setSelected([]);
  }, [setSearchText, setPage, setSelected]);

  const handleRowSelect = useCallback((newSelected: any[]) => {
    setSelected(newSelected);
  }, [setSelected, selected]);

  const handleVerifiedChange = useCallback((checked: boolean) => {
    setVerified(checked);
    setOrderBy('created_at');
    setPage(1);

    setPorts([]);
    setTotal(0);
  }, [setVerified, setOrderBy, setPage]);

  const handleVerifyAllClick = useCallback(() => {
    setVerifyAllLoading(true);
    let bandwidthIds: any[] = [];
    selected.forEach((item) => {
      item.id.forEach((itemId: any) => {
        if (!itemId.verified) {
          bandwidthIds = [...bandwidthIds, itemId.f_id || itemId.n_id];
        }
      });
    });
    const payload = { bandwidthIds };

    ValidationService.validateBandwidthPorts(payload)
      .then(() => {
        if (selected.length === ports.length && page !== 1) {
          setPage(1);
        } else {
          fetchBandwidthPorts();
        }
        setVerifyAllLoading(false);
        setSelected([]);
      })
      .catch(() => {
        setVerifyAllLoading(false);
        setSelected([]);
      });
  }, [ports, selected, page, setSelected, fetchBandwidthPorts, setVerifyAllLoading]);

  const handleVerifyClick = useCallback((id: string) => {
    setVerifyLoadingId(id);

    const payload = {
      bandwidthIds: [id],
    };

    ValidationService.validateBandwidthPorts(payload)
      .then(() => {
        setVerifyLoadingId('');
        if (ports.length > 1) {
          fetchBandwidthPorts();
        } else if (page !== 1) {
          setPage(1);
        } else {
          fetchBandwidthPorts();
        }
      })
      .catch(() => {
        setVerifyLoadingId('');
      });
    setSelected([]);
  }, [setVerifyLoadingId, fetchBandwidthPorts, setSelected, setPage, ports, verified, page, orderBy, order, searchText]);

  const handleSelectAll = useCallback(() => {
    if (selected.length !== ports.length) {
      const newSelected = ports.map((port) => {
        return { id: [{ f_id: port.f_port_id, verified: port.fverified }, { n_id: port.n_port_id, verified: port.nverified }] };
      });
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  }, [ports, selected, setSelected]);

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
    setSelected([]);
  }, [setPage, setSelected]);

  useEffect(() => {
    fetchBandwidthPorts();
  }, [page, orderBy, verified, order, searchText, fetchBandwidthPorts]);

  return (
    <ValidationLayout
      title="Physical Validation - Bandwidth"
      isSearchSection
      table={<BandwidthPorts page={page} verified={verified} total={total} bandwidthPorts={ports} loading={loading} verifyLoadingId={verifyLoadingId} order={order} orderBy={orderBy} onPageChange={handlePageChange} selected={selected} onSelectRow={handleRowSelect} onSelectAll={handleSelectAll} onVerifyClick={handleVerifyClick} onRequestSort={handleRequestSort} />}
      verifyAllLoading={verifyAllLoading}
      selected={selected}
      verified={verified}
      onVerifiedChange={handleVerifiedChange}
      onSearchChanges={handleSearchTextChanged}
      onVerifyAllClick={handleVerifyAllClick}
      isVerifiedSection
      bandwidth
    />
  );
};

export default BandwidthPortsVerification;
