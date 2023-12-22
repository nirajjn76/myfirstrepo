import { test, describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { Roles } from '../../enums';
import DeleteBandwidthPorts from '../../pages/DeleteBandwidthPorts';
import ValidationService from '../../services/validations.service';

describe('<DeleteBandwidthPorts />', () => {
  test('Should render delete ports page properly', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeleteBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          owner_id: 2,
          owner_name: 'wx',
          nport_name: 'abcd@ab',
          n_port_id: 1,
          ndescription: 'Ankur',
          nverified: 0,
          fport_name: 'abcd@ab',
          f_port_id: 1,
          fdescription: 'Ankur',
          fverified: 0,
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
        <DeleteBandwidthPorts />
      </MemoryRouter>,
    );
    expect(await findByText('Delete Bandwidth')).toBeInTheDocument();
  });

  test('Should render delete ports page properly if service returned an error', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeleteBandwidthPorts');
      mock.mockRejectedValue({
        status: 500,
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { findByText } = render(
      <MemoryRouter>
        <DeleteBandwidthPorts />
      </MemoryRouter>,
    );
    expect(await findByText('Delete Bandwidth')).toBeInTheDocument();
  });

  test('Should call the page change function', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeleteBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          owner_id: 2,
          owner_name: 'wx',
          nport_name: 'abcd@ab',
          n_port_id: 1,
          ndescription: 'Ankur',
          nverified: 0,
          fport_name: 'abcd@ab',
          f_port_id: 1,
          fdescription: 'Ankur',
          fverified: 0,
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
        <DeleteBandwidthPorts />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));
    });

    expect(await findByLabelText('Go to page 1')).toBeInTheDocument();
  });

  test('Should call the handle sort function', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeleteBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          owner_id: 2,
          owner_name: 'wx',
          nport_name: 'abcd@ab',
          n_port_id: 1,
          ndescription: 'Ankur',
          nverified: 1,
          fport_name: 'abcd@ab',
          f_port_id: 1,
          fdescription: 'Ankur',
          fverified: 0,
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
        <DeleteBandwidthPorts />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(container.getElementsByClassName('sort-label')[2] as HTMLInputElement);
      expect(await findByTestId('sort-desc-label')).toBeInTheDocument();
    });
  });

  test('Should call the search text changed function', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getDeleteBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          owner_id: 2,
          owner_name: 'wx',
          nport_name: 'abcd@ab',
          n_port_id: 1,
          ndescription: 'Ankur',
          nverified: 0,
          fport_name: 'abcd@ab',
          f_port_id: 1,
          fdescription: 'Ankur',
          fverified: 1,
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
        <DeleteBandwidthPorts />
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
      const mock: any = jest.spyOn(ValidationService, 'getDeleteBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          owner_id: 2,
          owner_name: 'wx',
          nport_name: 'abcd@ab',
          n_port_id: 1,
          ndescription: 'Ankur',
          nverified: 1,
          fport_name: 'abcd@ab',
          f_port_id: 1,
          fdescription: 'Ankur',
          fverified: 1,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'deleteBandwidth');
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
        <DeleteBandwidthPorts />
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
      const mock: any = jest.spyOn(ValidationService, 'getDeleteBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          owner_id: 2,
          owner_name: 'wx',
          nport_name: 'abcd@ab',
          n_port_id: 1,
          ndescription: 'Ankur',
          nverified: 1,
          fport_name: 'abcd@ab',
          f_port_id: 1,
          fdescription: 'Ankur',
          fverified: 0,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'deleteBandwidth');
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
        <DeleteBandwidthPorts />
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
      const mock: any = jest.spyOn(ValidationService, 'getDeleteBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          owner_id: 2,
          owner_name: 'wx',
          nport_name: 'abcd@ab',
          n_port_id: 1,
          ndescription: 'Ankur',
          nverified: 1,
          fport_name: 'abcd@ab',
          f_port_id: 1,
          fdescription: 'Ankur',
          fverified: 0,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'deleteBandwidth');
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
        <DeleteBandwidthPorts />
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
      const mock: any = jest.spyOn(ValidationService, 'getDeleteBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          owner_id: 2,
          owner_name: 'wx',
          nport_name: 'abcd@ab',
          n_port_id: 1,
          ndescription: 'Ankur',
          nverified: 1,
          fport_name: 'abcd@ab',
          f_port_id: 1,
          fdescription: 'Ankur',
          fverified: 0,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'deleteBandwidth');
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
        <DeleteBandwidthPorts />
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
      const mock: any = jest.spyOn(ValidationService, 'getDeleteBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          owner_id: 2,
          owner_name: 'wx',
          nport_name: 'abcd@ab',
          n_port_id: 1,
          ndescription: 'Ankur',
          nverified: 1,
          fport_name: 'abcd@ab',
          f_port_id: 1,
          fdescription: 'Ankur',
          fverified: 0,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'deleteBandwidth');
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
        <DeleteBandwidthPorts />
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
