import { UserProps } from "./user.ts";

export interface CheckoutReq {
  address: string;
  cartId: number;
  description: string;
  paymentMethod: string;
  phone: string;
  username: string;
  voucherCode: string;
}
export interface CheckoutRes {
  ordersId: number;
  orderDate: string;
  amount: number;
  address: string;
  phone: string;
  status: number;
  paymentMethod: string;
  user: UserProps;
  description: string;
  username: string;
}
