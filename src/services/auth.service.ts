import http from '../httpConfig';
import { RegisterUserPayload, LoginUserPayload } from '../interfaces/auth.interface';
import { ApiPath } from '../utils/apiConstants';

const registerUser = (payload: RegisterUserPayload) => {
  return http.post(ApiPath.users, payload);
};

const loginUser = (payload: LoginUserPayload) => {
  return http.post(ApiPath.login, payload);
};

const storeToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

const getToken = () => {
  return localStorage.getItem('authToken');
};

const storeRole = (role: string) => {
  localStorage.setItem('role', role);
};

const getRole = () => {
  return localStorage.getItem('role');
};

const storeUserName = (uname: string) => {
  localStorage.setItem('uname', uname);
};

const storeOrganizationId = (id: number) => {
  localStorage.setItem('org_id', JSON.stringify(id));
};

const getUserName = () => {
  return localStorage.getItem('uname');
};

const logout = () => {
  localStorage.clear();
};

const AuthService = {
  registerUser,
  loginUser,
  storeToken,
  getToken,
  storeRole,
  getRole,
  storeUserName,
  storeOrganizationId,
  getUserName,
  logout,
};

export default AuthService;
