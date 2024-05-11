import {useQuery} from '@tanstack/react-query';
import {BASE_URL, request} from '../../network/service.ts';
import {RatingDetailRes} from '../../models/meal.ts';

export function useRatingDetail(params: any) {
  const getRating = async () => {
    const res = await getRatingDetail(params);
    return res.result.content;
  };
  return useQuery({
    queryKey: ['RATING_DETAIL', params],
    queryFn: getRating,
    staleTime: 20000,
  });
}
export const getRatingDetail = (params: any) =>
  request<RatingDetailRes>('get', `${BASE_URL}/rates/products/${params}`).then(
    r => r,
  );
