export interface SimpleLoginResponseInterface {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface SimpleLoginBodyInterface {
  username: string;
  password: string;
  encrypted: boolean;
}

export interface LoginResponseInterface {
  token: string;
}

export interface RegisterResponseInterface {
  message: string;
}

export interface TokenInputInterface {
  uid: number;
  token: string;
  tokenAC: string;
}

export interface PasswordRestoreInterface {
  username: string;
  urlRedirectionForRestore: string;
  alertCode: number;
}

export interface UserResponseInterface{
  id: number,
  name: string,
  lastname:string,
  email:string,
  phoneNumber:string,
  role:string,
  profilePic?:string,
  biography?:string,
  disclaimer?:string,
}
