export interface CrossConnect {
  connect: {
    source_bandwidth_port: boolean,
    source_port_id: string,
    destination_port_id : string,
    destination_bandwidth_port: boolean
  }[],
  disconnect: any[]
}
