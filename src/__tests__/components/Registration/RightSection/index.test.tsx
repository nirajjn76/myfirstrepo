import React from 'react';
import { describe, test, jest } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import FormIndex from '../../../../components/Registration/RightSection';
import { RegistrationFieldsMapping } from '../../../../utils/appConstants';

describe('<RegisterationFormIndex />', () => {
  test('Should render form index with registration page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    expect(getByText('New User Registration')).toBeInTheDocument();
  });

  test('Should call on change function on change of fname input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${RegistrationFieldsMapping.fname}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });

  test('Should call on change function on change of lname input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${RegistrationFieldsMapping.lname}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });

  test('Should call on change function on change of uname input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${RegistrationFieldsMapping.uname}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });

  test('Should call on change function on change of email input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${RegistrationFieldsMapping.email}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });

  test('Should call on change function on change of contact input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${RegistrationFieldsMapping.contact}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });

  test('Should call on change function on change of company input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${RegistrationFieldsMapping.company}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });

  test('Should call on change function on change of password input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${RegistrationFieldsMapping.password}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });

  test('Should call on change function on change of confirm password input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${RegistrationFieldsMapping.confirmPassword}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });

  test('Should call on change function on change of address input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${RegistrationFieldsMapping.address}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });

  test('Should call on change function on change of country input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${RegistrationFieldsMapping.country}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });

  test('Should call on change function on change of state input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${RegistrationFieldsMapping.state}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });

  test('Should call on change function on change of city input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${RegistrationFieldsMapping.city}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });

  test('Should call on change function on change of zip input', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    const input = getByTestId(`input-${RegistrationFieldsMapping.zip}`);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(setState).toHaveBeenCalled();
  });
});
