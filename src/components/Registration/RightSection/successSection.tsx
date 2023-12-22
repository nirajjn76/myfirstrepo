import React from 'react';
import { Link } from 'react-router-dom';
import RightGreenCheckMark from '../../../assets/images/right-green-check-mark.svg';
import { NonAuthRoutes } from '../../../enums';
import Button from '../../DesignSystem/button';

const SuccessSection: React.FC = () => {
  return (
    <div className="success-root">
      <img src={RightGreenCheckMark} alt="Checkmark" />
      <h6>Thank you for your Registration with us.</h6>
      <p>We will notify you when your account has been created.</p>
      <div className="buttons">
        <Link to={NonAuthRoutes.login}><Button className="login-btn-reg" variant="success" text="Login" /></Link>
      </div>
    </div>
  );
};

export default SuccessSection;
