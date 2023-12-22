import React from 'react';
import { test, jest, describe } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import FormIndex from '../../../components/Login';
import { LoginFieldsMapping } from '../../../utils/appConstants';
import AuthService from '../../../services/auth.service';
import { ErrorCodeMessageMapping, ErrorCodesMapping } from '../../../utils/apiConstants';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe('<LoginAPICalls />', () => {
  test('Should call login button click', async () => {
    act(() => {
      const mock: any = jest.spyOn(AuthService, 'storeToken');
      mock.mockResolvedValue();

      const mockStoreRole: any = jest.spyOn(AuthService, 'storeRole');
      mockStoreRole.mockResolvedValue();

      const mockStoreUname: any = jest.spyOn(AuthService, 'storeUserName');
      mockStoreUname.mockResolvedValue();

      const mockLogin = jest.spyOn(AuthService, 'loginUser');
      mockLogin.mockResolvedValue({
        status: 200,
        data: {
          token: 'abc',
          role: 'abcd',
          username: 'Ankur nariya',
        },
        statusText: 'Success',
        headers: {},
        config: {},
      });
    });

    const { findByTestId } = render(
      <BrowserRouter>
        <FormIndex />
      </BrowserRouter>,
    );

    await act(async () => {
      const inputUId = await findByTestId(`input-${LoginFieldsMapping.userId}`);
      userEvent.type(inputUId, 'abcd');

      const input = await findByTestId(`input-${LoginFieldsMapping.password}`);
      userEvent.type(input, 'we3r2');

      const loginBtn = await findByTestId('btn-login');
      userEvent.click(loginBtn);
    });

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });

  test('Should call login button click with failed', async () => {
    act(() => {
      const mockLogin: any = jest.spyOn(AuthService, 'loginUser');
      mockLogin.mockRejectedValue({
        status: 400,
        data: {},
        errorCode: ErrorCodesMapping[1003],
        statusText: 'Failed',
        headers: {},
        config: {},
      });
    });

    const { findByTestId, findByText } = render(
      <BrowserRouter>
        <FormIndex />
      </BrowserRouter>,
    );

    await act(async () => {
      const inputUId = await findByTestId(`input-${LoginFieldsMapping.userId}`);
      userEvent.type(inputUId, 'abcd');

      const input = await findByTestId(`input-${LoginFieldsMapping.password}`);
      userEvent.type(input, 'we3r2');

      const loginBtn = await findByTestId('btn-login');
      userEvent.click(loginBtn);

      expect(await findByText(ErrorCodeMessageMapping[1003])).toBeInTheDocument();
    });
  });

  test('Should call login button click with failed email not found', async () => {
    act(() => {
      const mockLogin: any = jest.spyOn(AuthService, 'loginUser');
      mockLogin.mockRejectedValue({
        status: 400,
        data: {},
        errorCode: ErrorCodesMapping[1004],
        statusText: 'Failed',
        headers: {},
        config: {},
      });
    });

    const { findByTestId, findByText } = render(
      <BrowserRouter>
        <FormIndex />
      </BrowserRouter>,
    );

    await act(async () => {
      const inputUId = await findByTestId(`input-${LoginFieldsMapping.userId}`);
      userEvent.type(inputUId, 'abcd');

      const input = await findByTestId(`input-${LoginFieldsMapping.password}`);
      userEvent.type(input, 'we3r2');

      const loginBtn = await findByTestId('btn-login');
      userEvent.click(loginBtn);

      expect(await findByText('Email not found.')).toBeInTheDocument();
    });
  });

  test('Should call login back button from email not found section', async () => {
    act(() => {
      const mockLogin: any = jest.spyOn(AuthService, 'loginUser');
      mockLogin.mockRejectedValue({
        status: 400,
        data: {},
        errorCode: ErrorCodesMapping[1004],
        statusText: 'Failed',
        headers: {},
        config: {},
      });
    });

    const { findByTestId, findByText } = render(
      <BrowserRouter>
        <FormIndex />
      </BrowserRouter>,
    );

    await act(async () => {
      const inputUId = await findByTestId(`input-${LoginFieldsMapping.userId}`);
      userEvent.type(inputUId, 'abcd');

      const input = await findByTestId(`input-${LoginFieldsMapping.password}`);
      userEvent.type(input, 'we3r2');

      const loginBtn = await findByTestId('btn-login');
      userEvent.click(loginBtn);

      expect(await findByText('Email not found.')).toBeInTheDocument();

      const loginBackBtn = await findByTestId('login-back-link-btn');
      userEvent.click(loginBackBtn);

      expect(await findByText('Welcome to WaveXchange')).toBeInTheDocument();
    });
  });
});
