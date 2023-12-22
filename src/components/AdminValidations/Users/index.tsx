import React, { useCallback } from 'react';
import { TableBody } from '@material-ui/core';
import Table from '../../DesignSystem/Table';
import { SortOrder } from '../../../enums';
import { TableConstants } from '../../../utils/appConstants';
import LoadingRow from '../../DesignSystem/Table/Rows/LoadingRow';
import EmptyRow from '../../DesignSystem/Table/Rows/EmptyRow';
import NotVerifiedUserRow, { headCells as NotVerifiedUsersHeadCells } from './NotVerifiedUserRow';
import VerifiedUserRow, { headCells as VerifiedUsersHeadCells } from './VerifiedUserRow';

export interface UsersListProps {
  verified: boolean;
  selected: any[];
  page: number;
  total: number;
  users: any[];
  loading: boolean;
  roles: any[];
  verifyLoadingId: string;
  order: SortOrder;
  orderBy: string;
  onPageChange: (page: number) => void;
  onSelectRow: (newSelected: any[]) => void;
  onSelectAll: (_: any) => void;
  onVerifyClick: (id: string, roleId: string) => void;
  onRoleChange: (userId: string, roleId: number, roleName: string) => void;
  onRequestSort: (property: string, nextSortOrder: SortOrder) => void;

}

const UsersList: React.FC<UsersListProps> = ({
  verified, selected, page, total, users, loading, roles, verifyLoadingId, order, orderBy, onPageChange, onSelectRow, onSelectAll, onVerifyClick, onRoleChange, onRequestSort,
}) => {
  let rows;
  const UserRow = verified ? VerifiedUserRow : NotVerifiedUserRow;
  const headCells = verified ? VerifiedUsersHeadCells : NotVerifiedUsersHeadCells;

  const totalPages = Math.ceil(total / TableConstants.perPage);

  const handlePageChange = useCallback((event: any, value: number) => {
    onPageChange(value);
  }, [onPageChange]);

  if (loading) {
    rows = <LoadingRow colSpan={!verified ? headCells.length + 1 : headCells.length} />;
  } else if (total === 0) {
    rows = <EmptyRow text={TableConstants.noRecordsFound} colSpan={!verified ? headCells.length + 1 : headCells.length} />;
  } else if (roles && roles.length > 0) {
    const userRows = users.map((user: any, index) => {
      return <UserRow user={user} onVerifyClick={onVerifyClick} verifyLoadingId={verifyLoadingId} roles={roles} onRoleChange={onRoleChange} key={index} rowSelected={!!(selected.find((item) => item.id === user.id))} selected={selected} onSelectRow={onSelectRow} />;
    });
    rows = <TableBody>{userRows}</TableBody>;
  }

  return (
    <Table
      onRequestSort={onRequestSort}
      order={order}
      orderBy={orderBy}
      rowCount={users.length}
      headCells={headCells}
      rowSelectionAvailable={!verified}
      numSelected={selected.length}
      onSelectAllClick={onSelectAll}
      rows={rows}
      totalPages={totalPages}
      page={page}
      onPageChange={handlePageChange}
    />
  );
};

export default UsersList;
