import React, { useCallback } from 'react';
import FormFieldBox from '../DesignSystem/formFieldBox';
import Input from '../DesignSystem/input';
import { LoginFieldsMapping } from '../../utils/appConstants';

interface LoginFormProps {
  onFieldChange: (fieldName: string, value: string) => void;
  authError: string;
  onKeypress: (e: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onFieldChange, authError, onKeypress }) => {
  const handleInputChange = useCallback((field: string, e: any) => {
    onFieldChange(field, e?.target?.value?.trim() ?? '');
  }, [onFieldChange]);

  return (
    <div>
      <FormFieldBox>
        <label>
          Username or Email Id
          <span className="astrisk">*</span>
        </label>
        <Input placeholder="user.name@wavexchange.net" variant="input" name={LoginFieldsMapping.userId} onChange={(e) => handleInputChange(LoginFieldsMapping.userId, e)} error={!!authError} onKeypress={onKeypress} />
      </FormFieldBox>
      <FormFieldBox>
        <label>
          Password
          <span className="astrisk">*</span>
        </label>
        <Input placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" name={LoginFieldsMapping.password} variant="password" onChange={(e) => handleInputChange(LoginFieldsMapping.password, e)} error={!!authError} errorMessage={authError} onKeypress={onKeypress} />
      </FormFieldBox>
    </div>
  );
};

export default LoginForm;
