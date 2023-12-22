import {
  expect, test, jest, describe, afterEach,
} from '@jest/globals';
import { } from '../../interfaces/wxPay.interface';
import WxPayService from '../../services/wxPay.service';
import http from '../../httpConfig';

jest.mock('../../httpConfig');

describe('WxPayService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should call get fees with success', () => {
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

    WxPayService.getFees({
      searchText: 'string',
      sortField: 'string',
      sortDirection: 'string',
      page: 5,
      pageSize: 10,
      startDate: new Date(),
      endDate: new Date(),
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call get port details with success', () => {
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

    WxPayService.getPortDetails({
      searchText: 'string',
      sortField: 'string',
      sortDirection: 'string',
      page: 5,
      pageSize: 10,
      startDate: new Date(),
      endDate: new Date(),
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call get banndwidth details with success', () => {
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

    WxPayService.getBandwidthDetails({
      searchText: 'string',
      sortField: 'string',
      sortDirection: 'string',
      page: 5,
      pageSize: 10,
      startDate: new Date(),
      endDate: new Date(),
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });
});
