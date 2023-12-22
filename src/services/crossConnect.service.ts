import * as queryString from 'query-string';
import http from '../httpConfig';
import {
  CrossConnect,
} from '../interfaces/crossConnect.interface';
import { ApiPath } from '../utils/apiConstants';
import { getAuthHeader } from '../utils/methods';

const crossConnect = (payload: CrossConnect) => {
  return http.post(ApiPath.crossConnect, payload, { headers: getAuthHeader() });
};

const CrossConnectService = {
  crossConnect,
};

export default CrossConnectService;
