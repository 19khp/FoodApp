import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  K_BORDER_RADIUS_100,
  K_BORDER_RADIUS_20,
  K_FONT_SIZE_17,
  K_FONT_SIZE_9,
  K_MARGIN_20,
  K_MARGIN_8,
  K_PADDING_12,
  K_PADDING_32,
  K_PADDING_4,
  K_PADDING_6,
  K_SIZE_10,
  K_SIZE_24,
  K_SIZE_26,
  K_SIZE_30,
  K_SIZE_80,
  TextBase,
} from '../common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../common/constants/color';
import home from '../screens/home';
import meals from '../screens/meals';
import profile from '../screens/profile';
import history from '../screens/history';
import MealDetail from '../screens/meals/mealDetails';
import Cart from '../screens/cart';
import Checkout from '../screens/checkout';
import Login from '../screens/login';
import WelcomeScreen from '../screens/welcome-screen';
import SignUp from '../screens/sign-up';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Details from '../screens/profile/details';
import ChangePassword from '../screens/profile/change-password';
import {useDispatch, useSelector} from 'react-redux';
import {setCartUser} from '../stores/authSlice.ts';
import {useCart} from '../hooks/server/useCart.ts';
import {selectIsUpdateCart, setIsUpdateCart} from '../stores/checkoutSlice.ts';
import CheckoutResult from '../screens/checkout/checkoutResult';
import HistoryDetails from "../screens/history/details";
import RatingMeal from "../screens/history/rating";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomBackButton = ({navigation}: any) => (
  <MaterialCommunityIcons
    name="chevron-left"
    size={K_SIZE_30}
    style={{marginLeft: K_MARGIN_8}}
    onPress={() => navigation.goBack()}
    color={colors.color_black}
  />
);
const CartButton = ({navigation}: any) => {
  const {data: cart, refetch: refetchCart} = useCart();
  const dispatch = useDispatch();
  const isUpdateCart = useSelector(selectIsUpdateCart);
  useEffect(() => {
    if (cart) {
      dispatch(setCartUser(cart));
    }
    if (isUpdateCart) {
      refetchCart();
      dispatch(setIsUpdateCart(false));
    }
  }, [isUpdateCart, dispatch, cart, refetchCart]);
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
      <View
        style={{
          alignItems: 'center',
          position: 'relative',
          marginTop: K_MARGIN_8,
        }}>
        <MaterialCommunityIcons
          name="cart-outline"
          size={K_SIZE_24}
          style={{marginRight: K_MARGIN_20}}
          color={colors.color_black}
        />
        <View
          style={{
            backgroundColor: colors.color_primary,
            paddingHorizontal: K_PADDING_6,
            borderRadius: K_BORDER_RADIUS_100,
            bottom: K_PADDING_32,
          }}>
          <TextBase
            text={cart?.cartDetailDtos.length.toString() || '0'}
            color={colors.color_white}
            lineHeight={K_FONT_SIZE_17}
            fontSize={K_FONT_SIZE_9}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const SkipButton = ({navigation}: any) => (
  <TouchableOpacity
    onPress={() => {
      navigation.navigate('BottomStack');
    }}
    style={styles.touchableOpacity}>
    <TextBase fontSize={K_SIZE_10}>Bỏ qua</TextBase>
  </TouchableOpacity>
);
const BottomStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.color_primary,
        tabBarStyle: {
          backgroundColor: colors.color_background,
          borderTopWidth: 0,
          height: K_SIZE_80,
        },
      }}>
      <Tab.Screen
        name="home"
        component={home}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => {
            return (
              <MaterialCommunityIcons
                name="home"
                size={K_SIZE_30}
                color={color}
                style={{
                  elevation: focused ? 11 : 0,
                  shadowColor: focused ? colors.color_primary : 'transparent',
                  shadowOffset: {
                    width: 0,
                    height: focused ? 6 : 0,
                  },
                  shadowOpacity: focused ? 0.4 : 0,
                  shadowRadius: focused ? 10 : 0,
                }}
                // onPress={() => refetchCart()}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="meals"
        component={meals}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => {
            return (
              <MaterialCommunityIcons
                name="food"
                size={K_SIZE_26}
                color={color}
                style={{
                  elevation: focused ? 11 : 0,
                  shadowColor: focused ? colors.color_primary : 'transparent',
                  shadowOffset: {
                    width: 0,
                    height: focused ? 6 : 0,
                  },
                  shadowOpacity: focused ? 0.4 : 0,
                  shadowRadius: focused ? 10 : 0,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="history"
        component={history}
        options={{
          title: 'Lịch sử',
          headerStyle: {backgroundColor: colors.color_background},
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: K_FONT_SIZE_17},
          headerShadowVisible: false,
          tabBarIcon: ({color, focused}) => {
            return (
              <MaterialCommunityIcons
                name="history"
                size={K_SIZE_30}
                color={color}
                style={{
                  elevation: focused ? 11 : 0,
                  shadowColor: focused ? colors.color_primary : 'transparent',
                  shadowOffset: {
                    width: 0,
                    height: focused ? 6 : 0,
                  },
                  shadowOpacity: focused ? 0.4 : 0,
                  shadowRadius: focused ? 10 : 0,
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => {
            return (
              <MaterialCommunityIcons
                name="account-outline"
                size={K_SIZE_30}
                color={color}
                style={{
                  elevation: focused ? 11 : 0,
                  shadowColor: focused ? colors.color_primary : 'transparent',
                  shadowOffset: {
                    width: 0,
                    height: focused ? 6 : 0,
                  },
                  shadowOpacity: focused ? 0.4 : 0,
                  shadowRadius: focused ? 10 : 0,
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="WelcomeScreen">
        <Stack.Screen name="BottomStack" component={BottomStack} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={({navigation}) => ({
            title: '',
            headerShown: true,
            headerTitleStyle: {fontSize: K_FONT_SIZE_17},
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: colors.color_white},
            headerShadowVisible: false,
            headerLeft: () => <CustomBackButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={({navigation}) => ({
            title: '',
            headerShown: true,
            headerTitleStyle: {fontSize: K_FONT_SIZE_17},
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: colors.color_white},
            headerShadowVisible: false,
            headerLeft: () => <CustomBackButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={({navigation}) => ({
            title: '',
            headerShown: true,
            headerTitleStyle: {fontSize: K_FONT_SIZE_17},
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: colors.color_white},
            headerShadowVisible: false,
            headerRight: () => <SkipButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="MealDetail"
          component={MealDetail}
          options={({navigation}) => ({
            title: 'Chi tiết',
            headerShown: true,
            headerTitleStyle: {fontSize: K_FONT_SIZE_17},
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: colors.color_background},
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => <CustomBackButton navigation={navigation} />,
            headerRight: () => <CartButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={({navigation}) => ({
            title: 'Giỏ hàng',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: K_FONT_SIZE_17},
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: colors.color_background},
            headerShadowVisible: false,
            headerLeft: () => <CustomBackButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={({navigation}) => ({
            title: 'Thanh toán',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: K_FONT_SIZE_17},
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: colors.color_background},
            headerShadowVisible: false,
            headerLeft: () => <CustomBackButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProfileDetails"
          component={Details}
          options={({navigation}) => ({
            title: 'Sửa thông tin',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: K_FONT_SIZE_17},
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: colors.color_background},
            headerShadowVisible: false,
            headerLeft: () => <CustomBackButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={({navigation}) => ({
            title: 'Đổi mật khẩu',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: K_FONT_SIZE_17},
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: colors.color_background},
            headerShadowVisible: false,
            headerLeft: () => <CustomBackButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="CheckoutResult"
          component={CheckoutResult}
          options={() => ({
            title: 'Kết quả thanh toán',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: K_FONT_SIZE_17},
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: colors.color_background},
            headerShadowVisible: false,
            headerBackVisible: false,
          })}
        />
        <Stack.Screen
          name="HistoryDetails"
          component={HistoryDetails}
          options={({navigation}) => ({
            title: 'Chi tiết món ăn mua',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: K_FONT_SIZE_17},
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: colors.color_background},
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => <CustomBackButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="RatingMeal"
          component={RatingMeal}
          options={({navigation}) => ({
            title: 'Đánh giá món ăn',
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: K_FONT_SIZE_17},
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: colors.color_background},
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => <CustomBackButton navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: colors.color_background,
    paddingVertical: K_PADDING_4,
    paddingHorizontal: K_PADDING_12,
    borderRadius: K_BORDER_RADIUS_20,
  },
});
export default Navigation;
