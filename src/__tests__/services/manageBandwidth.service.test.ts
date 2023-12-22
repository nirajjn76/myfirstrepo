import {
  expect, test, jest, describe, afterEach,
} from '@jest/globals';
import ManageBandwidthService from '../../services/manageBandwidth.service';
import http from '../../httpConfig';

jest.mock('../../httpConfig');

describe('ManageBandwidthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should call put up bandwidth for sale with success', () => {
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

    ManageBandwidthService.putUpBandwidthForSale({
      bdId: 3,
      serviceDescription: 'string',
      onContractPrice: 3,
      onDemandPrice: 3,
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

    ManageBandwidthService.editSaleDetails({
      serviceDescription: 'string',
      onContractPrice: 3,
      onDemandPrice: 3,
    }, '4')
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call get manage bandwidth ports with success', () => {
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

    ManageBandwidthService.getManageBandwidthPorts({
      searchNneName: 'string',
      searchFneName: 'string',
      sortField: 'string',
      sortDirection: 'string',
      page: 3,
      pageSize: 10,
      searchText: 'string',
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call remove from marketplace with success', () => {
    expect.assertions(2);

    const mock = jest.spyOn(http, 'delete');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: 'abcd-123',
        role_name: 'user',
        first_name: 'firstName',
      }],
    });

    ManageBandwidthService.removeFromMarketPlace({
      bdId: 3,
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

    ManageBandwidthService.getPortsAndGroups('3', 'search')
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

    ManageBandwidthService.unGroupNrs({
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

    ManageBandwidthService.addNrsInExistingGroup({
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

    const mock = jest.spyOn(http, 'post');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: 'abcd-123',
        role_name: 'user',
        first_name: 'firstName',
      }],
    });

    ManageBandwidthService.addGroupDetails({
      name: 'group',
      description: 'group',
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

    const mock = jest.spyOn(http, 'post');
    mock.mockResolvedValue({
      success: true,
      data: [{
        id: 'abcd-123',
        role_name: 'user',
        first_name: 'firstName',
      }],
    });

    ManageBandwidthService.cancelSubscription({
      purchaseId: '4',
    })
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });
});
