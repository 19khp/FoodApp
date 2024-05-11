import React, {useState} from 'react';
import {Alert, Image, StyleSheet, View, ViewStyle} from 'react-native';
import {
  K_BORDER_RADIUS_20,
  K_FONT_SIZE_14,
  K_FONT_SIZE_15,
  K_FONT_SIZE_17,
  K_MARGIN_10,
  K_MARGIN_16,
  K_MARGIN_32,
  K_PADDING_20,
  K_SIZE_18,
  TextBase,
} from '../../../common';
import {colors} from '../../../common/constants/color';
import {Utils} from '../../../common/utils';
import QuantitySelector from '../../../common/components/quantity-selector';
import {ENVConfig} from '../../../common/config/env.ts';
import {getPathResource} from '../../../common/utils/string.ts';
import {selectCartUser} from '../../../stores/authSlice.ts';
import {useDispatch, useSelector} from 'react-redux';
import {updateCart, updateCartByText} from '../../../hooks/server/cart.ts';
import {updateCheckoutCart} from '../../../stores/checkoutSlice.ts';

const MealBoxCart = ({meal, style}: {meal: any; style?: ViewStyle}) => {
  const [quantity, setQuantity] = useState<number>(meal.quantitySold);
  const dispatch = useDispatch();
  const handleTextChange = async (inputText: string) => {
    const newText = inputText.replace(/[^0-9]/g, '');
    setQuantity(Number(newText));
    try {
      const res = await updateCartByText({
        cartDetailId: meal.cartDetailId,
        cartId: cartUser.cartId,
        productId: meal.productId,
        quantitySold: Number(newText),
      });
      if (res.result) {
        console.log('CART_UPDATE', res.result);
      }
    } catch (err: any) {
      Alert.alert('CART_UPDATE_ERROR', JSON.stringify(err));
    }
  };

  const handleCountPlus = () => {
    handleEditMeal(1);
  };

  const handleCountMinus = () => {
    if (meal.quantitySold > 1) {
      handleEditMeal(-1);
    }
  };
  const cartUser = useSelector(selectCartUser);
  const handleEditMeal = async (_quantity: number) => {
    try {
      const res = await updateCart({
        cartId: cartUser.cartId,
        productId: meal.productId,
        quantitySold: _quantity,
      });
      if (res.result) {
        dispatch(
          updateCheckoutCart({
            productId: meal.productId,
            quantity: _quantity + meal.quantitySold,
          }),
        );
        setQuantity(_quantity + meal.quantitySold);
        console.log('CART_UPDATE', res.result);
      }
    } catch (err: any) {
      Alert.alert('CART_UPDATE_ERROR', JSON.stringify(err));
    }
  };
  return (
    <View style={[styles.mealContainer, style]}>
      <Image
        style={styles.image}
        source={{
          uri: getPathResource(ENVConfig.PATH_PRODUCT, meal?.productImage),
        }}
      />
      <View style={styles.textContainer}>
        <TextBase preset="title1" fontSize={K_FONT_SIZE_15}>
          {meal?.productName}
        </TextBase>
        <TextBase
          preset="title1"
          style={{marginVertical: K_MARGIN_10}}
          fontSize={K_FONT_SIZE_14}
          color={colors.color_primary}>
          {Utils.formatCurrency(meal?.price * quantity)}
        </TextBase>
        <QuantitySelector
          size={K_SIZE_18}
          handleCountMinus={handleCountMinus}
          handleCountPlus={handleCountPlus}
          handleTextChange={handleTextChange}
          quantity={quantity}
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
    objectFit: 'contain',
  },
  textContainer: {
    flex: 1,
  },
});
export default MealBoxCart;
