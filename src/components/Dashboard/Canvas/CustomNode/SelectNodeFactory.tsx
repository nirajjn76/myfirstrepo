import { DiagramEngine } from '@projectstorm/react-diagrams';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import * as React from 'react';
import SelectNodeWidget from './SelectNodeWidget';
import SelectNodeModel from './SelectNodeModel';

export default class SelectNodeFactory extends AbstractReactFactory<SelectNodeModel, DiagramEngine> {
  constructor() {
    super('custom');
  }

  generateReactWidget(event: any): JSX.Element {
    return <SelectNodeWidget engine={this.engine} />;
  }

  // eslint-disable-next-line class-methods-use-this
  generateModel(event: any) {
    return new SelectNodeModel();
  }
}
