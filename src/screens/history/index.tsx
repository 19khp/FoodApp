import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  K_BORDER_RADIUS_20,
  K_FONT_SIZE_10,
  K_FONT_SIZE_12,
  K_FONT_SIZE_14,
  K_FONT_SIZE_15,
  K_MARGIN_10,
  K_MARGIN_16,
  K_MARGIN_24,
  K_MARGIN_32,
  K_PADDING_20,
  K_PADDING_32,
  K_SIZE_120,
  ORDER_STATUS,
  TextBase,
} from '../../common';
import {colors} from '../../common/constants/color';
import ButtonBase from '../../common/components/button';
import {useSelector} from 'react-redux';
import {selectIsLogin, selectUserInfo} from '../../stores/authSlice.ts';
import {getHistory} from '../../hooks/server/history.ts';
import {HistoryRes} from '../../models/history.ts';
import {useFocusEffect} from '@react-navigation/native';

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
const HistoryBox = ({
  history,
  navigation,
}: {
  history: HistoryRes;
  navigation: any;
}) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('HistoryDetails', {item: history})}>
    <View style={styles.mealContainer}>
      <View>
        <TextBase
          preset="title1"
          fontSize={K_FONT_SIZE_14}
          color={colors.color_black}>
          Mã hoá đơn: {history?.ordersId}
        </TextBase>
        <TextBase
          preset="title1"
          style={{marginVertical: K_MARGIN_10}}
          fontSize={K_FONT_SIZE_12}
          color={colors.color_sub_text}>
          Ngày tạo:{' '}
          {new Date(history.orderDate).toLocaleString('vi-VN', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </TextBase>
        <TextBase
          preset="title1"
          fontSize={K_FONT_SIZE_12}
          color={colors.color_sub_text}>
          Trạng thái: {getStatusText(history.status)}
        </TextBase>
      </View>
    </View>
  </TouchableOpacity>
);

const Index = ({navigation}: any) => {
  const isLogin = useSelector(selectIsLogin);
  const profile = useSelector(selectUserInfo);
  const [history, setHistory] = useState<HistoryRes[]>();
  const fetchHistory = async () => {
    try {
      const res = await getHistory(profile.email);
      if (res.result.content) {
        console.log(res.result.content);
        setHistory(res.result.content);
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchHistory();
    }, []),
  );
  const renderView = () => {
    if (isLogin) {
      if (history && history.length > 0) {
        return (
          <ScrollView style={{width: '100%'}}>
            {history?.map(item => (
              <HistoryBox
                history={item}
                key={item.ordersId}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        );
      }
      return (
        <View>
          <MaterialCommunityIcons
            name={'calendar-text'}
            size={K_SIZE_120}
            color={colors.color_sub_text_2}
          />
          <TextBase
            preset="title1"
            color={colors.color_sub_text}
            style={{fontWeight: '600'}}>
            Không có lịch sử
          </TextBase>
          <ButtonBase
            style={{marginTop: K_MARGIN_24}}
            title="Đặt ngay"
            onPress={() => navigation.navigate('meals')}
          />
        </View>
      );
    } else {
      return (
        <ButtonBase
          style={{marginTop: K_MARGIN_24}}
          title="Đăng nhập"
          onPress={() => navigation.navigate('Login')}
        />
      );
    }
  };
  return (
    <SafeAreaView style={styles.layoutContainer}>
      <View style={{alignItems: 'center', width: '100%'}}>{renderView()}</View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  layoutContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  mealContainer: {
    flexDirection: 'row',
    backgroundColor: colors.color_white,
    borderRadius: K_BORDER_RADIUS_20,
    alignItems: 'center',
    paddingHorizontal: K_PADDING_20,
    paddingVertical: K_MARGIN_16,
    marginBottom: K_MARGIN_24,
    marginHorizontal: K_PADDING_32,
  },
  image: {
    width: 74,
    height: 74,
    marginRight: K_MARGIN_32,
    borderRadius: K_BORDER_RADIUS_20,
    objectFit: 'contain',
  },
});

export default Index;
