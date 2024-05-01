export interface MealProps {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  discount: number;
  image: string;
  description: string;
  enteredDate: string;
  status: boolean;
  sold: number;
  categoryId: number;
  categoryName: string;
  favoriteCount: number;
  rating: number;
}
export interface MealListRes {
  content: MealProps[];
}
export interface RatingDetailProps {
  id: number;
  rating: number;
  comment: string;
  rateDate: string;
  productId: number;
  orderDetailId: number;
  userId: number;
  userName: string;
  userImage: string;
}
export interface RatingDetailRes {
  content: RatingDetailProps[];
}
export interface CategoriesProps {
  categoryId: number;
  categoryName: string;
  image?: string;
}
export interface CategoriesRes{
  content: CategoriesProps[];
}
