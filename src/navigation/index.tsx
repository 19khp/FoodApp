import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  K_FONT_SIZE_17,
  K_MARGIN_20,
  K_MARGIN_8,
  K_SIZE_24,
  K_SIZE_26,
  K_SIZE_30,
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CustomBackButton = ({navigation}: any) => (
  <MaterialCommunityIcons
    name="chevron-left"
    size={K_SIZE_30}
    style={{marginLeft: K_MARGIN_8}}
    onPress={() => navigation.goBack()}
  />
);
const CartButton = ({navigation}: any) => (
  <MaterialCommunityIcons
    name="cart-outline"
    size={K_SIZE_24}
    style={{marginRight: K_MARGIN_20}}
    onPress={() => navigation.navigate('Cart')}
  />
);
const BottomStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.color_primary,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
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
          headerShown: false,
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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomStack" component={BottomStack} />
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
            headerTitleStyle: {fontSize: K_FONT_SIZE_17},
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: colors.color_background},
            headerShadowVisible: false,
            headerLeft: () => <CustomBackButton navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
