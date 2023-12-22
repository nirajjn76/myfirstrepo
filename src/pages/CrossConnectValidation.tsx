import React, { useState, useCallback, useEffect } from 'react';
import ValidationLayout from '../components/AdminValidations';
import CrossConnectList from '../components/AdminValidations/CrossConnect';
import { TableConstants } from '../utils/appConstants';
import { SortOrder } from '../enums';
import ValidationService from '../services/validations.service';

const CrossConnectValidation: React.FC = () => {
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

  const fetchCrossConnectPorts = useCallback(() => {
    setLoading(true);

    const payload = {
      sortField: orderBy,
      sortDirection: order.toUpperCase(),
      page,
      pageSize: TableConstants.perPage,
      searchText,
    };

    ValidationService.getCcPorts(payload)
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
    setOrderBy('id');
    setPage(1);
  }, [setVerified]);

  const handleVerifyAllClick = useCallback(() => {
    setVerifyAllLoading(true);
    const payload = {
      crossConnectIds: selected.map((item) => item.id),
    };

    ValidationService.validateCrossConnectPorts(payload)
      .then(() => {
        if (selected.length === ports.length && page !== 1) {
          setPage(1);
        } else {
          fetchCrossConnectPorts();
        }
        setVerifyAllLoading(false);
        setSelected([]);
      })
      .catch(() => {
        setVerifyAllLoading(false);
        setSelected([]);
      });
  }, [ports, selected, page, setSelected, fetchCrossConnectPorts, setVerifyAllLoading]);

  const handleVerifyClick = useCallback((id: string) => {
    setVerifyLoadingId(id);

    const payload = {
      crossConnectIds: [id],
    };

    ValidationService.validateCrossConnectPorts(payload)
      .then(() => {
        setVerifyLoadingId('');
        if (ports.length > 1) {
          fetchCrossConnectPorts();
        } else if (page !== 1) {
          setPage(1);
        } else {
          fetchCrossConnectPorts();
        }
      })
      .catch(() => {
        setVerifyLoadingId('');
      });
    setSelected([]);
  }, [setVerifyLoadingId, fetchCrossConnectPorts, setSelected, setPage, ports, verified, page, orderBy, order, searchText]);

  const handleSelectAll = useCallback(() => {
    if (selected.length !== ports.length) {
      const newSelected = ports.map((port) => {
        return { id: port.port_id };
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
    fetchCrossConnectPorts();
  }, [page, orderBy, verified, order, searchText, fetchCrossConnectPorts]);

  return (
    <ValidationLayout
      title="Cross Connect Validation"
      table={<CrossConnectList page={page} verified={verified} total={total} ports={ports} loading={loading} verifyLoadingId={verifyLoadingId} order={order} orderBy={orderBy} onPageChange={handlePageChange} selected={selected} onSelectRow={handleRowSelect} onSelectAll={handleSelectAll} onVerifyClick={handleVerifyClick} onRequestSort={handleRequestSort} />}
      verifyAllLoading={verifyAllLoading}
      selected={selected}
      verified={verified}
      onVerifiedChange={handleVerifiedChange}
      onSearchChanges={handleSearchTextChanged}
      onVerifyAllClick={handleVerifyAllClick}
      isVerifiedSection
      isNotToggleSwitch
      isSearchSection
    />
  );
};

export default CrossConnectValidation;
