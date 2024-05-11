import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store.ts';
import {CartDetailDto, CartUserRes} from '../models/user.ts';

interface CheckoutState {
  cart: CartUserRes | null;
  isUpdateCart: boolean;
}

const initialState: CheckoutState = {
  cart: null,
  isUpdateCart: false,
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    fetchCartSuccess(state, action: PayloadAction<CartUserRes>) {
      state.cart = action.payload;
    },
    updateCheckoutCart: (
      state,
      action: PayloadAction<{
        productId: number;
        quantity: number;
      }>,
    ) => {
      if (state.cart) {
        const {productId, quantity} = action.payload;
        const existingItemIndex = state.cart.cartDetailDtos.findIndex(
          item => item.productId === productId,
        );
        if (existingItemIndex !== -1) {
          state.cart.cartDetailDtos[existingItemIndex].quantitySold = quantity;
        }
      }
    },
    removeFromCheckoutCart: (state, action: PayloadAction<number>) => {
      if (state.cart) {
        state.cart.cartDetailDtos = state.cart.cartDetailDtos.filter(
          item => item.productId !== action.payload,
        );
      }
    },
    clearCheckoutCart: state => {
      state.cart = null;
    },
    setIsUpdateCart: (state, action: PayloadAction<boolean>) => {
      state.isUpdateCart = action.payload;
    },
  },
});

export const {
  fetchCartSuccess,
  removeFromCheckoutCart,
  updateCheckoutCart,
  clearCheckoutCart,
  setIsUpdateCart,
} = checkoutSlice.actions;

// Selector to retrieve checkout cart from state
export const selectCheckoutCart = (state: RootState) => state.checkout.cart;
export const selectIsUpdateCart = (state: RootState) =>
  state.checkout.isUpdateCart;

export default checkoutSlice.reducer;
