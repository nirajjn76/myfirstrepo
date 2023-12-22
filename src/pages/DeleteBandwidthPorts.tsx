import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import ValidationLayout from '../components/AdminValidations';
import DeleteBandwidthPortsList from '../components/AdminValidations/DeleteBandwidthPorts';
import { TableConstants } from '../utils/appConstants';
import { SortOrder } from '../enums';
import ValidationService from '../services/validations.service';
import SuccessInfoIcon from '../assets/images/success-toast-checkmark-icon.svg';
import { SuccessMessage } from '../utils/apiConstants';

const DeleteBandwidthPorts: React.FC = () => {
  const [verified, setVerified] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [selected, setSelected] = useState<any[]>([]);
  const [deleteAllLoading, setDeleteAllLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [ports, setPorts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<SortOrder>(SortOrder.asc);
  const [orderBy, setOrderBy] = useState<string>('organization_id');
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

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

    ValidationService.getDeleteBandwidthPorts(payload)
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
    setOrderBy('organization_id');
    setPage(1);

    setPorts([]);
    setTotal(0);
  }, [setVerified, setOrderBy, setPage]);

  const handleDeleteAllClick = useCallback(() => {
    setDeleteAllLoading(true);
    let bandwidthIds: any[] = [];
    selected.forEach((item:any) => {
      item.id.forEach((itemId: any) => {
        bandwidthIds = [...bandwidthIds, itemId.n_id || itemId.f_id];
      });
    });
    const payload = { portIds: bandwidthIds };
    ValidationService.deleteBandwidth(payload)
      .then(() => {
        if (selected.length === ports.length && page !== 1) {
          setPage(1);
        } else {
          const message = SuccessMessage.deleteMultipleBandwidth;
          toast.success(message, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          fetchBandwidthPorts();
        }
        setDeleteAllLoading(false);
        setSelected([]);
      })
      .catch(() => {
        setDeleteAllLoading(false);
        setSelected([]);
      });
  }, [ports, selected, page, setSelected, fetchBandwidthPorts, setDeleteAllLoading]);

  const handleDeleteClick = useCallback((ids: any) => {
    setDeleteLoading(true);
    const payload = {
      portIds: ids,
    };

    ValidationService.deleteBandwidth(payload)
      .then(() => {
        setDeleteLoading(false);
        if (ports.length > 1) {
          const message = SuccessMessage.deleteBandwidth;
          toast.success(message, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          fetchBandwidthPorts();
        } else if (page !== 1) {
          setPage(1);
        } else {
          const message = SuccessMessage.deleteBandwidth;
          toast.success(message, { icon: <img src={SuccessInfoIcon} alt="Success" /> });
          fetchBandwidthPorts();
        }
      })
      .catch(() => {
        setDeleteLoading(false);
      });
    setSelected([]);
  }, [setDeleteLoading, fetchBandwidthPorts, setSelected, setPage, ports, verified, page, orderBy, order, searchText]);

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
      title="Delete Bandwidth"
      isSearchSection
      table={<DeleteBandwidthPortsList page={page} verified={verified} total={total} bandwidthPorts={ports} loading={loading} deleteLoading={deleteLoading} order={order} orderBy={orderBy} onPageChange={handlePageChange} selected={selected} onSelectRow={handleRowSelect} onSelectAll={handleSelectAll} onDeleteClick={handleDeleteClick} onRequestSort={handleRequestSort} />}
      deleteAllLoading={deleteAllLoading}
      selected={selected}
      verified={verified}
      onVerifiedChange={handleVerifiedChange}
      onSearchChanges={handleSearchTextChanged}
      onDeleteAllClick={handleDeleteAllClick}
      isDeleteSection
      deleteBandwidth
    />
  );
};

export default DeleteBandwidthPorts;
