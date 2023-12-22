import React from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

interface CanvasBoardProps {
  engine: any;
}

const CanvasBoard: React.FC<CanvasBoardProps> = ({ engine }) => {
  return (
    <div className="canvas-bg">
      {engine && engine.getModel() && <CanvasWidget engine={engine} />}
    </div>
  );
};

export default CanvasBoard;
