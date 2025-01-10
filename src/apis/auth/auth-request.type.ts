interface LoginRequestType {
  email: string;
  password: string;
}

interface RegisterRequestType extends LoginRequestType {
  first_name: string;
  last_name: string;
}

interface ResetPasswordType {
  password: string;
  token: string;
}

export type { LoginRequestType, RegisterRequestType, ResetPasswordType };
