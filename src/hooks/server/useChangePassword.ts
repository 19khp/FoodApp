import {useQuery} from '@tanstack/react-query';
import {BASE_URL, request} from '../../network/service.ts';

export function useChangePassword(params: any) {
  const changePassword = async () => {
    const res = await fetchChangePass(params);
    return res.result;
  };
  return useQuery({
    queryKey: ['CHANGE_PASSWORD', params],
    queryFn: changePassword,
    staleTime: 20000,
  });
}
export const fetchChangePass = (params: any) =>
  request<boolean>('post', `${BASE_URL}/users/reset-password`, params).then(
    r => r,
  );
