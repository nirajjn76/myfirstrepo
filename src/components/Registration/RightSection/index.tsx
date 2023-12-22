import React, { useCallback, useState } from 'react';
import { RegistrationFieldsMapping, ErrorMessages, Regex } from '../../../utils/appConstants';
import { ErrorCodeMessageMapping, ErrorCodesMapping } from '../../../utils/apiConstants';
import FormSection from './formSection';
import SuccessSection from './successSection';
import AuthService from '../../../services/auth.service';

const RightSection: React.FC = () => {
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const [registrationSuccessful, setRegistrationSuccessful] = useState<boolean>(false);
  const [registrationLoading, setRegistrationLoading] = useState<boolean>(false);
  const [scrollToTop, setScrollToTop] = useState<boolean>(false);
  const [unameError, setUnameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [emailValidationError, setEmailValidationError] = useState<string>('');
  const [fname, setFname] = useState<string>('');
  const [lname, setLname] = useState<string>('');
  const [uname, setUname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zip, setZip] = useState<string>('');

  const handleFieldChange = useCallback((fieldName: string, value: string) => {
    if (fieldName === RegistrationFieldsMapping.fname) {
      setFname(value);
    }
    if (fieldName === RegistrationFieldsMapping.lname) {
      setLname(value);
    }
    if (fieldName === RegistrationFieldsMapping.uname) {
      setUname(value);
    }
    if (fieldName === RegistrationFieldsMapping.email) {
      setEmail(value);
    }
    if (fieldName === RegistrationFieldsMapping.contact) {
      setContact(value);
    }
    if (fieldName === RegistrationFieldsMapping.company) {
      setCompany(value);
    }
    if (fieldName === RegistrationFieldsMapping.password) {
      setPassword(value);
    }
    if (fieldName === RegistrationFieldsMapping.confirmPassword) {
      setConfirmPassword(value);
    }
    if (fieldName === RegistrationFieldsMapping.address) {
      setAddress(value);
    }
    if (fieldName === RegistrationFieldsMapping.country) {
      setCountry(value);
    }
    if (fieldName === RegistrationFieldsMapping.state) {
      setState(value);
    }
    if (fieldName === RegistrationFieldsMapping.city) {
      setCity(value);
    }
    if (fieldName === RegistrationFieldsMapping.zip) {
      setZip(value);
    }
  }, [RegistrationFieldsMapping, setFname, setLname, setUname, setEmail, setContact, setCompany, setPassword, setConfirmPassword, setAddress, setCountry, setState, setCity, setZip]);

  const handlePasswordBlur = useCallback((e: any) => {
    if (confirmPassword) {
      if (e?.target?.value !== confirmPassword) {
        setConfirmPasswordError(true);
        setPasswordsMatch(false);
      } else {
        setConfirmPasswordError(false);
        setPasswordsMatch(true);
      }
    }
  }, [confirmPassword, setConfirmPasswordError, setPasswordsMatch]);

  const handleConfirmPasswordBlur = useCallback((e: any) => {
    if (password) {
      if (e?.target?.value !== password) {
        setConfirmPasswordError(true);
        setPasswordsMatch(false);
      } else {
        setConfirmPasswordError(false);
        setPasswordsMatch(true);
      }
    }
  }, [password, setConfirmPasswordError, setPasswordsMatch]);

  const handleEmailBlur = useCallback((e: any) => {
    if (!Regex.email.test(e?.target?.value)) {
      setEmailValidationError(ErrorMessages.register.emailNotValid);
    } else {
      setEmailValidationError('');
    }
  }, [setEmailValidationError]);

  const handleRegister = useCallback(() => {
    if (!confirmPasswordError && passwordsMatch && !emailValidationError) {
      setRegistrationLoading(true);
      setScrollToTop(false);
      const user = {
        firstName: fname.trim(),
        lastName: lname.trim(),
        username: uname.trim(),
        contactNo: contact.trim(),
        zipCode: zip.trim(),
        email: email.trim(),
        company: company.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
        address: address.trim(),
        country: country.trim(),
        state: state.trim(),
        city: city.trim(),
      };

      AuthService.registerUser(user)
        .then(() => {
          setRegistrationLoading(false);
          setRegistrationSuccessful(true);
        })
        .catch((e: any) => {
          setRegistrationLoading(false);
          if (e.errorCode === ErrorCodesMapping[1001]) {
            setScrollToTop(true);
            setEmailError(ErrorCodeMessageMapping[1001]);
            setUnameError('');
          }
          if (e.errorCode === ErrorCodesMapping[1002]) {
            setUnameError(ErrorCodeMessageMapping[1002]);
            setEmailError('');
            setScrollToTop(true);
          }
        });
    }
  }, [confirmPasswordError, passwordsMatch, emailValidationError, setRegistrationSuccessful, setRegistrationLoading, setUnameError, setEmailError, fname, lname, uname, contact, zip, email, company, password, confirmPassword, address, country, state, city]);

  const isRegisterDisabled = !!(!fname || !lname || !uname || !email || !contact || !company || !password || !confirmPassword || !address || !country || !state || !city || !zip || confirmPasswordError || !passwordsMatch || emailValidationError);

  return (
    !registrationSuccessful
      ? <FormSection confirmPasswordError={confirmPasswordError} unameError={unameError} emailError={emailError || emailValidationError} passwordsMatch={passwordsMatch} isRegisterDisabled={isRegisterDisabled} scrollToTop={scrollToTop} onFieldChange={handleFieldChange} onConfirmPasswordBlur={handleConfirmPasswordBlur} onPasswordBlur={handlePasswordBlur} onEmailBlur={handleEmailBlur} onRegister={handleRegister} registrationLoading={registrationLoading} />
      : <SuccessSection />
  );
};

export default RightSection;
