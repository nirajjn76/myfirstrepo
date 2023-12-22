import { describe, test, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import ErrorSection from '../../../components/Login/errorSection';

describe('<ErrorSection />', () => {
  test('Should render error section properly', () => {
    const onLoginBackClick = jest.fn();
    const { getByText } = render(<ErrorSection firstName="abcd" onLoginBackClick={onLoginBackClick} />);

    expect(getByText('Email not found.')).toBeInTheDocument();
  });

  test('Should render error section when first name is blank', () => {
    const onLoginBackClick = jest.fn();
    const { getByText } = render(<ErrorSection firstName="" onLoginBackClick={onLoginBackClick} />);

    expect(getByText('Email not found.')).toBeInTheDocument();
  });

  test('Should call login back function on back to login click', () => {
    const onLoginBackClick = jest.fn();
    const { getByTestId } = render(<ErrorSection firstName="abcd" onLoginBackClick={onLoginBackClick} />);

    const linkToClick = getByTestId('login-back-link-btn');

    fireEvent.click(linkToClick);

    expect(onLoginBackClick).toHaveBeenCalled();
  });
});
