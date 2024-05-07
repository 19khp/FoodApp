import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  K_BORDER_RADIUS_20,
  K_BORDER_WIDTH_1,
  K_FONT_SIZE_10,
  K_FONT_SIZE_15,
  K_FONT_SIZE_17,
  K_MARGIN_10,
  K_MARGIN_12,
  K_MARGIN_16,
  K_PADDING_12,
  K_PADDING_16,
  K_PADDING_20,
  K_PADDING_24,
  K_PADDING_32,
  K_PADDING_60,
  K_SIZE_10,
  K_SIZE_20,
  K_SIZE_24,
  K_SIZE_60,
  K_SIZE_SCALE_15,
  TextBase,
} from '../../common';
import {colors} from '../../common/constants/color';
import {RadioButton} from '../../common/components/radio-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from '../../common/components/modal';
import ButtonBase from '../../common/components/button';
import useLogout from '../../hooks/server/useLogout.ts';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectIsLogin,
  selectIsUpdateProfile,
  setIsUpdateProfile,
} from '../../stores/authSlice.ts';
import {useProfile} from '../../hooks/server/useProfile.ts';
import {getPathResource} from '../../common/utils/string.ts';
import {ENVConfig} from '../../common/config/env.ts';

export const paymentMethods = [
  {
    id: 1,
    name: 'Thanh toán khi nhận hàng',
    icon: (
      <View
        style={{
          backgroundColor: colors.color_sub_primary,
          borderRadius: K_SIZE_10,
          padding: K_PADDING_12,
        }}>
        <MaterialCommunityIcons
          name="card-bulleted"
          size={K_SIZE_20}
          color={colors.color_white}
        />
      </View>
    ),
  },
  {
    id: 2,
    name: 'Paypal',
    icon: (
      <View
        style={{
          backgroundColor: colors.color_secondary,
          borderRadius: K_SIZE_10,
          padding: K_PADDING_12,
        }}>
        <Image
          source={require('./img/cib_paypal.png')}
          style={{height: K_SIZE_20, width: K_SIZE_20}}
        />
      </View>
    ),
  },
];
const Index = ({navigation}: any) => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const {handleLogout, loading} = useLogout();
  const isLogin = useSelector(selectIsLogin);
  const isUpdateProfile = useSelector(selectIsUpdateProfile);
  const dispatch = useDispatch();
  const {data: userInfo, refetch: refetchUser} = useProfile();
  const handleRadioButtonToggle = (index: number) => {
    setSelectedMethod(index);
  };
  useEffect(() => {
    if (isUpdateProfile) {
      refetchUser();
      dispatch(setIsUpdateProfile(false));
    }
  }, [dispatch, isUpdateProfile, refetchUser]);
  return (
    <SafeAreaView>
      <Spinner visible={loading} />
      <CustomModal
        visible={modalVisible}
        closeVisible={false}
        onClose={() => setModalVisible(false)}>
        <View style={{marginBottom: K_PADDING_60}}>
          <View
            onTouchEnd={() => {
              navigation.navigate('ProfileDetails');
              setModalVisible(false);
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: K_PADDING_20,
            }}>
            <TextBase text="Sửa thông tin" />
            <MaterialCommunityIcons
              name="chevron-right"
              size={K_SIZE_24}
              color={colors.color_black}
            />
          </View>
          <View
            onTouchEnd={() => {
              navigation.navigate('ChangePassword');
              setModalVisible(false);
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: K_PADDING_20,
            }}>
            <TextBase text="Đổi mật khẩu" />
            <MaterialCommunityIcons
              name="chevron-right"
              size={K_SIZE_24}
              color={colors.color_black}
            />
          </View>
        </View>
      </CustomModal>
      <View style={{padding: K_PADDING_32}}>
        {isLogin && (
          <View>
            <View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextBase preset="title1" fontSize={K_FONT_SIZE_17}>
                  Thông tin
                </TextBase>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <TextBase
                    text="Chỉnh sửa"
                    fontSize={K_FONT_SIZE_10}
                    color={colors.color_primary}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.boxWrapper}>
                <View style={styles.infoWrapper}>
                  <View>
                    <Image
                      style={{
                        width: K_SIZE_60,
                        height: K_SIZE_60,
                        borderRadius: K_SIZE_10,
                        objectFit: 'contain',
                      }}
                      source={{
                        uri: getPathResource(
                          ENVConfig.PATH_USER,
                          userInfo?.image || 'avatar_default.jpg',
                        ),
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <TextBase
                      preset="title1"
                      fontSize={K_FONT_SIZE_15}
                      style={{flexShrink: 1}}>
                      {userInfo?.name}
                    </TextBase>
                    <TextBase
                      preset="caption1"
                      fontSize={K_FONT_SIZE_10}
                      style={{flexShrink: 1}}>
                      {userInfo?.email}
                    </TextBase>
                    <TextBase
                      preset="caption1"
                      fontSize={K_FONT_SIZE_10}
                      style={{flexShrink: 1}}>
                      Địa chỉ: {userInfo?.address}
                    </TextBase>
                  </View>
                </View>
              </View>
            </View>
            <View style={{height: K_SIZE_60}} />
          </View>
        )}

        <View style={{marginBottom: K_PADDING_60}}>
          <TextBase preset="title1" fontSize={K_FONT_SIZE_17}>
            Phương thức thanh toán
          </TextBase>
          <View style={styles.boxWrapper}>
            <View style={styles.methodWrapper}>
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
        {isLogin ? (
          <ButtonBase
            title="Đăng xuất"
            onPress={() => handleLogout(navigation)}
          />
        ) : (
          <ButtonBase
            title="Đăng nhập"
            onPress={() => navigation.navigate('Login')}
          />
        )}
      </View>
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
    flexDirection: 'row',
    columnGap: K_MARGIN_10,
  },
  methodWrapper: {
    backgroundColor: colors.color_white,
    borderRadius: K_BORDER_RADIUS_20,
    padding: K_PADDING_24,
    rowGap: K_MARGIN_16,
  },
});
export default Index;
