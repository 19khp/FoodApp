import React, {useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {
  K_BORDER_RADIUS_26, K_MARGIN_100, K_MARGIN_120,
  K_MARGIN_16,
  K_MARGIN_24,
  K_MARGIN_32,
  K_MARGIN_80,
  K_PADDING_32,
  K_SIZE_20,
  K_SIZE_26,
  TextBase
} from "../../../common";
import {colors} from '../../../common/constants/color';
import {Utils} from '../../../common/utils';
import QuantitySelector from '../../../common/components/quantity-selector';
import ButtonBase from '../../../common/components/button';
import RatingBox from '../components/RatingBox';

const MealDetail = ({route, navigation}: any) => {
  const {item} = route.params;
  const [quantity, setQuantity] = useState(1);
  const handleOrder = () => {
    // Handle order placement
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: K_PADDING_32,
        }}>
        <View>
          <Image
            source={{uri: item.image}}
            style={{
              width: '100%',
              height: 300,
              borderRadius: K_BORDER_RADIUS_26,
            }}
          />
          <TextBase
            fontSize={K_SIZE_20}
            textAlign="center"
            style={{marginVertical: K_MARGIN_24}}>
            {item.name}
          </TextBase>

          <TextBase preset={'caption1'}>{item.des}</TextBase>
        </View>
        <View style={{marginBottom: K_MARGIN_120, marginTop: K_MARGIN_32}}>
          <TextBase
            fontSize={K_SIZE_20}
            style={{marginBottom: K_MARGIN_24}}
            textAlign={'center'}>
            Đánh giá
          </TextBase>
          <RatingBox />
          <RatingBox isLast />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: K_MARGIN_16,
            alignItems: 'center',
          }}>
          <TextBase color={colors.color_primary} fontSize={K_SIZE_20}>
            {Utils.formatCurrency(Number(item.price) * Number(quantity))}
          </TextBase>
          <QuantitySelector
            size={K_SIZE_26}
            fontInputSize={K_SIZE_20}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </View>
        <ButtonBase
          title={'Đặt hàng'}
          // onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: K_MARGIN_32,
    right: K_MARGIN_32,
    backgroundColor: colors.color_background,
    paddingBottom: K_MARGIN_32,
  },
});
export default MealDetail;
