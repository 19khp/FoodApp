import {FontDefault} from '../constants/font';

export class Utils {
  public static getFontFamily(fontWeight: string) {
    const fontWeights = {
      '400': 'Regular',
      '500': 'Medium',
      '600': 'Semibold',
      '700': 'Bold',
      '800': 'Black',
    };
    //@ts-ignore
    const weight = fontWeight ? fontWeights[fontWeight] : 'Regular';
    return `${FontDefault.primary}-${weight}`;
  }
}
