export interface RegisterUserPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  contactNo: string;
  company: string;
  password: string;
  confirmPassword: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
}

export interface LoginUserPayload {
  userId: string;
  password: string;
}
