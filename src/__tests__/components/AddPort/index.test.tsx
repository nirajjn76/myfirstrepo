import React from 'react';
import {
  test, describe, jest, afterEach,
} from '@jest/globals';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import AddPort from '../../../components/AddPort';
import { ErrorMessages } from '../../../utils/appConstants';
import AddPortService from '../../../services/addPort.service';
import DashboardService from '../../../services/dashboard.service';
import { ErrorCodeMessageMapping, ErrorCodesMapping } from '../../../utils/apiConstants';

jest.mock('../../../services/addPort.service');
jest.mock('../../../services/dashboard.service');

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('<AddPort />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render add port page properly', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { findByText } = render(
      <MemoryRouter>
        <AddPort />
      </MemoryRouter>,
    );

    expect(await findByText('Select Network Element')).toBeInTheDocument();
  });

  test('Should render add port page properly if services failed', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockRejectedValue({
        status: 500, data: [], statusText: 'Failed', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockRejectedValue({
        status: 500, data: [], statusText: '', headers: {}, config: {},
      });
    });

    const { findByText } = render(
      <MemoryRouter>
        <AddPort />
      </MemoryRouter>,
    );

    expect(await findByText('Select Network Element')).toBeInTheDocument();
  });

  test('Should render add port page properly if get port types services failed', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockRejectedValue({
        status: 500, data: [], statusText: '', headers: {}, config: {},
      });
    });

    const { findByText } = render(
      <MemoryRouter>
        <AddPort />
      </MemoryRouter>,
    );

    expect(await findByText('Select Network Element')).toBeInTheDocument();
  });

  test('Should call no. of ports changed function', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { findByTestId } = render(
      <MemoryRouter>
        <AddPort />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('input-no-of-ports');
      userEvent.clear(input);
      userEvent.type(input, '3');
    });

    expect(await findByTestId('input-abcd Port 2')).toBeInTheDocument();
  });

  test('Should throw error if no. of ports value is not valid', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { getByTestId, findByText } = render(
      <MemoryRouter>
        <AddPort />
      </MemoryRouter>,
    );

    const input = getByTestId('input-no-of-ports');
    act(() => {
      userEvent.clear(input);
    });

    expect(await findByText(ErrorMessages.addPort.noOfPortsRequired)).toBeInTheDocument();
  });

  test('Should throw error if no. of ports value is zero', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { findByText, findByTestId } = render(
      <MemoryRouter>
        <AddPort />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('input-no-of-ports');
      userEvent.clear(input);
      userEvent.type(input, '0');
    });

    expect(await findByText(ErrorMessages.addPort.noOfPortsMinLimit)).toBeInTheDocument();
  });

  test('Should call port name change', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { findByTestId } = render(
      <MemoryRouter>
        <AddPort />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('input-abcd Port 1');
      const noOfPortsInput = await findByTestId('input-no-of-ports');
      userEvent.clear(noOfPortsInput);
      userEvent.type(noOfPortsInput, '3');
      userEvent.clear(input);
      userEvent.type(input, 'abcd');
    });

    expect(await findByTestId('input-abcd')).toBeInTheDocument();
  });

  test('Should call port description change', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { findByTestId } = render(
      <MemoryRouter>
        <AddPort />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('text-area-port-description-');
      userEvent.clear(input);
      userEvent.type(input, 'abcd');
    });

    expect(await findByTestId('text-area-port-description-abcd')).toBeInTheDocument();
  });

  test('Should call add port function with failed case 1006', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });

      const mockAddPorts = jest.spyOn(AddPortService, 'addPorts');
      mockAddPorts.mockRejectedValue({
        status: 401, data: { success: false }, statusText: '', headers: {}, config: {}, errorCode: ErrorCodesMapping[1006],
      });
    });

    const { findByTestId, findByText } = render(
      <MemoryRouter>
        <AddPort />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('text-area-port-description-');
      userEvent.clear(input);
      userEvent.type(input, 'abcd');

      const addBtn = await findByTestId('btn-add port');
      userEvent.click(addBtn);
    });

    expect(await findByText(ErrorCodeMessageMapping[1006])).toBeInTheDocument();
  });

  test('Should call add port function with failed case 1007', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });

      const mockAddPorts = jest.spyOn(AddPortService, 'addPorts');
      mockAddPorts.mockRejectedValue({
        status: 401, data: { success: false }, statusText: '', headers: {}, config: {}, errorCode: ErrorCodesMapping[1007],
      });
    });

    const { findByTestId, getByTestId } = render(
      <MemoryRouter>
        <AddPort />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('text-area-port-description-');
      userEvent.clear(input);
      userEvent.type(input, 'abcd');

      const addBtn = await findByTestId('btn-add port');
      userEvent.click(addBtn);
    });

    expect(() => getByTestId('input-error-no-of-ports')).toThrow('Unable to find an element');
  });

  test('Should call add port function with success', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });

      const mockAddPorts = jest.spyOn(AddPortService, 'addPorts');
      mockAddPorts.mockResolvedValue({
        status: 200, data: { success: true }, statusText: '', headers: {}, config: {},
      });

      const mockGetSelectedNodes = jest.spyOn(DashboardService, 'getSelectedNodes');
      mockGetSelectedNodes.mockResolvedValue({
        status: 200, data: { success: true, selected_node_ids: [3, 4] }, statusText: '', headers: {}, config: {},
      });

      const mockGetNodewiseNr = jest.spyOn(DashboardService, 'getNodeWiseNr');
      mockGetNodewiseNr.mockResolvedValue({
        status: 200, data: { success: true }, statusText: '', headers: {}, config: {},
      });
    });

    const { findByTestId } = render(
      <MemoryRouter>
        <AddPort />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('text-area-port-description-');
      userEvent.clear(input);
      userEvent.type(input, 'abcd');

      const addBtn = await findByTestId('btn-add port');
      userEvent.click(addBtn);
    });

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
