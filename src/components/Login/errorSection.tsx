import React from 'react';
import ErrorInfoIcon from '../../assets/images/error-info-icon.svg';
import LeftArrow from '../../assets/images/left-arrow.svg';

interface ErrorSectionProps {
  firstName: string;
  onLoginBackClick: () => void;
}

const ErrorSection: React.FC<ErrorSectionProps> = ({ firstName, onLoginBackClick }) => {
  return (
    <div className="error-root">
      <div className="error-ui-div">
        <span>
          Hello
          {` ${firstName || 'User'}`}
          ,
        </span>
        <div className="error-ui-root">
          <div>
            <img src={ErrorInfoIcon} alt="Error Info" />
          </div>
          <div>
            <label>Email not found.</label>
            <label>If created an account recently, please wait for waveXchange to verify.</label>
          </div>
        </div>
      </div>
      <div className="link-btn-div">
        <div className="link-btn" onClick={onLoginBackClick} data-testid="login-back-link-btn">
          <img src={LeftArrow} alt="Left arrow" />
          {' '}
          Back to Login
        </div>
      </div>
    </div>
  );
};

export default ErrorSection;
