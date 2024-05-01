import React, {useState} from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import {colors} from '../../common/constants/color';
import {
  K_BORDER_WIDTH_1,
  K_MARGIN_32,
  K_PADDING_12,
  K_SIZE_12,
  K_SIZE_32,
  TextBase,
} from '../../common';
// @ts-ignore
import logo from '../../assets/images/logo.png';
import ButtonBase from '../../common/components/button';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SignUp = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);

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
  const handleNameChange = (text: string) => {
    setName(text);
    setIsNameValid(text.trim() !== '');
  };

  const isButtonEnabled = isEmailValid && isPasswordValid && isNameValid;
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
        <View style={{width: '100%', padding: K_MARGIN_32}}>
          <TextBase>Đăng ký</TextBase>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tên"
              placeholderTextColor={colors.color_sub_text}
              value={name}
              onChangeText={handleNameChange}
            />
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
          </View>
          <View style={styles.buttonContainer}>
            <ButtonBase
              title="Đăng ký"
              style={{paddingHorizontal: K_PADDING_12}}
              disabled={!isButtonEnabled}
              onPress={() => navigation.navigate('Login')}
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
    color: colors.color_black,
    width: '100%',
    marginTop: 20,
  },
  input: {
    padding: K_PADDING_12,
    borderBottomWidth: K_BORDER_WIDTH_1,
    borderColor: colors.color_sub_text_2,
    marginBottom: 10,
    width: '100%',
  },
  inputError: {
    borderColor: colors.color_primary,
  },
  errorText: {
    color: colors.color_primary,
  },
});

export default SignUp;
