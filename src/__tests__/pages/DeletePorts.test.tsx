import { test, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { Roles } from '../../enums';
import DeletePorts from '../../pages/DeletePorts';
import ValidationService from '../../services/validations.service';

describe('<DeletePorts />', () => {
  test('Should render delete ports page properly', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeletePorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          port_name: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_id: '1',
          organization_name: 'wx',
          port_description: 'Ankur',
          verified: 0,
        }],
        pagination: {
          totalRecords: 10,
        },
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { findByText } = render(
      <MemoryRouter>
        <DeletePorts />
      </MemoryRouter>,
    );
    expect(await findByText('Delete Network Resources')).toBeInTheDocument();
  });

  test('Should render delete ports page properly if service returned an error', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeletePorts');
      mock.mockRejectedValue({
        status: 500,
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { findByText } = render(
      <MemoryRouter>
        <DeletePorts />
      </MemoryRouter>,
    );
    expect(await findByText('Delete Network Resources')).toBeInTheDocument();
  });

  test('Should call the page change function', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeletePorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          port_name: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_id: '1',
          organization_name: 'wx',
          port_description: 'Ankur',
          verified: 0,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { findByLabelText } = render(
      <MemoryRouter>
        <DeletePorts />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));
    });

    expect(await findByLabelText('Go to page 1')).toBeInTheDocument();
  });

  test('Should call the handle sort function', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeletePorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          port_name: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_id: '1',
          organization_name: 'wx',
          port_description: 'Ankur',
          verified: 1,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { container, findByTestId } = render(
      <MemoryRouter>
        <DeletePorts />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(container.getElementsByClassName('sort-label')[0] as HTMLInputElement);
      expect(await findByTestId('sort-desc-label')).toBeInTheDocument();
    });
  });

  test('Should call the search text changed function', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeletePorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          port_name: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_id: '1',
          organization_name: 'wx',
          port_description: 'Ankur',
          verified: 1,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { findByLabelText, findByTestId } = render(
      <MemoryRouter>
        <DeletePorts />
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

  test('Should call the delete all function with success', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeletePorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          port_name: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_id: '1',
          organization_name: 'wx',
          port_description: 'Ankur',
          verified: 1,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'deletePort');
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
        <DeletePorts />
      </MemoryRouter>,
    );

    await act(async () => {
      const checkbox = await findAllByRole('checkbox');
      userEvent.click(checkbox[0]);

      const verifyAllBtn = await findByTestId('btn-delete all (1)');
      userEvent.click(verifyAllBtn);
    });

    expect(await findByLabelText('Go to page 2')).toBeInTheDocument();
  });

  test('Should call the delete all function with success and set page to 1', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeletePorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          port_name: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_id: '1',
          organization_name: 'wx',
          port_description: 'Ankur',
          verified: 1,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'deletePort');
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
        <DeletePorts />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));

      const checkbox = await findAllByRole('checkbox');
      userEvent.click(checkbox[0]);

      const verifyAllBtn = await findByTestId('btn-delete all (1)');
      userEvent.click(verifyAllBtn);
    });

    expect(await findByLabelText('Go to page 1')).toBeInTheDocument();
  });

  test('Should call the delete all function with failed', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeletePorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          port_name: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_id: '1',
          organization_name: 'wx',
          port_description: 'Ankur',
          verified: 1,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'deletePort');
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
        <DeletePorts />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));
      const checkbox = await findByTestId('checkbox-input');
      userEvent.click(checkbox);

      const verifyAllBtn = await findByTestId('btn-delete all (1)');
      userEvent.click(verifyAllBtn);
    });

    expect(await findByLabelText('Go to page 1')).toBeInTheDocument();
  });

  test('Should call the verify function with success', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeletePorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          port_name: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_id: '1',
          organization_name: 'wx',
          port_description: 'Ankur',
          verified: 1,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'deletePort');
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
        <DeletePorts />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));

      const verifyBtn = await findByTestId('btn-delete');
      userEvent.click(verifyBtn);
    });

    expect(await findByLabelText('Go to page 1')).toBeInTheDocument();
  });

  test('Should call the verify function with failed', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeletePorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          id: 1,
          created_at: new Date(),
          port_name: 'abcd@ab',
          email: 'abcd@gmail.com',
          organization_id: '1',
          organization_name: 'wx',
          port_description: 'Ankur',
          verified: 1,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'deletePort');
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
        <DeletePorts />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));

      const verifyBtn = await findByTestId('btn-delete');
      userEvent.click(verifyBtn);
    });

    expect(await findByLabelText('Go to page 1')).toBeInTheDocument();
  });
});
