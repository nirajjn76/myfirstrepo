import React, { useState } from 'react';
import { Resizable } from 're-resizable';
import { forEach } from 'lodash';
import {
  DiagramEngine, PortModelAlignment, PortWidget, DefaultPortModel,
} from '@projectstorm/react-diagrams';
import NRNodeOperations from '../NRNodeOperations';
import NRNode from '../NRNode';
import { NENodeModel } from './NENodeModel';

export interface NENodeWidgetProps {
  engine: DiagramEngine;
  node: NENodeModel;
}

const NENodeWidget: React.FC<NENodeWidgetProps> = ({ engine, node }) => {
  const {
    portsList, nodeDataCanvas, groups, selectedNe,
  } = node;
  const [operationHovered, setOperationsHovered] = useState<boolean>(false);
  const onRefetch = (event: any) => {
    engine.fireEvent(event, 'onRefetchClick');
  };
  const onAddNROpen = (event: any) => {
    engine.fireEvent(selectedNe, 'onAddNROpenClick');
  };
  const onDelete = (event: any) => {
    engine.fireEvent(event, 'onDeleteClick');
  };
  const onAddBandwidthOpen = (event: any) => {
    engine.fireEvent(selectedNe, 'onAddBandwidthOpenClick');
  };
  const onGroupExpandCollapse = (event: any) => {
    engine.fireEvent(event, 'onGroupAction');
  };

  const [nodeWidth, setNodeWidth] = useState(nodeDataCanvas ? nodeDataCanvas.width : 367);
  const [nodeHeight, setNodeHeight] = useState(nodeDataCanvas ? nodeDataCanvas.height : 604);

  const updateLinkUI = () => {
    if (engine && engine.getModel()) {
      forEach(engine.getModel().getLinks(), (link) => {
        const sourcePort = link.getSourcePort() as DefaultPortModel;
        const targetPort = link.getTargetPort() as DefaultPortModel;
        try {
          sourcePort.updateCoords(engine.getPortCoords(sourcePort));
          targetPort.updateCoords(engine.getPortCoords(targetPort));
        } catch (ex) {
          // console.log("updateLinkUI NENodeWidget.tsx");
        }
      });
    }
  };

  const reSizeNode = () => {
    let newWidth = nodeWidth + 1;
    setNodeWidth(newWidth);
    setTimeout(() => {
      newWidth -= 1;
      setNodeWidth(newWidth);
      updateLinkUI();
    }, 10);
  };

  return (
    <Resizable
      defaultSize={{
        width: nodeDataCanvas ? nodeDataCanvas.width : 360,
        height: nodeDataCanvas ? nodeDataCanvas.height : 560,
      }}
      minWidth="360px"
      minHeight="483px"
      // maxWidth="545px"
      // maxHeight="906px"
      size={{ width: nodeWidth, height: nodeHeight }}
      className={`resizable-node parent-node-${selectedNe.id}`}
      onResizeStart={(e, direction, ref) => {
        const model = engine.getModel();
        model.setLocked(true);
      }}
      enable={{ right: true, bottom: true, bottomRight: true }}
      onResizeStop={(e, direction, ref, d) => {
        const model = engine.getModel();
        setNodeWidth(nodeWidth + d.width);
        setNodeHeight(nodeHeight + d.height);
        model.setLocked(false);
        updateLinkUI();
        engine.fireEvent({}, 'resizeEnd');
      }}
    >
      <div className="network-resources-node-root">
        <div className="operations" onMouseLeave={() => setOperationsHovered(false)}>
          <NRNodeOperations hover={operationHovered} onHover={setOperationsHovered} groups={groups} onDeleteClick={onDelete} ports={portsList} selectedNe={selectedNe} onAddBandwidthOpen={onAddBandwidthOpen} onAddNROpen={onAddNROpen} />
        </div>
        <div className="network-resources">
          <NRNode
            engine={engine}
            node={node}
            onRefetch={onRefetch}
            onAddNROpen={onAddNROpen}
            reSizeNode={reSizeNode}
            onGroupExpandCollapse={onGroupExpandCollapse}
          />
        </div>
      </div>
    </Resizable>
  );
};

export default NENodeWidget;
