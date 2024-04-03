import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';

import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {RadioButtonProps} from './type.ts';
import {colors} from '../../constants/color';
import {sizeScale} from '../../scale';
import {
  useInterpolate,
  useInterpolateColor,
  useSharedTransition,
} from '../../animated/hooks.ts';
import {execFunc} from '../../method';

export const SIZE = sizeScale(16);
export const ACTIVE_COLOR = colors.color_primary;
export const UN_ACTIVE_COLOR = colors.color_sub_text;
export const STROKE_WIDTH = 2;
export const RadioButton = ({
  value,
  onToggle,
  sizeDot = SIZE,
  initialValue = false,
  activeColor = ACTIVE_COLOR,
  strokeWidth = STROKE_WIDTH,
  unActiveColor = UN_ACTIVE_COLOR,
  disabled,
}: RadioButtonProps) => {
  // state

  const [localValue, setLocalValue] = useState<boolean>(initialValue);
  const progress = useSharedTransition(value ?? localValue, {duration: 200});
  const size = useInterpolate(
    progress,
    [0, 1],
    [0, sizeDot - strokeWidth - 3.5 * 2],
  );
  const color = useInterpolateColor(
    progress,
    [0, 1],
    [unActiveColor, activeColor],
  );

  // function
  const onPress = () => {
    if (typeof value === 'boolean') {
      execFunc(onToggle, !value);
    } else {
      execFunc(onToggle, !localValue);
      setLocalValue(v => !v);
    }
  };

  // style
  const wrapStyle = useMemo(
    () => ({
      width: sizeDot,
      height: sizeDot,
      borderRadius: sizeDot + 10,
      borderWidth: strokeWidth,
    }),
    [sizeDot, strokeWidth],
  );

  // reanimated style
  const wrapAnimaStyle = useAnimatedStyle(() => ({
    borderColor: color.value as string,
  }));

  const dotStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    borderRadius: (sizeDot - strokeWidth) / 2,
    backgroundColor: color.value as string,
  }));

  // render
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      disabled={disabled}
      hitSlop={{
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      }}>
      <Animated.View style={[styles.wrap, wrapStyle, wrapAnimaStyle]}>
        <Animated.View pointerEvents={'none'} style={[styles.dot, dotStyle]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
