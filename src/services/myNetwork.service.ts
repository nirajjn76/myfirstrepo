import http from '../httpConfig';
import { GetMyNetworkBandwidthPayload, GetMyNetworkBandwidthListPayload } from '../interfaces/myNetwork.interface';
import { ApiPath } from '../utils/apiConstants';
import { getAuthHeader } from '../utils/methods';

const getMyNetworkBandwidths = (payload: GetMyNetworkBandwidthPayload) => {
  return http.post(ApiPath.myNetworkBandwidthList, payload, { headers: getAuthHeader() });
};

const getMyNetworkBandwidthsList = (payload: GetMyNetworkBandwidthListPayload) => {
  return http.post(ApiPath.myNetworkBandwidthListWithoutFilters, payload, { headers: getAuthHeader() });
};

const MyNNetworkService = {
  getMyNetworkBandwidths,
  getMyNetworkBandwidthsList,
};

export default MyNNetworkService;
