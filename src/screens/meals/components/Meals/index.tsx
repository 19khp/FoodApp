import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {MealProps} from '../../../../models/meal.ts';
import {
  K_BORDER_RADIUS_26,
  K_FONT_SIZE_10,
  K_FONT_SIZE_15,
  K_MARGIN_12,
  TextBase,
} from '../../../../common';
import {colors} from '../../../../common/constants/color';

const Meal = ({
  item,
  onPress,
}: {
  item: MealProps;
  onPress?: (e: any) => void;
}) => {
  return (
    <TouchableOpacity style={styles.mealWrapper} onPress={onPress}>
      <View style={styles.mealWrapper} onTouchEnd={onPress}>
        <View style={styles.mealContainer}>
          <Image
            style={{width: '100%', height: '40%'}}
            source={{
              uri: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
          />
          <View
            style={{
              // paddingHorizontal: K_PADDING_32,
              width: 100,
            }}>
            <TextBase
              preset="title1"
              textAlign={'center'}
              fontSize={K_FONT_SIZE_15}>
              {item.name}
            </TextBase>
            <TextBase
              preset="title1"
              textAlign={'center'}
              fontSize={K_FONT_SIZE_10}
              color={colors.color_primary}
              style={{marginTop: K_MARGIN_12}}>
              {item.price} VNĐ
            </TextBase>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mealWrapper: {
    margin: K_MARGIN_12,
    shadowColor: colors.color_black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  mealContainer: {
    backgroundColor: colors.color_white,
    overflow: 'hidden',
    borderRadius: K_BORDER_RADIUS_26,
    height: 200,
    width: 150,
    alignItems: 'center',
  },
});

export default Meal;