import React from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constants/color';

const RatingStar = () => {
  const stars: number[] = [1, 2, 3, 4, 5];
  return (
    <View style={{flexDirection: 'row'}}>
      {stars.map(() => (
        <MaterialCommunityIcons name="star" color={colors.color_primary} />
      ))}
    </View>
  );
};

export default RatingStar;
