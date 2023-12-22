import * as queryString from 'query-string';
import http from '../httpConfig';
import { GetBandwidthDetailsPayload, GetFeesPayload, GetPortDetailsPayload } from '../interfaces/wxPay.interface';
import { ApiPath } from '../utils/apiConstants';
import { getAuthHeader } from '../utils/methods';

const getFees = (payload: GetFeesPayload) => {
  const url = queryString.stringifyUrl({ url: ApiPath.purchaseResource, query: payload });

  return http.get(url, { headers: getAuthHeader() });
};

const getPortDetails = (payload: GetPortDetailsPayload) => {
  const url = queryString.stringifyUrl({ url: `${ApiPath.purchaseResource}/getAddedAndPurchasedPortDetails`, query: payload });

  return http.get(url, { headers: getAuthHeader() });
};

const getBandwidthDetails = (payload: GetBandwidthDetailsPayload) => {
  const url = queryString.stringifyUrl({ url: `${ApiPath.purchaseResource}/getAddedAndPurchasedBandwidthDetails`, query: payload });

  return http.get(url, { headers: getAuthHeader() });
};
const WXPayService = {
  getFees,
  getPortDetails,
  getBandwidthDetails,
};

export default WXPayService;
