import {LoginReq, LoginRes} from '../../models/login.ts';
import {BASE_URL, request} from '../../network/service.ts';
import {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {setCartUser, setIsLogin, setUserInfo} from '../../stores/authSlice.ts';
import {getCartUser} from './cart.ts';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = async (data: LoginReq, navigation: any) => {
    setLoading(true);
    try {
      const res = await request<LoginRes>(
        'post',
        `${BASE_URL}/users/signin`,
        data,
      );
      if (res?.result) {
        if (res.result.token) {
          dispatch(setIsLogin(true));
          dispatch(setUserInfo(res.result));
          navigation.navigate('BottomStack');
          setLoading(false);
        }
      }
    } catch (err: any) {
      dispatch(setIsLogin(false));
      console.log(err);
      Alert.alert('Lỗi', JSON.stringify(err));
      setLoading(false);
    }
  };
  return {
    handleLogin,
    loading,
  };
};

export default useLogin;
