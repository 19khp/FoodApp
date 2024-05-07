export interface UserProps {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  gender: boolean;
  image: string;
  registerDate: string;
  status: boolean;
  token: string;
  roles: [
    {
      id: number;
      name: string;
    },
  ];
  type: string;
}
export interface CartUserRes {
  cartId: number;
  amount: number;
  cartDetailDtos: CartDetailDto[];
}
export interface CartDetailDto {
  cartDetailId?: number;
  productId: number;
  cartId: number;
  quantitySold: number;
  price: number;
  productImage?: string;
  productName?: string;
  discount?: number;
}
