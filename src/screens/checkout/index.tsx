import React, {useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {
  K_BORDER_RADIUS_20,
  K_BORDER_WIDTH_1,
  K_FONT_SIZE_12,
  K_FONT_SIZE_14,
  K_FONT_SIZE_15,
  K_MARGIN_10,
  K_MARGIN_12,
  K_MARGIN_16,
  K_MARGIN_24,
  K_MARGIN_32,
  K_MARGIN_40,
  K_MARGIN_8,
  K_PADDING_12,
  K_PADDING_16,
  K_PADDING_24,
  K_PADDING_32,
  K_SIZE_SCALE_15,
  TextBase,
} from '../../common';
import {colors} from '../../common/constants/color';
import {Utils} from '../../common/utils';
import {RadioButton} from '../../common/components/radio-button';
import {paymentMethods} from '../profile';
import ButtonBase from '../../common/components/button';

const Checkout = ({navigation}: any) => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(0);

  const handleRadioButtonToggle = (index: number) => {
    setSelectedMethod(index);
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
                <View
                  style={{
                    flexDirection: 'row',
                    columnGap: K_MARGIN_8,
                    borderBottomWidth: K_BORDER_WIDTH_1,
                    borderBottomColor: colors.color_sub_text_2,
                    paddingBottom: K_PADDING_12,
                  }}>
                  <TextBase preset="title1" fontSize={K_FONT_SIZE_12}>
                    Người nhận: {'Wayne Rooney'}
                  </TextBase>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    columnGap: K_MARGIN_8,
                    borderBottomWidth: K_BORDER_WIDTH_1,
                    borderBottomColor: colors.color_sub_text_2,
                    paddingVertical: K_PADDING_12,
                  }}>
                  <TextBase preset="title2" fontSize={K_FONT_SIZE_12}>
                    Địa chỉ: {'20 thái hà'}
                  </TextBase>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    columnGap: K_MARGIN_8,
                    paddingTop: K_PADDING_12,
                  }}>
                  <TextBase preset="title2" fontSize={K_FONT_SIZE_12}>
                    SĐT: {'0102012'}
                  </TextBase>
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
              <View style={styles.mealContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                />
                <View style={styles.textContainer}>
                  <TextBase preset="title1" fontSize={K_FONT_SIZE_15}>
                    ji
                  </TextBase>
                  <TextBase
                    preset="title1"
                    fontSize={K_FONT_SIZE_14}
                    color={colors.color_primary}>
                    {Utils.formatCurrency(10000)}
                  </TextBase>
                  <TextBase preset="title2" fontSize={K_FONT_SIZE_12}>
                    Số lượng: {2}
                  </TextBase>
                </View>
              </View>
              <View style={styles.mealContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                />
                <View style={styles.textContainer}>
                  <TextBase preset="title1" fontSize={K_FONT_SIZE_15}>
                    ji
                  </TextBase>
                  <TextBase
                    preset="title1"
                    fontSize={K_FONT_SIZE_14}
                    color={colors.color_primary}>
                    {Utils.formatCurrency(10000)}
                  </TextBase>
                  <TextBase preset="title2" fontSize={K_FONT_SIZE_12}>
                    Số lượng: {2}
                  </TextBase>
                </View>
              </View>
              <View style={styles.mealContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                />
                <View style={styles.textContainer}>
                  <TextBase preset="title1" fontSize={K_FONT_SIZE_15}>
                    ji
                  </TextBase>
                  <TextBase
                    preset="title1"
                    fontSize={K_FONT_SIZE_14}
                    color={colors.color_primary}>
                    {Utils.formatCurrency(10000)}
                  </TextBase>
                  <TextBase preset="title2" fontSize={K_FONT_SIZE_12}>
                    Số lượng: {2}
                  </TextBase>
                </View>
              </View>
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
          <TextBase>Tổng</TextBase>
          <TextBase> {Utils.formatCurrency(10000)}</TextBase>
        </View>
        <ButtonBase
          title={'Thanh toán'}
          // onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    bottom: K_MARGIN_32,
    padding: K_PADDING_32,
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
    marginBottom: K_MARGIN_24,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: K_MARGIN_32,
    right: K_MARGIN_32,
    backgroundColor: colors.color_background,
    paddingBottom: K_MARGIN_32,
    paddingTop: K_MARGIN_16,
  },
});
export default Checkout;
