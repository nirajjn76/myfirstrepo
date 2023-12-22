import React from 'react';

interface EdgeProps {
  logo: any;
  text: string;
}

const Edge: React.FC<EdgeProps> = ({ logo, text }) => {
  return (
    <div>
      <div className="edge-logo">
        <img src={logo} alt="Edge logo" />
      </div>
      <div className="edge-desc">
        <h6>{text}</h6>
      </div>
    </div>
  );
};

export default Edge;
