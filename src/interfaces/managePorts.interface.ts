export interface AddGroupPayload {
  name: string;
  description: string;
  icon: string;
  nrIds: string[];
  purchasePortIds: string[];
  neId: string;
}

export interface PutupForSalePayload {
  neId: number,
  serviceDescription: string,
  onContractPrice?: number,
  onDemandPrice?: number,
  physicalPortIds: number[],
  type: string;
}

export interface EditSalePayload {
  serviceDescription?: string,
  onContractPrice?: number,
  onDemandPrice?: number,
  type?: string;
}

export interface cancelSubPayload {
  pportId: number | string;
}

export interface RemoveFromMarketPlacePayload {
  nrId: number | string;
}

export interface AddNrsInGroupPayload {
  groupId: number;
  nrIds: string[];
  purchasePortIds: string[];
  neId: string;
}

export interface UpdateGroupPayload {
  name: string;
  description: string;
  icon: string;
  groupId: string;
  neId: string;
}

export interface UnGroupNrsPayload {
  groupId: string;
  nrIds?: string[];
  purchasePortIds?: string[];
}
