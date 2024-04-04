import React from 'react';
import {K_PADDING_32} from '../../../../common';
import {ScrollView} from 'react-native';
import {MealProps} from '../../../../models/meal.ts';
import MealBox from '../../../../common/components/mealBox';

export const combosMenu: MealProps[] = [
  {
    id: 1,
    image: '',
    name: 'Veggie tomato mix',
    price: '100,000',
  },
  {
    id: 2,
    image: '',
    name: 'Fried chicken m.',
    price: '100,000',
  },
  {
    id: 3,
    image: '',
    name: 'Moi-moi and ekpa.',
    price: '100,000',
  },
  {
    id: 4,
    image: '',
    name: 'Fishwith mix orange',
    price: '100,000',
  },
  {
    id: 5,
    image: '',
    name: 'Fishwith mix orange',
    price: '100,000',
  },
  {
    id: 6,
    image: '',
    name: 'Fishwith mix orange',
    price: '100,000',
  },
  {
    id: 7,
    image: '',
    name: 'Fishwith mix orange',
    price: '100,000',
  },
];
const CombosMenu = () => {
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
        <MealBox item={combosMenuItem} key={combosMenuItem.id} />
      ))}
    </ScrollView>
  );
};
export default CombosMenu;
