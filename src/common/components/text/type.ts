import React from 'react';
import {StyleProp, TextProps as TextProperties, TextStyle} from 'react-native';

import {Typography} from '../../constants/typography-foundation';
import {FontFamily} from '../../constants/font';
import {Colors} from '../../constants/color';

export type TextPresetNames = keyof typeof Typography;

type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';

export interface TextProps extends TextProperties {
  fontStyle?: 'normal' | 'italic';

  letterSpacing?: number;

  lineHeight?: number;

  /**
   * Children of text
   * @default undefined
   */
  children?: React.ReactNode;

  /**
   * Using text string instead i18n
   * @default undefined
   */
  text?: string;

  /**
   * Enable to using {flex:1}
   * @default undefined
   */
  flex?: boolean;

  /**
   * Overwrite font size
   * @default 14
   */
  fontSize?: number;

  /**
   * Overwrite font family
   * @default undefined
   */
  fontFamily?: FontFamily;

  /**
   * Using color
   * @default undefined
   */
  color?: string;

  /**
   * Overwrite background color with theme
   */
  colorTheme?: keyof Colors;

  /**
   * Set true for using textAlign = 'center'
   * @default undefined
   */
  center?: boolean;

  /**
   * Overwrite textAlign
   * @default undefined
   */
  textAlign?: TextAlign;

  /**
   * Overwrite textTransform
   * @default undefined
   */
  textTransform?: TextTransform;

  /**
   * Overwrite style of text component
   * @default undefined
   */
  style?: StyleProp<TextStyle>;
  /**
   * Preset for text
   * @default default
   */
  preset?: TextPresetNames;

  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | undefined;
}
