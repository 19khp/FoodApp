import React, {useState} from 'react';
import {
  Alert,
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
import {useProfile} from '../../../hooks/server/useProfile.ts';

const ChangePassword = () => {
  const {data: userInfo} = useProfile();
  const [newPassword, setNewPassword] = useState('');
  const [secureNewPassword, setSecureNewPassword] = useState<boolean>(true);
  const handleChangePassword = async () => {
    const res = await fetchChangePass({
      email: userInfo?.email,
      password: secureNewPassword,
    });
    if (res) {
      Alert.alert('Thông báo', 'Đổi mật khẩu thành công');
    } else {
      Alert.alert('Thông báo', 'Đổi mật không khẩu thành công');
    }
  };
  return (
    <SafeAreaView>
      <View style={{padding: K_PADDING_32}}>
        <View>
          <TextBase>Email: {userInfo?.email}</TextBase>
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

        <ButtonBase
          title="Đổi mật khẩu"
          style={{marginTop: K_MARGIN_24}}
          disabled={newPassword.length === 0}
          onPress={handleChangePassword}
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
