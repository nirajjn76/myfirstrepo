import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import AddIcon from '@material-ui/icons/Add';

export interface SelectNodeWidgetProps {
  engine: DiagramEngine;
}

const SelectNodeWidget: React.FC<SelectNodeWidgetProps> = ({ engine }) => {
  const onNewNodeClick = (event: any) => {
    engine.fireEvent(event, 'onAddNewNodeClick');
  };

  return (
    <div className="select-node-root" onClick={onNewNodeClick}>
      <div className="text">
        <label>Select Node</label>
      </div>
      <div className="plus-sign">
        <AddIcon />
      </div>
    </div>
  );
};

export default SelectNodeWidget;
