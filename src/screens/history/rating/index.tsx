import React, {useState} from 'react';
import {Alert, SafeAreaView, TextInput, View} from 'react-native';
import {
  K_BORDER_RADIUS_6,
  K_BORDER_WIDTH_1,
  K_FONT_SIZE_14,
  K_MARGIN_10,
  K_MARGIN_24,
  K_MARGIN_60,
  K_PADDING_12,
  K_PADDING_32,
  K_SIZE_26,
  K_SIZE_80,
  TextBase,
} from '../../../common';
import {colors} from '../../../common/constants/color';
import RatingBox from '../../meals/components/RatingBox';
import RatingStar from '../../../common/components/rating-star';
import ButtonBase from '../../../common/components/button';
import {getProfile, useProfile} from '../../../hooks/server/useProfile.ts';
import {getPathResource} from '../../../common/utils/string.ts';
import {ENVConfig} from '../../../common/config/env.ts';
import {ratingMeal} from '../../../hooks/server/history.ts';
import {useSelector} from 'react-redux';
import {selectUserInfo} from '../../../stores/authSlice.ts';

const RatingMeal = ({route, navigation}: any) => {
  const {item} = route.params;
  console.log(item);
  const [currentRating, setCurrentRating] = useState(5);
  const [comment, setComment] = useState('');
  const user = useSelector(selectUserInfo);
  const handleRatingChange = (newRating: number) => {
    setCurrentRating(newRating);
  };
  const handleSubmitRating = async () => {
    try {
      console.log({
        rating: currentRating,
        productId: item.productDto.productId,
        userId: user.id,
        comment: comment,
      });
      const res = await ratingMeal({
        rating: currentRating,
        productId: item.productDto.productId,
        userId: user.id,
        comment: comment,
      });
      if (res.result) {
        Alert.alert('Thông báo', 'Đánh giá món ăn thành công!', [
          {
            text: 'Đồng ý',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };
  return (
    <SafeAreaView>
      <View style={{padding: K_PADDING_32}}>
        <TextBase fontSize={K_FONT_SIZE_14}>{item.productDto.name}</TextBase>
        <TextBase>Danh mục: {item.productDto.categoryName}</TextBase>
        <TextBase
          color={colors.color_sub_text}
          style={{marginTop: K_MARGIN_24}}>
          Chất lượng sản phẩm
        </TextBase>
        <RatingStar
          currentRating={currentRating}
          size={K_SIZE_26}
          onChange={handleRatingChange}
        />

        <TextInput
          style={{
            width: '100%',
            borderColor: colors.color_sub_text,
            borderRadius: K_BORDER_RADIUS_6,
            borderWidth: K_BORDER_WIDTH_1,
            padding: K_PADDING_12,
            marginTop: K_MARGIN_10,
            minHeight: K_SIZE_80,
          }}
          maxLength={150}
          multiline
          placeholder="Hãy chia sẻ nhận xt cho món ăn này bạn nhé!"
          placeholderTextColor={colors.color_sub_text}
          value={comment}
          onChangeText={setComment}
        />
        <ButtonBase
          style={{marginTop: K_SIZE_80}}
          title={'Đánh giá'}
          onPress={handleSubmitRating}
        />
      </View>
    </SafeAreaView>
  );
};

export default RatingMeal;
