import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../constants/color';
import {
  K_BORDER_RADIUS_26,
  K_FONT_SIZE_15,
  K_FONT_SIZE_17,
  K_MARGIN_12,
  K_MARGIN_32,
  K_PADDING_24,
  K_SIZE_120,
} from '../../constants';
import {TextBase} from '../text';
import {MealProps} from '../../../models/meal.ts';
import {Utils} from '../../utils';

const MealBox = ({item, onPress}: {item: MealProps; onPress: () => void}) => {
  return (
    <TouchableOpacity style={styles.mealWrapper} onPress={onPress}>
      <View style={styles.mealWrapper}>
        <View
          style={{
            backgroundColor: colors.color_white,
            overflow: 'hidden',
            borderRadius: K_BORDER_RADIUS_26,
          }}>
          <Image
            style={{width: 'auto', height: K_SIZE_120}}
            source={{
              uri: item.image,
            }}
          />
          <View
            style={{
              padding: K_PADDING_24,
              width: 200,
            }}>
            <TextBase
              preset="title1"
              textAlign={'center'}
              fontSize={K_FONT_SIZE_17}>
              {item.name}
            </TextBase>
            <TextBase
              preset="title1"
              textAlign={'center'}
              fontSize={K_FONT_SIZE_15}
              color={colors.color_primary}
              style={{marginTop: K_MARGIN_12}}>
              {Utils.formatCurrency(item.price)}
            </TextBase>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mealWrapper: {
    marginRight: K_MARGIN_32,
    shadowColor: colors.color_black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
});

export default MealBox;
