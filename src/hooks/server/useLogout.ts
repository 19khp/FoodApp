import {useState} from 'react';
import {BASE_URL, request} from '../../network/service.ts';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../../stores/authSlice.ts';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async (navigation: any) => {
    setLoading(true);
    try {
      const res = await request('get', `${BASE_URL}/users/logout`);
      if (res) {
        dispatch(setIsLogin(false));
        navigation.navigate('Login');
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      Alert.alert('Thông báo', err);
    }
  };
  return {
    loading,
    handleLogout,
  };
};

export default useLogout;
