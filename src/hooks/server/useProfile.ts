import {useQuery} from '@tanstack/react-query';
import {BASE_URL, request} from '../../network/service.ts';
import {useSelector} from 'react-redux';
import {selectUserInfo} from '../../stores/authSlice.ts';
import {UserProps} from '../../models/user.ts';

export function useProfile() {
  const userInfo = useSelector(selectUserInfo);
  const getProducts = async () => {
    const res = await getProfile(userInfo?.id);
    return res.result;
  };
  return useQuery({
    queryKey: ['PROFILE'],
    queryFn: getProducts,
    staleTime: 20000,
  });
}
export const getProfile = (params: any) =>
  request<UserProps>('get', `${BASE_URL}/users/${params}`).then(r => r);
export const updateProfile = (params: any) =>
  request<UserProps>('put', `${BASE_URL}/users/${params}`).then(r => r);
