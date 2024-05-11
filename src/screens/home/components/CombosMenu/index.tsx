import React from 'react';
import {K_PADDING_32} from '../../../../common';
import {ScrollView} from 'react-native';
import {MealProps} from '../../../../models/meal.ts';
import MealBox from '../../../../common/components/mealBox';

const CombosMenu = ({navigation, mealList}: any) => {
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingVertical: K_PADDING_32,
        paddingRight: K_PADDING_32,
      }}
      scrollEnabled={true}
      horizontal={true}>
      {mealList?.map((meal: MealProps) => (
        <MealBox
          item={meal}
          key={meal.productId}
          onPress={() => navigation.navigate('MealDetail', {item: meal})}
        />
      ))}
    </ScrollView>
  );
};
export default CombosMenu;
