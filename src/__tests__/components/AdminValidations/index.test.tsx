import { describe, jest, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import AdminValidations, { AdminValidationsLayoutProps } from '../../../components/AdminValidations';

describe('<AdminValidations />', () => {
  test('Should render admin validation layout', () => {
    const props: AdminValidationsLayoutProps = {
      title: 'New User Validation',
      table: <table />,
      verified: true,
      verifyAllLoading: false,
      isVerifiedSection: true,
      selected: [],
      onVerifiedChange: jest.fn(),
      onSearchChanges: jest.fn(),
      onVerifyAllClick: jest.fn(),
    };
    const { getByText } = render(<AdminValidations {...props} />);

    expect(getByText('New User Validation')).toBeInTheDocument();
  });

  test('Should call verified change on admin validation layout switch changed', () => {
    const onVerifiedChange = jest.fn();
    const props = {
      title: 'New User Validation',
      table: <table />,
      verified: true,
      verifyAllLoading: false,
      selected: [],
      isVerifiedSection: true,
      onSearchChanges: jest.fn(),
      onVerifyAllClick: jest.fn(),
    };
    const { getByRole } = render(<AdminValidations {...props} onVerifiedChange={onVerifiedChange} />);

    getByRole('checkbox').click();
    fireEvent.change(getByRole('checkbox'), { target: { checked: false } });

    expect(onVerifiedChange).toHaveBeenCalled();
  });

  test('Should call search change on admin validation layout switch changed', () => {
    const onSearchChanges = jest.fn();
    const props = {
      title: 'New User Validation',
      table: <table />,
      verified: true,
      verifyAllLoading: false,
      selected: [],
      isVerifiedSection: true,
      isSearchSection: true,
      onVerifiedChange: jest.fn(),
      onVerifyAllClick: jest.fn(),
    };
    const { getByTestId } = render(<AdminValidations {...props} onSearchChanges={onSearchChanges} />);
    fireEvent.change(getByTestId('input-user-search'), { target: { value: 'abc' } });
    fireEvent.click(getByTestId('btn-search'));

    expect(onSearchChanges).toHaveBeenCalled();
  });

  test('Should not able to click the search button for no text in the search box', () => {
    const onSearchChanges = jest.fn();
    const props = {
      title: 'New User Validation',
      table: <table />,
      verified: true,
      verifyAllLoading: false,
      isVerifiedSection: true,
      isSearchSection: true,
      selected: [],
      onVerifiedChange: jest.fn(),
      onVerifyAllClick: jest.fn(),
    };
    const { getByTestId } = render(<AdminValidations {...props} onSearchChanges={onSearchChanges} />);
    fireEvent.change(getByTestId('input-user-search'), { target: { value: '' } });
    fireEvent.click(getByTestId('btn-search'));

    expect(onSearchChanges).toHaveBeenCalledTimes(0);
  });
});
