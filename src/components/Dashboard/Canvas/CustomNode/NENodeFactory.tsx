import { DiagramEngine } from '@projectstorm/react-diagrams';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import * as React from 'react';
import NENodeWidget from './NENodeWidget';
import { NENodeModel } from './NENodeModel';

export default class NENodeFactory extends AbstractReactFactory<NENodeModel, DiagramEngine> {
  constructor() {
    super('custom_ne');
  }

  // eslint-disable-next-line class-methods-use-this
  generateModel() {
    return new NENodeModel();
  }

  generateReactWidget(event: any): JSX.Element {
    return <NENodeWidget engine={this.engine} node={event.model} />;
  }
}
