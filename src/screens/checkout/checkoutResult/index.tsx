import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {
  K_BORDER_RADIUS_20,
  K_FONT_SIZE_10,
  K_FONT_SIZE_12,
  K_FONT_SIZE_14,
  K_FONT_SIZE_15,
  K_FONT_SIZE_17,
  K_FONT_SIZE_20,
  K_MARGIN_12,
  K_MARGIN_16,
  K_MARGIN_24,
  K_MARGIN_32,
  K_MARGIN_40,
  K_MARGIN_6,
  K_PADDING_24,
  K_PADDING_32,
  TextBase,
} from '../../../common';
// @ts-ignore
import logo from '../../../assets/images/img_successful.png';
import React from 'react';
import {colors} from '../../../common/constants/color';
import {Utils} from '../../../common/utils';
import {getPathResource} from '../../../common/utils/string.ts';
import {ENVConfig} from '../../../common/config/env.ts';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCheckoutCart,
  setIsUpdateCart,
} from '../../../stores/checkoutSlice.ts';
import ButtonBase from '../../../common/components/button';

const CheckoutResult = ({route, navigation}: any) => {
  const {res} = route.params;
  const cartData = useSelector(selectCheckoutCart);
  const dispatch = useDispatch();
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: K_PADDING_32}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={logo}
              style={{
                height: 100,
                aspectRatio: 2.2,
              }}
              resizeMode="contain"
            />
          </View>
          <TextBase
            textAlign={'center'}
            style={{marginVertical: K_MARGIN_24}}
            fontSize={K_FONT_SIZE_17}
            color={colors.color_success}>
            Thanh toán món ăn thành công
          </TextBase>
          <TextBase textAlign={'center'} fontSize={K_FONT_SIZE_20}>
            {Utils.formatCurrency(res.amount)}
          </TextBase>
          <TextBase
            textAlign={'center'}
            color={colors.color_sub_text}
            fontSize={K_FONT_SIZE_10}>
            Thời gian:{' '}
            {new Date(res.orderDate).toLocaleString('vi-VN', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </TextBase>
          <View style={{marginVertical: K_MARGIN_24}}>
            <View style={styles.boxWrapper}>
              <View style={styles.infoWrapper}>
                {cartData?.cartDetailDtos.map((meal: any) => (
                  <View style={styles.mealContainer} key={meal.productId}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: getPathResource(
                          ENVConfig.PATH_PRODUCT,
                          meal?.productImage,
                        ),
                      }}
                    />
                    <View style={styles.textContainer}>
                      <TextBase preset="title1" fontSize={K_FONT_SIZE_15}>
                        {meal.productName}
                      </TextBase>
                      <TextBase
                        preset="title1"
                        fontSize={K_FONT_SIZE_14}
                        color={colors.color_primary}>
                        {Utils.formatCurrency(meal.price * meal.quantitySold)}
                      </TextBase>
                      <TextBase preset="title2" fontSize={K_FONT_SIZE_12}>
                        Số lượng: {meal.quantitySold}
                      </TextBase>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <ButtonBase
            style={{marginTop: K_MARGIN_40}}
            title="Về trang chủ"
            onPress={() => {
              dispatch(setIsUpdateCart(true));
              navigation.navigate('home');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  boxWrapper: {
    shadowColor: colors.color_black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    marginTop: K_MARGIN_12,
  },
  infoWrapper: {
    backgroundColor: colors.color_white,
    borderRadius: K_BORDER_RADIUS_20,
    padding: K_PADDING_24,
  },
  mealContainer: {
    flexDirection: 'row',
    backgroundColor: colors.color_white,
    borderRadius: K_BORDER_RADIUS_20,
    alignItems: 'center',
    marginVertical: K_MARGIN_16,
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
    rowGap: K_MARGIN_6,
  },
});
export default CheckoutResult;
