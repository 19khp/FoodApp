import React, {useState} from 'react';
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

const Cart = ({navigation}: any) => {
  const [quantity, setQuantity] = useState(1);

  // Function to render delete button when swiping
  const renderRightActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 90],
      outputRange: [-10, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() => console.log('Delete item')}
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
        <Swipeable
          renderRightActions={renderRightActions}
          containerStyle={{
            width: '100%',
            alignItems: 'center',
            marginBottom: K_PADDING_12,
          }}>
          <MealBoxCart
            quantity={quantity}
            setQuantity={setQuantity}
            style={{width: '90%'}}
          />
        </Swipeable>
        <Swipeable
          renderRightActions={renderRightActions}
          containerStyle={{width: '100%', alignItems: 'center'}}>
          <MealBoxCart
            quantity={quantity}
            setQuantity={setQuantity}
            style={{width: '90%'}}
          />
        </Swipeable>
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
