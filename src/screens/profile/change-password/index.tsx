import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  K_BORDER_RADIUS_6,
  K_BORDER_WIDTH_1,
  K_MARGIN_10,
  K_MARGIN_16,
  K_MARGIN_24,
  K_MARGIN_8,
  K_PADDING_10,
  K_PADDING_14,
  K_PADDING_20,
  K_PADDING_32,
  K_PADDING_8,
  K_SIZE_16,
  TextBase,
} from '../../../common';
import {colors} from '../../../common/constants/color';
import ButtonBase from '../../../common/components/button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChangePassword = () => {
  const [secureCurrPassword, setSecureCurrPassword] = useState<boolean>(true);
  const [secureNewPassword, setSecureNewPassword] = useState<boolean>(true);
  const [secureReNewPassword, setSecureReNewPassword] = useState<boolean>(true);
  return (
    <SafeAreaView>
      <View style={{padding: K_PADDING_32}}>
        <View>
          <TextBase text={'Mật khẩu hiện tại'} />
          <View
            style={[
              styles.passwordWrapper,
              Platform.OS === 'ios'
                ? {padding: K_PADDING_20}
                : {paddingHorizontal: K_PADDING_8},
            ]}>
            <TextInput
              style={{marginRight: K_MARGIN_10}}
              secureTextEntry={secureCurrPassword}
              placeholder="Nhập mật khẩu hiện tại"
              placeholderTextColor={colors.color_sub_text}
              // value={'số 12 thái hà'}
              // onChangeText={handleNameChange}
            />
            <MaterialCommunityIcons
              name={`${secureCurrPassword ? 'eye' : 'eye-off'}`}
              size={K_SIZE_16}
              onPress={() => setSecureCurrPassword(!secureCurrPassword)}
              color={colors.color_sub_text}
            />
          </View>
        </View>
        <View>
          <TextBase text={'Mật khẩu mới'} />
          <View
            style={[
              styles.passwordWrapper,
              Platform.OS === 'ios'
                ? {padding: K_PADDING_20}
                : {paddingHorizontal: K_PADDING_8},
            ]}>
            <TextInput
              style={{marginRight: K_MARGIN_10}}
              secureTextEntry={secureNewPassword}
              placeholder="Nhập mật khẩu mới"
              placeholderTextColor={colors.color_sub_text}
              // value={'số 12 thái hà'}
              // onChangeText={handleNameChange}
            />
            <MaterialCommunityIcons
              name={`${secureNewPassword ? 'eye' : 'eye-off'}`}
              size={K_SIZE_16}
              onPress={() => setSecureNewPassword(!secureNewPassword)}
              color={colors.color_sub_text}
            />
          </View>
        </View>
        <View>
          <TextBase text={'Nhập lại mật khẩu mới'} />
          <View
            style={[
              styles.passwordWrapper,
              Platform.OS === 'ios'
                ? {padding: K_PADDING_20}
                : {paddingHorizontal: K_PADDING_8},
            ]}>
            <TextInput
              style={{marginRight: K_MARGIN_10}}
              secureTextEntry={secureReNewPassword}
              placeholder="Nhập lại mật khẩu mới"
              placeholderTextColor={colors.color_sub_text}
              // value={'số 12 thái hà'}
              // onChangeText={handleNameChange}
            />
            <MaterialCommunityIcons
              name={`${secureReNewPassword ? 'eye' : 'eye-off'}`}
              size={K_SIZE_16}
              onPress={() => setSecureReNewPassword(!secureReNewPassword)}
              color={colors.color_sub_text}
            />
          </View>
        </View>

        <ButtonBase title="Đổi mật khẩu" style={{marginTop: K_MARGIN_24}} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  passwordWrapper: {
    color: colors.color_black,
    borderColor: colors.color_sub_text_2,
    borderRadius: K_BORDER_RADIUS_6,
    borderWidth: K_BORDER_WIDTH_1,
    width: '100%',
    marginBottom: K_MARGIN_16,
    marginTop: K_MARGIN_8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default ChangePassword;
