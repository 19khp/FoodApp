import {useQuery} from '@tanstack/react-query';
import {BASE_URL, request} from '../../network/service.ts';
import {MealListRes} from '../../models/meal.ts';

export function useProductList(params: any) {
  const getProducts = async () => {
    const res = await getProductList(params);
    return res.result.content;
  };
  return useQuery({
    queryKey: ['PRODUCT_LIST', params],
    queryFn: getProducts,
    staleTime: 20000,
  });
}
export const getProductList = (params: any) =>
  request<MealListRes>('get', `${BASE_URL}/products`, params).then(r => r);
