interface LoginRequestType {
  email: string;
  password: string;
}

interface RegisterRequestType extends LoginRequestType {
  first_name: string;
  last_name: string;
}

export type { LoginRequestType, RegisterRequestType };
