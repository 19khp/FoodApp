import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store.ts';
import {LoginRes} from '../models/login.ts';
import {CartUserRes} from '../models/user.ts';

interface AuthState {
  isLogin: boolean;
  isUpdateProfile: boolean;
  userInfo: LoginRes;
  cartUser: CartUserRes;
}

const initialState: AuthState = {
  isLogin: false,
  isUpdateProfile: false,
  userInfo: {
    id: 0,
    name: '',
    email: '',
    password: '',
    type: '',
    phone: '',
    address: '',
    gender: true,
    image: '',
    registerDate: '',
    status: true,
    token: '',
    roles: [
      {
        id: 0,
        name: '',
      },
    ],
  },
  cartUser: {
    cartId: 0,
    amount: 0,
    cartDetailDtos: [],
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setIsUpdateProfile: (state, action: PayloadAction<boolean>) => {
      state.isUpdateProfile = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<LoginRes>) => {
      state.userInfo = action.payload;
    },
    setCartUser: (state, action: PayloadAction<CartUserRes>) => {
      state.cartUser = action.payload;
    },
  },
});

export const {setIsLogin, setUserInfo, setCartUser, setIsUpdateProfile} =
  authSlice.actions;

// Selector to retrieve token from state
export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;
export const selectCartUser = (state: RootState) => state.auth.cartUser;
export const selectIsUpdateProfile = (state: RootState) =>
  state.auth.isUpdateProfile;

export default authSlice.reducer;
