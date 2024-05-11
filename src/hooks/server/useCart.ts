import {useQuery} from '@tanstack/react-query';
import {getCategoryList} from './useCategory.ts';
import {getCartUser} from './cart.ts';
import {useSelector} from 'react-redux';
import {selectUserInfo} from '../../stores/authSlice.ts';

export function useCart() {
  const userInfo = useSelector(selectUserInfo);
  const getCart = async () => {
    const res = await getCartUser(userInfo.email);
    if (res) {
      console.log('============');
      console.log('CART_USER', res.result);
    }
    return res.result;
  };
  return useQuery({
    queryKey: ['CART'],
    queryFn: getCart,
  });
}
