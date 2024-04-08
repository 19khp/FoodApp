import React from 'react';
import {
  K_BORDER_WIDTH_1,
  K_MARGIN_10,
  K_MARGIN_8,
  K_PADDING_10,
  K_SIZE_32,
  TextBase,
} from '../../../../common';
import {colors} from '../../../../common/constants/color';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RatingStar from '../../../../common/components/rating-star';

const RatingBox = ({isLast}: {isLast?: boolean}) => {
  return (
    <View
      style={{
        borderBottomWidth: isLast ? 0 : K_BORDER_WIDTH_1,
        borderBottomColor: colors.color_sub_text_2,
        paddingBottom: K_PADDING_10,
        marginBottom: K_MARGIN_10,
      }}>
      <View style={{flexDirection: 'row', marginBottom: K_MARGIN_8}}>
        <View
          style={{
            width: K_SIZE_32,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: K_MARGIN_8,
          }}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={K_SIZE_32}
            color={colors.color_sub_text}
          />
        </View>

        <View>
          <TextBase>Pham Van A</TextBase>
          <RatingStar />
        </View>
      </View>
      <TextBase preset="title2">Ngon xỉu</TextBase>
    </View>
  );
};

export default RatingBox;
