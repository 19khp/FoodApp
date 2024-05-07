import {UserProps} from './user.ts';

export interface HistoryRes {
  ordersId: number;
  orderDate: string;
  amount: number;
  address: string;
  phone: string;
  status: number;
  paymentMethod: string;
  user: UserProps;
  description: string;
  username: string;
}
export interface HistoryResult {
  content: HistoryRes[];
}
export interface HistoryDetail {
  orderDto: {
    paymentMethod: string;
    voucherCode: string;
    cartId: number;
    description: string;
    username: string;
    address: string;
    phone: string;
    status: number;
    orderDate: string;
    amount: number;
  };
  orderDetailDtos: OderDetailDtos[];
}
interface OderDetailDtos {
  orderDetailId: number;
  quantity: number;
  price: number;
  productDto: {
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
  };
}
