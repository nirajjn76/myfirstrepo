import { NodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { getPortName, getGroupPortName } from '../../../../utils/methods';

export interface NENodeModelOptions extends BaseModelOptions {
  portsList?: any;
  groups?: any;
  selectedNe?: any;
  portsUsed?: any,
  groupsUsed?: any;
  bandwidths?: any;
  nodeDataCanvas?: any;
}
export class NENodeModel extends NodeModel {
  portsList: any;

  groups: any;

  selectedNe: any;

  portsUsed: any;

  groupsUsed: any;

  bandwidths: any;

  nodeDataCanvas: any;

  constructor(options: NENodeModelOptions = {}) {
    super({
      ...options,
      type: 'custom_ne',
    });
    this.portsList = options.portsList || [];
    this.groups = options.groups || [];
    this.selectedNe = options.selectedNe || {};
    this.bandwidths = options.bandwidths || [];
    this.portsUsed = options.portsUsed || [];
    this.groupsUsed = options.groupsUsed || [];
    this.nodeDataCanvas = options.nodeDataCanvas || null;

    // this.addGroupsAsPorts(this.groups);
    this.addPorts(this.portsList);
    this.groups.forEach((grp: any) => {
      this.addPorts(grp.ports);
    });

    Object.keys(this.portsUsed).forEach((key: any) => {
      if (key && options.portsUsed[key] && options.portsUsed[key].length > 0) {
        this.addPorts(options.portsUsed[key]);
      }
    });
    Object.keys(this.groupsUsed).forEach((key: any) => {
      const groupData = this.groupsUsed[key] || [];
      groupData.forEach((group: any) => {
        if (group && group.ports) {
          this.addPorts(group.ports);
        }
      });
    });
  }

  addGroupsAsPorts(groups: any) {
    groups.forEach((group: any) => {
      this.addPort(
        new DefaultPortModel({
          in: false, // this is type or nature of the port. If true it's "in" port else "out" port.
          name: getGroupPortName(group.groupId),
        }),
      );
    });
  }

  addPorts(ports: any) {
    ports.forEach((port: any) => {
      this.addPort(
        new DefaultPortModel({
          in: false, // this is type or nature of the port. If true it's "in" port else "out" port. This doesn't matter now as we are allow user to connect any type to any port
          name: getPortName(port.portId, port.purchasePortId),
          extras: {
            data: {
              ...port,
              nodeId: this.selectedNe.id,
            },
          },
          // extras: { draggable }, add extras as property for any other type
        }),
      );
    });
  }

  serialize() {
    return {
      ...super.serialize(),
      portsList: this.portsList,
      groups: this.groups,
      selectedNe: this.selectedNe,
      portsUsed: this.portsUsed,
      groupsUsed: this.groupsUsed,
      bandwidth: this.bandwidths,
      nodeDataCanvas: this.nodeDataCanvas,
    };
  }

  deserialize(event: any): void {
    super.deserialize(event);
    this.portsList = event.data.portsList;
    this.groups = event.data.groups;
    this.selectedNe = event.data.selectedNe;
    this.portsUsed = event.data.portsUsed;
    this.groupsUsed = event.data.groupsUsed;
    this.bandwidths = event.data.bandwidth;
    this.nodeDataCanvas = event.data.nodeDataCanvas;
  }
}
