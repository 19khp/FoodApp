import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from '../stores/authSlice';
import checkoutReducer from '../stores/checkoutSlice.ts';

const rootReducer = combineReducers({
  auth: authReducer,
  checkout: checkoutReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
export type RootState = ReturnType<typeof rootReducer>;
