export type GetUsersPayload = {
  verified: boolean;
  searchText?: string;
  sortField: string;
  sortDirection: string;
  page: number;
  pageSize: number;
}

export type GetPortsPayload = {
  verified: boolean;
  searchText?: string;
  sortField: string;
  sortDirection: string;
  page: number;
  pageSize: number;
}

export type GetCcPortsPayload = {
  searchText?: string;
  sortField: string;
  sortDirection: string;
  page: number;
  pageSize: number;
}

export type GetBandwidthPortsPayload = {
  verified: boolean;
  searchText?: string;
  sortField: string;
  sortDirection: string;
  page: number;
  pageSize: number;
}

export interface ValidateUserPayload {
  users: {
    id: string;
    roleId: string | number;
  }[]
}

export interface ValidatePortPayload {
  nrs: string[]
}

export interface ValidateCcPortPayload {
  crossConnectIds: string[]
}

export interface ValidateBandwidthPortsPayload {
  bandwidthIds: string[]
}

export type GetDeletePortsPayload = {
  verified: boolean;
  searchText?: string;
  sortField: string;
  sortDirection: string;
  page: number;
  pageSize: number;
}

export type GetDeleteBandwidthPortsPayload = {
  verified: boolean;
  searchText?: string;
  sortField: string;
  sortDirection: string;
  page: number;
  pageSize: number;
}

export interface DeletePortPayload {
  portIds: string[]
}

export interface DeleteBandwidthPayload {
  portIds: string[]
}
