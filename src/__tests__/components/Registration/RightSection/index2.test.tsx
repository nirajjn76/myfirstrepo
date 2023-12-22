import React from 'react';
import { describe, test, jest } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, act } from '@testing-library/react';
import FormIndex from '../../../../components/Registration/RightSection';
import { RegistrationFieldsMapping } from '../../../../utils/appConstants';
import AuthService from '../../../../services/auth.service';
import { ErrorCodeMessageMapping, ErrorCodesMapping } from '../../../../utils/apiConstants';

describe('<RegisterationAPICalls />', () => {
  test('Should call register function with failed state 1001', async () => {
    act(() => {
      const mockRegister = jest.spyOn(AuthService, 'registerUser');
      mockRegister.mockRejectedValue({
        status: 400, data: { success: false }, statusText: '', headers: {}, config: {}, errorCode: ErrorCodesMapping[1001],
      });
    });

    const { findByTestId, findByText } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    await act(async () => {
      const fname = await findByTestId(`input-${RegistrationFieldsMapping.fname}`);
      fireEvent.change(fname, { target: { value: 'a' } });

      const lname = await findByTestId(`input-${RegistrationFieldsMapping.lname}`);
      fireEvent.change(lname, { target: { value: 'a' } });

      const uname = await findByTestId(`input-${RegistrationFieldsMapping.uname}`);
      fireEvent.change(uname, { target: { value: 'a' } });

      const email = await findByTestId(`input-${RegistrationFieldsMapping.email}`);
      fireEvent.change(email, { target: { value: 'ankur@gmail.com' } });
      fireEvent.blur(email);

      const contat = await findByTestId(`input-${RegistrationFieldsMapping.contact}`);
      fireEvent.change(contat, { target: { value: '1111' } });

      const company = await findByTestId(`input-${RegistrationFieldsMapping.company}`);
      fireEvent.change(company, { target: { value: 'zymr' } });

      const password = await findByTestId(`input-${RegistrationFieldsMapping.password}`);
      fireEvent.change(password, { target: { value: '1111' } });
      fireEvent.blur(password);

      const confirmPassword = await findByTestId(`input-${RegistrationFieldsMapping.confirmPassword}`);
      fireEvent.change(confirmPassword, { target: { value: '1111' } });
      fireEvent.blur(confirmPassword);

      const address = await findByTestId(`input-${RegistrationFieldsMapping.address}`);
      fireEvent.change(address, { target: { value: 'address' } });

      const country = await findByTestId(`input-${RegistrationFieldsMapping.country}`);
      fireEvent.change(country, { target: { value: 'country' } });

      const state = await findByTestId(`input-${RegistrationFieldsMapping.state}`);
      fireEvent.change(state, { target: { value: 'state' } });

      const city = await findByTestId(`input-${RegistrationFieldsMapping.city}`);
      fireEvent.change(city, { target: { value: 'city' } });

      const zip = await findByTestId(`input-${RegistrationFieldsMapping.zip}`);
      fireEvent.change(zip, { target: { value: 'zip' } });

      const registerBtn = await findByTestId('btn-register');
      fireEvent.click(registerBtn);
    });

    expect(await findByText(ErrorCodeMessageMapping[1001])).toBeInTheDocument();
  });

  test('Should call register function with failed state 1002', async () => {
    act(() => {
      const mockRegister = jest.spyOn(AuthService, 'registerUser');
      mockRegister.mockRejectedValue({
        status: 401, data: { success: false }, statusText: '', headers: {}, config: {}, errorCode: ErrorCodesMapping[1002],
      });
    });

    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    const { findByTestId, findByText } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    await act(async () => {
      const fname = await findByTestId(`input-${RegistrationFieldsMapping.fname}`);
      fireEvent.change(fname, { target: { value: 'a' } });

      const lname = await findByTestId(`input-${RegistrationFieldsMapping.lname}`);
      fireEvent.change(lname, { target: { value: 'a' } });

      const uname = await findByTestId(`input-${RegistrationFieldsMapping.uname}`);
      fireEvent.change(uname, { target: { value: 'a' } });

      const email = await findByTestId(`input-${RegistrationFieldsMapping.email}`);
      fireEvent.change(email, { target: { value: 'ankur@gmail.com' } });
      fireEvent.blur(email);

      const contat = await findByTestId(`input-${RegistrationFieldsMapping.contact}`);
      fireEvent.change(contat, { target: { value: '1111' } });

      const company = await findByTestId(`input-${RegistrationFieldsMapping.company}`);
      fireEvent.change(company, { target: { value: 'zymr' } });

      const password = await findByTestId(`input-${RegistrationFieldsMapping.password}`);
      fireEvent.change(password, { target: { value: '1111' } });
      fireEvent.blur(password);

      const confirmPassword = await findByTestId(`input-${RegistrationFieldsMapping.confirmPassword}`);
      fireEvent.change(confirmPassword, { target: { value: '1111' } });
      fireEvent.blur(confirmPassword);

      const address = await findByTestId(`input-${RegistrationFieldsMapping.address}`);
      fireEvent.change(address, { target: { value: 'address' } });

      const country = await findByTestId(`input-${RegistrationFieldsMapping.country}`);
      fireEvent.change(country, { target: { value: 'country' } });

      const state = await findByTestId(`input-${RegistrationFieldsMapping.state}`);
      fireEvent.change(state, { target: { value: 'state' } });

      const city = await findByTestId(`input-${RegistrationFieldsMapping.city}`);
      fireEvent.change(city, { target: { value: 'city' } });

      const zip = await findByTestId(`input-${RegistrationFieldsMapping.zip}`);
      fireEvent.change(zip, { target: { value: 'zip' } });

      const registerBtn = await findByTestId('btn-register');
      fireEvent.click(registerBtn);
    });

    expect(await findByText(ErrorCodeMessageMapping[1002])).toBeInTheDocument();
  });

  test('Should call register function with success', async () => {
    act(() => {
      const mockRegister = jest.spyOn(AuthService, 'registerUser');
      mockRegister.mockResolvedValue({
        status: 200, data: { success: true }, statusText: '', headers: {}, config: {},
      });
    });

    const { findByTestId, findByText } = render(
      <MemoryRouter>
        <FormIndex />
      </MemoryRouter>,
    );

    await act(async () => {
      const fname = await findByTestId(`input-${RegistrationFieldsMapping.fname}`);
      fireEvent.change(fname, { target: { value: 'a' } });

      const lname = await findByTestId(`input-${RegistrationFieldsMapping.lname}`);
      fireEvent.change(lname, { target: { value: 'a' } });

      const uname = await findByTestId(`input-${RegistrationFieldsMapping.uname}`);
      fireEvent.change(uname, { target: { value: 'a' } });

      const email = await findByTestId(`input-${RegistrationFieldsMapping.email}`);
      fireEvent.change(email, { target: { value: 'ankur@gmail.com' } });
      fireEvent.blur(email);

      const contat = await findByTestId(`input-${RegistrationFieldsMapping.contact}`);
      fireEvent.change(contat, { target: { value: '1111' } });

      const company = await findByTestId(`input-${RegistrationFieldsMapping.company}`);
      fireEvent.change(company, { target: { value: 'zymr' } });

      const password = await findByTestId(`input-${RegistrationFieldsMapping.password}`);
      fireEvent.change(password, { target: { value: '1111' } });
      fireEvent.blur(password);

      const confirmPassword = await findByTestId(`input-${RegistrationFieldsMapping.confirmPassword}`);
      fireEvent.change(confirmPassword, { target: { value: '1111' } });
      fireEvent.blur(confirmPassword);

      const address = await findByTestId(`input-${RegistrationFieldsMapping.address}`);
      fireEvent.change(address, { target: { value: 'address' } });

      const country = await findByTestId(`input-${RegistrationFieldsMapping.country}`);
      fireEvent.change(country, { target: { value: 'country' } });

      const state = await findByTestId(`input-${RegistrationFieldsMapping.state}`);
      fireEvent.change(state, { target: { value: 'state' } });

      const city = await findByTestId(`input-${RegistrationFieldsMapping.city}`);
      fireEvent.change(city, { target: { value: 'city' } });

      const zip = await findByTestId(`input-${RegistrationFieldsMapping.zip}`);
      fireEvent.change(zip, { target: { value: 'zip' } });

      const registerBtn = await findByTestId('btn-register');
      fireEvent.click(registerBtn);

      expect(await findByText('Thank you for your Registration with us.')).toBeInTheDocument();
    });
  });
});
