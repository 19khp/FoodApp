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
  disabled,
  style,
}: {
  onPress?: () => void;
  title: string;
  buttonColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity onPress={disabled ? () => {} : onPress}>
      <View
        // @ts-ignore
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: disabled ? colors.color_sub_text_2 : buttonColor,
            borderRadius: K_BORDER_RADIUS_20,
            paddingHorizontal: K_PADDING_20,
            paddingVertical: K_PADDING_12,
            alignItems: 'center',
          },
          style,
        ]}>
        <TextBase
          text={title}
          color={colors.color_white}
          preset="caption1"
          fontSize={K_FONT_SIZE_15}
        />
      </View>
    </TouchableOpacity>
  );
};
export default ButtonBase;