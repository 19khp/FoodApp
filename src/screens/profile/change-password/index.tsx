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
  K_PADDING_20,
  K_PADDING_32,
  K_PADDING_8,
  K_SIZE_16,
  TextBase,
} from '../../../common';
import {colors} from '../../../common/constants/color';
import ButtonBase from '../../../common/components/button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchChangePass} from '../../../hooks/server/useChangePassword.ts';

const ChangePassword = (navigation: any) => {
  const [secureCurrPassword, setSecureCurrPassword] = useState<boolean>(true);
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [secureNewPassword, setSecureNewPassword] = useState<boolean>(true);
  const [secureReNewPassword, setSecureReNewPassword] = useState<boolean>(true);
  const handleChangePassword = async (navigation: any) => {
    const res = await fetchChangePass({
      email: '',
      password: secureReNewPassword,
    });
    if (res) {
      navigation.navigate('Login');
    }
  };
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
              value={currPassword}
              onChangeText={setCurrPassword}
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
              value={newPassword}
              onChangeText={setNewPassword}
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
              value={reNewPassword}
              onChangeText={setReNewPassword}
            />
            <MaterialCommunityIcons
              name={`${secureReNewPassword ? 'eye' : 'eye-off'}`}
              size={K_SIZE_16}
              onPress={() => setSecureReNewPassword(!secureReNewPassword)}
              color={colors.color_sub_text}
            />
          </View>
        </View>

        <ButtonBase
          title="Đổi mật khẩu"
          style={{marginTop: K_MARGIN_24}}
          disabled={
            currPassword.length === 0 ||
            newPassword.length === 0 ||
            reNewPassword.length === 0
          }
          onPress={() => handleChangePassword(navigation)}
        />
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
