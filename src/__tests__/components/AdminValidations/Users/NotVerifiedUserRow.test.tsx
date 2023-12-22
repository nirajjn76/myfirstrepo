import { describe, jest, test } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Roles } from '../../../../enums';
import NotVerifiedUserRow from '../../../../components/AdminValidations/Users/NotVerifiedUserRow';

describe('<NotVerifiedUserRow />', () => {
  test('Should call verify button click', () => {
    const onVerifyClick = jest.fn();
    const props = {
      user: {
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
      },
      roles: [{
        role_name: Roles.admin,
        id: 1,
      }, {
        role_name: Roles.user,
        id: 2,
      }],
      verifyLoadingId: '',
      rowSelected: false,
      selected: [],
      onSelectRow: jest.fn(),
      onRoleChange: jest.fn(),
    };
    const { getByTestId } = render(<NotVerifiedUserRow {...props} onVerifyClick={onVerifyClick} />);

    const btn = getByTestId('btn-verify');
    fireEvent.click(btn);

    expect(onVerifyClick).toHaveBeenCalled();
  });

  test.skip('Should call handle role change', async () => {
    const onRoleChange = jest.fn();
    const props = {
      user: {
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
      },
      roles: [{
        role_name: Roles.admin,
        id: 1,
      }, {
        role_name: Roles.user,
        id: 2,
      }],
      verifyLoadingId: '',
      rowSelected: false,
      selected: [],
      onSelectRow: jest.fn(),
      onVerifyClick: jest.fn(),
    };
    const { findByText } = render(<NotVerifiedUserRow {...props} onRoleChange={onRoleChange} />);

    await act(async () => {
      const selectButton = await findByText('Admin');

      fireEvent.click(selectButton);
    });
  });

  test('Should call handle select row', async () => {
    const onSelectRow = jest.fn();
    const props = {
      user: {
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
      },
      roles: [{
        role_name: Roles.admin,
        id: 1,
      }, {
        role_name: Roles.user,
        id: 2,
      }],
      verifyLoadingId: '',
      rowSelected: false,
      selected: [],
      onRoleChange: jest.fn(),
      onVerifyClick: jest.fn(),
    };
    const { getByTestId } = render(<NotVerifiedUserRow {...props} onSelectRow={onSelectRow} />);

    await waitFor(() => getByTestId('checkbox'));
    fireEvent.click(getByTestId('checkbox-input'));

    expect(onSelectRow).toHaveBeenCalled();
  });

  test('Should call handle select row with default items selected', async () => {
    const onSelectRow = jest.fn();
    const props = {
      user: {
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
        roleId: 1,
      },
      roles: [{
        role_name: Roles.admin,
        id: 1,
      }, {
        role_name: Roles.user,
        id: 2,
      }],
      verifyLoadingId: '',
      rowSelected: false,
      selected: [{
        id: 1,
        roleId: 1,
      }],
      onRoleChange: jest.fn(),
      onVerifyClick: jest.fn(),
    };
    const { getByTestId } = render(<NotVerifiedUserRow {...props} onSelectRow={onSelectRow} />);

    await waitFor(() => getByTestId('checkbox'));
    fireEvent.click(getByTestId('checkbox-input'));

    expect(onSelectRow).toHaveBeenCalled();
  });

  test('Should call handle select row with default items selected and selected position is last', async () => {
    const onSelectRow = jest.fn();
    const props = {
      user: {
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
        roleId: 1,
      },
      roles: [{
        role_name: Roles.admin,
        id: 1,
      }, {
        role_name: Roles.user,
        id: 2,
      }],
      verifyLoadingId: '',
      rowSelected: false,
      selected: [{
        id: 2,
        roleId: 2,
      }, {
        id: 3,
        roleId: 2,
      }, {
        id: 1,
        roleId: 1,
      }],
      onRoleChange: jest.fn(),
      onVerifyClick: jest.fn(),
    };
    const { getByTestId } = render(<NotVerifiedUserRow {...props} onSelectRow={onSelectRow} />);

    await waitFor(() => getByTestId('checkbox'));
    fireEvent.click(getByTestId('checkbox-input'));

    expect(onSelectRow).toHaveBeenCalled();
  });

  test('Should call handle select row with default items selected and selected position is not last and first', async () => {
    const onSelectRow = jest.fn();
    const props = {
      user: {
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
        roleId: 1,
      },
      roles: [{
        role_name: Roles.admin,
        id: 1,
      }, {
        role_name: Roles.user,
        id: 2,
      }],
      verifyLoadingId: '',
      rowSelected: false,
      selected: [{
        id: 2,
        roleId: 2,
      }, {
        id: 1,
        roleId: 1,
      }, {
        id: 3,
        roleId: 2,
      }],
      onRoleChange: jest.fn(),
      onVerifyClick: jest.fn(),
    };
    const { getByTestId } = render(<NotVerifiedUserRow {...props} onSelectRow={onSelectRow} />);

    await waitFor(() => getByTestId('checkbox'));
    fireEvent.click(getByTestId('checkbox-input'));

    expect(onSelectRow).toHaveBeenCalled();
  });

  test('Should have loader on verify buttin', () => {
    const onSelectRow = jest.fn();
    const props = {
      user: {
        id: '1',
        created_at: new Date(),
        verified_on: new Date(),
        organization_name: 'zymr',
        first_name: 'Ankur',
        last_name: 'Nariya',
        username: 'ankur.n',
        role_name: Roles.admin,
        email: 'anknur.nariya@zymr.com',
        verified_by: 'Ankur Admin',
      },
      roles: [{
        role_name: Roles.admin,
        id: 1,
      }, {
        role_name: Roles.user,
        id: 2,
      }],
      verifyLoadingId: '1',
      rowSelected: false,
      selected: [],
      onRoleChange: jest.fn(),
      onVerifyClick: jest.fn(),
    };
    const { getByTestId } = render(<NotVerifiedUserRow {...props} onSelectRow={onSelectRow} />);

    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});
