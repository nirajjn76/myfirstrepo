import {
  expect, test, jest, describe, afterEach,
} from '@jest/globals';
import { GetUsersPayload, ValidateUserPayload } from '../../interfaces/validations.interface';
import ValidationService from '../../services/validations.service';
import http from '../../httpConfig';

jest.mock('../../httpConfig');

const getUsersPayload: GetUsersPayload = {
  verified: false,
  searchText: 'b',
  sortField: 'verified_on',
  sortDirection: 'ASC',
  page: 1,
  pageSize: 10,
};

const validateUserPayload: ValidateUserPayload = {
  users: [{
    id: 'abcd-123',
    roleId: 1,
  }, {
    id: 'abcd-124',
    roleId: 1,
  }],
};

describe('ValidationService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should call get users with success', () => {
    expect.assertions(2);

    const mock = jest.spyOn(http, 'get');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: 'abcd-123',
        role_name: 'user',
        first_name: 'firstName',
      }],
    });

    ValidationService.getUsers(getUsersPayload)
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call get roles with success', () => {
    expect.assertions(2);

    const mock = jest.spyOn(http, 'get');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: 2,
        role_name: 'user',
      }, {
        id: 2,
        role_name: 'wxadmin',
      }],
    });

    ValidationService.getRoles()
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call validate user with success', () => {
    expect.assertions(1);

    const mock = jest.spyOn(http, 'put');
    mock.mockResolvedValue({
      success: true,
      message: 'Users validated successfully',
    });

    ValidationService.validateUser(validateUserPayload)
      .then((data: any) => {
        expect(data.success).toBeTruthy();
      });
  });

  test('Should call get cc ports with success', () => {
    expect.assertions(2);

    const mock = jest.spyOn(http, 'get');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: 'abcd-123',
        role_name: 'user',
        first_name: 'firstName',
      }],
    });

    ValidationService.getCcPorts(getUsersPayload)
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call get bandwidth ports with success', () => {
    expect.assertions(2);

    const mock = jest.spyOn(http, 'get');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: 'abcd-123',
        role_name: 'user',
        first_name: 'firstName',
      }],
    });

    ValidationService.getBandwidthPorts(getUsersPayload)
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call validate port with success', () => {
    expect.assertions(2);

    const mock = jest.spyOn(http, 'put');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: '3',
        role_name: 'user',
        first_name: 'firstName',
      }],
    });

    ValidationService.validatePort({ nrs: ['3'] })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call validate cross connect port with success', () => {
    expect.assertions(2);

    const mock = jest.spyOn(http, 'put');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: '3',
        role_name: 'user',
        first_name: 'firstName',
      }],
    });

    ValidationService.validateCrossConnectPorts({ crossConnectIds: ['3'] })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call validate bandwidth port with success', () => {
    expect.assertions(2);

    const mock = jest.spyOn(http, 'put');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: '3',
        role_name: 'user',
        first_name: 'firstName',
      }],
    });

    ValidationService.validateBandwidthPorts({ bandwidthIds: ['3'] })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });
});
