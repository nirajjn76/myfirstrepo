import React from 'react';
import Logo from '../../../assets/images/register-logo.svg';
import Edges from './Edges';

const LeftSection: React.FC = () => {
  return (
    <>
      <div className="logo">
        <img src={Logo} alt="WaveXChange Logo" />
      </div>
      <div className="description">
        <div className="heading">
          <h2>Private Edge Compute at the Speed of Cloud</h2>
        </div>
        <Edges />
      </div>
    </>
  );
};

export default LeftSection;
