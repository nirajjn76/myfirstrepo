import { describe, test, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import Input from '../../../components/DesignSystem/input';

describe('<Input />', () => {
  test('Should render input with input variant', () => {
    const { container } = render(<Input name="abcd" variant="input" />);

    expect(container.firstChild).toHaveClass('d-input');
  });

  test('Should render input with input variant as error', () => {
    const { container } = render(<Input name="abcd" variant="input" error />);

    expect(container.firstChild).toHaveClass('d-input-error');
  });

  test('Should render input with input variant and error message', () => {
    const { container, getByText } = render(<Input name="abcd" variant="input" errorMessage="abcd msg" />);

    expect(container.getElementsByClassName('d-error').length).toBe(1);
    expect(getByText('abcd msg')).toBeInTheDocument();
  });

  test('Should render input with password variant', () => {
    const { container } = render(<Input name="abcd" variant="password" />);

    expect(container.firstChild).toHaveClass('d-input-password-root');
  });

  test('Should render input with password variant and checkmark class', () => {
    const { container } = render(<Input name="abcd" variant="password" checkmark />);

    expect(container.getElementsByClassName('d-input-checkmark').length).toBe(1);
    expect(container.getElementsByClassName('d-checkmark').length).toBe(1);
  });

  test('Should render input with password variant and error class', () => {
    const { container } = render(<Input name="abcd" variant="password" error />);

    expect(container.getElementsByClassName('d-input-error').length).toBe(1);
  });

  test('Should render input with password variant and error message', () => {
    const { container, getByText } = render(<Input name="abcd" variant="password" errorMessage="abcd msg" />);

    expect(container.getElementsByClassName('d-error').length).toBe(1);
    expect(getByText('abcd msg')).toBeInTheDocument();
  });

  test('Should call function on click of eye image for password variant inputs', () => {
    const { getByTestId } = render(<Input name="abcd" variant="password" />);

    const eyeImage = getByTestId('eye-img');
    const input = getByTestId('input-abcd');

    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(eyeImage);
    expect(input).toHaveAttribute('type', 'text');
  });

  test('Should call on change function on change of input', () => {
    const handleOnChange = jest.fn();
    const { getByTestId } = render(<Input name="abcd" variant="input" onChange={handleOnChange} />);

    const input = getByTestId('input-abcd');

    fireEvent.change(input, { target: { value: 'a' } });
    expect(handleOnChange).toHaveBeenCalledTimes(1);
  });

  test('Should render input with pre-icon variant', () => {
    const { getByTestId } = render(<Input name="abcd" variant="input-pre-icon" errorMessage="abcd msg" />);

    expect(getByTestId('input-abcd')).toBeInTheDocument();
  });
});
