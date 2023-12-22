import {
  expect, test, jest, describe, afterEach,
} from '@jest/globals';
import { } from '../../interfaces/managePorts.interface';
import ManagePortService from '../../services/managePorts.service';
import http from '../../httpConfig';

jest.mock('../../httpConfig');

describe('ManagePortService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should call put up port for sale with success', () => {
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

    ManagePortService.putUpForSale({
      neId: 3,
      serviceDescription: 'string',
      onContractPrice: 3,
      onDemandPrice: 3,
      physicalPortIds: [3],
      type: 'abc',
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call edit sale details with success', () => {
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

    ManagePortService.editSaleDetails({
      serviceDescription: 'string',
      onContractPrice: 3,
      onDemandPrice: 3,
    }, '4')
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call update group with success', () => {
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

    ManagePortService.updateGroupDetails({
      name: 'string',
      description: 'string',
      icon: 'string',
      groupId: 'string',
      neId: 'string',
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call remove from marketplace with success', () => {
    expect.assertions(2);

    const mock = jest.spyOn(http, 'patch');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: 'abcd-123',
        role_name: 'user',
        first_name: 'firstName',
      }],
    });

    ManagePortService.removeFromMarketPlace({
      nrId: 3,
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call get ports and groups with success', () => {
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

    ManagePortService.getPortsAndGroups('3', 'search', 'abc', 'ASC')
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call ungroup ports with success', () => {
    expect.assertions(2);

    const mock = jest.spyOn(http, 'patch');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: 'abcd-123',
        role_name: 'user',
        first_name: 'firstName',
      }],
    });

    ManagePortService.unGroupNrs({
      groupId: '3',
      nrIds: ['4'],
      purchasePortIds: ['5'],
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call add nrs in group with success', () => {
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

    ManagePortService.addNrsInExistingGroup({
      groupId: 3,
      nrIds: ['4'],
      purchasePortIds: ['5'],
      neId: '4',
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call add group with success', () => {
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

    ManagePortService.addGroupDetails({
      name: 'group',
      description: 'group',
      icon: 'router',
      nrIds: ['4'],
      purchasePortIds: ['5'],
      neId: '4',
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call cancel subscription with success', () => {
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

    ManagePortService.cancelSubscription({
      pportId: '4',
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call get all groups by ne id with success', () => {
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

    ManagePortService.getAllGroupsByNEid('4')
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });
});
