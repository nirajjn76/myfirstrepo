import { describe, jest, test } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react';
import NotVerifiedPortRow from '../../../../components/AdminValidations/Ports/NotVerifiedPortRow';

describe('<NotVerifiedPortRow />', () => {
  test('Should call handle select row', async () => {
    const onSelectRow = jest.fn();
    const props = {
      port: {
        id: 1,
        created_at: new Date(),
        ne_name: 'zymr',
        port_name: 'Ankur',
        port_description: 'Nariya',
        first_name: 'Ankur',
        last_name: 'Nariya',
        organization_name: 'ankur.n',
      },
      verifyLoadingId: '',
      rowSelected: false,
      selected: [],
      onVerifyClick: jest.fn(),
    };
    const { getByTestId } = render(<NotVerifiedPortRow {...props} onSelectRow={onSelectRow} />);

    await waitFor(() => getByTestId('checkbox'));
    fireEvent.click(getByTestId('checkbox-input'));

    expect(onSelectRow).toHaveBeenCalled();
  });

  test('Should call handle select row with default items selected', async () => {
    const onSelectRow = jest.fn();
    const props = {
      port: {
        id: 1,
        created_at: new Date(),
        ne_name: 'zymr',
        port_name: 'Ankur',
        port_description: 'Nariya',
        first_name: 'Ankur',
        last_name: 'Nariya',
        organization_name: 'ankur.n',
      },
      verifyLoadingId: '',
      rowSelected: false,
      selected: [{
        id: 1,
      }],
      onVerifyClick: jest.fn(),
    };
    const { getByTestId } = render(<NotVerifiedPortRow {...props} onSelectRow={onSelectRow} />);

    await waitFor(() => getByTestId('checkbox'));
    fireEvent.click(getByTestId('checkbox-input'));

    expect(onSelectRow).toHaveBeenCalled();
  });

  test('Should call handle select row with default items selected and selected position is last', async () => {
    const onSelectRow = jest.fn();
    const props = {
      port: {
        id: 1,
        created_at: new Date(),
        ne_name: 'zymr',
        port_name: 'Ankur',
        port_description: 'Nariya',
        first_name: 'Ankur',
        last_name: 'Nariya',
        organization_name: 'ankur.n',
      },
      verifyLoadingId: '',
      rowSelected: false,
      selected: [{
        id: 2,
      }, {
        id: 3,
      }, {
        id: 1,
      }],
      onVerifyClick: jest.fn(),
    };
    const { getByTestId } = render(<NotVerifiedPortRow {...props} onSelectRow={onSelectRow} />);

    await waitFor(() => getByTestId('checkbox'));
    fireEvent.click(getByTestId('checkbox-input'));

    expect(onSelectRow).toHaveBeenCalled();
  });

  test('Should call handle select row with default items selected and selected position is not last and first', async () => {
    const onSelectRow = jest.fn();
    const props = {
      port: {
        id: 1,
        created_at: new Date(),
        ne_name: 'zymr',
        port_name: 'Ankur',
        port_description: 'Nariya',
        first_name: 'Ankur',
        last_name: 'Nariya',
        organization_name: 'ankur.n',
      },
      verifyLoadingId: '',
      rowSelected: false,
      selected: [{
        id: 2,
      }, {
        id: 1,
      }, {
        id: 3,
      }],
      onVerifyClick: jest.fn(),
    };
    const { getByTestId } = render(<NotVerifiedPortRow {...props} onSelectRow={onSelectRow} />);

    await waitFor(() => getByTestId('checkbox'));
    fireEvent.click(getByTestId('checkbox-input'));

    expect(onSelectRow).toHaveBeenCalled();
  });
});
