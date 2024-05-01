import React from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constants/color';

const RatingStar = ({star}: {star: number}) => {
  const stars: number[] = [1, 2, 3, 4, 5];
  return (
    <View style={{flexDirection: 'row'}}>
      {stars.map((_, index) => (
        <MaterialCommunityIcons
          name="star"
          color={index < star ? colors.color_primary : colors.color_sub_text}
          key={index}
        />
      ))}
    </View>
  );
};

export default RatingStar;
