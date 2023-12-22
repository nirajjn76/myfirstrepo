import React from 'react';
import Logo from '../assets/images/register-logo.svg';
import LoginSection from '../components/Login';

const Login: React.FC = () => {
  return (
    <div className="login-root">
      <div className="login-main">
        <div className="root">
          <img className="logo" src={Logo} alt="Company Logo" />
          <LoginSection />
        </div>
      </div>
    </div>
  );
};

export default Login;
