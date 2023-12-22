import { test, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { Roles } from '../../enums';
import UserVerification from '../../pages/UserVerification';
import ValidationService from '../../services/validations.service';

describe('<UserVerification />', () => {
  test('Should render user verification page properly', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getUsers');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          username: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_name: 'wx',
          first_name: 'Ankur',
          last_name: 'Nariya',
        }],
        pagination: {
          totalRecords: 10,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockRoles: any = jest.spyOn(ValidationService, 'getRoles');
      mockRoles.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          role_name: Roles.admin,
        }, {
          id: 1,
          role_name: Roles.user,
        }],
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { findByText } = render(
      <MemoryRouter>
        <UserVerification />
      </MemoryRouter>,
    );
    expect(await findByText('New User Validation')).toBeInTheDocument();
  });

  test('Should render user verification page properly if service returned an error', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getUsers');
      mock.mockRejectedValue({
        status: 500,
        statusText: '',
        headers: {},
        config: {},
      });

      const mockRoles: any = jest.spyOn(ValidationService, 'getRoles');
      mockRoles.mockRejectedValue({
        status: 500,
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { findByText } = render(
      <MemoryRouter>
        <UserVerification />
      </MemoryRouter>,
    );
    expect(await findByText('New User Validation')).toBeInTheDocument();
  });

  test('Should call the page change function', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getUsers');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          username: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_name: 'wx',
          first_name: 'Ankur',
          last_name: 'Nariya',
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockRoles: any = jest.spyOn(ValidationService, 'getRoles');
      mockRoles.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          role_name: Roles.admin,
        }, {
          id: 1,
          role_name: Roles.user,
        }],
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { findByLabelText } = render(
      <MemoryRouter>
        <UserVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));
    });

    expect(await findByLabelText('Go to page 1')).toBeInTheDocument();
  });

  test('Should call the handle sort function', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getUsers');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          username: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_name: 'wx',
          first_name: 'Ankur',
          last_name: 'Nariya',
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockRoles: any = jest.spyOn(ValidationService, 'getRoles');
      mockRoles.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          role_name: Roles.admin,
        }, {
          id: 1,
          role_name: Roles.user,
        }],
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { container, findByTestId } = render(
      <MemoryRouter>
        <UserVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(container.getElementsByClassName('sort-label')[1] as HTMLInputElement);
      expect(await findByTestId('sort-desc-label')).toBeInTheDocument();
    });
  });

  test('Should call the search text changed function', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getUsers');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          username: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_name: 'wx',
          first_name: 'Ankur',
          last_name: 'Nariya',
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockRoles: any = jest.spyOn(ValidationService, 'getRoles');
      mockRoles.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          role_name: Roles.admin,
        }, {
          id: 1,
          role_name: Roles.user,
        }],
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { findByLabelText, findByTestId } = render(
      <MemoryRouter>
        <UserVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('input-user-search');
      userEvent.clear(input);
      userEvent.type(input, 'abcdd');
      const searchBtn = await findByTestId('btn-search');

      userEvent.click(searchBtn);
    });

    expect(await findByLabelText('Go to page 2')).toBeInTheDocument();
  });

  test('Should call the verify all function with success', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getUsers');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          username: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_name: 'wx',
          first_name: 'Ankur',
          last_name: 'Nariya',
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockRoles: any = jest.spyOn(ValidationService, 'getRoles');
      mockRoles.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          role_name: Roles.admin,
        }, {
          id: 1,
          role_name: Roles.user,
        }],
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'validateUser');
      mockValidatePort.mockResolvedValue({
        status: 200,
        data: [],
        statusText: 'Success',
        headers: {},
        config: {},
      });
    });

    const { findByLabelText, findByTestId, findAllByRole } = render(
      <MemoryRouter>
        <UserVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      const checkbox = await findAllByRole('checkbox');
      userEvent.click(checkbox[1]);

      const verifyAllBtn = await findByTestId('btn-verify all (1)');
      userEvent.click(verifyAllBtn);
    });

    expect(await findByLabelText('Go to page 2')).toBeInTheDocument();
  });

  test('Should call the verify all function with success and set page to 1', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getUsers');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          username: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_name: 'wx',
          first_name: 'Ankur',
          last_name: 'Nariya',
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockRoles: any = jest.spyOn(ValidationService, 'getRoles');
      mockRoles.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          role_name: Roles.admin,
        }, {
          id: 1,
          role_name: Roles.user,
        }],
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'validateUser');
      mockValidatePort.mockResolvedValue({
        status: 200,
        data: [],
        statusText: 'Success',
        headers: {},
        config: {},
      });
    });

    const { findByLabelText, findByTestId, findAllByRole } = render(
      <MemoryRouter>
        <UserVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));

      const checkbox = await findAllByRole('checkbox');
      userEvent.click(checkbox[1]);

      const verifyAllBtn = await findByTestId('btn-verify all (1)');
      userEvent.click(verifyAllBtn);
    });

    expect(await findByLabelText('Go to page 2')).toBeInTheDocument();
  });

  test('Should call the verify all function with failed', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getUsers');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          username: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_name: 'wx',
          first_name: 'Ankur',
          last_name: 'Nariya',
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockRoles: any = jest.spyOn(ValidationService, 'getRoles');
      mockRoles.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          role_name: Roles.admin,
        }, {
          id: 1,
          role_name: Roles.user,
        }],
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'validateUser');
      mockValidatePort.mockRejectedValue({
        status: 200,
        data: [],
        statusText: 'Success',
        headers: {},
        config: {},
      });
    });

    const {
      findByLabelText, findByTestId,
    } = render(
      <MemoryRouter>
        <UserVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));
      const checkbox = await findByTestId('checkbox-input');
      userEvent.click(checkbox);

      const verifyAllBtn = await findByTestId('btn-verify all (1)');
      userEvent.click(verifyAllBtn);
    });

    expect(await findByLabelText('Go to page 1')).toBeInTheDocument();
  });

  test('Should call the verify function with success', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getUsers');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          username: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_name: 'wx',
          first_name: 'Ankur',
          last_name: 'Nariya',
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockRoles: any = jest.spyOn(ValidationService, 'getRoles');
      mockRoles.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          role_name: Roles.admin,
        }, {
          id: 1,
          role_name: Roles.user,
        }],
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'validateUser');
      mockValidatePort.mockResolvedValue({
        status: 200,
        data: [],
        statusText: 'Success',
        headers: {},
        config: {},
      });
    });

    const {
      findByLabelText, findByTestId,
    } = render(
      <MemoryRouter>
        <UserVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));

      const verifyBtn = await findByTestId('btn-verify');
      userEvent.click(verifyBtn);
    });

    expect(await findByLabelText('Go to page 2')).toBeInTheDocument();
  });

  test('Should call the verify function with failed', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getUsers');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          username: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_name: 'wx',
          first_name: 'Ankur',
          last_name: 'Nariya',
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockRoles: any = jest.spyOn(ValidationService, 'getRoles');
      mockRoles.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          role_name: Roles.admin,
        }, {
          id: 1,
          role_name: Roles.user,
        }],
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'validateUser');
      mockValidatePort.mockRejectedValue({
        status: 200,
        data: [],
        statusText: 'Success',
        headers: {},
        config: {},
      });
    });

    const {
      findByLabelText, findByTestId,
    } = render(
      <MemoryRouter>
        <UserVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));

      const verifyBtn = await findByTestId('btn-verify');
      userEvent.click(verifyBtn);
    });

    expect(await findByLabelText('Go to page 1')).toBeInTheDocument();
  });

  test('Should change the verified page', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getUsers');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          username: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_name: 'wx',
          first_name: 'Ankur',
          last_name: 'Nariya',
          verified_on: new Date(),
          role_name: Roles.admin,
          verified_by: 'abcd',
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockRoles: any = jest.spyOn(ValidationService, 'getRoles');
      mockRoles.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          role_name: Roles.admin,
        }, {
          id: 1,
          role_name: Roles.user,
        }],
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { findByLabelText, findAllByRole } = render(
      <MemoryRouter>
        <UserVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));

      const checkbox = await findAllByRole('checkbox');
      userEvent.click(checkbox[0]);
    });

    expect(await findByLabelText('Go to page 2')).toBeInTheDocument();
  });
});
