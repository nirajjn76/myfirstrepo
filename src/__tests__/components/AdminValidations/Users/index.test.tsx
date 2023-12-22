import { describe, jest, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { Roles, SortOrder } from '../../../../enums';
import { TableConstants } from '../../../../utils/appConstants';
import Users, { UsersListProps } from '../../../../components/AdminValidations/Users';

describe('<Users />', () => {
  test('Should render verified users page properly', () => {
    const props: UsersListProps = {
      verified: true,
      selected: [],
      page: 1,
      total: 2,
      users: [{
        id: 1,
        created_at: new Date(),
        verified_on: new Date(),
        organization_name: 'zymr',
        first_name: 'Ankur',
        last_name: 'Nariya',
        username: 'ankur.n',
        role_name: Roles.admin,
        email: 'anknur.nariya@zymr.com',
        verified_by: 'Ankur Admin',
      }],
      loading: false,
      roles: [{
        role_name: Roles.admin,
        id: 1,
      }, {
        role_name: Roles.user,
        id: 2,
      }],
      verifyLoadingId: '',
      orderBy: 'first_name',
      order: SortOrder.asc,
      onPageChange: jest.fn(),
      onSelectRow: jest.fn(),
      onSelectAll: jest.fn(),
      onVerifyClick: jest.fn(),
      onRoleChange: jest.fn(),
      onRequestSort: jest.fn(),
    };
    const { getByText } = render(<Users {...props} />);

    expect(getByText('Ankur Admin')).toBeInTheDocument();
  });

  test('Should render not verified users page properly with selected users', () => {
    const props: UsersListProps = {
      verified: false,
      selected: [{
        id: 1,
        roleId: 2,
      }],
      page: 1,
      total: 2,
      users: [{
        id: 1,
        created_at: new Date(),
        verified_on: new Date(),
        organization_name: 'zymr',
        first_name: 'Ankur',
        last_name: 'Nariya',
        username: 'ankur.n',
        role_name: Roles.admin,
        email: 'anknur.nariya@zymr.com',
        verified_by: 'Ankur Admin',
      }],
      loading: false,
      roles: [{
        role_name: Roles.admin,
        id: 1,
      }, {
        role_name: Roles.user,
        id: 2,
      }],
      verifyLoadingId: '',
      orderBy: 'first_name',
      order: SortOrder.asc,
      onPageChange: jest.fn(),
      onSelectRow: jest.fn(),
      onSelectAll: jest.fn(),
      onVerifyClick: jest.fn(),
      onRoleChange: jest.fn(),
      onRequestSort: jest.fn(),
    };
    const { container } = render(<Users {...props} />);

    const input = container.getElementsByClassName('selection-checkbox')[1] as HTMLInputElement;
    const root = input.closest('.MuiButtonBase-root');

    expect(root?.classList.contains('Mui-checked')).toBe(true);
  });

  test('Should render loading row for loading the api', () => {
    const props: UsersListProps = {
      verified: true,
      selected: [{
        id: 1,
        roleId: 2,
      }],
      page: 1,
      total: 2,
      users: [{
        id: 1,
        created_at: new Date(),
        verified_on: new Date(),
        organization_name: 'zymr',
        first_name: 'Ankur',
        last_name: 'Nariya',
        username: 'ankur.n',
        role_name: Roles.admin,
        email: 'anknur.nariya@zymr.com',
        verified_by: 'Ankur Admin',
      }],
      loading: true,
      roles: [{
        role_name: Roles.admin,
        id: 1,
      }, {
        role_name: Roles.user,
        id: 2,
      }],
      verifyLoadingId: '',
      orderBy: 'first_name',
      order: SortOrder.asc,
      onPageChange: jest.fn(),
      onSelectRow: jest.fn(),
      onSelectAll: jest.fn(),
      onVerifyClick: jest.fn(),
      onRoleChange: jest.fn(),
      onRequestSort: jest.fn(),
    };
    const { container } = render(<Users {...props} />);

    expect(container.getElementsByClassName('loading-row').length).toEqual(1);
  });

  test('Should render empty row', () => {
    const props: UsersListProps = {
      verified: true,
      selected: [],
      page: 1,
      total: 0,
      users: [],
      loading: false,
      roles: [{
        role_name: Roles.admin,
        id: 1,
      }, {
        role_name: Roles.user,
        id: 2,
      }],
      verifyLoadingId: '',
      orderBy: 'first_name',
      order: SortOrder.asc,
      onPageChange: jest.fn(),
      onSelectRow: jest.fn(),
      onSelectAll: jest.fn(),
      onVerifyClick: jest.fn(),
      onRoleChange: jest.fn(),
      onRequestSort: jest.fn(),
    };
    const { getByText } = render(<Users {...props} />);

    expect(getByText(TableConstants.noRecordsFound)).toBeInTheDocument();
  });

  test('Should call the page change function', () => {
    const onPageChange = jest.fn();
    const props = {
      verified: true,
      selected: [],
      page: 1,
      total: 20,
      users: [{
        id: 1,
        created_at: new Date(),
        verified_on: new Date(),
        organization_name: 'zymr',
        first_name: 'Ankur',
        last_name: 'Nariya',
        username: 'ankur.n',
        role_name: Roles.admin,
        email: 'anknur.nariya@zymr.com',
        verified_by: 'Ankur Admin',
      }],
      loading: true,
      roles: [{
        role_name: Roles.admin,
        id: 1,
      }, {
        role_name: Roles.user,
        id: 2,
      }],
      verifyLoadingId: '',
      orderBy: 'first_name',
      order: SortOrder.asc,
      onSelectRow: jest.fn(),
      onSelectAll: jest.fn(),
      onVerifyClick: jest.fn(),
      onRoleChange: jest.fn(),
      onRequestSort: jest.fn(),
    };
    const { getByLabelText } = render(<Users {...props} onPageChange={onPageChange} />);

    fireEvent.click(getByLabelText('Go to page 2'));

    expect(onPageChange).toHaveBeenCalled();
  });
});
