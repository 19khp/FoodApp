import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {MealProps} from '../../../../models/meal.ts';
import {
  K_BORDER_RADIUS_26,
  K_FONT_SIZE_10,
  K_FONT_SIZE_15,
  K_MARGIN_10,
  K_MARGIN_12,
  K_PADDING_12,
  K_PADDING_24,
  TextBase,
} from '../../../../common';
import {colors} from '../../../../common/constants/color';
import {Utils} from '../../../../common/utils';
import {getPathResource} from '../../../../common/utils/string.ts';
import {ENVConfig} from '../../../../common/config/env.ts';

const Meal = ({
  item,
  onPress,
}: {
  item: MealProps;
  onPress?: (e: any) => void;
}) => {
  return (
    <TouchableOpacity style={styles.mealWrapper} onPress={onPress}>
      <View style={styles.mealWrapper}>
        <View style={styles.mealContainer}>
          <Image
            /* eslint-disable-next-line react-native/no-inline-styles */
            style={{width: '100%', height: '40%', objectFit: 'contain'}}
            source={{
              uri: getPathResource(ENVConfig.PATH_PRODUCT, item.image),
            }}
          />
          <View
            /* eslint-disable-next-line react-native/no-inline-styles */
            style={{
              width: '70%',
              marginTop: K_MARGIN_12,
            }}>
            <TextBase
              numberOfLines={3}
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
              style={{marginTop: K_MARGIN_10}}>
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
    paddingBottom: K_PADDING_24,
  },
});

export default Meal;
