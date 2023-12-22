import { describe, jest, test } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react';
import NotverifiedBandwidthsRow from '../../../../components/AdminValidations/BandwidthPorts/NotverifiedBandwidthsRow';

describe('<NotverifiedBandwidthsRow />', () => {
  test('Should call handle select row', async () => {
    const onSelectRow = jest.fn();
    const props = {
      bandwidthPort: {
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
        fverified: 1,
        verified_by: null,
        verified_on: null,
      },
      verifyLoadingId: '',
      rowSelected: false,
      selected: [],
      onVerifyClick: jest.fn(),
    };
    const { getByTestId } = render(<NotverifiedBandwidthsRow {...props} onSelectRow={onSelectRow} />);

    await waitFor(() => getByTestId('checkbox'));
    fireEvent.click(getByTestId('checkbox-input'));

    expect(onSelectRow).toHaveBeenCalled();
  });

  test('Should call handle select row with default items selected', async () => {
    const onSelectRow = jest.fn();
    const props = {
      bandwidthPort: {
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
        fverified: 1,
        verified_by: null,
        verified_on: null,
      },
      verifyLoadingId: '',
      rowSelected: false,
      selected: [{
        id: [{ f_id: 1, verified: 0 }, { n_id: 2, verified: 0 }],
      }],
      onVerifyClick: jest.fn(),
    };
    const { getByTestId } = render(<NotverifiedBandwidthsRow {...props} onSelectRow={onSelectRow} />);

    await waitFor(() => getByTestId('checkbox'));
    fireEvent.click(getByTestId('checkbox-input'));

    expect(onSelectRow).toHaveBeenCalled();
  });

  test('Should call handle select row with default items selected and selected position is last', async () => {
    const onSelectRow = jest.fn();
    const props = {
      bandwidthPort: {
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
        fverified: 1,
        verified_by: null,
        verified_on: null,
      },
      verifyLoadingId: '',
      rowSelected: false,
      selected: [{
        id: [{ f_id: 1, verified: 0 }, { n_id: 2, verified: 0 }],
      }, {
        id: [{ f_id: 3, verified: 0 }, { n_id: 4, verified: 0 }],
      }, {
        id: [{ f_id: 8163, verified: 0 }, { n_id: 2, verified: 0 }],
      }],
      onVerifyClick: jest.fn(),
    };
    const { getByTestId } = render(<NotverifiedBandwidthsRow {...props} onSelectRow={onSelectRow} />);

    await waitFor(() => getByTestId('checkbox'));
    fireEvent.click(getByTestId('checkbox-input'));

    expect(onSelectRow).toHaveBeenCalled();
  });

  test('Should call handle select row with default items selected and selected position is not last and first', async () => {
    const onSelectRow = jest.fn();
    const props = {
      bandwidthPort: {
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
        fverified: 1,
        verified_by: null,
        verified_on: null,
      },
      verifyLoadingId: '',
      rowSelected: false,
      selected: [{
        id: [{ f_id: 1, verified: 0 }, { n_id: 2, verified: 0 }],
      }, {
        id: [{ f_id: 8163, verified: 0 }, { n_id: 2, verified: 0 }],
      }, {
        id: [{ f_id: 3, verified: 0 }, { n_id: 4, verified: 0 }],
      }],
      onVerifyClick: jest.fn(),
    };
    const { getByTestId } = render(<NotverifiedBandwidthsRow {...props} onSelectRow={onSelectRow} />);

    await waitFor(() => getByTestId('checkbox'));
    fireEvent.click(getByTestId('checkbox-input'));

    expect(onSelectRow).toHaveBeenCalled();
  });
});
