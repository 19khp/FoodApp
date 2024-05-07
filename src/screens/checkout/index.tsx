import React, {useEffect, useState} from 'react';
import {
  Alert,
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
  K_MARGIN_60,
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
import {selectIsLogin} from '../../stores/authSlice.ts';
import {ENVConfig} from '../../common/config/env.ts';
import {
  getPathResource,
  isVietnamesePhoneNumber,
} from '../../common/utils/string.ts';
import {validateVoucher} from '../../hooks/server/voucher.ts';
import {useCart} from '../../hooks/server/useCart.ts';
import {WebView} from 'react-native-webview';
import CustomModal from '../../common/components/modal';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {checkoutProcess} from '../../hooks/server/checkout.ts';

const Checkout = ({navigation}: any) => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(0);
  const {data: profile} = useProfile();
  const isLogin = useSelector(selectIsLogin);
  const [total, setTotal] = useState(0);
  const [receiver, setReceiver] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [voucher, setVoucher] = useState('');
  const [discount, setDiscount] = useState<number | null>(0);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [showGateway, setShowGateway] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [approvalUrl, setApprovalUrl] = useState(null);

  const fetchOrder = async () => {
    setApprovalUrl(null);
    const totalConvert = total / 24000;
    const dataDetail = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            total: `${totalConvert.toFixed(2)}`,
            currency: 'USD',
            details: {
              subtotal: `${totalConvert.toFixed(2)}`,
              tax: '0',
              shipping: '0',
              handling_fee: '0',
              shipping_discount: '0',
              insurance: '0',
            },
          },
        },
      ],
      redirect_urls: {
        return_url: 'https://example.com',
        cancel_url: 'https://example.com',
      },
    };
    console.log('=====START======');
    fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Bearer A21AALK4Mp_qO3J9LUE1jmhyejJWa6RYXBpwyEyeSYuZDpuOlupUHec32rJeTOOp2Q8Ruui_LLstTU3phn_dwoAhMm0_y-SmQ',
      },
      body: 'grant_type=client_credentials',
    })
      .then(res => res.json())
      .then(response => {
        setAccessToken(response.access_token);
        console.log('SUCCESS');
        console.log(response.access_token);
        console.log(JSON.stringify(dataDetail));
        fetch('https://api.sandbox.paypal.com/v1/payments/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${response.access_token}`,
          },
          body: JSON.stringify(dataDetail),
        })
          .then(res => res.json())
          .then(res => {
            const {links} = res;
            const approvalUri = links.find(
              (data: any) => data.rel === 'approval_url',
            );

            setApprovalUrl(approvalUri.href);
            setShowGateway(true);
            console.log(approvalUrl);
          })
          .catch(err => {
            console.log('ERRRRRRR1', JSON.stringify(err));
          });
      })
      .catch(err => {
        console.log('ERRRRRRR2', {...err});
      });
  };
  const onNavigationStateChange = (webViewState: any) => {
    if (webViewState.url.includes('https://example.com/')) {
      setApprovalUrl(null);
      const urlArr = webViewState.url.split(/(=|&)/);
      const paymentId = urlArr[2];
      const payerId = urlArr[10];
      console.log('paymentId', paymentId);
      console.log('payerId', payerId);
      axios
        .post(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
          {payer_id: payerId},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then(response => {
          console.log(response);
          callOrder();
        })
        .catch(err => {
          console.log({...err});
          setShowGateway(false);
          Alert.alert('Thanh toán không thành công!');
        });
    }
  };

  const {data: cartData} = useCart();
  useEffect(() => {
    if (profile && isLogin) {
      setReceiver(profile?.name);
      setAddress(profile?.address);
      setPhoneNumber(profile?.phone);
    }
    const totalAmt = cartData?.cartDetailDtos.reduce(
      (acc: number, curr: any) => acc + curr.price * curr.quantitySold,
      0,
    );
    if (totalAmt) {
      setTotal(totalAmt);
    }
  }, [cartData, isLogin, profile]);
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
      console.log(JSON.stringify(err));
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
    if (selectedMethod === 1) {
      setShowGateway(true);
      await fetchOrder();
      return;
    }
    callOrder();
  };

  const callOrder = async () => {
    try {
      if (cartData && profile) {
        const res = await checkoutProcess(
          {
            address: address || '',
            cartId: cartData?.cartId,
            description: '',
            paymentMethod:
              selectedMethod === 0
                ? PAYMENT_METHOD.CASH
                : PAYMENT_METHOD.PAYPAL,
            phone: phoneNumber || '',
            username: profile?.name || '',
            voucherCode: voucher,
          },
          profile.email,
        );
        if (res.result.ordersId) {
          console.log(res.result);
          setShowGateway(false);
          navigation.navigate('CheckoutResult', {res: res.result});
        } else {
          setDiscount(null);
        }
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };
  return (
    <SafeAreaView>
      <CustomModal
        visible={showGateway}
        closeVisible={false}
        onClose={() => setShowGateway(false)}>
        {approvalUrl ? (
          <View style={styles.webViewCon}>
            <WebView
              style={{flex: 1}}
              source={{uri: approvalUrl}}
              onNavigationStateChange={onNavigationStateChange}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={false}
            />
          </View>
        ) : (
          <View style={styles.webViewCon}>
            <ActivityIndicator
              size={24}
              color={'#00457C'}
              style={{marginTop: K_MARGIN_60}}
            />
          </View>
        )}
      </CustomModal>
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
  webViewCon: {
    // position: 'absolute',
    height: '90%',
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
});
export default Checkout;
