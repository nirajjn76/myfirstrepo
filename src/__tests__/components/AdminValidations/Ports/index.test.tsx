import { describe, jest, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { SortOrder } from '../../../../enums';
import { TableConstants } from '../../../../utils/appConstants';
import Ports, { PortsListProps } from '../../../../components/AdminValidations/Ports';

describe('<Ports />', () => {
  test('Should render ports page properly', () => {
    const props: PortsListProps = {
      verified: false,
      selected: [],
      page: 1,
      total: 2,
      ports: [{
        id: 1,
        created_at: new Date(),
        ne_name: 'Abcd',
        street: 'street',
        city: 'city',
        state: 'state',
        country: 'country',
        port_name: 'Port 1',
        organization_name: 'wx',
        first_name: 'Ankur',
        last_name: 'Nariya',

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
    const { getByText } = render(<Ports {...props} />);

    expect(getByText('Port 1')).toBeInTheDocument();
  });

  test('Should render not verified ports page properly with selected users', () => {
    const props: PortsListProps = {
      verified: false,
      selected: [{
        id: 1,
      }],
      page: 1,
      total: 2,
      ports: [{
        id: 1,
        created_at: new Date(),
        ne_name: 'Abcd',
        street: 'street',
        city: 'city',
        state: 'state',
        country: 'country',
        port_name: 'Port 1',
        organization_name: 'wx',
        first_name: 'Ankur',
        last_name: 'Nariya',

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
    const { container } = render(<Ports {...props} />);

    const input = container.getElementsByClassName('selection-checkbox')[1] as HTMLInputElement;
    const root = input.closest('.MuiButtonBase-root');

    expect(root?.classList.contains('Mui-checked')).toBe(true);
  });

  test('Should render loading row for loading the api', () => {
    const props: PortsListProps = {
      verified: false,
      selected: [{
        id: 1,
      }],
      page: 1,
      total: 2,
      ports: [{
        id: 1,
        created_at: new Date(),
        ne_name: 'Abcd',
        street: 'street',
        city: 'city',
        state: 'state',
        country: 'country',
        port_name: 'Port 1',
        organization_name: 'wx',
        first_name: 'Ankur',
        last_name: 'Nariya',

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
    const { container } = render(<Ports {...props} />);

    expect(container.getElementsByClassName('loading-row').length).toEqual(1);
  });

  test('Should render empty row', () => {
    const props: PortsListProps = {
      verified: false,
      selected: [],
      page: 1,
      total: 0,
      ports: [],
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
    const { getByText } = render(<Ports {...props} />);

    expect(getByText(TableConstants.noRecordsFound)).toBeInTheDocument();
  });

  test('Should call the page change function', () => {
    const onPageChange = jest.fn();
    const props = {
      verified: false,
      selected: [],
      page: 1,
      total: 20,
      ports: [{
        id: 1,
        created_at: new Date(),
        ne_name: 'Abcd',
        street: 'street',
        city: 'city',
        state: 'state',
        country: 'country',
        port_name: 'Port 1',
        organization_name: 'wx',
        first_name: 'Ankur',
        last_name: 'Nariya',

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
    const { getByLabelText } = render(<Ports {...props} onPageChange={onPageChange} />);

    fireEvent.click(getByLabelText('Go to page 2'));

    expect(onPageChange).toHaveBeenCalled();
  });
});
