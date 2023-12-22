import {
  test, describe, jest, afterEach,
} from '@jest/globals';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import ManagePorts from '../../../components/ManagePorts';
import ManagePortsService from '../../../services/managePorts.service';
import AddPortService from '../../../services/addPort.service';

jest.mock('../../../services/managePorts.service');
jest.mock('../../../services/addPort.service');

describe('<ManagePortsComponent />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render Network Elements in Manage Ports page properly', async () => {
    act(() => {
      const mock = jest.spyOn(AddPortService, 'getNetworkElements');
      mock.mockResolvedValue({
        status: 200, data: [{ ne_name: 'abcd', id: 1 }, { ne_name: 'abcd2', id: 1 }, { ne_name: 'abcd3', id: 1 }], statusText: '', headers: {}, config: {},
      });
    });

    const { getByText } = render(
      // <MemoryRouter>
      <ManagePorts />,
      // </MemoryRouter>,
    );

    await waitFor(() => {
      expect(getByText('Manage Ports')).toBeInTheDocument();
    });
  });
});
