import React from 'react';
import {
  test, describe, jest, afterEach, expect,
} from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import ManageBandwidth from '../../../../components/ManageBandwidth/index';
import { ErrorMessages } from '../../../../utils/appConstants';
import AddPortService from '../../../../services/addPort.service';
import ManagePortsService from '../../../../services/managePorts.service';
import ManageBandwidthService from '../../../../services/manageBandwidth.service';
import { ErrorCodeMessageMapping, ErrorCodesMapping } from '../../../../utils/apiConstants';

jest.mock('../../../../services/addPort.service');
jest.mock('../../../../services/managePorts.service');

describe('<ManageBandwidth />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should render manage bandwidth page properly', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <ManageBandwidth />
      </MemoryRouter>,
    );

    await waitFor(() => {
      getByText('Manage Bandwidth');
      expect(getByText('Manage Bandwidth')).toBeTruthy();
    });
  });
});
