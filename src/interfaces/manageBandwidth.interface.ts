export type GetBandwidthPortsPayload = {
  searchNneName?: string;
  searchFneName?: string;
  sortField: string;
  sortDirection: string;
  page: number;
  pageSize: number;
  searchText?: string;
}

export interface PutupBandwidthForSalePayload {
  bdId: number,
  serviceDescription: string,
  onContractPrice?: number,
  onDemandPrice?: number,
}

export interface EditBandwidthForSalePayload {
  serviceDescription?: string,
  onContractPrice?: number,
  onDemandPrice?: number,
}

export interface RemoveFromMarketPlacePayload {
  bdId: number | string;
}

export interface UnGroupNrsPayload {
  groupId: string;
  nrIds?: string[];
  purchasePortIds?: string[];
}

export interface AddNrsInGroupPayload {
  groupId: number;
  nrIds: string[];
  purchasePortIds: string[];
  neId: string;
}

export interface AddGroupPayload {
  name: string;
  description: string;
  nrIds: string[];
  purchasePortIds: string[];
  neId: string;
}
export interface cancelSubPayload {
  purchaseId: number | string;
}

export interface UpdateGroupPayload {
  name: string;
  description: string;
  icon: string;
  groupId: string;
  neId: string;
}
