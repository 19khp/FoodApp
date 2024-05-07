import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  K_BORDER_RADIUS_20,
  K_FONT_SIZE_12,
  K_FONT_SIZE_14,
  K_FONT_SIZE_15,
  K_MARGIN_10,
  K_MARGIN_16,
  K_MARGIN_32,
  K_MARGIN_4,
  K_PADDING_20,
  K_PADDING_32,
  ORDER_STATUS,
  TextBase,
} from '../../../common';
import {getPathResource} from '../../../common/utils/string.ts';
import {ENVConfig} from '../../../common/config/env.ts';
import {HistoryDetail} from '../../../models/history.ts';
import {
  deteleHistory,
  getHistoryDetails,
} from '../../../hooks/server/history.ts';
import {Utils} from '../../../common/utils';
import {colors} from '../../../common/constants/color';
import ButtonBase from '../../../common/components/button';

const HistoryDetails = ({route, navigation}: any) => {
  const {item} = route.params;
  const [detail, setDetail] = useState<HistoryDetail | null>();
  useEffect(() => {
    (async () => {
      try {
        const res = await getHistoryDetails(item.ordersId);
        if (res.result) {
          console.log(res.result);
          setDetail(res.result);
        } else {
          setDetail(null);
        }
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    })();
  }, [item.ordersId]);
  const getStatusText = (status: any): string => {
    switch (status) {
      case ORDER_STATUS.PENDING_PAYMENT:
        return 'Chờ thanh toán';
      case ORDER_STATUS.PAID:
        return 'Đã thanh toán';
      case ORDER_STATUS.CANCELLED:
        return 'Đơn hủy';
      default:
        return '';
    }
  };
  const handelDeleteHistory = async () => {
    try {
      const res = await deteleHistory(item.ordersId);
      if (res.result) {
        console.log(res.result);
        navigation.navigate('history');
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={{padding: K_PADDING_32}}>
          <TextBase
            preset="title1"
            fontSize={K_FONT_SIZE_14}
            style={{marginBottom: K_MARGIN_10}}
            color={colors.color_black}>
            Trạng thái: {getStatusText(detail?.orderDto.status)}
          </TextBase>
          <TextBase
            preset="title1"
            fontSize={K_FONT_SIZE_14}
            style={{marginBottom: K_MARGIN_10}}
            color={colors.color_primary}>
            Thành tiền: {Utils.formatCurrency(detail?.orderDto.amount)}
          </TextBase>
          {detail?.orderDetailDtos.map(meal => (
            <View
              style={[styles.mealContainer]}
              key={meal.productDto.productId}>
              <Image
                style={styles.image}
                source={{
                  uri: getPathResource(
                    ENVConfig.PATH_PRODUCT,
                    meal?.productDto.image,
                  ),
                }}
              />
              <View style={styles.textContainer}>
                <TextBase preset="title1" fontSize={K_FONT_SIZE_15}>
                  {meal?.productDto.name}
                </TextBase>
                <TextBase
                  preset="title1"
                  fontSize={K_FONT_SIZE_12}
                  style={{marginVertical: K_MARGIN_4}}
                  color={colors.color_sub_text}>
                  Số lượng: {meal.quantity}
                </TextBase>
                <TextBase
                  preset="title1"
                  style={{marginVertical: K_MARGIN_4}}
                  fontSize={K_FONT_SIZE_12}
                  color={colors.color_primary}>
                  Giá: {Utils.formatCurrency(meal?.price)}
                </TextBase>
                <TextBase
                  preset="title1"
                  fontSize={K_FONT_SIZE_12}
                  color={colors.color_primary}>
                  Tổng: {Utils.formatCurrency(meal?.price * meal.quantity)}
                </TextBase>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={{rowGap: K_MARGIN_10}}>
          <ButtonBase
            title={'Mua lần nữa'}
            onPress={() => navigation.navigate('meals')}
          />
          {detail?.orderDto.status === ORDER_STATUS.PENDING_PAYMENT && (
            <ButtonBase
              title={'Huỷ đơn mua'}
              onPress={() =>
                Alert.alert('Thông báo', 'Bạn có muốn huỷ đơn mua?', [
                  {
                    text: 'Huỷ',
                    style: 'cancel',
                  },
                  {
                    text: 'Đồng ý',
                    onPress: handelDeleteHistory,
                  },
                ])
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
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
    marginBottom: K_MARGIN_16,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: K_MARGIN_32,
    right: K_MARGIN_32,
    backgroundColor: colors.color_background,
    paddingBottom: K_MARGIN_32,
  },
});
export default HistoryDetails;
