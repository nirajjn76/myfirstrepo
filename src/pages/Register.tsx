import React from 'react';
import LeftSection from '../components/Registration/LeftSection';
import RightSection from '../components/Registration/RightSection';

const Register: React.FC = () => {
  return (
    <div className="register-root">
      <div className="left-section">
        <LeftSection />
      </div>
      <div className="right-section">
        <RightSection />
      </div>
    </div>
  );
};

export default Register;
