import {
  expect, test, jest, describe, afterEach,
} from '@jest/globals';
import { RegisterUserPayload, LoginUserPayload } from '../../interfaces/auth.interface';
import AuthService from '../../services/auth.service';
import http from '../../httpConfig';

jest.mock('../../httpConfig');

const registerUserPayload: RegisterUserPayload = {
  firstName: 'Ankur',
  lastName: 'Nariya',
  username: 'ankur.n',
  email: 'ankur.n@gmail.com',
  contactNo: '+91 76001111',
  company: 'abcd',
  password: 'abcd',
  confirmPassword: 'abcd',
  address: 'abcd',
  country: 'abcd',
  state: 'abcd',
  city: 'abcd',
  zipCode: 'abcd',
};

const loginUserPayload: LoginUserPayload = {
  userId: 'ankur.n',
  password: 'abcd',
};

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('Should call register user with success', () => {
    expect.assertions(1);

    const mock = jest.spyOn(http, 'post');
    mock.mockResolvedValue({
      success: true,
    });

    AuthService.registerUser(registerUserPayload)
      .then((data: any) => {
        expect(data.success).toBeTruthy();
      });
  });

  test('Should call login user with success', () => {
    expect.assertions(3);

    const mock = jest.spyOn(http, 'post');
    mock.mockResolvedValue({
      success: true,
      username: 'test',
      token: 'test',
    });

    AuthService.loginUser(loginUserPayload)
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.username).toEqual('test');
        expect(data.token).toEqual('test');
      });
  });

  test('Should call store token successfully', () => {
    expect.assertions(1);

    localStorage.setItem('authToken', 'abcd');

    AuthService.storeToken('abcd');
    expect(localStorage.getItem('authToken')).toEqual('abcd');
  });

  test('Should call get token with success', () => {
    expect.assertions(1);

    localStorage.setItem('authToken', 'abcd');

    const result = AuthService.getToken();
    expect(result).toEqual('abcd');
  });

  test('Should call store token successfully', () => {
    expect.assertions(1);

    localStorage.setItem('role', 'abcd');

    AuthService.storeRole('abcd');
    expect(localStorage.getItem('role')).toEqual('abcd');
  });

  test('Should call get role with success', () => {
    expect.assertions(1);

    localStorage.setItem('role', 'abcd');

    const result = AuthService.getRole();
    expect(result).toEqual('abcd');
  });

  test('Should call store user name successfully', () => {
    expect.assertions(1);

    localStorage.setItem('uname', 'abcd');

    AuthService.storeUserName('abcd');
    expect(localStorage.getItem('uname')).toEqual('abcd');
  });

  test('Should call get username with success', () => {
    expect.assertions(1);

    localStorage.setItem('uname', 'abcd');

    const result = AuthService.getUserName();
    expect(result).toEqual('abcd');
  });

  test('Should call logout with success', () => {
    expect.assertions(1);

    AuthService.logout();

    const username = localStorage.getItem('uname');
    expect(username).toBeNull();
  });
});
