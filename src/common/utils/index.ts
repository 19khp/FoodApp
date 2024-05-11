import {FontDefault} from '../constants/font';
export const currency_const = {
  vnd: '₫',
};

export const Precision = {
  vnd: 'đồng',
  vnd_en: 'dong',
};

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
  public static formatCurrency = (
    num: number | string | undefined | null,
    noUnit?: boolean,
  ) => {
    if (!num) {
      return 0 + ' ' + currency_const.vnd;
    }

    if (typeof num === 'string') {
      if (noUnit) {
        return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      }
      return (
        num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + currency_const.vnd
      );
    }

    if (typeof num === 'number') {
      return (
        num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +
        ' ' +
        currency_const.vnd
      );
    }
    return '';
  };
}
