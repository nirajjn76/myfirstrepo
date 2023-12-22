import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import ValidationLayout from '../components/AdminValidations';
import DeletePortsList from '../components/AdminValidations/DeletePorts';
import { TableConstants } from '../utils/appConstants';
import { SortOrder } from '../enums';
import ValidationService from '../services/validations.service';
import SuccessInfoIcon from '../assets/images/success-toast-checkmark-icon.svg';
import { SuccessMessage } from '../utils/apiConstants';

const DeletePorts: React.FC = () => {
  const [verified, setVerified] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [selected, setSelected] = useState<any[]>([]);
  const [deleteAllLoading, setDeleteAllLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [ports, setPorts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<SortOrder>(SortOrder.asc);
  const [orderBy, setOrderBy] = useState<string>('id');
  const [deleteLoadingId, setDeleteLoadingId] = useState<string>('');

  const fetchPorts = useCallback(() => {
    setLoading(true);

    const payload : any = {
      verified,
      sortField: orderBy,
      sortDirection: order.toUpperCase(),
      page,
      pageSize: TableConstants.perPage,
      searchText,
    };

    ValidationService.getDeletePorts(payload)
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

  const handleDeleteAllClick = useCallback(() => {
    setDeleteAllLoading(true);
    const payload = {
      portIds: selected.map((item) => item.id),
    };

    ValidationService.deletePort(payload)
      .then(() => {
        if (selected.length === ports.length && page !== 1) {
          setPage(1);
        } else {
          const message = SuccessMessage.deleteMultiplePort;
          toast.success(message, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          fetchPorts();
        }
        setDeleteAllLoading(false);
        setSelected([]);
      })
      .catch(() => {
        setDeleteAllLoading(false);
        setSelected([]);
      });
  }, [ports, selected, page, setSelected, fetchPorts, setDeleteAllLoading]);

  const handleDeleteClick = useCallback((id: string) => {
    setDeleteLoadingId(id);

    const payload = {
      portIds: [id],
    };

    ValidationService.deletePort(payload)
      .then(() => {
        const message = SuccessMessage.deletePort;
        setDeleteLoadingId('');
        if (ports.length > 1) {
          toast.success(message, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          fetchPorts();
        } else if (page !== 1) {
          setPage(1);
        } else {
          toast.success(message, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          fetchPorts();
        }
      })
      .catch(() => {
        setDeleteLoadingId('');
      });
    setSelected([]);
  }, [setDeleteLoadingId, fetchPorts, setSelected, setPage, ports, verified, page, orderBy, order, searchText]);

  const handleSelectAll = useCallback(() => {
    if (selected.length !== ports.length) {
      const newSelected = ports.map((port) => {
        return { id: port.id };
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
    fetchPorts();
  }, [page, orderBy, verified, order, searchText, fetchPorts]);

  return (
    <ValidationLayout
      title="Delete Network Resources"
      table={<DeletePortsList page={page} verified={verified} total={total} ports={ports} loading={loading} deleteLoadingId={deleteLoadingId} order={order} orderBy={orderBy} onPageChange={handlePageChange} selected={selected} onSelectRow={handleRowSelect} onSelectAll={handleSelectAll} onDeleteClick={handleDeleteClick} onRequestSort={handleRequestSort} />}
      deleteAllLoading={deleteAllLoading}
      selected={selected}
      verified={verified}
      onVerifiedChange={handleVerifiedChange}
      onSearchChanges={handleSearchTextChanged}
      onDeleteAllClick={handleDeleteAllClick}
      isDeleteSection
      deletePorts
      isSearchSection
    />
  );
};

export default DeletePorts;
