import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

interface ZoomControlProps {
  onRangeChange: (_: any) => void;
  scale: number;
}

const ZoomControl: React.FC<ZoomControlProps> = ({ scale, onRangeChange }) => {
  return (
    <div className="range-slider" data-testid="range-slider">
      <div onClick={() => onRangeChange({ target: { value: scale <= 30 ? scale : scale - 10 } })} data-testid="zoom-out">
        <RemoveIcon />
      </div>
      <input
        type="range"
        min="30"
        max="300"
        step="10"
        value={scale}
        onChange={onRangeChange}
      />
      <div>
        <AddIcon onClick={() => onRangeChange({ target: { value: scale >= 300 ? scale : scale + 10 } })} data-testid="zoom-in" />
      </div>
    </div>
  );
};

export default ZoomControl;
