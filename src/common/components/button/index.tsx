import React from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {colors} from '../../constants/color';
import {
  K_BORDER_RADIUS_20,
  K_FONT_SIZE_15,
  K_PADDING_12,
  K_PADDING_20,
} from '../../constants';
import {TextBase} from '../text';

const ButtonBase = ({
  onPress,
  title,
  buttonColor = colors.color_primary,
  fontSize = 15,
  disabled,
  style,
  styleTitle,
  marginHorizontal = K_PADDING_20,
  marginVertical = K_PADDING_12,
}: {
  onPress?: () => void;
  title: string;
  buttonColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
  styleTitle?: ViewStyle;
  fontSize?: number;
  marginHorizontal?: number;
  marginVertical?: number;
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        // @ts-ignore
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: disabled ? colors.color_sub_text_2 : buttonColor,
            borderRadius: K_BORDER_RADIUS_20,
            alignItems: 'center',
          },
          style,
        ]}>
        <TextBase
          style={[
            {
              marginHorizontal: marginHorizontal,
              marginVertical: marginVertical,
            },
            styleTitle,
          ]}
          text={title}
          color={colors.color_white}
          preset="caption1"
          fontSize={fontSize}
        />
      </View>
    </TouchableOpacity>
  );
};
export default ButtonBase;
