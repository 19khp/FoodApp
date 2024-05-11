import {ENVConfig} from '../config/env.ts';

export const getPathResource = (
  originPath: string,
  imageName: string,
): string => {
  return ENVConfig.BASE_URL + originPath + imageName;
};
export const isVietnamesePhoneNumber = (number: string) => {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
};
