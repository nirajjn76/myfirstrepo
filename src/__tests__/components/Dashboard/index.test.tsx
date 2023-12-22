import React from 'react';
import {
  test, describe, jest, afterEach,
} from '@jest/globals';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Dashboard from '../../../components/Dashboard';
import DashboardService from '../../../services/dashboard.service';
import AddPortService from '../../../services/addPort.service';

jest.mock('../../../services/dashboard.service');
jest.mock('../../../services/addPort.service');

describe('<Dashboard />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render dashboard page properly', async () => {
    act(() => {
      const mockNes = jest.spyOn(AddPortService, 'getNetworkElements');
      mockNes.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }], statusText: '', headers: {}, config: {},
      });

      const mockPortTypes = jest.spyOn(AddPortService, 'getPortTypes');
      mockPortTypes.mockResolvedValue({
        status: 200, data: [{ id: 1, port_type: '10 GB' }], statusText: '', headers: {}, config: {},
      });

      const mockGetSelectedNodes = jest.spyOn(DashboardService, 'getSelectedNodes');
      mockGetSelectedNodes.mockResolvedValue({
        status: 200, data: { selected_node_ids: [1] }, statusText: '', headers: {}, config: {},
      });

      const mock = jest.spyOn(DashboardService, 'getNodeWiseNr');
      mock.mockResolvedValue({
        status: 200, data: [], statusText: '', headers: {}, config: {},
      });
    });

    const { container } = render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(container.getElementsByClassName('menu-section-root').length).toBe(1);
    });
  });
});
