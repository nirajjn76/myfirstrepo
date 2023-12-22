import {
  expect, test, jest, describe, afterEach,
} from '@jest/globals';
import { AddPortPayload } from '../../interfaces/addPort.interface';
import AddPortService from '../../services/addPort.service';
import http from '../../httpConfig';

jest.mock('../../httpConfig');

const addPortPayload: AddPortPayload = {
  neId: 3,
  portDescription: 'string',
  nodeId: 4,
  portDetails: [{
    portName: 'string',
    rx: 0,
    tx: 0,
    portTypeId: 3,
  }],
};

describe('AddPortService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should call get port types with success', () => {
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

    AddPortService.getPortTypes()
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call add ports with success', () => {
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

    AddPortService.addPorts(addPortPayload)
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call add bandwidth with success', () => {
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

    AddPortService.addBandwidth({
      bandwidthDescription: 'abcd',
      nePortsInfo: addPortPayload,
      fePortsInfo: addPortPayload,
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });
});
