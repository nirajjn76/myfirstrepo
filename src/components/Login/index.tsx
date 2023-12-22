import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRoutes } from '../../enums';
import FormSection from './formSection';
import ErrorSection from './errorSection';
import { LoginFieldsMapping } from '../../utils/appConstants';
import { ErrorCodesMapping, ErrorCodeMessageMapping } from '../../utils/apiConstants';
import AuthService from '../../services/auth.service';

const LoginSection: React.FC = () => {
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [errorSection, setErrorSection] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const hanndleFieldChange = useCallback((fieldName: string, value: string) => {
    if (fieldName === LoginFieldsMapping.userId) {
      setUserId(value);
    }
    if (fieldName === LoginFieldsMapping.password) {
      setPassword(value);
    }
  }, [LoginFieldsMapping]);

  const handleLoginClick = useCallback(() => {
    setLoginLoading(true);

    const payload = { userId: userId.trim(), password: password.trim() };

    AuthService.loginUser(payload)
      .then((response: any) => {
        setLoginLoading(false);
        AuthService.storeToken(response?.data?.token);
        AuthService.storeRole(response?.data?.role);
        AuthService.storeUserName(response?.data?.username);
        AuthService.storeOrganizationId(response?.data?.organization_id);
        navigate(AuthRoutes.dashboard);
      })
      .catch((e: any) => {
        setLoginLoading(false);
        if (e.errorCode === ErrorCodesMapping[1003]) {
          setAuthError(ErrorCodeMessageMapping[1003]);
          setErrorSection(false);
          setFirstName('');
        }

        if (e.errorCode === ErrorCodesMapping[1004]) {
          setAuthError('');
          setErrorSection(true);
          setFirstName(e?.firstName);
        }
      });
  }, [userId, password, setLoginLoading, setAuthError, setErrorSection]);

  const handleLoginBackClick = useCallback(() => {
    setErrorSection(false);
    setUserId('');
    setPassword('');
  }, [setErrorSection, setUserId, setPassword]);

  const loginDisabled = !userId || !password;

  return (
    <div className="login-section-root">
      <h6>Welcome to WaveXchange</h6>
      {!errorSection ? <FormSection loginLoading={loginLoading} onFieldChange={hanndleFieldChange} loginDisabled={loginDisabled} onLoginClick={handleLoginClick} authError={authError} /> : <ErrorSection onLoginBackClick={handleLoginBackClick} firstName={firstName} />}
    </div>
  );
};

export default LoginSection;
