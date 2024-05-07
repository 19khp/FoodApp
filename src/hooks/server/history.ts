import {BASE_URL, request} from '../../network/service.ts';
import {HistoryDetail, HistoryResult} from '../../models/history.ts';

export const getHistory = (email: string) =>
  request<HistoryResult>('get', `${BASE_URL}/orders/users/${email}`, {
    page: 1,
    size: 100,
  }).then(r => r);
export const getHistoryDetails = (orderId: number) =>
  request<HistoryDetail>('get', `${BASE_URL}/orders/${orderId}`).then(r => r);
export const deteleHistory = (orderId: number) =>
  request<boolean>(
    'post',
    `${BASE_URL}/orders/${orderId}?orderStatus=CANCELLED`,
  ).then(r => r);
