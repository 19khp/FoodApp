import {BASE_URL, request} from '../../network/service.ts';
import {CheckoutReq, CheckoutRes} from '../../models/checkout.ts';

export const checkoutProcess = (params: CheckoutReq) =>
  request<CheckoutRes>('post', `${BASE_URL}/orders/users/${params}`).then(
    r => r,
  );
