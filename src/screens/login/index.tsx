import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {colors} from '../../common/constants/color';
import {
  K_BORDER_WIDTH_1,
  K_FONT_SIZE_12,
  K_MARGIN_32,
  K_MARGIN_6,
  K_PADDING_12,
  K_SIZE_12,
  TextBase,
} from '../../common';
// @ts-ignore
import logo from '../../assets/images/logo.png';
import ButtonBase from '../../common/components/button';
import useLogin from '../../hooks/server/useLogin.ts';
import Spinner from 'react-native-loading-spinner-overlay';
import {Authorization} from '../../common/utils/auth.ts';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  Authorization.clearToken();
  const {handleLogin, loading} = useLogin();
  const handleEmailChange = (text: string) => {
    setEmail(text);
    const isValid = emailRegex.test(text);
    setIsEmailValid(isValid);
    setEmailError(isValid ? '' : 'Email không đúng định dạng');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setIsPasswordValid(text.trim() !== '');
  };

  const isButtonEnabled = isEmailValid && isPasswordValid;
  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <View style={styles.contentContainer}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
        <View style={{width: '100%', padding: K_MARGIN_32}}>
          <TextBase>Đăng nhập</TextBase>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              placeholder="Email"
              placeholderTextColor={colors.color_sub_text}
              value={email}
              onChangeText={handleEmailChange}
            />
            {emailError ? (
              <TextBase style={styles.errorText} fontSize={K_SIZE_12}>
                {emailError}
              </TextBase>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              placeholderTextColor={colors.color_sub_text}
              secureTextEntry={true}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TextBase
              text="Quên mật khẩu?"
              color={colors.color_primary}
              fontSize={K_FONT_SIZE_12}
              style={{marginTop: K_MARGIN_6}}
            />
          </View>
          <View style={styles.buttonContainer}>
            <ButtonBase
              title="Đăng nhập"
              style={{paddingHorizontal: K_PADDING_12}}
              disabled={!isButtonEnabled}
              onPress={() => handleLogin({email, password}, navigation)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color_white,
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    height: 200,
    aspectRatio: 1,
  },
  buttonContainer: {
    marginTop: K_MARGIN_32,
    paddingBottom: K_MARGIN_32,
    paddingHorizontal: K_MARGIN_32,
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    padding: K_PADDING_12,
    color: colors.color_black,
    borderBottomWidth: K_BORDER_WIDTH_1,
    borderColor: colors.color_sub_text_2,
    marginBottom: 10,
    width: '100%',
  },
  inputError: {
    borderColor: colors.color_primary,
  },
  errorText: {
    fontWeight: 'normal',
    color: colors.color_primary,
  },
});

export default Login;
