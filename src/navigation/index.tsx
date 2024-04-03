import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import login from '../screens/login.tsx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {K_SIZE_26, K_SIZE_28, K_SIZE_30} from '../common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../common/constants/color';
import history from '../screens/history.tsx';
import home from '../screens/home';
import meals from '../screens/meals';
import profile from '../screens/profile';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
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
          tabBarIcon: ({color}) => {
            return (
              <MaterialCommunityIcons
                name="home"
                size={K_SIZE_30}
                color={color}
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
          tabBarIcon: ({color}) => {
            return (
              <MaterialCommunityIcons
                name="food"
                size={K_SIZE_26}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="history"
        component={history}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <MaterialCommunityIcons
                name="history"
                size={K_SIZE_30}
                color={color}
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
          tabBarIcon: ({color}) => {
            return (
              <MaterialCommunityIcons
                name="account"
                size={K_SIZE_30}
                color={color}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
