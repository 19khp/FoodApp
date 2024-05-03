import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store.ts';
import {CartDetailDto} from '../models/user.ts';

interface CheckoutState {
  checkoutCarts: CartDetailDto[];
  isUpdateCart: boolean;
}

const initialState: CheckoutState = {
  checkoutCarts: [],
  isUpdateCart: false,
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addToCheckoutCart: (state, action: PayloadAction<CartDetailDto>) => {
      const existingItemIndex = state.checkoutCarts.findIndex(
        item => item.productId === action.payload.productId,
      );
      if (existingItemIndex !== -1) {
        state.checkoutCarts[existingItemIndex].quantitySold += Number(
          action.payload.quantitySold,
        );
      } else {
        state.checkoutCarts.push(action.payload);
      }
    },
    editCheckoutCart: (
      state,
      action: PayloadAction<{
        productId: number;
        quantity: number;
        amount: number;
      }>,
    ) => {
      const {productId, quantity, amount} = action.payload;
      const existingItemIndex = state.checkoutCarts.findIndex(
        item => item.productId === productId,
      );
      if (existingItemIndex !== -1) {
        // If the item exists, update its quantity and amount
        state.checkoutCarts[existingItemIndex].quantitySold = quantity;
        state.checkoutCarts[existingItemIndex].price = amount;
      }
    },
    removeFromCheckoutCart: (state, action: PayloadAction<number>) => {
      state.checkoutCarts = state.checkoutCarts.filter(
        item => item.productId !== action.payload,
      );
    },
    clearCheckoutCart: state => {
      state.checkoutCarts = [];
    },
    setIsUpdateCart: (state, action: PayloadAction<boolean>) => {
      state.isUpdateCart = action.payload;
    },
  },
});

export const {
  addToCheckoutCart,
  removeFromCheckoutCart,
  editCheckoutCart,
  clearCheckoutCart,
  setIsUpdateCart,
} = checkoutSlice.actions;

// Selector to retrieve checkout cart from state
export const selectCheckoutCart = (state: RootState) =>
  state.checkout.checkoutCarts;
export const selectIsUpdateCart = (state: RootState) =>
  state.checkout.isUpdateCart;

export default checkoutSlice.reducer;
