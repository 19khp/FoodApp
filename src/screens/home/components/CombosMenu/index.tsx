import React from 'react';
import {K_PADDING_32} from '../../../../common';
import {ScrollView} from 'react-native';
import {MealProps} from '../../../../models/meal.ts';
import MealBox from '../../../../common/components/mealBox';

export const combosMenu: MealProps[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Veggie tomato mix',
    des: 'All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.',
    price: '100000',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Fried chicken m.',
    des: 'All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.',
    price: '100000',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Moi-moi and ekpa.',
    des: 'All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.',
    price: '100000',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Fishwith mix orange',
    des: 'All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.',
    price: '100000',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Fishwith mix orange',
    des: 'All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.',
    price: '100000',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Fishwith mix orange',
    des: 'All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.',
    price: '100000',
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Fishwith mix orange',
    des: 'All our foods are double checked before leaving our stores so by any case you found a broken food please contact our hotline immediately.',
    price: '100000',
  },
];
const CombosMenu = ({navigation}: any) => {
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingVertical: K_PADDING_32,
        paddingRight: K_PADDING_32,
      }}
      scrollEnabled={true}
      horizontal={true}>
      {combosMenu.map(combosMenuItem => (
        <MealBox
          item={combosMenuItem}
          key={combosMenuItem.id}
          onPress={() =>
            navigation.navigate('MealDetail', {item: combosMenuItem})
          }
        />
      ))}
    </ScrollView>
  );
};
export default CombosMenu;
