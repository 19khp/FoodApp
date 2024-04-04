import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {K_SIZE_26, K_SIZE_30} from '../common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../common/constants/color';
import home from '../screens/home';
import meals from '../screens/meals';
import profile from '../screens/profile';
import history from '../screens/history';
import MealDetail from '../screens/meals/mealDetails';

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
        <Stack.Screen name="MealDetail" component={MealDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
