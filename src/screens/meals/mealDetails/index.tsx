import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  K_BORDER_RADIUS_26,
  K_MARGIN_120,
  K_MARGIN_16,
  K_MARGIN_24,
  K_MARGIN_32,
  K_MARGIN_60,
  K_PADDING_32,
  K_SIZE_20,
  K_SIZE_26,
  TextBase,
} from '../../../common';
import {colors} from '../../../common/constants/color';
import {Utils} from '../../../common/utils';
import QuantitySelector from '../../../common/components/quantity-selector';
import ButtonBase from '../../../common/components/button';
import RatingBox from '../components/RatingBox';
import {useRatingDetail} from '../../../hooks/server/useRatingDetail.ts';
import {useDispatch, useSelector} from 'react-redux';
import {setIsUpdateCart} from '../../../stores/checkoutSlice.ts';
import {getPathResource} from '../../../common/utils/string.ts';
import {ENVConfig} from '../../../common/config/env.ts';
import {updateCart} from '../../../hooks/server/cart.ts';
import { selectCartUser, selectUserInfo } from "../../../stores/authSlice.ts";

const MealDetail = ({route, navigation}: any) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  console.log(item);
  const {data: ratingDetail} = useRatingDetail(item.productId);
  const [quantity, setQuantity] = useState(1);
  console.log(quantity);
  const cartUser = useSelector(selectCartUser);
  const addToCart = async (navigation: any) => {
    try {
      const res = await updateCart({
        cartId: cartUser.cartId,
        productId: item.productId,
        quantitySold: quantity,
      });
      if (res.result) {
        dispatch(setIsUpdateCart(true));
        console.log('CART_UPDATE', res.result);
      }
    } catch (err: any) {
      Alert.alert('CART_UPDATE_ERROR', JSON.stringify(err));
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: K_PADDING_32,
        }}>
        <View style={{marginBottom: K_MARGIN_60}}>
          <Image
            source={{uri: getPathResource(ENVConfig.PATH_PRODUCT, item.image)}}
            style={{
              width: '100%',
              height: 300,
              borderRadius: K_BORDER_RADIUS_26,
              objectFit: 'contain',
            }}
          />
          <TextBase
            fontSize={K_SIZE_20}
            textAlign="center"
            style={{marginVertical: K_MARGIN_24}}>
            {item.name}
          </TextBase>

          <TextBase preset={'caption1'}>{item.description}</TextBase>
        </View>

        {ratingDetail?.length !== 0 && (
          <View style={{marginBottom: K_MARGIN_120}}>
            <TextBase
              fontSize={K_SIZE_20}
              style={{marginBottom: K_MARGIN_24}}
              textAlign={'center'}>
              Đánh giá
            </TextBase>
            {ratingDetail?.map((detail, index) => (
              <RatingBox
                rating={detail}
                key={detail.id}
                isLast={index === ratingDetail?.length - 1}
              />
            ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: K_MARGIN_16,
            alignItems: 'center',
          }}>
          <TextBase color={colors.color_primary} fontSize={K_SIZE_20}>
            {Utils.formatCurrency(Number(item.price) * Number(quantity))}
          </TextBase>
          <QuantitySelector
            size={K_SIZE_26}
            fontInputSize={K_SIZE_20}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </View>
        <ButtonBase
          title={'Thêm vào giỏ hàng'}
          onPress={() => addToCart(navigation)}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: K_MARGIN_32,
    right: K_MARGIN_32,
    backgroundColor: colors.color_background,
    paddingBottom: K_MARGIN_32,
  },
});
export default MealDetail;
