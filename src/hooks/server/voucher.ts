import {BASE_URL, request} from '../../network/service.ts';
import {VoucherRes} from '../../models/voucher.ts';

export const validateVoucher = (params: any) =>
  request<VoucherRes>('get', `${BASE_URL}/vouchers/${params}/vadidate`).then(
    r => r,
  );
