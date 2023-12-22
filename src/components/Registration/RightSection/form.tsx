import React, { useCallback, useEffect, useRef } from 'react';
import Input from '../../DesignSystem/input';
import FormFieldBox from '../../DesignSystem/formFieldBox';
import { RegistrationFieldsMapping, ErrorMessages } from '../../../utils/appConstants';

interface RegistrationFormProps {
  onFieldChange: (fieldName: string, value: string) => void;
  onConfirmPasswordBlur: (_: any) => void;
  onEmailBlur: (_: any) => void;
  onPasswordBlur: (_: any) => void;
  confirmPasswordError: boolean;
  unameError: string;
  emailError: string;
  passwordsMatch: boolean;
  scrollToTop: boolean;
  onKeypress: (e: any) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onKeypress, onFieldChange, onConfirmPasswordBlur, onPasswordBlur, onEmailBlur, confirmPasswordError, unameError, emailError, passwordsMatch, scrollToTop,
}) => {
  const ref = useRef(null);

  const handleInputChange = useCallback((field: string, e: any) => {
    onFieldChange(field, e?.target?.value?.trim() ?? '');
  }, [onFieldChange]);

  useEffect(() => {
    if (scrollToTop) {
      // @ts-ignore
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [scrollToTop, ref]);

  return (
    <form className="form" name="registration-form">
      <div className="two-form-fields-div">
        <div className="one-form-field-div">
          <FormFieldBox>
            <label>
              First Name
              <span className="astrisk">*</span>
            </label>
            <Input placeholder="Smith" variant="input" name={RegistrationFieldsMapping.fname} onChange={(e) => handleInputChange(RegistrationFieldsMapping.fname, e)} onKeypress={onKeypress} />
          </FormFieldBox>
        </div>
        <div className="one-form-field-div">
          <FormFieldBox>
            <label>
              Last Name
              <span className="astrisk">*</span>
            </label>
            <Input placeholder="Anderson" variant="input" name={RegistrationFieldsMapping.lname} onChange={(e) => handleInputChange(RegistrationFieldsMapping.lname, e)} onKeypress={onKeypress} />
          </FormFieldBox>
        </div>
      </div>
      <FormFieldBox>
        <label ref={ref}>
          Username
          <span className="astrisk">*</span>
        </label>
        <Input placeholder="smithanderson" variant="input" name={RegistrationFieldsMapping.uname} onChange={(e) => handleInputChange(RegistrationFieldsMapping.uname, e)} error={!!unameError} errorMessage={unameError || ''} onKeypress={onKeypress} />
      </FormFieldBox>
      <FormFieldBox>
        <label>
          Email Id
          <span className="astrisk">*</span>
        </label>
        <Input placeholder="smithanderson@wavexchange.net" name={RegistrationFieldsMapping.email} variant="input" onChange={(e) => handleInputChange(RegistrationFieldsMapping.email, e)} error={!!emailError} errorMessage={emailError || ''} onBlur={onEmailBlur} onKeypress={onKeypress} />
      </FormFieldBox>
      <FormFieldBox>
        <label>
          Contact No.
          <span className="astrisk">*</span>
        </label>
        <Input placeholder="+1 1234567890" variant="input" name={RegistrationFieldsMapping.contact} onChange={(e) => handleInputChange(RegistrationFieldsMapping.contact, e)} onKeypress={onKeypress} />
      </FormFieldBox>
      <FormFieldBox>
        <label>
          Company Name
          <span className="astrisk">*</span>
        </label>
        <Input placeholder="Acme Inc." variant="input" name={RegistrationFieldsMapping.company} onChange={(e) => handleInputChange(RegistrationFieldsMapping.company, e)} onKeypress={onKeypress} />
      </FormFieldBox>
      <FormFieldBox>
        <label>
          Password
          <span className="astrisk">*</span>
        </label>
        <Input placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" name={RegistrationFieldsMapping.password} variant="password" onChange={(e) => handleInputChange(RegistrationFieldsMapping.password, e)} onBlur={onPasswordBlur} onKeypress={onKeypress} />
      </FormFieldBox>
      <FormFieldBox>
        <label>
          Confirm Password
          <span className="astrisk">*</span>
        </label>
        <Input placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" name={RegistrationFieldsMapping.confirmPassword} variant="password" onChange={(e) => handleInputChange(RegistrationFieldsMapping.confirmPassword, e)} onBlur={onConfirmPasswordBlur} error={!!confirmPasswordError} errorMessage={confirmPasswordError ? ErrorMessages.register.passwordsNotMatch : ''} checkmark={passwordsMatch} onKeypress={onKeypress} />
      </FormFieldBox>
      <FormFieldBox>
        <label>
          Address
          <span className="astrisk">*</span>
        </label>
        <Input placeholder="102, King Street" variant="input" name={RegistrationFieldsMapping.address} onChange={(e) => handleInputChange(RegistrationFieldsMapping.address, e)} onKeypress={onKeypress} />
      </FormFieldBox>
      <div className="two-form-fields-div">
        <div className="one-form-field-div">
          <FormFieldBox>
            <label>
              Country
              <span className="astrisk">*</span>
            </label>
            <Input placeholder="United States" variant="input" name={RegistrationFieldsMapping.country} onChange={(e) => handleInputChange(RegistrationFieldsMapping.country, e)} onKeypress={onKeypress} />
          </FormFieldBox>
        </div>
        <div className="one-form-field-div">
          <FormFieldBox>
            <label>
              State
              <span className="astrisk">*</span>
            </label>
            <Input placeholder="Florida" variant="input" name={RegistrationFieldsMapping.state} onChange={(e) => handleInputChange(RegistrationFieldsMapping.state, e)} onKeypress={onKeypress} />
          </FormFieldBox>
        </div>
      </div>
      <div className="two-form-fields-div">
        <div className="one-form-field-div">
          <FormFieldBox>
            <label>
              City
              <span className="astrisk">*</span>
            </label>
            <Input placeholder="Orlando" variant="input" name={RegistrationFieldsMapping.city} onChange={(e) => handleInputChange(RegistrationFieldsMapping.city, e)} onKeypress={onKeypress} />
          </FormFieldBox>
        </div>
        <div className="one-form-field-div">
          <FormFieldBox>
            <label>
              Zip
              <span className="astrisk">*</span>
            </label>
            <Input placeholder="32804" variant="input" name={RegistrationFieldsMapping.zip} onChange={(e) => handleInputChange(RegistrationFieldsMapping.zip, e)} onKeypress={onKeypress} />
          </FormFieldBox>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
