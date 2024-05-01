import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store.ts';
import {LoginRes} from '../models/login.ts';

interface AuthState {
  isLogin: boolean;
  userInfo: LoginRes;
}

const initialState: AuthState = {
  isLogin: false,
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
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<LoginRes>) => {
      state.userInfo = action.payload;
    },
  },
});

export const {setIsLogin, setUserInfo} = authSlice.actions;

// Selector to retrieve token from state
export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;

export default authSlice.reducer;
