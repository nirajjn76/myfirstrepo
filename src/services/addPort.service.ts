import * as queryString from 'query-string';
import http from '../httpConfig';
import { AddPortPayload, AddBandwidthPayload } from '../interfaces/addPort.interface';
import { ApiPath } from '../utils/apiConstants';
import { getAuthHeader } from '../utils/methods';

const getNetworkElements = (searchText?: string) => {
  const url = queryString.stringifyUrl({ url: ApiPath.networkResources + ApiPath.networkElements, query: { searchText } });

  return http.get(url, { headers: getAuthHeader() });
};

const getPortTypes = () => {
  return http.get(ApiPath.networkResources + ApiPath.portTypes, { headers: getAuthHeader() });
};

const addPorts = (payload: AddPortPayload) => {
  return http.post(ApiPath.networkResources, payload, { headers: getAuthHeader() });
};

const addBandwidth = (payload: AddBandwidthPayload) => {
  return http.post(ApiPath.bandwidth, payload, { headers: getAuthHeader() });
};

const AddPortService = {
  getNetworkElements,
  getPortTypes,
  addPorts,
  addBandwidth,
};

export default AddPortService;
