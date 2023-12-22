interface PortDetail {
  portName: string;
  rx: number;
  tx: number;
  portTypeId: number;
}

export interface AddPortPayload {
  neId: number;
  portDescription: string;
  nodeId: number;
  portDetails: PortDetail[];
}

export interface AddBandwidthPayload {
  bandwidthDescription: string;
  nePortsInfo: AddPortPayload;
  fePortsInfo: AddPortPayload;
}
