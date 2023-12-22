import React from 'react';
import clsx from 'clsx';
import DollarIcon from '../../assets/images/dollar-white.svg';

interface PriceBoxProps {
  text: string;
  amount: number | string;
  color: 'green' | 'blue' | '#304052';
}

const PriceBox: React.FC<PriceBoxProps> = ({ text, amount, color }) => {
  return (
    <div className={clsx('price-box', `box-${color}`)}>
      <div className="amount">
        <div>
          <img src={DollarIcon} alt="Dollar" />
        </div>
        <div>
          <label>{amount}</label>
        </div>
      </div>
      <div className="title">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default PriceBox;
