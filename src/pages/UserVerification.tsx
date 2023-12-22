import React, { useState, useCallback, useEffect } from 'react';
import ValidationLayout from '../components/AdminValidations';
import Users from '../components/AdminValidations/Users';
import { TableConstants } from '../utils/appConstants';
import { Roles, SortOrder } from '../enums';
import ValidationService from '../services/validations.service';

const UserVerification: React.FC = () => {
  const [verified, setVerified] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [selected, setSelected] = useState<any[]>([]);
  const [verifyAllLoading, setVerifyAllLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<SortOrder>(SortOrder.asc);
  const [orderBy, setOrderBy] = useState<string>('first_name');
  const [verifyLoadingId, setVerifyLoadingId] = useState<string>('');
  const [roles, setRoles] = useState<any[]>([]);

  const fetchUsers = useCallback(() => {
    setLoading(true);

    const payload = {
      verified,
      sortField: orderBy,
      sortDirection: order.toUpperCase(),
      page,
      pageSize: TableConstants.perPage,
      searchText,
    };

    ValidationService.getUsers(payload)
      .then((response: any) => {
        setLoading(false);
        setUsers(response?.data || []);
        setTotal(response?.pagination?.totalRecords || 0);
      })
      .catch(() => {
        setLoading(false);
        setUsers([]);
        setTotal(0);
      });
  }, [setLoading, setUsers, setTotal, verified, orderBy, order, page, searchText]);

  const fetchRoles = useCallback(() => {
    ValidationService.getRoles()
      .then((response: any) => {
        setRoles(response?.data || []);
      })
      .catch(() => {
        setRoles([]);
      });
  }, [setRoles]);

  const handleRequestSort = useCallback(
    (property: string, nextSortOrder: SortOrder) => {
      setOrder(nextSortOrder);
      setOrderBy(property);
    },
    [orderBy, order],
  );

  const handleVerifiedChange = useCallback((checked: boolean) => {
    setVerified(checked);
    setOrderBy('first_name');
    setPage(1);
  }, [setVerified]);

  const handleSearchTextChanged = useCallback((searchText: string) => {
    setSearchText(searchText);
    setPage(1);
    setSelected([]);
  }, [setSearchText, setPage, setSelected]);

  const handleRowSelect = useCallback((newSelected: any[]) => {
    setSelected(newSelected);
  }, [setSelected, selected]);

  const handleVerifyAllClick = useCallback(() => {
    setVerifyAllLoading(true);
    const payload = {
      users: selected,
    };

    ValidationService.validateUser(payload)
      .then(() => {
        if (selected.length === users.length && page !== 1) {
          setPage(1);
        } else {
          fetchUsers();
        }
        setVerifyAllLoading(false);
        setSelected([]);
      })
      .catch(() => {
        setVerifyAllLoading(false);
        setSelected([]);
      });
  }, [users, selected, page, setSelected, fetchUsers, setVerifyAllLoading]);

  const handleVerifyClick = useCallback((id: string, roleId: string) => {
    setVerifyLoadingId(id);

    const payload = {
      users: [{
        id,
        roleId,
      }],
    };

    ValidationService.validateUser(payload)
      .then(() => {
        setVerifyLoadingId('');
        if (users.length > 1) {
          fetchUsers();
        } else if (page !== 1) {
          setPage(1);
        } else {
          fetchUsers();
        }
      })
      .catch(() => {
        setVerifyLoadingId('');
      });
    setSelected([]);
  }, [setVerifyLoadingId, fetchUsers, setSelected, setPage, users, page, verified, orderBy, order, searchText]);

  const handleSelectAll = useCallback(() => {
    if (selected.length !== users.length) {
      const defaultUserRole = roles.find((role) => role.role_name === Roles.user);
      const newSelected = users.map((user) => {
        return { id: user.id, roleId: user.roleId || defaultUserRole.id };
      });
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  }, [users, roles, selected, setSelected]);

  const hanldeRoleChange = useCallback((userId: string, roleId: number, roleName: string) => {
    const newUsers = users.map((user) => {
      if (userId === user.id) {
        return {
          ...user,
          role_name: roleName,
          roleId,
        };
      }
      return user;
    });
    const newSelected = selected.map((selectedUser) => {
      if (userId === selectedUser.id) {
        return {
          ...selectedUser,
          roleId,
        };
      }
      return selectedUser;
    });
    setUsers(newUsers);
    setSelected(newSelected);
  }, [users, selected, setUsers, setSelected]);

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
    setSelected([]);
  }, [setPage, setSelected]);

  useEffect(() => {
    fetchUsers();
  }, [page, verified, orderBy, order, searchText, fetchUsers]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <ValidationLayout
      title="New User Validation"
      table={<Users verified={verified} page={page} total={total} users={users} loading={loading} roles={roles} verifyLoadingId={verifyLoadingId} order={order} orderBy={orderBy} onPageChange={handlePageChange} selected={selected} onSelectRow={handleRowSelect} onSelectAll={handleSelectAll} onVerifyClick={handleVerifyClick} onRoleChange={hanldeRoleChange} onRequestSort={handleRequestSort} />}
      verified={verified}
      verifyAllLoading={verifyAllLoading}
      selected={selected}
      onVerifiedChange={handleVerifiedChange}
      onSearchChanges={handleSearchTextChanged}
      onVerifyAllClick={handleVerifyAllClick}
      isVerifiedSection
      isSearchSection
    />
  );
};

export default UserVerification;
