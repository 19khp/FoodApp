export interface LoginReq {
  email: string;
  password: string;
}
export interface LoginRes {
  token: string;
  type: string;
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  gender: boolean;
  status: boolean;
  image: string;
  registerDate: string;
  roles: Array<any>;
}
