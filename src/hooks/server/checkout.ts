import {BASE_URL, request} from '../../network/service.ts';
import {CheckoutReq, CheckoutRes} from '../../models/checkout.ts';

export const checkoutProcess = (params: CheckoutReq, email: string) =>
  request<CheckoutRes>(
    'post',
    `${BASE_URL}/orders/users/${email}`,
    params,
  ).then(r => r);
