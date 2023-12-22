import {
  expect, test, jest, describe, afterEach,
} from '@jest/globals';
import { GetMarketplaceBandwidthPayload, purchaseBandwidthPayload, BandwidthListForMapPayload } from '../../interfaces/bandwidthMarketplace.interface';
import BandwidthMarketPlaceService from '../../services/bandwidthMarketplace.service';
import http from '../../httpConfig';

jest.mock('../../httpConfig');

const getMarketPlaceBandwidthPayload: GetMarketplaceBandwidthPayload = {
  searchNneName: 'string',
  searchFneName: 'string',
  sortField: 'string',
  sortDirection: 'string',
  page: 3,
  filter: 'string',
  pageSize: 10,
  searchText: 'string',
};

const purchaseBandwidthPay: purchaseBandwidthPayload = {
  bdId: 3,
  serviceDescription: 'string',
  onContractPrice: 3,
  onDemandPrice: 3,
};

const bandwidthListForMapPayload: BandwidthListForMapPayload = {
  nodeIds: [3, 4],
  searchText: 'string',
  filter: 'string',
};

describe('BandwidthMarketPlaceService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should call get all marketplace bandwidth with success', () => {
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

    BandwidthMarketPlaceService.getAllbandwidthMarketplace(getMarketPlaceBandwidthPayload)
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call purchase bandwidth with success', () => {
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

    BandwidthMarketPlaceService.purchaseBandwidth(purchaseBandwidthPay)
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });

  test('Should call get bandwidth list for map with success', () => {
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

    BandwidthMarketPlaceService.getBandwidthListForMap(bandwidthListForMapPayload)
      .then((data: any) => {
        expect(data.success).toBeTruthy();
        expect(data.data).toBeDefined();
      });
  });
});
