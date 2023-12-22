import {
  expect, test, jest, describe, afterEach,
} from '@jest/globals';
import MyNetworkService from '../../services/myNetwork.service';
import http from '../../httpConfig';

jest.mock('../../httpConfig');

describe('MyNetworkService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should call get my network bandwidth with success', () => {
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

    MyNetworkService.getMyNetworkBandwidths({
      filters: ['ab'],
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

    MyNetworkService.getMyNetworkBandwidthsList({
      filters: ['ab'],
      neIds: [],
      searchText: 'abcd',
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });
});
