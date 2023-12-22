export type GetMarketplaceBandwidthPayload = {
    searchNneName?: string;
    searchFneName?: string;
    sortField: string;
    sortDirection: string;
    page: number;
    filter?: string;
    pageSize: number;
    searchText?: string;
  }

export interface purchaseBandwidthPayload {
  bdId: number,
  serviceDescription: string,
  onContractPrice?: number,
  onDemandPrice?: number,
}

export interface BandwidthListForMapPayload {
  nodeIds: any[],
  searchText: string,
  filter: string
}
