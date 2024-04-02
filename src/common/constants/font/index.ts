import {Platform} from 'react-native';

export const FontDefault = {
  primary: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
};

export type FontFamily = keyof typeof FontDefault;
