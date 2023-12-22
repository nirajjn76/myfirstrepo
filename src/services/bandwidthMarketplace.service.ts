import * as queryString from 'query-string';
import http from '../httpConfig';
import { GetMarketplaceBandwidthPayload, purchaseBandwidthPayload, BandwidthListForMapPayload } from '../interfaces/bandwidthMarketplace.interface';
import { ApiPath } from '../utils/apiConstants';
import { getAuthHeader } from '../utils/methods';

const getAllbandwidthMarketplace = (payload: GetMarketplaceBandwidthPayload) => {
  const url = queryString.stringifyUrl({ url: ApiPath.marketplaceAllBandwidthList, query: payload });

  return http.get(url, { headers: getAuthHeader() });
};

const purchaseBandwidth = (payload: purchaseBandwidthPayload) => {
  return http.post(ApiPath.purchaseBandwidth, payload, { headers: getAuthHeader() });
};

const getBandwidthListForMap = (payload: BandwidthListForMapPayload) => {
  return http.post(`${ApiPath.getBandwidthListForMap}?searchText=${payload.searchText}&filter=${payload.filter}`, { nodeIds: payload.nodeIds }, { headers: getAuthHeader() });
};

const bandwidthMarketplaceService = {
  getAllbandwidthMarketplace,
  purchaseBandwidth,
  getBandwidthListForMap,
};

export default bandwidthMarketplaceService;
