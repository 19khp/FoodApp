import {useQuery} from '@tanstack/react-query';
import {BASE_URL, request} from '../../network/service.ts';
import {CategoriesRes} from '../../models/meal.ts';

export function useCategory() {
  const getCategory = async () => {
    const res = await getCategoryList();
    return res.result.content;
  };
  return useQuery({
    queryKey: ['CATEGORY'],
    queryFn: getCategory,
    staleTime: 20000,
  });
}
export const getCategoryList = () =>
  request<CategoriesRes>('get', `${BASE_URL}/categories`, {
    keyword: '',
  }).then(r => r);
