import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams';

export default class SelectNodeModel extends NodeModel<NodeModelGenerics> {
  constructor() {
    super({ type: 'custom' });
  }
}
