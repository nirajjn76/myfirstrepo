export type GetPortsInMarketPlacePayload = {
  searchText?: string;
  sortField: string;
  sortDirection: string;
  filter: string;
  page: number;
  pageSize: number;
}

export type PurchasePortPayload = {
  vportId: number;
  portName: string;
  portDescription: string;
  price: string;
  priceType: string;
  neId: string;
}
