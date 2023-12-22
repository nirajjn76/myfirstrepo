import http from '../httpConfig';
import { GetNodeWiseNrPayload } from '../interfaces/dashboard.interface';
import { ApiPath } from '../utils/apiConstants';
import { getAuthHeader } from '../utils/methods';

const getNodeWiseNr = (payload: GetNodeWiseNrPayload) => {
  return http.post(ApiPath.networkResources + ApiPath.nnodeWiseNr, payload, { headers: getAuthHeader() });
};

const getSelectedNodes = () => {
  return http.get(ApiPath.users + ApiPath.selectedNode, { headers: getAuthHeader() });
};

const getCanvasData = () => {
  return http.get(ApiPath.users + ApiPath.canvasPosition, { headers: getAuthHeader() });
};

const getAboutMenus = () => {
  return http.get(ApiPath.aboutMenus, { headers: getAuthHeader() });
};

const putCanvasData = (payload: any) => {
  const reqBody = {
    canvasPosition: payload,
  };
  return http.put(ApiPath.users + ApiPath.updateCanvasPosition, reqBody, { headers: getAuthHeader() });
};

const DashboardService = {
  getNodeWiseNr,
  getSelectedNodes,
  getCanvasData,
  putCanvasData,
  getAboutMenus,
};

export default DashboardService;
