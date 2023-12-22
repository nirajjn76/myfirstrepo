import React from 'react';
import WXPayComponent from '../components/WXPay';

const WXPay: React.FC = () => {
  return (
    <div className="wx-pay-root">
      <h3>WX Pay</h3>
      <WXPayComponent />
    </div>
  );
};

export default WXPay;
