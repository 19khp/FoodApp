import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store.ts';

interface CheckoutItem {
  productId: number;
  name: string;
  amount: number;
  quantity: number;
  image: string;
}

interface CheckoutState {
  checkoutCarts: CheckoutItem[];
}

const initialState: CheckoutState = {
  checkoutCarts: [],
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addToCheckoutCart: (state, action: PayloadAction<CheckoutItem>) => {
      const existingItemIndex = state.checkoutCarts.findIndex(
        item => item.productId === action.payload.productId,
      );
      if (existingItemIndex !== -1) {
        state.checkoutCarts[existingItemIndex].quantity += Number(
          action.payload.quantity,
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
        state.checkoutCarts[existingItemIndex].quantity = quantity;
        state.checkoutCarts[existingItemIndex].amount = amount;
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
  },
});

export const {
  addToCheckoutCart,
  removeFromCheckoutCart,
  editCheckoutCart,
  clearCheckoutCart,
} = checkoutSlice.actions;

// Selector to retrieve checkout cart from state
export const selectCheckoutCart = (state: RootState) =>
  state.checkout.checkoutCarts;

export default checkoutSlice.reducer;
