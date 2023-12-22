import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './form';
import Button from '../DesignSystem/button';
import { NonAuthRoutes } from '../../enums';

interface FormSectionProps {
  loginLoading: boolean;
  loginDisabled: boolean;
  authError: string;
  onFieldChange: (fieldName: string, value: string) => void;
  onLoginClick: () => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  loginLoading, loginDisabled, authError, onFieldChange, onLoginClick,
}) => {
  const handleKeypress = useCallback((e) => {
    if (e.key === 'Enter' && !loginDisabled) {
      onLoginClick();
    }
  }, [onLoginClick, loginDisabled]);

  return (
    <div className="form-root">
      <LoginForm onFieldChange={onFieldChange} authError={authError} onKeypress={handleKeypress} />
      <div className="buttons">
        <Button variant="primary" text="Login" loading={loginLoading} disabled={loginDisabled} onClick={onLoginClick} />
        <label className="account-exists-label">Register in WaveXchange</label>
        <Link to={NonAuthRoutes.register}><Button variant="success" text="Register" /></Link>
      </div>
    </div>
  );
};

export default FormSection;
