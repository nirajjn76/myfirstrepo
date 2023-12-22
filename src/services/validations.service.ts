import * as queryString from 'query-string';
import http from '../httpConfig';
import {
  GetUsersPayload, ValidateUserPayload, GetPortsPayload, ValidatePortPayload, GetBandwidthPortsPayload, ValidateBandwidthPortsPayload, GetCcPortsPayload, ValidateCcPortPayload, GetDeletePortsPayload, DeletePortPayload, GetDeleteBandwidthPortsPayload, DeleteBandwidthPayload,
} from '../interfaces/validations.interface';
import { ApiPath } from '../utils/apiConstants';
import { getAuthHeader } from '../utils/methods';

const getUsers = (payload: GetUsersPayload) => {
  const url = queryString.stringifyUrl({ url: ApiPath.users, query: payload });

  return http.get(url, { headers: getAuthHeader() });
};

const getPorts = (payload: GetPortsPayload) => {
  const url = queryString.stringifyUrl({ url: ApiPath.networkResources, query: payload });

  return http.get(url, { headers: getAuthHeader() });
};

const getCcPorts = (payload: GetCcPortsPayload) => {
  const url = queryString.stringifyUrl({ url: ApiPath.crossConnect, query: payload });

  return http.get(url, { headers: getAuthHeader() });
};

const getBandwidthPorts = (payload: GetBandwidthPortsPayload) => {
  const url = queryString.stringifyUrl({ url: ApiPath.bandwidth, query: payload });

  return http.get(url, { headers: getAuthHeader() });
};

const getRoles = () => {
  return http.get(ApiPath.users + ApiPath.role, { headers: getAuthHeader() });
};

const validateUser = (payload: ValidateUserPayload) => {
  return http.put(ApiPath.users + ApiPath.validateUser, payload, { headers: getAuthHeader() });
};

const validatePort = (payload: ValidatePortPayload) => {
  return http.put(ApiPath.networkResources + ApiPath.validatePort, payload, { headers: getAuthHeader() });
};

const validateCrossConnectPorts = (payload: ValidateCcPortPayload) => {
  return http.put(ApiPath.crossConnect, payload, { headers: getAuthHeader() });
};

const validateBandwidthPorts = (payload: ValidateBandwidthPortsPayload) => {
  return http.put(ApiPath.bandwidth, payload, { headers: getAuthHeader() });
};

const getDeletePorts = (payload : GetDeletePortsPayload) => {
  const url = queryString.stringifyUrl({ url: ApiPath.getDeletePortList, query: payload });

  return http.get(url, { headers: getAuthHeader() });
};

const deletePort = (payload: DeletePortPayload) => {
  return http.put(ApiPath.deletePort, payload, { headers: getAuthHeader() });
};

const getDeleteBandwidthPorts = (payload : GetDeleteBandwidthPortsPayload) => {
  const url = queryString.stringifyUrl({ url: ApiPath.getDeleteBandwidthPortList, query: payload });

  return http.get(url, { headers: getAuthHeader() });
};

const deleteBandwidth = (payload: DeleteBandwidthPayload) => {
  return http.put(ApiPath.deleteBandwidth, payload, { headers: getAuthHeader() });
};
const ValidationsService = {
  getUsers,
  getRoles,
  validateUser,
  getPorts,
  getCcPorts,
  validatePort,
  getBandwidthPorts,
  validateBandwidthPorts,
  validateCrossConnectPorts,
  getDeletePorts,
  deletePort,
  getDeleteBandwidthPorts,
  deleteBandwidth,
};

export default ValidationsService;
