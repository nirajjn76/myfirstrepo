import {
  expect, test, jest, describe, afterEach,
} from '@jest/globals';
import PortsMarketPlaceService from '../../services/ports.marketplace.service';
import http from '../../httpConfig';

jest.mock('../../httpConfig');

describe('PortsMarketPlaceService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should call get my network bandwidth with success', () => {
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

    PortsMarketPlaceService.getPortsInMarketPlace({
      searchText: 'string',
      sortField: 'string',
      sortDirection: 'string',
      filter: 'string',
      page: 5,
      pageSize: 10,
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call get my network bandwidth list with success', () => {
    expect.assertions(2);

    const mock = jest.spyOn(http, 'post');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: 'abcd-123',
        role_name: 'user',
        first_name: 'firstName',
      }],
    });

    PortsMarketPlaceService.purchasePort({
      vportId: 3,
      portName: 'string',
      portDescription: 'string',
      price: 'string',
      priceType: 'string',
      neId: 'string',
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });
});
