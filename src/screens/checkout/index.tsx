import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  K_BORDER_RADIUS_20,
  K_BORDER_RADIUS_8,
  K_BORDER_WIDTH_1,
  K_FONT_SIZE_10,
  K_FONT_SIZE_12,
  K_FONT_SIZE_14,
  K_FONT_SIZE_15,
  K_MARGIN_10,
  K_MARGIN_12,
  K_MARGIN_120,
  K_MARGIN_16,
  K_MARGIN_24,
  K_MARGIN_32,
  K_MARGIN_40,
  K_MARGIN_6,
  K_PADDING_12,
  K_PADDING_16,
  K_PADDING_24,
  K_PADDING_32,
  K_PADDING_8,
  K_SIZE_SCALE_15,
  PAYMENT_METHOD,
  TextBase,
} from '../../common';
import {colors} from '../../common/constants/color';
import {Utils} from '../../common/utils';
import {RadioButton} from '../../common/components/radio-button';
import {paymentMethods} from '../profile';
import ButtonBase from '../../common/components/button';
import {useProfile} from '../../hooks/server/useProfile.ts';
import {useSelector} from 'react-redux';
import {selectCheckoutCart} from '../../stores/checkoutSlice.ts';
import {selectIsLogin} from '../../stores/authSlice.ts';
import {ENVConfig} from '../../common/config/env.ts';
import {
  getPathResource,
  isVietnamesePhoneNumber,
} from '../../common/utils/string.ts';
import {validateVoucher} from '../../hooks/server/voucher.ts';
import {checkoutProcess} from '../../hooks/server/checkout.ts';

const Checkout = ({navigation}: any) => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(0);
  const {data: profile} = useProfile();
  const isLogin = useSelector(selectIsLogin);
  const [total, setTotal] = useState(0);
  const [receiver, setReceiver] = useState(isLogin ? profile?.name : '');
  const [address, setAddress] = useState(isLogin ? profile?.address : '');
  const [phoneNumber, setPhoneNumber] = useState(isLogin ? profile?.phone : '');
  const [voucher, setVoucher] = useState('');
  const [discount, setDiscount] = useState<number | null>(0);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const selectedMeals = useSelector(selectCheckoutCart);
  useEffect(() => {
    const totalAmt = selectedMeals?.reduce(
      (acc: number, curr: any) => acc + curr.amount * curr.quantity,
      0,
    );
    setTotal(totalAmt);
  }, [selectedMeals]);
  const handleRadioButtonToggle = (index: number) => {
    setSelectedMethod(index);
  };
  const handleValidateVoucher = async () => {
    try {
      const res = await validateVoucher(voucher);
      if (res.result.voucherId) {
        setDiscount(res.result.voucherPrice);
      } else {
        setDiscount(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const isValid = () => {
    return (
      receiver?.trim().length === 0 ||
      address?.trim().length === 0 ||
      phoneNumber?.trim().length === 0
    );
  };
  const handleOrder = async () => {
    if (!isVietnamesePhoneNumber(phoneNumber || '')) {
      setIsValidPhone(false);
      return;
    }
    try {
      const res = await checkoutProcess({
        address: address || '',
        cartId: 7,
        description: '',
        paymentMethod:
          selectedMethod === 0 ? PAYMENT_METHOD.CASH : PAYMENT_METHOD.PAYPAL,
        phone: phoneNumber || '',
        username: profile?.name || '',
        voucherCode: voucher,
      });
      if (res.result.ordersId) {
        navigation.navigate('Checkout');
      } else {
        setDiscount(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/*THÔNG TIN NGƯỜI NHẬN*/}
        <View>
          <TextBase fontSize={K_FONT_SIZE_15}>Thông tin nhận</TextBase>
          <View style={styles.boxWrapper}>
            <View style={styles.infoWrapper}>
              <View>
                <View>
                  <TextBase
                    fontSize={K_FONT_SIZE_10}
                    style={{color: colors.color_sub_text}}>
                    Người nhận (bắt buộc)
                  </TextBase>
                  <TextInput
                    style={styles.input}
                    placeholder="Người nhận"
                    placeholderTextColor={colors.color_sub_text}
                    value={receiver}
                    onChangeText={setReceiver}
                  />
                </View>
                <View>
                  <TextBase
                    fontSize={K_FONT_SIZE_10}
                    style={{color: colors.color_sub_text}}>
                    Địa chỉ (bắt buộc)
                  </TextBase>
                  <TextInput
                    style={styles.input}
                    placeholder="Địa chỉ"
                    placeholderTextColor={colors.color_sub_text}
                    value={address}
                    onChangeText={setAddress}
                  />
                </View>
                <View>
                  <TextBase
                    fontSize={K_FONT_SIZE_10}
                    style={{color: colors.color_sub_text}}>
                    Số điện thoại (bắt buộc)
                  </TextBase>
                  <TextInput
                    style={styles.input}
                    placeholder="Số điện thoại"
                    placeholderTextColor={colors.color_sub_text}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                  {!isValidPhone && (
                    <TextBase
                      fontSize={K_FONT_SIZE_10}
                      color={colors.color_primary}>
                      Số điện thoại không hợp lệ
                    </TextBase>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/*THÔNG TIN ĐƠN HÀNG*/}
        <View style={{marginTop: K_MARGIN_24}}>
          <TextBase fontSize={K_FONT_SIZE_15}>Thông tin đơn hàng</TextBase>
          <View style={styles.boxWrapper}>
            <View style={styles.infoWrapper}>
              {selectedMeals.map((meal: any) => (
                <View style={styles.mealContainer} key={meal.productId}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: getPathResource(ENVConfig.PATH_PRODUCT, meal?.image),
                    }}
                  />
                  <View style={styles.textContainer}>
                    <TextBase preset="title1" fontSize={K_FONT_SIZE_15}>
                      {meal.name}
                    </TextBase>
                    <TextBase
                      preset="title1"
                      fontSize={K_FONT_SIZE_14}
                      color={colors.color_primary}>
                      {Utils.formatCurrency(meal.amount * meal.quantity)}
                    </TextBase>
                    <TextBase preset="title2" fontSize={K_FONT_SIZE_12}>
                      Số lượng: {meal.quantity}
                    </TextBase>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/*VOUCHER*/}
        <View style={{marginTop: K_MARGIN_24}}>
          <TextBase fontSize={K_FONT_SIZE_15}>Nhập mã khuyến mại</TextBase>
          <View style={styles.boxWrapper}>
            <View style={styles.infoWrapper}>
              <View
                style={[
                  styles.mealContainer,
                  {justifyContent: 'space-between'},
                ]}>
                <TextInput
                  style={{
                    borderWidth: K_BORDER_WIDTH_1,
                    borderColor: colors.color_sub_text_2,
                    padding: K_PADDING_8,
                    borderRadius: K_BORDER_RADIUS_8,
                    width: '60%',
                  }}
                  placeholderTextColor={colors.color_sub_text}
                  value={voucher}
                  onChangeText={setVoucher}
                />
                <ButtonBase
                  title={'Áp dụng'}
                  marginHorizontal={K_MARGIN_16}
                  marginVertical={K_MARGIN_6}
                  fontSize={K_FONT_SIZE_12}
                  onPress={handleValidateVoucher}
                />
              </View>
              {discount === null && (
                <TextBase
                  fontSize={K_FONT_SIZE_10}
                  color={colors.color_primary}>
                  Mã khuyến mại không hợp lệ
                </TextBase>
              )}
            </View>
          </View>
        </View>
        {/*  PHƯƠNG THỨC THANH TOÁN*/}
        <View style={{marginTop: K_MARGIN_24, marginBottom: K_MARGIN_40}}>
          <TextBase fontSize={K_FONT_SIZE_15}>Phương thức thanh toán</TextBase>
          <View style={styles.boxWrapper}>
            <View style={styles.infoWrapper}>
              {paymentMethods.map((item, index) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: K_MARGIN_10,
                    borderBottomColor: colors.color_background,
                    borderBottomWidth:
                      index === paymentMethods.length - 1
                        ? 0
                        : K_BORDER_WIDTH_1,
                    paddingBottom:
                      index === paymentMethods.length - 1 ? 0 : K_PADDING_16,
                  }}
                  onTouchEnd={() => handleRadioButtonToggle(index)}>
                  <RadioButton
                    activeColor={colors.color_primary}
                    unActiveColor={colors.color_sub_text}
                    value={selectedMethod === index}
                    sizeDot={K_SIZE_SCALE_15}
                  />
                  {item.icon}
                  <TextBase preset="caption1" color={colors.color_black}>
                    {item.name}
                  </TextBase>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: K_MARGIN_16,
          }}>
          <TextBase>Giảm giá</TextBase>
          <TextBase> {Utils.formatCurrency(discount)}</TextBase>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: K_MARGIN_16,
          }}>
          <TextBase>Tổng</TextBase>
          <TextBase> {Utils.formatCurrency(total - (discount || 0))}</TextBase>
        </View>
        <ButtonBase
          title={'Thanh toán'}
          disabled={isValid()}
          onPress={handleOrder}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: K_PADDING_32,
    paddingBottom: K_MARGIN_120,
  },
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
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: K_MARGIN_32,
    right: K_MARGIN_32,
    backgroundColor: colors.color_background,
    paddingBottom: K_MARGIN_32,
    paddingTop: K_MARGIN_16,
  },
  input: {
    paddingVertical: K_PADDING_12,
    color: colors.color_black,
    borderBottomWidth: K_BORDER_WIDTH_1,
    borderColor: colors.color_sub_text_2,
    marginBottom: 10,
    width: '100%',
  },
});
export default Checkout;
