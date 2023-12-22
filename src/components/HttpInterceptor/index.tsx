import React, { useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import http from '../../httpConfig';
import AuthService from '../../services/auth.service';
import { ErrorMessages, StatusCode } from '../../utils/apiConstants';
import { NonAuthRoutes } from '../../enums';
import WarnInfoIcon from '../../assets/images/warn-toast-icon.svg';
import ErrorInfoIcon from '../../assets/images/error-info-icon.svg';

const HttpInterceptor: React.FC = () => {
  const navigate = useNavigate();
  const token: string | undefined | null = AuthService.getToken();

  const handleError = useCallback((error) => {
    if (error?.response?.status === StatusCode.Unauthorized) {
      toast.warn(ErrorMessages.unauthorized, { icon: <img src={WarnInfoIcon} alt="Warning" />, toastId: 'unauthorized' });
      AuthService.logout();
      navigate(NonAuthRoutes.login);
    } else if (error?.response?.status === StatusCode.ApiNotFound) {
      toast.warn(ErrorMessages.apiPathNotFound, { icon: <img src={ErrorInfoIcon} alt="Error" />, toastId: 'not-found' });
      return Promise.reject({ success: false, message: ErrorMessages.apiPathNotFound });
    } else if (error?.response?.status === StatusCode.InternalServerError) {
      toast.warn(ErrorMessages.internalServerError, { icon: <img src={ErrorInfoIcon} alt="Error" />, toastId: 'internal-server-error' });
      return Promise.reject({ success: false, message: ErrorMessages.internalServerError });
    } else if (!error?.response?.data) {
      toast.error(ErrorMessages.internalServerError, { icon: <img src={ErrorInfoIcon} alt="Error" className="error-icon" />, toastId: 'internalServerError' });
      return Promise.reject({ success: false, message: ErrorMessages.internalServerError });
    } else {
      return Promise.reject(error?.response?.data);
    }
  }, []);

  useEffect(() => {
    // Request interceptor
    const reqInterceptor = http.interceptors.request.use((config) => {
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    const resInterceptor = http.interceptors.response.use((response) => {
      return response?.data ?? {};
    }, (error) => {
      return handleError(error);
    });

    return () => {
      http.interceptors.request.eject(reqInterceptor);
      http.interceptors.response.eject(resInterceptor);
    };
  }, [token]);

  return null;
};

export default HttpInterceptor;
