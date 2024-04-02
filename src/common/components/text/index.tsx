import React, {useMemo} from 'react';
//@ts-ignore
import {StyleProp, StyleSheet, Text as RNText, TextStyle} from 'react-native';
import {TextProps} from './type';
import {K_IS_IOS, Typography} from '../../constants/typography-foundation';
import {Utils} from '../../utils';
import {sizeScale} from '../../scale';
import {propsToStyle} from '../../method';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export const TextBase = ({
  text,
  flex,
  color,
  center,
  children,
  fontSize,
  textAlign,
  fontStyle,
  lineHeight,
  fontFamily,
  colorTheme = 'color_black',
  textTransform,
  letterSpacing,
  preset = 'title1',
  style: styleOverride = {},
  textDecorationLine,
  ...rest
}: TextProps) => {
  // state
  const content = useMemo(() => text || children, [text, children]);

  const styleComponent = useMemo<StyleProp<TextStyle>>(
    () => [
      [
        Typography[preset],
        flex === true && styles.flex,
        fontSize !== undefined && {fontSize: sizeScale(fontSize)},
        center && {textAlign: 'center'},
        propsToStyle([
          {color},
          {textAlign},
          {textTransform},
          {fontStyle},
          {letterSpacing},
          {lineHeight},
          {textDecorationLine},
        ]),
      ],
    ],
    [
      preset,
      flex,
      fontSize,
      center,
      color,
      textAlign,
      textTransform,
      fontStyle,
      letterSpacing,
      lineHeight,
      textDecorationLine,
    ],
  );

  const _calFont = useMemo(() => {
    if (K_IS_IOS) {
      return {};
    }
    return {
      fontFamily: Utils.getFontFamily(Typography[preset].fontWeight),
    };
  }, [preset]);
  // render
  return (
    <RNText
      allowFontScaling={false}
      {...rest}
      style={StyleSheet.flatten([styleComponent, styleOverride, _calFont])}>
      {content}
    </RNText>
  );
};
