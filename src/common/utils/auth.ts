// @ts-ignore

import AsyncStorage from '@react-native-async-storage/async-storage';

export const Authorization = {
  // saveToken: (token: string) => {
  //   AsyncStorage.setItem('token', token);
  // },
  saveToken: async (token: string) => {
    try {
      const tokenString = JSON.stringify(token);
      await AsyncStorage.setItem('userToken', tokenString);
      console.log('Token saved successfully:', tokenString);
    } catch (error) {
      console.error('Error saving token to AsyncStorage:', error);
    }
  },
  getToken: async () => {
    try {
      const tokenString = await AsyncStorage.getItem('userToken');
      if (tokenString !== null) {
        const token = JSON.parse(tokenString);
        console.log('Token retrieved successfully:', token);
        return token;
      } else {
        // No token found
        console.log('No token found in AsyncStorage');
        return null;
      }
    } catch (error) {
      // Error retrieving token
      console.error('Error retrieving token from AsyncStorage:', error);
      return null;
    }
  },
  clearToken: async () => {
    await AsyncStorage.removeItem('userToken');
  },
};
// export const setLogin = async (value: string) => {
//   try {
//     await AsyncStorage.setItem('isLogin', value);
//   } catch (error) {
//     // Error saving data
//   }
// };
// export const isLogin = async () => {
//   try {
//     await AsyncStorage.getItem('isLogin');
//   } catch (error) {
//     // Error saving data
//   }
// };
