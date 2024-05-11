import React from 'react';
import {
  K_BORDER_RADIUS_26,
  K_BORDER_WIDTH_1,
  K_MARGIN_10,
  K_MARGIN_8,
  K_PADDING_10,
  K_SIZE_32,
  TextBase,
} from '../../../../common';
import {colors} from '../../../../common/constants/color';
import {Image, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RatingStar from '../../../../common/components/rating-star';
import {getPathResource} from '../../../../common/utils/string.ts';
import {ENVConfig} from '../../../../common/config/env.ts';

const RatingBox = ({isLast, rating}: {isLast?: boolean; rating: any}) => {
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
          <Image
            source={{
              uri: getPathResource(ENVConfig.PATH_USER, rating.userImage),
            }}
            style={{
              width: K_SIZE_32,
              height: K_SIZE_32,
              borderRadius: K_BORDER_RADIUS_26,
              objectFit: 'cover',
            }}
          />
        </View>

        <View>
          <TextBase>{rating.userName}</TextBase>
          <RatingStar key={rating.id} star={rating.rating} />
        </View>
      </View>
      <TextBase preset="title2">{rating.comment}</TextBase>
    </View>
  );
};

export default RatingBox;
