import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../DesignSystem/button';
import RegistrationForm from './form';
import { NonAuthRoutes } from '../../../enums';

interface FormSectionProps {
  confirmPasswordError: boolean;
  passwordsMatch: boolean;
  isRegisterDisabled: boolean;
  registrationLoading: boolean;
  unameError: string;
  emailError: string;
  scrollToTop: boolean;
  onFieldChange: (fieldName: string, value: string) => void;
  onConfirmPasswordBlur: (_: any) => void;
  onEmailBlur: (_: any) => void;
  onPasswordBlur: (_: any) => void;
  onRegister: () => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  confirmPasswordError, passwordsMatch, isRegisterDisabled, registrationLoading, unameError, emailError, scrollToTop, onFieldChange, onConfirmPasswordBlur, onEmailBlur, onPasswordBlur, onRegister,
}) => {
  const handleKeypress = useCallback((e) => {
    if (e.key === 'Enter' && !isRegisterDisabled) {
      onRegister();
    }
  }, [onRegister, isRegisterDisabled]);

  return (
    <div className="root">
      <h3>New User Registration</h3>
      <div className="form-div">
        <RegistrationForm onKeypress={handleKeypress} onFieldChange={onFieldChange} onConfirmPasswordBlur={onConfirmPasswordBlur} onPasswordBlur={onPasswordBlur} onEmailBlur={onEmailBlur} unameError={unameError} emailError={emailError} confirmPasswordError={confirmPasswordError} passwordsMatch={passwordsMatch} scrollToTop={scrollToTop} />
      </div>
      <div className="buttons">
        <Button variant="primary" text="Register" disabled={isRegisterDisabled} onClick={onRegister} loading={registrationLoading} />
        <label className="account-exists-label">Already have an account ?</label>
        <Link to={NonAuthRoutes.login}><Button variant="success" text="Login" /></Link>
      </div>
    </div>
  );
};

export default FormSection;
