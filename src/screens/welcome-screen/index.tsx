import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../common/constants/color';
import {
  K_BORDER_RADIUS_20,
  K_MARGIN_10,
  K_MARGIN_32,
  K_MARGIN_60,
  K_PADDING_12,
  K_PADDING_4,
} from '../../common';
// @ts-ignore
import logo from '../../assets/images/logo.png';
import ButtonBase from '../../common/components/button';

const WelcomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonBase
          title="Đăng nhập"
          style={{paddingHorizontal: K_PADDING_12}}
          onPress={() => navigation.navigate('Login')}
        />
        <ButtonBase
          title="Đăng ký"
          buttonColor={colors.color_sub_text}
          style={{marginTop: K_MARGIN_10, paddingHorizontal: K_PADDING_12}}
          onPress={() => navigation.navigate('SignUp')}
        />
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
  },
  image: {
    height: 200,
    aspectRatio: 1,
  },
  buttonContainer: {
    paddingBottom: K_MARGIN_32,
    paddingHorizontal: K_MARGIN_32,
  },
  touchableOpacity: {
    position: 'absolute',
    top: K_MARGIN_60,
    right: K_MARGIN_32,
    backgroundColor: colors.color_background,
    paddingVertical: K_PADDING_4,
    paddingHorizontal: K_PADDING_12,
    borderRadius: K_BORDER_RADIUS_20,
    zIndex: 1,
  },
});

export default WelcomeScreen;
