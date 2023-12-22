import {
  expect, test, jest, describe, afterEach,
} from '@jest/globals';
import { GetNodeWiseNrPayload } from '../../interfaces/dashboard.interface';
import DashboardService from '../../services/dashboard.service';
import http from '../../httpConfig';

jest.mock('../../httpConfig');

const nodeWiseNrPayload: GetNodeWiseNrPayload = {
  nodeIds: [3, 5, 6],
};

describe('DashboardService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should call get nodewise nr with success', () => {
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

    DashboardService.getNodeWiseNr(nodeWiseNrPayload)
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call get selected nodes with success', () => {
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

    DashboardService.getSelectedNodes()
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call get canvas data with success', () => {
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

    DashboardService.getCanvasData()
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call put canvas data with success', () => {
    expect.assertions(2);

    const mock = jest.spyOn(http, 'put');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: 'abcd-123',
        role_name: 'user',
        first_name: 'firstName',
      }],
    });

    DashboardService.putCanvasData({})
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });
});
