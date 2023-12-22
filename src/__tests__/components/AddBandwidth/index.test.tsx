import React from 'react';
import {
  test, describe, jest, afterEach,
} from '@jest/globals';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import AddBandwidth from '../../../components/AddBandwidth';
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

describe('<AddBandwidthComponent />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render add bandwidth page properly', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { getByText } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    await waitFor(() => {
      getByText('Bandwidth Description');
      expect(getByText('Bandwidth Description')).toBeInTheDocument();
    });
  });

  test('Should render add bandwidth page properly if services failed', async () => {
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

    const { getByText } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    await waitFor(() => {
      getByText('Bandwidth Description');
      expect(getByText('Bandwidth Description')).toBeInTheDocument();
    });
  });

  test('Should render add bandwidth page properly if get port types services failed', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockRejectedValue({
        status: 500, data: [], statusText: '', headers: {}, config: {},
      });
    });

    const { getByText } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    await waitFor(() => {
      getByText('Bandwidth Description');
      expect(getByText('Bandwidth Description')).toBeInTheDocument();
    });
  });

  test('Should call bandwidth description change function', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { findByTestId } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('text-area-bandwidth-description-');
      userEvent.clear(input);
      userEvent.type(input, 'abcd');
    });

    expect(await findByTestId('text-area-bandwidth-description-abcd')).toBeInTheDocument();
  });

  test('Should call farend port description change function', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { findByTestId } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('text-area-port-description-fe-');
      userEvent.clear(input);
      userEvent.type(input, 'abcd');
    });

    expect(await findByTestId('text-area-port-description-fe-abcd')).toBeInTheDocument();
  });

  test('Should call nearend port description change function', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { findByTestId } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('text-area-port-description-ne-');
      userEvent.clear(input);
      userEvent.type(input, 'abcd');
    });

    expect(await findByTestId('text-area-port-description-ne-abcd')).toBeInTheDocument();
  });

  test('Should call no. of links changed function', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { findByTestId } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('input-no-of-links');
      userEvent.clear(input);
      userEvent.type(input, '3');
    });

    expect(await findByTestId('input-abcd Port 2')).toBeInTheDocument();
    expect(await findByTestId('input-abcd2 Port 2')).toBeInTheDocument();
  });

  test('Should throw error if no. of links value is not valid', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { getByTestId, findByText } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    const input = getByTestId('input-no-of-links');
    act(() => {
      userEvent.clear(input);
    });

    expect(await findByText(ErrorMessages.addBandwidth.noOfLinksRequired)).toBeInTheDocument();
  });

  test('Should throw error if no. of links value is zero', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { findByTestId, findByText } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('input-no-of-links');
      userEvent.clear(input);
      userEvent.type(input, '0');
    });

    expect(await findByText(ErrorMessages.addBandwidth.noOfLinksMinLimit)).toBeInTheDocument();
  });

  test('Should call farend port name change', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { findByTestId } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('input-abcd Port 1');
      const noOfPortsInput = await findByTestId('input-no-of-links');
      userEvent.clear(noOfPortsInput);
      userEvent.type(noOfPortsInput, '3');
      userEvent.clear(input);
      userEvent.type(input, 'abcd');
    });

    expect(await findByTestId('input-abcd')).toBeInTheDocument();
  });

  test('Should call nearend port name change', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { findByTestId } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    await act(async () => {
      const input = await findByTestId('input-abcd2 Port 1');
      const noOfPortsInput = await findByTestId('input-no-of-links');
      userEvent.clear(noOfPortsInput);
      userEvent.type(noOfPortsInput, '3');
      userEvent.clear(input);
      userEvent.type(input, 'abcd');
    });

    expect(await findByTestId('input-abcd')).toBeInTheDocument();
  });

  test('Should call swipe function', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });
    });

    const { findByTestId } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    await act(async () => {
      expect(await findByTestId('input-abcd Port 1')).toBeInTheDocument();
      expect(await findByTestId('input-abcd2 Port 1')).toBeInTheDocument();

      const swipeIcon = await findByTestId('swipe-icon');
      userEvent.click(swipeIcon);
    });

    expect(await findByTestId('input-abcd Port 1')).toBeInTheDocument();
    expect(await findByTestId('input-abcd2 Port 1')).toBeInTheDocument();
  });

  test('Should call add bandwidth function with failed case 1008', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });

      const mockAddBandwidth = jest.spyOn(AddPortService, 'addBandwidth');
      mockAddBandwidth.mockRejectedValue({
        status: 401, data: { success: false }, statusText: '', headers: {}, config: {}, errorCode: ErrorCodesMapping[1006],
      });
    });

    const { findByTestId, findByText } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    await act(async () => {
      const bandwidthDesc = await findByTestId('text-area-bandwidth-description-');
      userEvent.clear(bandwidthDesc);
      userEvent.type(bandwidthDesc, 'abcd');

      const fePortDesc = await findByTestId('text-area-port-description-fe-');
      userEvent.clear(fePortDesc);
      userEvent.type(fePortDesc, 'abcd');

      const nePortDesc = await findByTestId('text-area-port-description-ne-');
      userEvent.clear(nePortDesc);
      userEvent.type(nePortDesc, 'abcd');

      const addBtn = await findByTestId('btn-add bandwidth');
      userEvent.click(addBtn);
    });

    expect(await findByText(ErrorCodeMessageMapping[1008])).toBeInTheDocument();
  });

  test('Should call add bandwidth function with failed case 1009', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });

      const mockAddBandwidth = jest.spyOn(AddPortService, 'addBandwidth');
      mockAddBandwidth.mockRejectedValue({
        status: 401, data: { success: false }, statusText: '', headers: {}, config: {}, errorCode: ErrorCodesMapping[1007],
      });
    });

    const { findByTestId, getByTestId } = render(
      <MemoryRouter>
        <AddBandwidth />
      </MemoryRouter>,
    );

    await act(async () => {
      const bandwidthDesc = await findByTestId('text-area-bandwidth-description-');
      userEvent.clear(bandwidthDesc);
      userEvent.type(bandwidthDesc, 'abcd');

      const fePortDesc = await findByTestId('text-area-port-description-fe-');
      userEvent.clear(fePortDesc);
      userEvent.type(fePortDesc, 'abcd');

      const nePortDesc = await findByTestId('text-area-port-description-ne-');
      userEvent.clear(nePortDesc);
      userEvent.type(nePortDesc, 'abcd');

      const addBtn = await findByTestId('btn-add bandwidth');
      userEvent.click(addBtn);
    });

    expect(() => getByTestId('input-error-no-of-links')).toThrow('Unable to find an element');
  });

  test('Should call add bandwidth function with success', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });

      const mockAddBandwidth = jest.spyOn(AddPortService, 'addBandwidth');
      mockAddBandwidth.mockResolvedValue({
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
        <AddBandwidth />
      </MemoryRouter>,
    );

    await act(async () => {
      const bandwidthDesc = await findByTestId('text-area-bandwidth-description-');
      userEvent.clear(bandwidthDesc);
      userEvent.type(bandwidthDesc, 'abcd');

      const fePortDesc = await findByTestId('text-area-port-description-fe-');
      userEvent.clear(fePortDesc);
      userEvent.type(fePortDesc, 'abcd');

      const nePortDesc = await findByTestId('text-area-port-description-ne-');
      userEvent.clear(nePortDesc);
      userEvent.type(nePortDesc, 'abcd');

      const addBtn = await findByTestId('btn-add bandwidth');
      userEvent.click(addBtn);
    });

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
