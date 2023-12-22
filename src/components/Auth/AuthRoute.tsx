import React from 'react';
import {
  Navigate,
} from 'react-router-dom';
import { NonAuthRoutes, Roles, AuthRoutes } from '../../enums';
import AuthService from '../../services/auth.service';
import Layout from '../Layout';

interface AuthRouteProps {
  component: any;
  accessibleTo: Roles;
  url?: AuthRoutes
}

const AuthRoute: React.FC<AuthRouteProps> = ({ component, accessibleTo, url }) => {
  const isAuthed = AuthService.getToken();
  const userRole = AuthService.getRole();
  const userName = AuthService.getUserName();
  const Component = component;

  if (!isAuthed) {
    return <Navigate replace to={{ pathname: NonAuthRoutes.login }} />;
  } if ((accessibleTo === Roles.admin && userRole !== Roles.admin) || (url && url === AuthRoutes.blank)) {
    return <Navigate replace to={{ pathname: AuthRoutes.dashboard }} />;
  }
  return <Layout name={userName || ''}><Component /></Layout>;
};

export default AuthRoute;
