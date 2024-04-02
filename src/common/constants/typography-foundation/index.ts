import {Platform, StyleSheet} from 'react-native';
import {FontDefault} from '../font';
import {
  K_FONT_SIZE_15,
  K_FONT_SIZE_17,
  K_FONT_SIZE_22,
  K_FONT_SIZE_28,
  K_FONT_SIZE_34,
  K_FONT_SIZE_36,
  K_FONT_SIZE_48,
  K_SIZE_24,
  K_SIZE_32,
  K_SIZE_34,
  K_SIZE_36,
  K_SIZE_40,
  K_SIZE_64,
} from '../index.ts';
import {colors} from '../color';

export const K_IS_IOS = Platform.OS === 'ios';
export const Typography = StyleSheet.create({
  h3: {
    fontFamily: FontDefault.primary,
    fontSize: K_FONT_SIZE_34,
    lineHeight: K_SIZE_40,
    fontWeight: '600',
    color: colors.color_black,
  },
  h4: {
    fontFamily: FontDefault.primary,
    fontSize: K_FONT_SIZE_28,
    lineHeight: K_SIZE_36,
    fontWeight: K_IS_IOS ? '500' : '600',
    color: colors.color_black,
  },
  title1: {
    fontFamily: FontDefault.primary,
    fontSize: K_FONT_SIZE_22,
    lineHeight: K_SIZE_32,
    fontWeight: K_IS_IOS ? '600' : '800',
    color: colors.color_black,
  },
  caption1: {
    fontFamily: FontDefault.primary,
    fontSize: K_FONT_SIZE_15,
    lineHeight: K_SIZE_24,
    fontWeight: 'normal',
    color: colors.color_sub_text,
    textTransform: 'none',
  },
});
