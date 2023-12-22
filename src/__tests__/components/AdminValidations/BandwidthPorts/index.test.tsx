import { describe, jest, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { SortOrder } from '../../../../enums';
import { TableConstants } from '../../../../utils/appConstants';
import BandwidthsPorts, { BandwidthsPortsListProps } from '../../../../components/AdminValidations/BandwidthPorts';

describe('<BandwidthsPorts />', () => {
  test('Should render ports page properly', () => {
    const props: BandwidthsPortsListProps = {
      verified: false,
      selected: [],
      page: 1,
      total: 2,
      bandwidthPorts: [{
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
      }],
      loading: false,
      verifyLoadingId: '',
      orderBy: 'id',
      order: SortOrder.asc,
      onPageChange: jest.fn(),
      onSelectRow: jest.fn(),
      onSelectAll: jest.fn(),
      onVerifyClick: jest.fn(),
      onRequestSort: jest.fn(),
    };
    const { getByText } = render(<BandwidthsPorts {...props} />);

    expect(getByText('Informat Port 7')).toBeInTheDocument();
  });

  test('Should render not verified ports page properly with selected users', () => {
    const props: BandwidthsPortsListProps = {
      verified: false,
      selected: [{
        id: [{ f_id: 8163, verified: 0 }, { n_id: 2, verified: 0 }],
      }],
      page: 1,
      total: 2,
      bandwidthPorts: [{
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
        nverified: 1,
        fverified: 0,
        verified_by: null,
        verified_on: null,
      }],
      loading: false,
      verifyLoadingId: '',
      orderBy: 'first_name',
      order: SortOrder.asc,
      onPageChange: jest.fn(),
      onSelectRow: jest.fn(),
      onSelectAll: jest.fn(),
      onVerifyClick: jest.fn(),
      onRequestSort: jest.fn(),
    };
    const { container } = render(<BandwidthsPorts {...props} />);

    const input = container.getElementsByClassName('selection-checkbox')[1] as HTMLInputElement;
    const root = input.closest('.MuiButtonBase-root');

    expect(root?.classList.contains('Mui-checked')).toBe(true);
  });

  test('Should render loading row for loading the api', () => {
    const props: BandwidthsPortsListProps = {
      selected: [{
        id: 1,
      }],
      verified: false,
      page: 1,
      total: 2,
      bandwidthPorts: [{
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
      loading: true,
      verifyLoadingId: '',
      orderBy: 'first_name',
      order: SortOrder.asc,
      onPageChange: jest.fn(),
      onSelectRow: jest.fn(),
      onSelectAll: jest.fn(),
      onVerifyClick: jest.fn(),
      onRequestSort: jest.fn(),
    };
    const { container } = render(<BandwidthsPorts {...props} />);

    expect(container.getElementsByClassName('loading-row').length).toEqual(1);
  });

  test('Should render empty row', () => {
    const props: BandwidthsPortsListProps = {
      verified: false,
      selected: [],
      page: 1,
      total: 0,
      bandwidthPorts: [],
      loading: false,
      verifyLoadingId: '',
      orderBy: 'first_name',
      order: SortOrder.asc,
      onPageChange: jest.fn(),
      onSelectRow: jest.fn(),
      onSelectAll: jest.fn(),
      onVerifyClick: jest.fn(),
      onRequestSort: jest.fn(),
    };
    const { getByText } = render(<BandwidthsPorts {...props} />);

    expect(getByText(TableConstants.noRecordsFound)).toBeInTheDocument();
  });

  test('Should call the page change function', () => {
    const onPageChange = jest.fn();
    const props = {
      verified: false,
      selected: [],
      page: 1,
      total: 20,
      bandwidthPorts: [{
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
      loading: true,
      verifyLoadingId: '',
      orderBy: 'first_name',
      order: SortOrder.asc,
      onSelectRow: jest.fn(),
      onSelectAll: jest.fn(),
      onVerifyClick: jest.fn(),
      onRequestSort: jest.fn(),
    };
    const { getByLabelText } = render(<BandwidthsPorts {...props} onPageChange={onPageChange} />);

    fireEvent.click(getByLabelText('Go to page 2'));

    expect(onPageChange).toHaveBeenCalled();
  });
});
