import * as dotenv from 'dotenv';

dotenv.config();

const API_PREFIX = '/api';

export const MY_SELLER_BUCKET_PRE_URL = process.env.REACT_APP_MY_SELLER_BUCKET_PRE_URL;
export const ABOUT_PAGE_BUCKET_PRE_URL = process.env.REACT_APP_ABOUT_PAGE_BUCKET_PRE_URL;
export const TERMS_DEFAULT_FILE = 'sample.pdf';

export const API_URL = process.env.REACT_APP_API_BASE_URL;

export const ApiPath = {
  login: `${API_PREFIX}/login`,
  users: `${API_PREFIX}/users`,
  role: '/role',
  validateUser: '/validate-user',
  selectedNode: '/selected-node',
  networkResources: `${API_PREFIX}/network-resources`,
  networkElements: '/network-elements',
  portTypes: '/port-types',
  validatePort: '/validate-nr',
  canvasPosition: '/canvas-position',
  updateCanvasPosition: '/update-canvas-position',
  nnodeWiseNr: '/nodewise-nr',
  bandwidth: `${API_PREFIX}/bandwidth`,
  bandwidthPortList: '/nr-list',
  group: `${API_PREFIX}/group`,
  bandwidthGroup: `${API_PREFIX}/bandwidth/group`,
  nrList: '/nr-list',
  putForSale: `${API_PREFIX}/virtual-port`,
  manageBandwidthList: `${API_PREFIX}/bandwidth/getManageBandwidthList`,
  myNetworkBandwidthList: `${API_PREFIX}/bandwidth/my-network-details`,
  myNetworkBandwidthListWithoutFilters: `${API_PREFIX}/bandwidth/my-network`,
  putupBandwidthForSale: `${API_PREFIX}/virtual-port/bandwidthLinkForSale`,
  marketplaceAllBandwidthList: `${API_PREFIX}/virtual-port/get-bandwidthlist-for-purchase`,
  purchaseBandwidth: `${API_PREFIX}/purchase-resources/purchase-bandwidth`,
  purchaseResource: `${API_PREFIX}/purchase-resources`,
  editBandiwdthSaleDetail: `${API_PREFIX}/virtual-port/edit-virtualports-for-bandwidth`,
  removeBandwidthFromMarketplace: `${API_PREFIX}/virtual-port/delete-virtualports-for-bandwidth`,
  getBandwidthListForMap: `${API_PREFIX}/virtual-port/bandwidthlist-for-mapview`,
  crossConnect: `${API_PREFIX}/cross-connect`,
  cancelSubscription: `${API_PREFIX}/network-resources/cancel-subscription`,
  cancelSubscriptionBandwidth: `${API_PREFIX}/bandwidth/cancel-bandwidth`,
  getDeletePortList: `${API_PREFIX}/network-resources/get-delete-port-list`,
  deletePort: `${API_PREFIX}/network-resources/delete-port`,
  getDeleteBandwidthPortList: `${API_PREFIX}/bandwidth/bandwidth-list`,
  deleteBandwidth: `${API_PREFIX}/bandwidth/delete-bandwidth`,
  aboutMenus: `${API_PREFIX}/about-menus`,
};

export const ErrorCodeMessageMapping = {
  1001: 'Email Id must be unique.',
  1002: 'Username must be unique.',
  1003: 'Username or password are not matching. Kindly provide valid details.',
  1006: 'Not enough ports available. Please contact waveXchange for further support.',
  1007: 'Port Name is not valid.',
  1008: 'Not enough links available. Please contact waveXchange for further support.',
  1009: 'Port Name is not valid.',
  999: 'Group Name already exists.',
  1010: 'You can not remove selected resource(s) as it seems under purchase by a buyer',
  1012: 'Ports subscription has been already cancelled',
  1013: 'Bandwidth subscription has been already cancelled',
  1014: 'Port already deleted.',
};

export const SuccessMessage = {
  addPort: 'Your Network Resource is added with WaveXchange.',
  addBandwidth: 'Your have successfully added existing Bandwidth from NE1 to NE2.',
  unGroupedSuccess: 'Ports are un-grouped successfully.',
  putForSaleSingleSuccess: 'The Network resource has been successfully put up for sale in the Marketplace.',
  putForSaleEditSuccess: 'PORTNAME details are updated successfully for sales.',
  putBandwidthForSaleSuccess: 'The Bandwidth has been successfully put up for sale in the Marketplace.',
  addGroupSuccess: 'Group created successfully.',
  editGroupSuccess: 'Group details updated.',
  purchaseSuccess: 'The network resource has been successfully purchased.',
  purchaseBandwidthSuccess: 'The bandwidth has been successfully purchased.',
  removeFromMarketPlaceSuccess: 'Network resource has been successfully removed from the Marketplace.',
  removeFromMarketPlaceSuccessForBandwidth: 'The bandwidth has been successfully removed from the Marketplace.',
  putForSaleEditSuccessForBandwidth: 'The Bandwidth details are updated successfully for sale.',
  crossConnectBulkSuccess: 'Operation saved successfully.',
  crossConnectBulkFailed: 'Operation failed, please try after sometime.',
  cancelSubscription: 'Subscription cancelled successfully.',
  deletePort: 'Port has been deleted successfully.',
  deleteMultiplePort: 'Ports have been deleted successfully.',
  deleteBandwidth: 'Bandwidth has been deleted successfully.',
  deleteMultipleBandwidth: 'Bandwidths have been deleted successfully.',
};

export const ErrorCodesMapping = {
  1001: 1001,
  1002: 1002,
  1003: 1003,
  1004: 1004,
  1006: 1006,
  1007: 1007,
  999: 1008,
  1009: 1009,
  1010: 1010,
  1012: 1012,
  1013: 1013,
  1014: 1014,
};

export const StatusCode = {
  Unauthorized: 401,
  ApiNotFound: 404,
  InternalServerError: 500,
};

export const ErrorMessages = {
  internalServerError: 'Something went wrong.',
  unauthorized: 'Session Expired, Please login again.',
  apiPathNotFound: 'Requested API path not found.',
};
