import React, {useEffect} from 'react';
import {
  Alert,
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  K_MARGIN_32,
  K_MARGIN_60,
  K_PADDING_12,
  K_SIZE_26,
  TextBase,
} from '../../common';
import {colors} from '../../common/constants/color';
import ButtonBase from '../../common/components/button';
import MealBoxCart from './components/MealBoxCart.tsx';
import {Swipeable} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearCheckoutCart,
  fetchCartSuccess,
  removeFromCheckoutCart,
  selectCheckoutCart,
  setIsUpdateCart,
} from '../../stores/checkoutSlice.ts';
import {useCart} from '../../hooks/server/useCart.ts';
import {deleteCart} from '../../hooks/server/cart.ts';

const Cart = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {data: cartData} = useCart();
  const cart = useSelector(selectCheckoutCart);
  useEffect(() => {
    dispatch(clearCheckoutCart());
    if (cartData) {
      dispatch(fetchCartSuccess(cartData));
    }
  }, [cartData, dispatch]);

  // Function to render delete button when swiping
  const renderRightActions = (dragX: any, meal: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 90],
      outputRange: [-10, 0],
      extrapolate: 'clamp',
    });
    const handelDeteleCart = async () => {
      try {
        const res = await deleteCart(meal.cartDetailId);
        if (res.result) {
          dispatch(removeFromCheckoutCart(meal.productId));
          dispatch(setIsUpdateCart(true));
          if (cart?.cartDetailDtos.length === 1) {
            navigation.goBack();
          }
          console.log('CART_DELETE', res.result);
        }
      } catch (err: any) {
        Alert.alert('CART_DELETE_ERROR', JSON.stringify(err));
      }
    };
    return (
      <TouchableOpacity
        onPress={() =>
          Alert.alert('Thông báo', 'Bạn có muốn xoá món ăn?', [
            {
              text: 'Huỷ',
              style: 'cancel',
            },
            {
              text: 'Đồng ý',
              onPress: handelDeteleCart,
            },
          ])
        }
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
      {cart && cart?.cartDetailDtos.length > 0 && (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {cart?.cartDetailDtos?.map(meal => (
            <Swipeable
              renderRightActions={dragX => renderRightActions(dragX, meal)}
              containerStyle={{
                width: '100%',
                alignItems: 'center',
                marginBottom: K_PADDING_12,
              }}
              key={meal.productId}>
              <MealBoxCart meal={meal} style={{width: '90%'}} />
            </Swipeable>
          ))}
        </ScrollView>
      )}
      {cart && cart?.cartDetailDtos.length > 0 ? (
        <View style={styles.buttonContainer}>
          <ButtonBase
            title={'Thanh toán'}
            onPress={() => navigation.navigate('Checkout')}
          />
        </View>
      ) : (
        <View style={{marginTop: K_MARGIN_60}}>
          <TextBase
            textAlign="center"
            style={{alignItems: 'center'}}
            color={colors.color_sub_text}>
            Không có món ăn nào trong giỏ hàng
          </TextBase>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: K_MARGIN_60,
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
