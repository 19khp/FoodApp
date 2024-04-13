import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import {useEffect} from 'react';

export const useInterpolate = (
  progress: Animated.SharedValue<number>,
  input: number[],
  output: number[],
  type?: Animated.Extrapolate,
  // @ts-ignore
) => useDerivedValue(() => interpolate(progress.value, input, output, type));

/**
 * Interpolate color
 */
export const useInterpolateColor = (
  progress: Animated.SharedValue<number>,
  input: number[],
  output: (number | string)[],
  colorSpace?: 'RGB' | 'HSV' | undefined,
) => {
  'worklet';
  return useDerivedValue(() =>
    // @ts-ignore
    interpolateColor(progress.value, input, output, colorSpace),
  );
};
const sharedBin = (value: boolean): 0 | 1 => {
  'worklet';
  return value ? 1 : 0;
};
export const useSharedTransition = (
  state: boolean | number,
  config?: WithTimingConfig,
): Animated.SharedValue<number> => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = typeof state === 'boolean' ? sharedBin(state) : state;
  }, [state, value]);
  return useDerivedValue(() =>
    withTiming(
      value.value,
      Object.assign(
        {duration: 500, easing: Easing.bezier(0.33, 0.01, 0, 1)},
        config,
      ),
    ),
  );
};
