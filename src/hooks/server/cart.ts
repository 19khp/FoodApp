import {BASE_URL, request} from '../../network/service.ts';
import {CartUserRes} from '../../models/user.ts';

export const updateCart = (params: any) =>
  request<boolean>('post', `${BASE_URL}/cart-details`, params).then(r => r);
export const updateCartByText = (params: any) =>
  request<boolean>('put', `${BASE_URL}/cart-details`, params).then(r => r);
export const deleteCart = (params: any) =>
  request<boolean>('delete', `${BASE_URL}/cart-details/${params}`).then(r => r);
export const getCartUser = (params: any) =>
  request<CartUserRes>('get', `${BASE_URL}/carts/users/${params}`).then(r => r);
