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
  style,
}: {
  onPress?: () => void;
  title: string;
  buttonColor?: string;
  style?: ViewStyle;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        // @ts-ignore
        style={[
          {
            backgroundColor: buttonColor,
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
