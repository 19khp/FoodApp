import React, {useState} from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constants/color';

const RatingStar = ({
  star,
  size,
  onChange,
  currentRating = 0,
}: {
  star?: number;
  size?: number;
  currentRating?: number;
  onChange?: (rating: number) => void;
}) => {
  const stars: number[] = [1, 2, 3, 4, 5];

  const handleStarPress = (index: number) => {
    if (onChange) {
      onChange(index + 1);
    }
  };

  return (
    <View style={{flexDirection: 'row'}}>
      {stars.map((_, index) => (
        <MaterialCommunityIcons
          name="star"
          color={
            index < (star || currentRating)
              ? colors.color_primary
              : colors.color_sub_text
          }
          key={index}
          size={size}
          onPress={() => handleStarPress(index)}
        />
      ))}
    </View>
  );
};

export default RatingStar;
