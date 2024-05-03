import React from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {K_MARGIN_32, K_PADDING_12, K_SIZE_26} from '../../common';
import {colors} from '../../common/constants/color';
import ButtonBase from '../../common/components/button';
import MealBoxCart from './components/MealBoxCart.tsx';
import {Swipeable} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  editCheckoutCart,
  removeFromCheckoutCart,
  selectCheckoutCart,
} from '../../stores/checkoutSlice.ts';
import {useCart} from '../../hooks/server/useCart.ts';

const Cart = ({navigation}: any) => {
  const selectedMeals = useSelector(selectCheckoutCart);
  const dispatch = useDispatch();
  console.log('selectedMeals', selectedMeals);
  const handleEditMeal = (
    productId: number,
    quantity: number,
    amount: number,
  ) => {
    dispatch(editCheckoutCart({productId, quantity, amount}));
  };
  const {data: cartData} = useCart();
  // Function to render delete button when swiping
  const renderRightActions = (dragX: any, meal: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 90],
      outputRange: [-10, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() => dispatch(removeFromCheckoutCart(meal.productId))}
        style={styles.deleteButton}>
        <Animated.View style={[{transform: [{translateX: trans}]}]}>
          <View
            style={{
              backgroundColor: colors.color_primary,
              padding: K_PADDING_12,
              borderRadius: 50,
            }}>
            <MaterialCommunityIcons
              name="trash-can"
              size={K_SIZE_26}
              color={colors.color_white}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {cartData?.cartDetailDtos?.map(meal => (
          <Swipeable
            renderRightActions={dragX => renderRightActions(dragX, meal)}
            containerStyle={{
              width: '100%',
              alignItems: 'center',
              marginBottom: K_PADDING_12,
            }}
            key={meal.productId}>
            <MealBoxCart
              meal={meal}
              quantity={meal.quantitySold}
              setQuantity={(quantity: number) =>
                handleEditMeal(meal.productId, quantity, meal.price)
              }
              style={{width: '90%'}}
            />
          </Swipeable>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ButtonBase
          title={'Thanh toán'}
          onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: K_MARGIN_32,
    right: K_MARGIN_32,
    backgroundColor: colors.color_background,
    paddingBottom: K_MARGIN_32,
  },
});

export default Cart;
