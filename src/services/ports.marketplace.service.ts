import * as queryString from 'query-string';
import http from '../httpConfig';
import {
  GetPortsInMarketPlacePayload, PurchasePortPayload,
} from '../interfaces/ports.marketplace.interface';
import { ApiPath } from '../utils/apiConstants';
import { getAuthHeader } from '../utils/methods';

const getPortsInMarketPlace = (payload: GetPortsInMarketPlacePayload) => {
  const url = queryString.stringifyUrl({ url: ApiPath.putForSale, query: payload });

  return http.get(url, { headers: getAuthHeader() });
};

const purchasePort = (payload: PurchasePortPayload) => {
  return http.post(ApiPath.purchaseResource, payload, { headers: getAuthHeader() });
};

const MarketPlacePortsService = {
  getPortsInMarketPlace,
  purchasePort,
};

export default MarketPlacePortsService;
