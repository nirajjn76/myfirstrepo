import React from 'react';
import { describe, test, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import Form from '../../../../components/Registration/RightSection/form';
import { RegistrationFieldsMapping } from '../../../../utils/appConstants';

describe('<RegisterationForm />', () => {
  test('Should render form properly', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;
    const confirmPasswordError = false;
    const unameError = '';
    const emailError = '';
    const passwordsMatch = false;

    const { container } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    expect(container.firstChild).toHaveClass('form');
  });

  test('Should call on change function on change of fname input', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const confirmPasswordError = false;
    const unameError = '';
    const emailError = '';
    const passwordsMatch = false;
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;

    const { getByTestId } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    const input = getByTestId(`input-${RegistrationFieldsMapping.fname}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onFieldChange).toHaveBeenCalledTimes(1);
  });

  test('Should call on change function on change of lname input', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const confirmPasswordError = false;
    const unameError = '';
    const emailError = '';
    const passwordsMatch = false;
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;

    const { getByTestId } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    const input = getByTestId(`input-${RegistrationFieldsMapping.lname}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onFieldChange).toHaveBeenCalledTimes(1);
  });

  test('Should call on change function on change of uname input', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const confirmPasswordError = false;
    const unameError = 'abcd';
    const emailError = '';
    const passwordsMatch = false;
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;

    const { getByTestId } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    const input = getByTestId(`input-${RegistrationFieldsMapping.uname}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onFieldChange).toHaveBeenCalledTimes(1);
  });

  test('Should call on change function on change of uname input', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const confirmPasswordError = false;
    const unameError = '';
    const emailError = 'abcd';
    const passwordsMatch = false;
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;

    const { getByTestId } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    const input = getByTestId(`input-${RegistrationFieldsMapping.email}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onFieldChange).toHaveBeenCalledTimes(1);
  });

  test('Should call on change function on change of contact input', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const confirmPasswordError = false;
    const unameError = '';
    const emailError = '';
    const passwordsMatch = true;
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;

    const { getByTestId } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    const input = getByTestId(`input-${RegistrationFieldsMapping.contact}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onFieldChange).toHaveBeenCalledTimes(1);
  });

  test('Should call on change function on change of company input', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const confirmPasswordError = true;
    const unameError = '';
    const emailError = '';
    const passwordsMatch = false;
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;

    const { getByTestId } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    const input = getByTestId(`input-${RegistrationFieldsMapping.company}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onFieldChange).toHaveBeenCalledTimes(1);
  });

  test('Should call on change function on change of password input', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const confirmPasswordError = true;
    const unameError = '';
    const emailError = '';
    const passwordsMatch = false;
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;

    const { getByTestId } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    const input = getByTestId(`input-${RegistrationFieldsMapping.password}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onFieldChange).toHaveBeenCalledTimes(1);
  });

  test('Should call on change function on change of confirm password input', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const confirmPasswordError = true;
    const unameError = '';
    const emailError = '';
    const passwordsMatch = false;
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;

    const { getByTestId } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    const input = getByTestId(`input-${RegistrationFieldsMapping.confirmPassword}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onFieldChange).toHaveBeenCalledTimes(1);
  });

  test('Should call on change function on change of address input', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const confirmPasswordError = true;
    const unameError = '';
    const emailError = '';
    const passwordsMatch = false;
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;

    const { getByTestId } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    const input = getByTestId(`input-${RegistrationFieldsMapping.address}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onFieldChange).toHaveBeenCalledTimes(1);
  });

  test('Should call on change function on change of country input', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const confirmPasswordError = true;
    const unameError = '';
    const emailError = '';
    const passwordsMatch = false;
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;

    const { getByTestId } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    const input = getByTestId(`input-${RegistrationFieldsMapping.country}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onFieldChange).toHaveBeenCalledTimes(1);
  });

  test('Should call on change function on change of state input', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const confirmPasswordError = true;
    const unameError = '';
    const emailError = '';
    const passwordsMatch = false;
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;

    const { getByTestId } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    const input = getByTestId(`input-${RegistrationFieldsMapping.state}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onFieldChange).toHaveBeenCalledTimes(1);
  });

  test('Should call on change function on change of city input', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const confirmPasswordError = true;
    const unameError = '';
    const emailError = '';
    const passwordsMatch = false;
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;

    const { getByTestId } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    const input = getByTestId(`input-${RegistrationFieldsMapping.city}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onFieldChange).toHaveBeenCalledTimes(1);
  });

  test('Should call on change function on change of zip input', () => {
    const onFieldChange = jest.fn();
    const onConfirmPasswordBlur = jest.fn();
    const onPasswordBlur = jest.fn();
    const confirmPasswordError = true;
    const unameError = '';
    const emailError = '';
    const passwordsMatch = false;
    const onEmailBlur = jest.fn();
    const onKeypress = jest.fn();
    const scrollToTop = false;

    const { getByTestId } = render(<Form onEmailBlur={onEmailBlur} onKeypress={onKeypress} scrollToTop={scrollToTop} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError} passwordsMatch={passwordsMatch} />);

    const input = getByTestId(`input-${RegistrationFieldsMapping.zip}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(onFieldChange).toHaveBeenCalledTimes(1);
  });
});
