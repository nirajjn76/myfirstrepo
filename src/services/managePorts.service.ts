import * as queryString from 'query-string';
import http from '../httpConfig';
import {
  AddGroupPayload, AddNrsInGroupPayload, UnGroupNrsPayload, UpdateGroupPayload, PutupForSalePayload, EditSalePayload, RemoveFromMarketPlacePayload, cancelSubPayload,
} from '../interfaces/managePorts.interface';
import { ApiPath } from '../utils/apiConstants';
import { getAuthHeader } from '../utils/methods';

const getPortsAndGroups = (expandedNeId: string, searchText: string, sortField: string, sortDirection: string) => {
  const url = queryString.stringifyUrl({
    url: ApiPath.group + ApiPath.nrList,
    query: {
      neId: expandedNeId, searchText, sortField, sortDirection,
    },
  });

  return http.get(url, { headers: getAuthHeader() });
};

const addGroupDetails = (payload: AddGroupPayload) => {
  return http.post(ApiPath.group, payload, { headers: getAuthHeader() });
};

const addNrsInExistingGroup = (payload: AddNrsInGroupPayload) => {
  const url = queryString.stringifyUrl({ url: `${ApiPath.group}/${payload.groupId}` });

  return http.put(url, { nrIds: payload.nrIds, purchasePortIds: payload.purchasePortIds, neId: payload.neId }, { headers: getAuthHeader() });
};

const updateGroupDetails = (payload: UpdateGroupPayload) => {
  const url = queryString.stringifyUrl({ url: `${ApiPath.group}/${payload.groupId}` });

  return http.put(url, {
    name: payload.name, description: payload.description, icon: payload.icon, neId: payload.neId,
  }, { headers: getAuthHeader() });
};

const getAllGroupsByNEid = (neId: string) => {
  const url = queryString.stringifyUrl({ url: ApiPath.group, query: { neId } });

  return http.get(url, { headers: getAuthHeader() });
};

const unGroupNrs = (payload: UnGroupNrsPayload) => {
  const url = queryString.stringifyUrl({ url: `${ApiPath.group}/${payload.groupId}` });
  // @ts-ignore
  return http.patch(url, { nrIds: payload.nrIds, purchasePortIds: payload.purchasePortIds }, { headers: getAuthHeader() });
};

const putUpForSale = (payload: PutupForSalePayload) => {
  return http.post(ApiPath.putForSale, payload, { headers: getAuthHeader() });
};

const editSaleDetails = (payload: EditSalePayload, nrId: string) => {
  const url = queryString.stringifyUrl({ url: `${ApiPath.putForSale}/${nrId}` });
  return http.put(url, payload, { headers: getAuthHeader() });
};

const removeFromMarketPlace = (payload: RemoveFromMarketPlacePayload) => {
  const url = queryString.stringifyUrl({ url: `${ApiPath.putForSale}/${payload.nrId}` });
  return http.patch(url, {}, { headers: getAuthHeader() });
};

const cancelSubscription = (payload: cancelSubPayload) => {
  const url = queryString.stringifyUrl({ url: ApiPath.cancelSubscription });
  return http.put(url, payload, { headers: getAuthHeader() });
};

const ManagePortsService = {
  getPortsAndGroups,
  addGroupDetails,
  addNrsInExistingGroup,
  getAllGroupsByNEid,
  unGroupNrs,
  updateGroupDetails,
  putUpForSale,
  editSaleDetails,
  removeFromMarketPlace,
  cancelSubscription,
};

export default ManagePortsService;
