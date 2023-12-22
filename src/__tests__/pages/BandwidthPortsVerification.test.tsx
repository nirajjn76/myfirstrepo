import { test, describe, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import BandwidthPortsVerification from '../../pages/BandwidthPortsVerification';
import ValidationService from '../../services/validations.service';

describe('<BandwidthPortsVerification />', () => {
  test('Should render bandwidth ports verification page properly', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          created_at: '2021-12-13T08:20:54.000Z',
          fport_name: 'Informat Port 7',
          nport_name: 'Cermark Port 7',
          fdescription: 'abcd',
          ndescription: 'abcd',
          nne_name: 'Westin Building',
          fne_name: 'One Wilshire',
          organization_name: 'zymr',
          first_name: 'ankur',
          last_name: 'nariya',
          nposition_in: 1,
          fpostion_in: 1,
          f_port_id: 8163,
          n_port_id: 8161,
          nverified: 0,
          fverified: 0,
          verified_by: null,
          verified_on: null,
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
        <BandwidthPortsVerification />
      </MemoryRouter>,
    );
    expect(await findByText('Physical Validation - Bandwidth')).toBeInTheDocument();
  });

  test('Should render port verification page properly if service returned an error', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getBandwidthPorts');
      mock.mockRejectedValue({
        status: 500,
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { findByText } = render(
      <MemoryRouter>
        <BandwidthPortsVerification />
      </MemoryRouter>,
    );
    expect(await findByText('Physical Validation - Bandwidth')).toBeInTheDocument();
  });

  test('Should call the page change function', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          created_at: '2021-12-13T08:20:54.000Z',
          fport_name: 'Informat Port 7',
          nport_name: 'Cermark Port 7',
          fdescription: 'abcd',
          ndescription: 'abcd',
          nne_name: 'Westin Building',
          fne_name: 'One Wilshire',
          organization_name: 'zymr',
          first_name: 'ankur',
          last_name: 'nariya',
          nposition_in: 1,
          fpostion_in: 1,
          f_port_id: 8163,
          n_port_id: 8161,
          nverified: 0,
          fverified: 0,
          verified_by: null,
          verified_on: null,
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
        <BandwidthPortsVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      fireEvent.click(await findByLabelText('Go to page 2'));
    });

    expect(await findByLabelText('Go to page 1')).toBeInTheDocument();
  });

  test('Should call the handle sort function', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          created_at: '2021-12-13T08:20:54.000Z',
          fport_name: 'Informat Port 7',
          nport_name: 'Cermark Port 7',
          fdescription: 'abcd',
          ndescription: 'abcd',
          nne_name: 'Westin Building',
          fne_name: 'One Wilshire',
          organization_name: 'zymr',
          first_name: 'ankur',
          last_name: 'nariya',
          nposition_in: 1,
          fpostion_in: 1,
          f_port_id: 8163,
          n_port_id: 8161,
          nverified: 0,
          fverified: 0,
          verified_by: null,
          verified_on: null,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { findAllByTestId, findByTestId, debug } = render(
      <MemoryRouter>
        <BandwidthPortsVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      const ascLabel = await findAllByTestId('sort-asc-label');
      userEvent.click(ascLabel[0]);
      userEvent.click(ascLabel[0]);

      expect(await findByTestId('sort-desc-label')).toBeInTheDocument();
    });
  });

  test('Should call the search text changed function', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          created_at: '2021-12-13T08:20:54.000Z',
          fport_name: 'Informat Port 7',
          nport_name: 'Cermark Port 7',
          fdescription: 'abcd',
          ndescription: 'abcd',
          nne_name: 'Westin Building',
          fne_name: 'One Wilshire',
          organization_name: 'zymr',
          first_name: 'ankur',
          last_name: 'nariya',
          nposition_in: 1,
          fpostion_in: 1,
          f_port_id: 8163,
          n_port_id: 8161,
          nverified: 0,
          fverified: 0,
          verified_by: null,
          verified_on: null,
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
        <BandwidthPortsVerification />
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
      const mock: any = jest.spyOn(ValidationService, 'getBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          created_at: '2021-12-13T08:20:54.000Z',
          fport_name: 'Informat Port 7',
          nport_name: 'Cermark Port 7',
          fdescription: 'abcd',
          ndescription: 'abcd',
          nne_name: 'Westin Building',
          fne_name: 'One Wilshire',
          organization_name: 'zymr',
          first_name: 'ankur',
          last_name: 'nariya',
          nposition_in: 1,
          fpostion_in: 1,
          f_port_id: 8163,
          n_port_id: 8161,
          nverified: 0,
          fverified: 0,
          verified_by: null,
          verified_on: null,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'validateBandwidthPorts');
      mockValidatePort.mockResolvedValue({
        status: 200,
        data: [],
        statusText: 'Success',
        headers: {},
        config: {},
      });
    });

    const {
      findByLabelText, findByTestId, findAllByRole,
    } = render(
      <MemoryRouter>
        <BandwidthPortsVerification />
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
      const mock: any = jest.spyOn(ValidationService, 'getBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          created_at: '2021-12-13T08:20:54.000Z',
          fport_name: 'Informat Port 7',
          nport_name: 'Cermark Port 7',
          fdescription: 'abcd',
          ndescription: 'abcd',
          nne_name: 'Westin Building',
          fne_name: 'One Wilshire',
          organization_name: 'zymr',
          first_name: 'ankur',
          last_name: 'nariya',
          nposition_in: 1,
          fpostion_in: 1,
          f_port_id: 8163,
          n_port_id: 8161,
          nverified: 0,
          fverified: 0,
          verified_by: null,
          verified_on: null,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'validateBandwidthPorts');
      mockValidatePort.mockResolvedValue({
        status: 200,
        data: [],
        statusText: 'Success',
        headers: {},
        config: {},
      });
    });

    const {
      findByLabelText, findByTestId, findAllByRole,
    } = render(
      <MemoryRouter>
        <BandwidthPortsVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      fireEvent.click(await findByLabelText('Go to page 2'));

      const checkbox = await findAllByRole('checkbox');
      userEvent.click(checkbox[1]);

      const verifyAllBtn = await findByTestId('btn-verify all (1)');
      userEvent.click(verifyAllBtn);
    });

    expect(await findByLabelText('Go to page 2')).toBeInTheDocument();
  });

  test('Should call the verify all function with failed', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          created_at: '2021-12-13T08:20:54.000Z',
          fport_name: 'Informat Port 7',
          nport_name: 'Cermark Port 7',
          fdescription: 'abcd',
          ndescription: 'abcd',
          nne_name: 'Westin Building',
          fne_name: 'One Wilshire',
          organization_name: 'zymr',
          first_name: 'ankur',
          last_name: 'nariya',
          nposition_in: 1,
          fpostion_in: 1,
          f_port_id: 8163,
          n_port_id: 8161,
          nverified: 0,
          fverified: 0,
          verified_by: null,
          verified_on: null,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'validateBandwidthPorts');
      mockValidatePort.mockRejectedValue({
        status: 500,
        data: [],
        statusText: 'Failed',
        headers: {},
        config: {},
      });
    });

    const {
      findByLabelText, findByTestId, findAllByRole,
    } = render(
      <MemoryRouter>
        <BandwidthPortsVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));
      const checkbox = await findAllByRole('checkbox');
      userEvent.click(checkbox[1]);

      const verifyAllBtn = await findByTestId('btn-verify all (1)');
      userEvent.click(verifyAllBtn);
    });

    expect(await findByLabelText('Go to page 1')).toBeInTheDocument();
  });

  test('Should call the verify function with success', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          created_at: '2021-12-13T08:20:54.000Z',
          fport_name: 'Informat Port 7',
          nport_name: 'Cermark Port 7',
          fdescription: 'abcd',
          ndescription: 'abcd',
          nne_name: 'Westin Building',
          fne_name: 'One Wilshire',
          organization_name: 'zymr',
          first_name: 'ankur',
          last_name: 'nariya',
          nposition_in: 1,
          fpostion_in: 1,
          f_port_id: 8163,
          n_port_id: 8161,
          nverified: 0,
          fverified: 0,
          verified_by: null,
          verified_on: null,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'validateBandwidthPorts');
      mockValidatePort.mockResolvedValue({
        status: 200,
        data: [],
        statusText: 'Success',
        headers: {},
        config: {},
      });
    });

    const {
      findByLabelText, findAllByTestId,
    } = render(
      <MemoryRouter>
        <BandwidthPortsVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));

      const verifyBtn = await findAllByTestId('btn-verify');
      userEvent.click(verifyBtn[0]);
    });

    expect(await findByLabelText('Go to page 2')).toBeInTheDocument();
  });

  test('Should call the verify function with failed', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          created_at: '2021-12-13T08:20:54.000Z',
          fport_name: 'Informat Port 7',
          nport_name: 'Cermark Port 7',
          fdescription: 'abcd',
          ndescription: 'abcd',
          nne_name: 'Westin Building',
          fne_name: 'One Wilshire',
          organization_name: 'zymr',
          first_name: 'ankur',
          last_name: 'nariya',
          nposition_in: 1,
          fpostion_in: 1,
          f_port_id: 8163,
          n_port_id: 8161,
          nverified: 0,
          fverified: 0,
          verified_by: null,
          verified_on: null,
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });

      const mockValidatePort: any = jest.spyOn(ValidationService, 'validateBandwidthPorts');
      mockValidatePort.mockRejectedValue({
        status: 401,
        data: [],
        statusText: 'Failed',
        headers: {},
        config: {},
      });
    });

    const {
      findByLabelText, findAllByTestId,
    } = render(
      <MemoryRouter>
        <BandwidthPortsVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));

      const verifyBtn = await findAllByTestId('btn-verify');
      userEvent.click(verifyBtn[0]);
    });

    expect(await findByLabelText('Go to page 1')).toBeInTheDocument();
  });

  test.skip('Should change the verified page', async () => {
    act(() => {
      const mock: any = jest.spyOn(ValidationService, 'getBandwidthPorts');
      mock.mockResolvedValue({
        status: 200,
        data: [{
          created_at: '2021-12-13T08:20:54.000Z',
          port_name: 'Informat Port 7',
          port_description: 'abcd',
          ne_name: 'Westin Building',
          organization_name: 'zymr',
          first_name: 'ankur',
          last_name: 'nariya',
          position_in_ne: 1,
          id: 8163,
          verified_by: 'ankur.n',
          verified_on: new Date(),
        }],
        pagination: {
          totalRecords: 20,
        },
        statusText: '',
        headers: {},
        config: {},
      });
    });

    const { findByLabelText, findAllByRole, debug } = render(
      <MemoryRouter>
        <BandwidthPortsVerification />
      </MemoryRouter>,
    );

    await act(async () => {
      userEvent.click(await findByLabelText('Go to page 2'));

      // debug()
      const checkbox = await findAllByRole('checkbox');
      userEvent.click(checkbox[0]);
      // debug()
    });

    expect(await findByLabelText('Go to page 2')).toBeInTheDocument();
  });
});
