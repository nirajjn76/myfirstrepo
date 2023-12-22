export enum AuthRoutes {
  blank = '/',
  notDefinedRoute = '/*',
  addPort = '/add/port',
  addBandwidth = '/add/bandwidth',
  dashboard = '/dashboard',
  myNetworkMapView = '/dashboard/my-network-map',
  userVerification = '/admin/user/verification',
  portVerification = '/admin/port/verification',
  bandwidthVerification = '/admin/bandwidth/verification',
  managePorts = '/manage/ports',
  manageBandwidth = '/manage/bandwidth',
  marketPlacePorts = '/marketplace/ports',
  marketPlaceBandwidth = '/marketplace/bandwidths',
  marketPlaceBandwidthMap = '/marketplace/bandwidths/map',
  wxPay = '/pay',
  crossConnectValidation = '/admin/cross-connect/verification',
  deletePorts = '/admin/delete/ports',
  deleteBandwidthPorts = '/admin/delete/bandwithports',
  about = '/about'
}

export enum NonAuthRoutes {
  login = '/login',
  register = '/register'
}

export enum Roles {
  admin = 'wxadmin',
  user = 'enterpriseUser'
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc'
}
