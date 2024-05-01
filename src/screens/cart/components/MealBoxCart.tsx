import React from 'react';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import {
  K_BORDER_RADIUS_20,
  K_FONT_SIZE_14,
  K_FONT_SIZE_15,
  K_FONT_SIZE_17, K_MARGIN_10,
  K_MARGIN_16,
  K_MARGIN_32,
  K_PADDING_20,
  K_SIZE_18,
  TextBase
} from "../../../common";
import {colors} from '../../../common/constants/color';
import {Utils} from '../../../common/utils';
import QuantitySelector from '../../../common/components/quantity-selector';

const MealBoxCart = ({
  meal,
  quantity,
  setQuantity,
  style,
}: {
  meal: any;
  quantity: number;
  setQuantity: any;
  style?: ViewStyle;
}) => {
  return (
    <View style={[styles.mealContainer, style]}>
      <Image
        style={styles.image}
        source={{
          uri: meal?.image,
        }}
      />
      <View style={styles.textContainer}>
        <TextBase preset="title1" fontSize={K_FONT_SIZE_15}>
          {meal?.name}
        </TextBase>
        <TextBase
          preset="title1"
          style={{marginVertical: K_MARGIN_10}}
          fontSize={K_FONT_SIZE_14}
          color={colors.color_primary}>
          {Utils.formatCurrency(meal?.amount * Number(quantity))}
        </TextBase>
        <QuantitySelector
          size={K_SIZE_18}
          quantity={Number(quantity)}
          setQuantity={setQuantity}
          fontInputSize={K_FONT_SIZE_17}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mealContainer: {
    flexDirection: 'row',
    backgroundColor: colors.color_white,
    borderRadius: K_BORDER_RADIUS_20,
    alignItems: 'center',
    paddingHorizontal: K_PADDING_20,
    paddingVertical: K_MARGIN_16,
  },
  image: {
    width: 74,
    height: 74,
    marginRight: K_MARGIN_32,
    borderRadius: K_BORDER_RADIUS_20,
  },
  textContainer: {
    flex: 1,
  },
});
export default MealBoxCart;
