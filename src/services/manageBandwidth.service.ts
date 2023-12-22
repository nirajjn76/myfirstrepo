import * as queryString from 'query-string';
import http from '../httpConfig';
import {
  GetBandwidthPortsPayload, PutupBandwidthForSalePayload, RemoveFromMarketPlacePayload, UpdateGroupPayload, EditBandwidthForSalePayload, UnGroupNrsPayload, AddNrsInGroupPayload, AddGroupPayload, cancelSubPayload,
} from '../interfaces/manageBandwidth.interface';
import { ApiPath } from '../utils/apiConstants';
import { getAuthHeader } from '../utils/methods';

const putUpBandwidthForSale = (payload: PutupBandwidthForSalePayload) => {
  return http.post(ApiPath.putupBandwidthForSale, payload, { headers: getAuthHeader() });
};

const editSaleDetails = (payload: EditBandwidthForSalePayload, bdId: string) => {
  const url = queryString.stringifyUrl({ url: `${ApiPath.editBandiwdthSaleDetail}/${bdId}` });
  return http.put(url, payload, { headers: getAuthHeader() });
};
const getManageBandwidthPorts = (payload: GetBandwidthPortsPayload) => {
  const url = queryString.stringifyUrl({ url: ApiPath.manageBandwidthList, query: payload });

  return http.get(url, { headers: getAuthHeader() });
};

const removeFromMarketPlace = (payload: RemoveFromMarketPlacePayload) => {
  const url = queryString.stringifyUrl({ url: `${ApiPath.removeBandwidthFromMarketplace}/${payload.bdId}` });
  return http.delete(url, { headers: getAuthHeader() });
};

const updateGroupDetails = (payload: UpdateGroupPayload) => {
  const url = queryString.stringifyUrl({ url: `${ApiPath.bandwidthGroup}/${payload.groupId}` });

  return http.put(url, {
    name: payload.name, description: payload.description, icon: payload.icon, neId: payload.neId,
  }, { headers: getAuthHeader() });
};

const getPortsAndGroups = (expandedNeId: string, searchText: string) => {
  const url = queryString.stringifyUrl({
    url: ApiPath.bandwidth + ApiPath.bandwidthPortList,
    query: {
      nodeId: expandedNeId, searchText,
    },
  });

  return http.get(url, { headers: getAuthHeader() });
};

const unGroupNrs = (payload: UnGroupNrsPayload) => {
  const url = queryString.stringifyUrl({ url: `${ApiPath.bandwidthGroup}/${payload.groupId}` });
  // @ts-ignore
  return http.patch(url, { nrIds: payload.nrIds, purchasePortIds: payload.purchasePortIds }, { headers: getAuthHeader() });
};

const addNrsInExistingGroup = (payload: AddNrsInGroupPayload) => {
  const url = queryString.stringifyUrl({ url: `${ApiPath.bandwidthGroup}/${payload.groupId}` });

  return http.put(url, { nrIds: payload.nrIds, purchasePortIds: payload.purchasePortIds, neId: payload.neId }, { headers: getAuthHeader() });
};

const addGroupDetails = (payload: AddGroupPayload) => {
  return http.post(ApiPath.bandwidthGroup, payload, { headers: getAuthHeader() });
};

const cancelSubscription = (payload: cancelSubPayload) => {
  const url = queryString.stringifyUrl({ url: ApiPath.cancelSubscriptionBandwidth });
  return http.post(url, payload, { headers: getAuthHeader() });
};

const ManageBandwidthService = {
  getPortsAndGroups,
  unGroupNrs,
  addGroupDetails,
  addNrsInExistingGroup,
  getManageBandwidthPorts,
  putUpBandwidthForSale,
  removeFromMarketPlace,
  editSaleDetails,
  updateGroupDetails,
  cancelSubscription,
};

export default ManageBandwidthService;
