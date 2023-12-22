import {
  expect, test, jest, describe, afterEach,
} from '@jest/globals';
import { CrossConnect } from '../../interfaces/crossConnect.interface';
import CrossConnectService from '../../services/crossConnect.service';
import http from '../../httpConfig';

jest.mock('../../httpConfig');

const crossConnectPayload: CrossConnect = {
  connect: [{
    source_bandwidth_port: true,
    source_port_id: '5',
    destination_port_id: '4',
    destination_bandwidth_port: false,
  }],
  disconnect: [{
    source_bandwidth_port: true,
    source_port_id: '6',
    destination_port_id: '22',
    destination_bandwidth_port: false,
  }],
};

describe('CrossConnectService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should call cross connect with success', () => {
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

    CrossConnectService.crossConnect(crossConnectPayload)
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });
});
